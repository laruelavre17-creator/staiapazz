import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Package, Send, Sparkles } from "lucide-react";
import { SITE, CATEGORIES, type Category } from "@/config/site";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.brandName} — Top Shelf Delivery` },
      { name: "description", content: SITE.tagline },
      { property: "og:title", content: SITE.brandName },
      { property: "og:description", content: SITE.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Categories />
        <OrderInfo />
        <DeliveryArea />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: "radial-gradient(60% 50% at 50% 20%, color-mix(in oklab, var(--primary) 24%, transparent), transparent 72%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-primary/90 backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5" />
          Delivery discreto • qualità premium
        </div>
        <div className="relative mt-8 animate-fade-up">
          <div className="absolute inset-0 rounded-full blur-3xl opacity-80" style={{ background: "var(--gradient-gold)" }} />
          <div className="absolute inset-3 rounded-full border border-primary/20" />
          <img
            src={SITE.logoUrl}
            alt={SITE.brandName}
            className="hero-orb relative h-56 w-56 rounded-full object-cover ring-2 ring-primary/60 shadow-[0_0_120px_-24px_rgba(255,210,120,0.35)] sm:h-72 sm:w-72"
          />
        </div>
        <h1 className="display mt-8 text-5xl leading-[0.95] text-gradient-gold sm:text-7xl lg:text-8xl">
          {SITE.brandName}
        </h1>
        <p className="mt-6 max-w-2xl text-xs uppercase tracking-[0.32em] text-muted-foreground sm:text-sm">
          {SITE.tagline}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 rounded-full border border-primary/20 bg-background/60 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-primary/80 backdrop-blur">
          <span className="h-px w-8 bg-primary/60" />
          <span>18+ • Solo membri</span>
          <span className="h-px w-8 bg-primary/60" />
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="catalogo" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="section-label">Catalogo</p>
          <h2 className="display mt-3 text-3xl text-gradient-gold sm:text-4xl">Scegli la tua categoria</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm tracking-[0.2em] text-muted-foreground">
            Selezione curata, qualità elevata e consegna discreta.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {CATEGORIES.map((c) => <CategoryCard key={c.id} c={c} />)}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ c }: { c: Category }) {
  const isGold = c.accent === "gold";
  return (
    <Link
      to="/categoria/$category"
      params={{ category: c.id }}
      className="group relative overflow-hidden rounded-[28px] p-7 text-left glass-panel transition duration-300 hover:-translate-y-1 hover:border-primary/60"
      style={{
        boxShadow: isGold
          ? "0 18px 70px -24px color-mix(in oklab, var(--primary) 70%, transparent)"
          : "0 18px 70px -24px color-mix(in oklab, var(--accent) 60%, transparent)",
        borderColor: isGold
          ? "color-mix(in oklab, var(--primary) 50%, transparent)"
          : "color-mix(in oklab, var(--accent) 45%, transparent)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex items-center justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border"
          style={{
            borderColor: isGold ? "color-mix(in oklab, var(--primary) 40%, transparent)" : "color-mix(in oklab, var(--accent) 40%, transparent)",
            background: isGold ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "color-mix(in oklab, var(--accent) 14%, transparent)",
          }}
        >
          <Sparkles className="h-5 w-5" style={{ color: isGold ? "var(--primary)" : "var(--accent)" }} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70">Scopri</span>
      </div>
      <h3
        className="display relative mt-6 text-4xl sm:text-5xl"
        style={{
          color: isGold ? "var(--primary)" : "var(--accent)",
          textShadow: `0 0 24px color-mix(in oklab, ${isGold ? "var(--primary)" : "var(--accent)"} 60%, transparent)`,
        }}
      >
        {c.name}
      </h3>
      <p className="relative mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
        {c.description}
      </p>
      <p className="relative mt-5 text-[10px] uppercase tracking-[0.3em] text-primary/80">
        Vedi prodotti →
      </p>
    </Link>
  );
}

function OrderInfo() {
  const items = [
    { icon: Package, title: "Minimo ordine", desc: "In base alla distanza. Es: 10 km = 100€ spesa min." },
    { icon: MapPin, title: "Peso + Zona", desc: "Servizio delivery calcolato in base a distanza, peso e rischio." },
  ];
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="display mb-8 text-center text-3xl text-gradient-gold sm:text-4xl">
          Organizza il tuo delivery
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="section-shell rounded-[24px] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
                <it.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 display text-xl tracking-wider text-primary">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliveryArea() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl rounded-[32px] section-shell p-8 text-center sm:p-12 lg:p-16">
        <p className="section-label">Area consegna</p>
        <h2 className="display mt-3 text-4xl leading-none text-gradient-gold sm:text-6xl">
          Consegna in tutta Italia 🇮🇹
        </h2>
        <div className="mt-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-60" style={{ background: "var(--gradient-gold)" }} />
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-primary/40 sm:h-56 sm:w-56" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)" }}>
              <div className="absolute inset-3 rounded-full border border-primary/20" />
              <MapPin className="h-20 w-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
          Nord • Centro • Sud • Isole • Spedizione discreta
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-3xl rounded-[32px] section-shell p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
          <Send className="h-6 w-6 text-primary" />
        </div>
        <h2 className="display mt-4 text-3xl text-gradient-gold sm:text-5xl">Pronto ad ordinare?</h2>
        <p className="mt-3 text-sm tracking-[0.12em] text-muted-foreground">
          Scrivici subito su Telegram per il listino e la consegna.
        </p>
        <a
          href={SITE.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          <Send className="h-4 w-4" /> @H4SHBOMB
        </a>
      </div>
    </section>
  );
}
