import { Link } from "@tanstack/react-router";
import { Send, Sparkles, Star } from "lucide-react";
import { SITE } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <img src={SITE.logoUrl} alt="Logo H4SH BOMB" className="h-8 w-8 rounded-full object-cover" />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-gradient-gold">{SITE.brandName}</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Consegna premium</span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <Link to="/" className="transition hover:text-foreground">Home</Link>
          <a href="#catalogo" className="transition hover:text-foreground">Catalogo</a>
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-foreground">Telegram</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Send className="h-3.5 w-3.5" /> Contattaci
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{SITE.brandName}</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Premium experience</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center sm:items-end sm:text-right">
          <p className="text-[11px] uppercase tracking-[0.26em] text-muted-foreground">© {SITE.year} {SITE.brandName}</p>
          <a
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="btn-secondary inline-flex w-fit px-4 py-3"
          >
            <Send className="h-3.5 w-3.5" /> Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
