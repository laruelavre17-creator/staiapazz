import { Link } from "@tanstack/react-router";
import { Clock3, Send } from "lucide-react";
import { SITE } from "@/config/site";
import { useOpeningStatus } from "@/hooks/use-opening-status";

export function SiteHeader() {
  const openingStatus = useOpeningStatus();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand-lockup" aria-label={`${SITE.brandName} — torna all'inizio`}>
          <div className="brand-badge">
            <img src={SITE.logoUrl} alt="" className="brand-image" />
          </div>
          <div className="brand-copy">
            <span>{SITE.brandName}</span>
            <small>
              <i
                className={`status-dot ${openingStatus?.isOpen ? "status-dot-green" : "status-dot-red"}`}
              />
              {openingStatus
                ? openingStatus.isOpen
                  ? `Aperto · chiude tra ${openingStatus.countdown}`
                  : `Chiuso · riapre tra ${openingStatus.countdown}`
                : "Stato in aggiornamento"}
            </small>
          </div>
        </Link>

        <div
          className="header-time"
          aria-label={`Orari di apertura: ${SITE.openingTime}–${SITE.closingTime}`}
        >
          <Clock3 aria-hidden="true" />
          <span>
            {SITE.openingTime} – {SITE.closingTime}
          </span>
          <span className="header-divider">|</span>
          <span>
            Lun–Dom · {SITE.openingTime} – {SITE.closingTime} ({SITE.timeZoneLabel})
          </span>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="brand-badge small">
            <img src={SITE.logoUrl} alt="" className="brand-image" />
          </div>
          <div>
            <p>{SITE.brandName}</p>
            <span>Catalogo privato · 18+</span>
          </div>
        </div>

        <div className="footer-links">
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">
            <Send aria-hidden="true" /> Telegram
          </a>
          <a href={SITE.telegramReviewsUrl} target="_blank" rel="noopener noreferrer">
            Gruppo Telegram
          </a>
          {SITE.instagramUrl ? (
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : (
            <span title="Configura SITE.instagramUrl">Instagram</span>
          )}
        </div>

        <p className="footer-copy">
          © {SITE.year} {SITE.brandName} · Solo maggiorenni
        </p>
      </div>
    </footer>
  );
}
