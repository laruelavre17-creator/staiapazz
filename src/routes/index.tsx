import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Clock3,
  Instagram,
  LockKeyhole,
  MousePointer2,
  Send as Telegram,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CatalogSection } from "@/components/CatalogSection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SITE } from "@/config/site";
import { useOpeningStatus } from "@/hooks/use-opening-status";

const orderSteps = [
  { icon: BookOpen, text: "Sfoglia il menu e cerca il prodotto che ti interessa." },
  { icon: MousePointer2, text: "Apri la scheda del prodotto e scegli il taglio." },
  { icon: Telegram, text: "Continua su Telegram con il messaggio già pronto." },
  { icon: BadgeCheck, text: "Conferma con il nostro staff disponibilità e modalità di ritiro." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.brandName} — Catalogo privato` },
      { name: "description", content: SITE.tagline },
      { property: "og:title", content: SITE.brandName },
      { property: "og:description", content: SITE.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [closingGate, setClosingGate] = useState(false);
  const [denied, setDenied] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const openingStatus = useOpeningStatus();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroVisible(false);
      return;
    }

    const closeTimer = window.setTimeout(() => setIntroClosing(true), 1550);
    const hideTimer = window.setTimeout(() => setIntroVisible(false), 1900);
    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    try {
      setVerified(window.sessionStorage.getItem("age-verified") === "true");
    } catch (error) {
      setStorageMessage(
        error instanceof Error
          ? `La preferenza non può essere salvata in questa sessione: ${error.message}`
          : "La preferenza non può essere salvata in questa sessione.",
      );
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const confirmAge = () => {
    try {
      window.sessionStorage.setItem("age-verified", "true");
    } catch (error) {
      setStorageMessage(
        error instanceof Error
          ? `Non è stato possibile salvare la preferenza nel browser: ${error.message}`
          : "Non è stato possibile salvare la preferenza nel browser.",
      );
    }
    setClosingGate(true);
    window.setTimeout(() => setVerified(true), 280);
  };

  const skipIntro = () => {
    setIntroClosing(true);
    window.setTimeout(() => setIntroVisible(false), 450);
  };

  const showAgeGate = !hydrated || !verified;

  return (
    <div className="site-shell">
      {introVisible && (
        <div
          className={`intro-splash${introClosing ? " intro-splash-closing" : ""}`}
          role="status"
          aria-label={`Introduzione ${SITE.brandName}`}
        >
          <div className="intro-splash-center">
            <div className="intro-photo">
              <img src="/intro-emblem.webp" alt="" className="intro-photo-image" />
              <div className="intro-photo-brand">
                <svg
                  className="intro-cannabis-leaf intro-cannabis-leaf-left"
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d="M32 60c-3-10-8-17-15-23 5 0 9 2 13 5-6-9-9-18-8-29 5 4 9 9 11 17 2-11 7-20 15-27 2 11 0 20-5 29 6-5 12-7 19-6-5 9-12 15-22 18 7 0 13 3 18 8-9 4-17 4-25 0z" />
                  <path d="M32 57 30 27m2 22-13-13m14 7 13-17" />
                </svg>
                <img src={SITE.logoUrl} alt="" className="intro-photo-logo" />
                <div>
                  <p>{SITE.brandName}</p>
                  <span>CATALOGO PRIVATO</span>
                </div>
                <svg
                  className="intro-cannabis-leaf intro-cannabis-leaf-right"
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d="M32 60c-3-10-8-17-15-23 5 0 9 2 13 5-6-9-9-18-8-29 5 4 9 9 11 17 2-11 7-20 15-27 2 11 0 20-5 29 6-5 12-7 19-6-5 9-12 15-22 18 7 0 13 3 18 8-9 4-17 4-25 0z" />
                  <path d="M32 57 30 27m2 22-13-13m14 7 13-17" />
                </svg>
              </div>
            </div>
          </div>
          <button type="button" className="intro-skip" onClick={skipIntro}>
            SALTA
          </button>
        </div>
      )}

      {showAgeGate && (
        <div
          className={`age-gate-overlay${closingGate ? " gate-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          inert={introVisible}
        >
          <div className="age-gate-card">
            {!denied ? (
              <>
                <div className="brand-badge age-logo">
                  <img src={SITE.logoUrl} alt={SITE.brandName} className="brand-image" />
                </div>
                <div className="age-brand-name">{SITE.brandName}</div>
                <div className="panel-tag">
                  <LockKeyhole aria-hidden="true" />
                  ACCESSO RISERVATO
                </div>
                <h1 id="age-gate-title">VERIFICA ETÀ</h1>
                <p>
                  Questo catalogo privato è riservato esclusivamente agli adulti verificati.
                  Confermando, dichiari di avere almeno 18 anni.
                </p>
                <button className="gold-button age-confirm" type="button" onClick={confirmAge}>
                  <ShieldCheck aria-hidden="true" />
                  HO 18+ ANNI
                </button>
                <button className="secondary-button" type="button" onClick={() => setDenied(true)}>
                  Non ho 18 anni — Esci
                </button>
                <p className="age-disclaimer">
                  Questa schermata è una dichiarazione personale e non costituisce una verifica
                  legale dell’età.
                </p>
                {storageMessage && (
                  <p className="storage-message" role="status">
                    {storageMessage}
                  </p>
                )}
              </>
            ) : (
              <div className="access-denied">
                <ShieldCheck aria-hidden="true" />
                <h1 id="age-gate-title">ACCESSO NEGATO</h1>
                <p>Il catalogo è riservato agli adulti. La navigazione non è disponibile.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={showAgeGate ? "catalog-page dimmed" : "catalog-page"}
        inert={showAgeGate || introVisible}
        aria-hidden={showAgeGate || introVisible}
      >
        <SiteHeader />

        <main>
          <section className="hero-section page-section" aria-labelledby="brand-title">
            <div className="hero-orb hero-orb-one" aria-hidden="true" />
            <div className="hero-orb hero-orb-two" aria-hidden="true" />
            <div className="hero-content">
              <div className="brand-wordmark-wrap reveal">
                <div className="brand-badge hero-logo ring">
                  <img src={SITE.logoUrl} alt="" className="brand-image" />
                </div>
                <h1 id="brand-title" className="brand-wordmark">
                  {SITE.brandName}
                </h1>
                <p className="hero-kicker">PRIVATE CATALOG · SELEZIONE RISERVATA</p>
              </div>

              <div className="catalog-pill reveal">
                <ShieldCheck aria-hidden="true" />
                CATALOGO VERIFICATO · 18+
              </div>

              <div className="hours-card reveal">
                <div className="hours-card-top">
                  <span
                    className={`status-dot ${openingStatus?.isOpen ? "status-dot-green" : "status-dot-red"}`}
                  />
                  <span className="hours-state">{openingStatus?.isOpen ? "APERTO" : "CHIUSO"}</span>
                  <span className="hours-divider" />
                  <Clock3 aria-hidden="true" />
                  <span>
                    ORARI {SITE.openingTime} – {SITE.closingTime}
                  </span>
                </div>
                <div className="hours-subtitle">
                  Lun–Dom {SITE.openingTime} – {SITE.closingTime} ({SITE.timeZoneLabel})
                </div>
                <div className="hours-address">
                  {openingStatus
                    ? openingStatus.isOpen
                      ? `Chiudiamo tra ${openingStatus.countdown}`
                      : `Riapriamo tra ${openingStatus.countdown}`
                    : "Orari di apertura in aggiornamento"}
                </div>
              </div>

              <p className="lead-copy">
                Contattaci solo per i prodotti mostrati in questo catalogo
              </p>

              <div className="action-row reveal">
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-action"
                >
                  <Telegram aria-hidden="true" />
                  Contattaci su Telegram
                </a>
                {SITE.instagramUrl ? (
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ghost-action"
                  >
                    <Instagram aria-hidden="true" /> Instagram
                  </a>
                ) : (
                  <button
                    type="button"
                    className="ghost-action"
                    disabled
                    title="Configura SITE.instagramUrl"
                  >
                    <Instagram aria-hidden="true" /> Instagram
                  </button>
                )}
              </div>

              <a className="scroll-cue" href="#come-ordinare">
                <span>SCOPRI IL CATALOGO</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </section>

          <section id="come-ordinare" className="steps-section page-section">
            <div className="steps-panel reveal">
              <div className="section-heading centered">
                <div>
                  <p className="eyebrow">
                    <span /> SEMPLICE E DIRETTO
                  </p>
                  <h2>
                    COME <span>ORDINARE</span>
                  </h2>
                </div>
                <Sparkles className="steps-sparkle" aria-hidden="true" />
              </div>
              <ol className="step-list">
                {orderSteps.map(({ icon: Icon, text }, index) => (
                  <li className="reveal" key={text} style={{ animationDelay: `${index * 100}ms` }}>
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <Icon className="step-icon" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <CatalogSection />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
