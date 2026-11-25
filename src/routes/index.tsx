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
import { useEffect, useState, type CSSProperties } from "react";
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

    const closeTimer = window.setTimeout(() => setIntroClosing(true), 2600);
    const hideTimer = window.setTimeout(() => setIntroVisible(false), 2950);
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
          <div className="intro-static" aria-hidden="true" />
          <div className="intro-scanlines" aria-hidden="true" />
          <div className="intro-speed-lines" aria-hidden="true" />
          <img
            src="/leaf1-transparent.png"
            alt=""
            aria-hidden="true"
            className="intro-leaf intro-leaf-background-left"
          />
          <img
            src="/leaf2-transparent.png"
            alt=""
            aria-hidden="true"
            className="intro-leaf intro-leaf-background-right"
          />
          <img
            src="/leaf1-transparent.png"
            alt=""
            aria-hidden="true"
            className="intro-leaf intro-leaf-foreground-left"
          />
          <img
            src="/leaf2-transparent.png"
            alt=""
            aria-hidden="true"
            className="intro-leaf intro-leaf-foreground-right"
          />
          <div className="intro-particles" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <i
                key={index}
                style={
                  {
                    "--particle": index,
                    "--particle-x": `${(index - 14) * 9}px`,
                    "--particle-y": `${index % 2 === 0 ? -180 - (index * 5) : 180 + (index * 5)}px`,
                    "--particle-left": `${5 + index * 3.2}%`,
                    "--particle-top": `${30 + ((index * 17) % 44)}%`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="intro-splash-center">
            <div className="intro-ak intro-ak-left" aria-hidden="true">
              <img src="/ak47-transparent.png" alt="" />
            </div>
            <div className="intro-ak intro-ak-right" aria-hidden="true">
              <img src="/ak47-transparent.png" alt="" />
            </div>
            <div className="intro-brand-lockup">
              <img src={SITE.logoUrl} alt={SITE.brandName} className="intro-brand-logo" />
              <p className="intro-brand-name">{SITE.brandName}</p>
              <span className="intro-brand-kicker">CATALOGO PRIVATO</span>
            </div>
          </div>
          <button type="button" className="intro-skip" onClick={skipIntro}>
            SALTA
          </button>
        </div>
      )}

      {showAgeGate && !introVisible && (
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
                <p className="hero-kicker">CATALOGO PRIVATO · SELEZIONE RISERVATA</p>
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
                <a
                  href={SITE.telegramReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-action"
                >
                  Gruppo Telegram
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
