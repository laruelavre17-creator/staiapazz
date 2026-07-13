import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Send, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { SITE, getCategory, type Product } from "@/config/site";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/categoria/$category")({
  beforeLoad: ({ params }) => {
    if (params.category !== "hash") {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const c = params.category === "hash" ? getCategory("hash") : null;
    const title = c ? `${c.name} — ${SITE.brandName}` : SITE.brandName;
    const desc = c?.description ?? SITE.tagline;
    return {
      title,
      meta: [
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const c = getCategory("hash");
  const color = "var(--primary)";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Indietro
          </Link>

          <section className="glass-panel mt-6 rounded-[32px] p-8 text-center sm:p-10">
            <p className="section-label">Categoria</p>
            <h1
              className="display mt-3 text-5xl leading-none sm:text-7xl"
              style={{
                color,
                textShadow: `0 0 30px color-mix(in oklab, ${color} 60%, transparent)`,
              }}
            >
              {c.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.28em] text-muted-foreground">
              {c.description}
            </p>
          </section>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {c.products.map((p) => (
              <ProductCard key={p.id} product={p} accent={color} />
            ))}
          </div>

          <div className="mt-14 rounded-[32px] section-shell p-8 text-center sm:p-10">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-4 text-sm tracking-[0.16em] text-muted-foreground">
              Per ordinare, scrivici su Telegram.
            </p>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 inline-flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" /> Ordina su Telegram
            </a>
          </div>
        </div>
      </main>
      <SiteFooter className="mt-auto" />
    </div>
  );
}

function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <div className="elevated-card group overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-square bg-muted">
        {product.video ? (
          <>
            {playing ? (
              <video ref={videoRef} src={product.video} controls autoPlay playsInline className="h-full w-full object-cover bg-black" />
            ) : (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={`Riproduci video ${product.name}`}
                className="group/play relative flex h-full w-full items-center justify-center overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--accent) 32%, transparent), transparent 60%), #0a0a12",
                }}
              >
                <video
                  src={product.video}
                  preload="metadata"
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center transition group-hover/play:scale-105">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full glow-gold bg-primary/90">
                    <Play className="ml-1 h-7 w-7 text-primary-foreground" fill="currentColor" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                    Clicca per riprodurre
                  </span>
                </div>
              </button>
            )}
          </>
        ) : product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: "var(--gradient-gold)" }} />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold tracking-[0.16em]" style={{ color: accent }}>
          {product.name}
        </h3>
        <ul className="mt-3 divide-y divide-border/70">
          {product.tiers.map((t) => (
            <li key={t.weight} className="flex items-center justify-between py-2 text-sm">
              <span className="tracking-[0.14em] text-muted-foreground">{t.weight}</span>
              <span className="font-semibold" style={{ color: accent }}>€{t.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
