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
            <svg className="intro-weapons" viewBox="0 0 440 260" aria-hidden="true">
              <defs>
                <linearGradient id="intro-weapon-metal" x1="0" x2="0.9" y1="0" y2="1">
                  <stop offset="0" stopColor="#f1ff9a" />
                  <stop offset="0.24" stopColor="#b6ff00" />
                  <stop offset="0.52" stopColor="#e9ff7a" />
                  <stop offset="0.76" stopColor="#6d9e00" />
                  <stop offset="1" stopColor="#e6ff70" />
                </linearGradient>
                <linearGradient id="intro-weapon-shadow" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#282c13" />
                  <stop offset="0.5" stopColor="#697d20" />
                  <stop offset="1" stopColor="#171a0d" />
                </linearGradient>
                <linearGradient id="intro-leaf-neon" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#ddff72" />
                  <stop offset="0.55" stopColor="#78c900" />
                  <stop offset="1" stopColor="#3c7410" />
                </linearGradient>
                <g
                  id="intro-cannabis-leaf"
                  fill="url(#intro-leaf-neon)"
                  stroke="#d7ff54"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M32 62c-6-7-8-13-7-19-7 5-15 6-22 2 6-7 12-10 20-11-9 0-16-3-20-9 9-4 17-3 25 2-6-7-8-14-6-22 8 5 12 12 13 21 2-10 7-17 15-21 1 9-2 17-9 24 8-5 17-6 25-2-5 7-12 10-21 10 9 2 15 7 19 14-9 2-17 0-24-6 3 8 3 15 0 22z" />
                  <path
                    fill="none"
                    stroke="#eeffb0"
                    strokeWidth="1.2"
                    d="M32 61 11 35m21 26 20-27M32 61l-1-38m1 30-22-9m22 3 21-10"
                  />
                </g>
                <g id="intro-ak47" strokeLinejoin="round">
                  <path
                    fill="url(#intro-weapon-shadow)"
                    stroke="#d7ff54"
                    strokeWidth="2"
                    d="M31 108h84l27 10h26v27h-27l-27-9H41l-13-9v-10z"
                  />
                  <path fill="url(#intro-weapon-metal)" d="M28 108h14v29H28l-8-7v-14z" />
                  <path fill="url(#intro-weapon-metal)" d="M145 116h105v33H145z" />
                  <path
                    fill="url(#intro-weapon-shadow)"
                    stroke="#d7ff54"
                    strokeWidth="2"
                    d="M157 111h92l10-9h65v11h55v8h23v12h-23v7h-63v8h-66l-12-11h-81z"
                  />
                  <path fill="url(#intro-weapon-metal)" d="M255 104h62v28h-62z" />
                  <path fill="url(#intro-weapon-metal)" d="M250 96h70v7h-70z" />
                  <path fill="url(#intro-weapon-shadow)" d="M312 109h97v4h-97zm5 18h91v4h-91z" />
                  <path fill="url(#intro-weapon-metal)" d="M395 105h18v27h-18z" />
                  <path fill="url(#intro-weapon-shadow)" d="M407 100h13v37h-13z" />
                  <path fill="none" stroke="#f1ff9a" strokeWidth="2" d="M412 103v31m-6-25h10" />
                  <path fill="url(#intro-weapon-metal)" d="M174 146h28l-6 28-14 17-17-2 12-25z" />
                  <path
                    fill="url(#intro-weapon-shadow)"
                    stroke="#d7ff54"
                    strokeWidth="2"
                    d="M218 147h25l11 25-2 18-21 2-1-15-13-19z"
                  />
                  <path
                    fill="url(#intro-weapon-metal)"
                    stroke="#d7ff54"
                    strokeWidth="2"
                    d="M239 148h20l17 30 14 29-8 9-17-8-11-25-18-20z"
                  />
                  <path fill="url(#intro-weapon-shadow)" d="M161 112h12v31h-12zm82 0h8v31h-8z" />
                  <path
                    fill="none"
                    stroke="#f1ff9a"
                    strokeWidth="2"
                    d="M176 122h58m-58 7h58m-58 7h58"
                  />
                  <path
                    fill="none"
                    stroke="#b6ff00"
                    strokeWidth="2"
                    d="M266 112v17m8-17v17m8-17v17m8-17v17m8-17v17"
                  />
                  <path
                    fill="none"
                    stroke="#f1ff9a"
                    strokeWidth="2"
                    d="M44 114h68m-67 19h68m46-16h85"
                  />
                  <path fill="none" stroke="#d7ff54" strokeWidth="3" d="M156 150h16m79 0h15" />
                  <path fill="none" stroke="#f1ff9a" strokeWidth="2" d="M200 148q10 15 0 23h-9" />
                  <path fill="none" stroke="#d7ff54" strokeWidth="2" d="M220 119v21m-5-21h10" />
                  <path fill="none" stroke="#d7ff54" strokeWidth="2" d="M32 111v22m8-22v22" />
                </g>
              </defs>
              <g className="intro-leaf">
                <use
                  href="#intro-cannabis-leaf"
                  transform="translate(48 40) rotate(-20 32 32) scale(0.82)"
                />
              </g>
              <g className="intro-leaf">
                <use
                  href="#intro-cannabis-leaf"
                  transform="translate(338 36) rotate(22 32 32) scale(0.82)"
                />
              </g>
              <g className="intro-leaf">
                <use
                  href="#intro-cannabis-leaf"
                  transform="translate(82 142) rotate(-38 32 32) scale(0.5)"
                />
              </g>
              <g className="intro-leaf">
                <use
                  href="#intro-cannabis-leaf"
                  transform="translate(330 140) rotate(36 32 32) scale(0.5)"
                />
              </g>
              <g className="intro-weapon intro-weapon-left">
                <g transform="rotate(135 220 130)">
                  <use href="#intro-ak47" />
                </g>
              </g>
              <g className="intro-weapon intro-weapon-right">
                <g transform="rotate(-45 220 130)">
                  <use href="#intro-ak47" />
                </g>
              </g>
            </svg>
            <div className="intro-logo">
              <img src={SITE.logoUrl} alt="" />
            </div>
            <p className="intro-brand">{SITE.brandName}</p>
            <span className="intro-caption">CATALOGO PRIVATO</span>
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
