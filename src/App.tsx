import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./App.css";
import { CONTENT, PROJECTS_BASE, SKILL_ITEMS, LANG_PCT, CONTACT_VALUES, type Lang } from "./content";

const IDS = ["about", "skills", "projects", "education", "contact"];
const rich = (s: string) => s.split("**").map((x, i) => (i % 2 ? <strong key={i}>{x}</strong> : x));
const initialLang = (): Lang => {
  try { const v = localStorage.getItem("lang"); if (v === "en" || v === "fr") return v; } catch { /* ignore */ }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
};

/* ===== HELPERS ===== */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`section ${inView ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

function Slot({ src, label, hint, big = false }: { src: string; label: string; hint: string; big?: boolean }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`slot ${big ? "slot--big" : ""}`}>
      {ok ? (
        <img src={src} alt={label} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="slot__empty"><span>{hint}</span><code>public{src}</code></div>
      )}
    </div>
  );
}

const Bar = ({ pct }: { pct: number }) => ({ "--w": `${pct}%` } as CSSProperties);

/* ===== APP ===== */
export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `Rayen Ben Youssef | ${t.title}`;
    try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
  }, [lang, t.title]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const contacts = [
    { icon: "✉", val: CONTACT_VALUES.email, href: `mailto:${CONTACT_VALUES.email}` },
    { icon: "📞", val: CONTACT_VALUES.phone, href: "tel:+21652925815" },
    { icon: "📍", val: t.contact.place },
    { icon: "🔗", val: "linkedin.com/in/rayen-ben-youssef", href: CONTACT_VALUES.linkedin },
    { icon: "🔗", val: "github.com/rayenbenyoussef", href: CONTACT_VALUES.github },
  ];

  return (
    <div className="app">
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => scrollTo("hero")}>RB</div>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {IDS.map((id, i) => (<li key={id}><button onClick={() => scrollTo(id)}>{t.nav[i]}</button></li>))}
        </ul>
        <div className="nav__lang" role="group" aria-label="Language">
          {(["en", "fr"] as Lang[]).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
        <button className="nav__burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu"><span /><span /><span /></button>
      </nav>

      <section id="hero" className="hero">
        <div className="hero__bg"><div className="hero__orb hero__orb--1" /><div className="hero__orb hero__orb--2" /><div className="hero__grid" /></div>
        <div className="hero__content">
          <div className="hero__photo-wrapper">
            <div className="hero__photo-ring" />
            <div className="hero__photo">
              <img src="/photo.jpg" alt="Rayen Ben Youssef" onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("hero__photo--placeholder");
              }} />
              <div className="hero__photo-initials">RB</div>
            </div>
          </div>
          <div className="hero__text">
            <p className="hero__eyebrow">{t.hello}</p>
            <h1 className="hero__name">Rayen Ben Youssef</h1>
            <h2 className="hero__title">{t.title}</h2>
            <p className="hero__tagline">{t.tagline}</p>
            <div className="hero__ctas">
              <button className="btn btn--primary" onClick={() => scrollTo("contact")}>{t.ctaContact}</button>
              <button className="btn btn--ghost" onClick={() => scrollTo("projects")}>{t.ctaProjects}</button>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint"><span>{t.scroll}</span><div className="hero__scroll-line" /></div>
      </section>

      <Section id="about">
        <div className="about__inner">
          <div className="section__label">{t.about.label}</div>
          <h2 className="section__heading">{t.about.heading}</h2>
          <div className="about__grid">
            <div className="about__text">{t.about.paras.map((p) => <p key={p}>{rich(p)}</p>)}</div>
            <div className="about__stats">
              {["3", "166", "2"].map((n, i) => (
                <div key={n} className="about__stat"><span className="about__stat-n">{n}</span><span className="about__stat-l">{t.about.stats[i]}</span></div>
              ))}
            </div>
          </div>
          <div className="about__interests">{t.about.interests.map((i) => (<span key={i} className="tag">{i}</span>))}</div>
        </div>
      </Section>

      <Section id="skills" className="section--alt">
        <div className="section__label">{t.skills.label}</div>
        <h2 className="section__heading">{t.skills.heading}</h2>
        <div className="skills__grid">
          <div className="skills__group">
            {t.skills.groups.map((g, gi) => (
              <div key={g}>
                <h3 className="skills__group-title">{g}</h3>
                <div className="skills__tags">{SKILL_ITEMS[gi].map((i) => (<span key={i} className="tag">{i}</span>))}</div>
              </div>
            ))}
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">{t.skills.softTitle}</h3>
            <div className="soft-skills">{t.skills.soft.map((s) => (<div key={s} className="soft-skill">{s}</div>))}</div>
            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>{t.skills.langsTitle}</h3>
            <div className="langs">
              {t.skills.langs.map(([name, level], i) => (
                <div key={name} className="lang-item">
                  <div className="lang-item__header"><span className="lang-item__name">{name}</span><span className="lang-item__level">{level}</span></div>
                  <div className="lang-item__bar"><div className="lang-item__fill" style={Bar({ pct: LANG_PCT[i] })} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="section__label">{t.projects.label}</div>
        <h2 className="section__heading">{t.projects.heading}</h2>
        <div className="timeline">
          {t.projects.items.map((p, i) => {
            const b = PROJECTS_BASE[i];
            return (
              <div key={p.name} className="timeline__item">
                <div className="timeline__marker"><div className="timeline__dot" /><div className="timeline__line" /></div>
                <div className="timeline__card">
                  <div className="timeline__header">
                    <div>
                      <p className="timeline__type">{p.type}</p>
                      <h3 className="timeline__role">{p.name}</h3>
                      <p className="timeline__meta">{p.location} · {b.period}</p>
                    </div>
                    <span className="timeline__duration">{p.duration}</span>
                  </div>
                  <div className="proj-gallery">
                    <Slot big src={b.images[0]} hint={t.projects.addShot} label={`${p.name} 1`} />
                    <Slot src={b.images[1]} hint={t.projects.addShot} label={`${p.name} 2`} />
                    <Slot src={b.images[2]} hint={t.projects.addShot} label={`${p.name} 3`} />
                  </div>
                  <ul className="timeline__bullets">{p.bullets.map((x) => <li key={x}>{x}</li>)}</ul>
                  <div className="timeline__tags">{b.tags.map((x) => <span key={x} className="tag tag--sm">{x}</span>)}</div>
                  <div style={{ marginTop: "1rem" }}>
                    <a href={b.link} className="contact__link" target="_blank" rel="noopener noreferrer">{t.projects.github}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="education" className="section--alt">
        <div className="section__label">{t.education.label}</div>
        <h2 className="section__heading">{t.education.heading}</h2>
        <div className="edu__grid">
          <div className="edu__card edu__card--main">
            <div className="edu__icon">🎓</div>
            <div>
              <p className="edu__school">{t.education.school}</p>
              <h3 className="edu__degree">{t.education.degree}</h3>
              <p className="edu__period">{t.education.period}</p>
            </div>
          </div>
          <div className="edu__certs">
            <h3 className="edu__certs-title">{t.education.certsTitle}</h3>
            {t.education.certs.map(([org, name, date]) => (
              <div key={name} className="cert"><span className="cert__org">{org}</span><span className="cert__name">{name}</span><span className="cert__date">{date}</span></div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="section__label">{t.contact.label}</div>
        <h2 className="section__heading">{t.contact.heading}</h2>
        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">{t.contact.intro}</p>
            {contacts.map((c, i) => (
              <div key={i} className="contact__item">
                <span className="contact__icon">{c.icon}</span>
                <div>
                  <p className="contact__item-label">{t.contact.labels[i]}</p>
                  {c.href ? <a href={c.href} className="contact__item-val contact__link">{c.val}</a> : <p className="contact__item-val">{c.val}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="contact__card">
            <p className="contact__card-text">{t.contact.quote}</p>
            <div className="contact__card-sig">— Rayen Ben Youssef</div>
          </div>
        </div>
      </Section>

      <footer className="footer"><p>© 2026 Rayen Ben Youssef</p></footer>
    </div>
  );
}
