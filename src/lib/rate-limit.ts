import { createMiddleware } from "@tanstack/react-start";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100;
const MAX_STORED_IPS = 5000;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-client-ip") ||
    "unknown"
  );
}

function pruneStore(now: number) {
  if (rateLimitStore.size <= MAX_STORED_IPS) return;

  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

export const rateLimitMiddleware = createMiddleware().server(async ({ request, next }) => {
  const now = Date.now();
  pruneStore(now);

  const clientIp = getClientIp(request);
  const entry = rateLimitStore.get(clientIp);
  const isWindowExpired = !entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS;

  const currentEntry: RateLimitEntry = isWindowExpired
    ? { count: 1, windowStart: now }
    : { count: entry.count + 1, windowStart: entry.windowStart };

  rateLimitStore.set(clientIp, currentEntry);

  if (currentEntry.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((currentEntry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);

    return new Response("Too many requests", {
      status: 429,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "retry-after": String(retryAfter),
        "x-ratelimit-limit": String(RATE_LIMIT_MAX_REQUESTS),
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(Math.ceil((currentEntry.windowStart + RATE_LIMIT_WINDOW_MS) / 1000)),
      },
    });
  }

  const response = await next();

  if (!(response instanceof Response)) {
    return response;
  }

  const remaining = Math.max(RATE_LIMIT_MAX_REQUESTS - currentEntry.count, 0);
  response.headers.set("x-ratelimit-limit", String(RATE_LIMIT_MAX_REQUESTS));
  response.headers.set("x-ratelimit-remaining", String(remaining));
  response.headers.set(
    "x-ratelimit-reset",
    String(Math.ceil((currentEntry.windowStart + RATE_LIMIT_WINDOW_MS) / 1000)),
  );

  return response;
});
