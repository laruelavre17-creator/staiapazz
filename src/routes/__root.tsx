import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SITE } from "../config/site";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="max-w-lg rounded-[36px] border border-white/10 bg-card/90 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">404 — Pagina non trovata</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">Oops.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          La pagina che stavi cercando non è disponibile. Torna alla home o prova una nuova ricerca.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const handleRetry = () => {
    reset();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-[32px] border border-white/10 bg-card/90 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Ops, qualcosa è andato storto.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          La pagina non si è caricata correttamente. Prova a ricaricare o torna nella home.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Vai alla home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    title: "H4SH BOMB",
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "H4SH BOMB — Prodotti impeccabili, selezionati con cura. Consegna in tutta Italia." },
      { name: "author", content: "H4SH BOMB" },
      { property: "og:title", content: "H4SH BOMB" },
      { property: "og:description", content: "H4SH BOMB — Prodotti impeccabili, selezionati con cura. Consegna in tutta Italia." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE.logoUrl}` },
      { property: "og:image:alt", content: "H4SH BOMB logo" },
      { name: "theme-color", content: "#050509" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "H4SH BOMB" },
      { name: "twitter:description", content: "H4SH BOMB — Prodotti impeccabili, selezionati con cura. Consegna in tutta Italia." },
      { name: "twitter:image", content: `${SITE.logoUrl}` },
      { name: "twitter:image:alt", content: "H4SH BOMB logo" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2" },
      { rel: "icon", href: "/icon-192.png?v=2", type: "image/png", sizes: "192x192" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
