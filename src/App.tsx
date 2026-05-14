import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Skills", "Experience", "Education", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>} className={`section ${inView ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => scrollTo("hero")}>RB</div>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {NAV_LINKS.map(l => (
            <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>
          ))}
        </ul>
        <button className="nav__burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__grid" />
        </div>
        <div className="hero__content">
          <div className="hero__photo-wrapper">
            <div className="hero__photo-ring" />
            <div className="hero__photo">
              {/* Replace the src below with your actual photo path, e.g. src="/your-photo.jpg" */}
              <img src="/photo.jpg" alt="Rayen Ben youssef" onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("hero__photo--placeholder");
              }} />
              <div className="hero__photo-initials">RB</div>
            </div>
          </div>
          <div className="hero__text">
            <p className="hero__eyebrow">Hello, I'm</p>
            <h1 className="hero__name">Rayen Ben youssef</h1>
            <h2 className="hero__title">Data Science & Business Intelligence</h2>
            <p className="hero__tagline">
              Étudiant en Licence Business Computing à la FSEGT · Passionné par l'IA,
              les pipelines ETL et l'analyse de données médicales.
            </p>
            <div className="hero__ctas">
              <button className="btn btn--primary" onClick={() => scrollTo("Contact")}>Me contacter</button>
              <button className="btn btn--ghost" onClick={() => scrollTo("Experience")}>Voir mes projets</button>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="about__inner">
          <div className="section__label">01 — Profil</div>
          <h2 className="section__heading">À propos de moi</h2>
          <div className="about__grid">
            <div className="about__text">
              <p>
                Étudiant en Licence Business Computing à la FSEGT, je me spécialise en
                <strong> Data Science</strong>, <strong>Business Intelligence</strong> et traitement
                de données médicales. Passionné par l'IA et les pipelines de données, j'ai développé
                des projets concrets incluant un entrepôt de données médicales en PL/SQL et un pipeline ETL complet.
              </p>
              <p>
                Rigoureux, autonome et curieux, je cherche à mettre mes compétences au service d'une
                startup innovante dans le domaine de Data Science & Analyse de Données Médicales.
              </p>
            </div>
            <div className="about__stats">
              {[
                { n: "3", label: "Projets réalisés" },
                { n: "4+", label: "Mois de pipeline actif" },
                { n: "2", label: "Certifs DataCamp" },
              ].map(s => (
                <div key={s.label} className="about__stat">
                  <span className="about__stat-n">{s.n}</span>
                  <span className="about__stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about__interests">
            {["JCI Rafraf (2 ans)", "NEXUS FSEGT (1 an)", "Volleyball"].map(i => (
              <span key={i} className="tag">{i}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="section--alt">
        <div className="section__label">02 — Compétences</div>
        <h2 className="section__heading">Ce que je maîtrise</h2>
        <div className="skills__grid">
          <div className="skills__group">
            <h3 className="skills__group-title">Techniques</h3>
            {[
              { name: "Python (Pandas, NumPy)", lvl: 80 },
              { name: "SQL & PL/SQL", lvl: 75 },
              { name: "Data Warehousing & ETL", lvl: 78 },
              { name: "Data Mining & Modélisation", lvl: 70 },
              { name: "IBM SPSS Modeler", lvl: 65 },
              { name: "Java, C", lvl: 60 },
              { name: "Git & GitHub", lvl: 72 },
            ].map(s => (
              <div key={s.name} className="skill-bar">
                <div className="skill-bar__label">
                  <span>{s.name}</span>
                  <span>{s.lvl}%</span>
                </div>
                <div className="skill-bar__track">
                  <div className="skill-bar__fill" style={{ "--w": `${s.lvl}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Transversales</h3>
            <div className="soft-skills">
              {["Problem Solving", "Rigueur & Sens du détail", "Autonomie & Organisation"].map(s => (
                <div key={s} className="soft-skill">{s}</div>
              ))}
            </div>
            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Langues</h3>
            <div className="langs">
              {[
                { lang: "Arabe", level: "Langue maternelle", pct: 100 },
                { lang: "Anglais", level: "Opérationnel", pct: 65 },
                { lang: "Français", level: "Notions", pct: 40 },
                { lang: "Allemand", level: "Débutant", pct: 20 },
              ].map(l => (
                <div key={l.lang} className="lang-item">
                  <div className="lang-item__header">
                    <span className="lang-item__name">{l.lang}</span>
                    <span className="lang-item__level">{l.level}</span>
                  </div>
                  <div className="lang-item__bar">
                    <div className="lang-item__fill" style={{ "--w": `${l.pct}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <div className="section__label">03 — Expérience</div>
        <h2 className="section__heading">Projets & Expériences</h2>
        <div className="timeline">
          {[
            {
              role: "Data Scientist — Data Quality Pipeline",
              type: "Projet Personnel",
              period: "02/2026 – Actuel",
              duration: "4 mois",
              location: "Tunis",
              bullets: [
                "Pipeline ETL de traitement de données médicales en Python (Pandas, NumPy)",
                "Nettoyage, validation et profiling de datasets hospitaliers réels (MIMIC-IV)",
                "Intégration d'IBM SPSS Modeler pour l'automatisation des transformations",
              ],
              tags: ["Python", "ETL", "MIMIC-IV", "SPSS"],
            },
            {
              role: "Data Warehouse Engineer",
              type: "Projet Académique Indépendant",
              period: "04/2026 – 05/2026",
              duration: "1 semaine",
              location: "Tunis",
              bullets: [
                "Conception d'un entrepôt de données médicales (Star Schema) avec PL/SQL sur Oracle XE",
                "Pipeline ETL complet : extraction, transformation et chargement de données d'assurance médicale (Kaggle)",
              ],
              tags: ["PL/SQL", "Oracle XE", "Star Schema", "ETL"],
            },
            {
              role: "Scrum Master & Développeur Java",
              type: "Projet d'équipe — FSEGT",
              period: "04/2026 – 04/2026",
              duration: "2 semaines",
              location: "Tunis",
              bullets: [
                "Développement des compétences des collaborateurs sur le plan technique",
                "Management opérationnel d'équipe, soutien technique, suivi des performances",
              ],
              tags: ["Java", "Scrum", "Team Lead"],
            },
          ].map((exp, i) => (
            <div key={i} className="timeline__item">
              <div className="timeline__marker">
                <div className="timeline__dot" />
                <div className="timeline__line" />
              </div>
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <p className="timeline__type">{exp.type}</p>
                    <h3 className="timeline__role">{exp.role}</h3>
                    <p className="timeline__meta">{exp.location} · {exp.period}</p>
                  </div>
                  <span className="timeline__duration">{exp.duration}</span>
                </div>
                <ul className="timeline__bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="timeline__tags">
                  {exp.tags.map(t => <span key={t} className="tag tag--sm">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" className="section--alt">
        <div className="section__label">04 — Formation</div>
        <h2 className="section__heading">Parcours académique</h2>
        <div className="edu__grid">
          <div className="edu__card edu__card--main">
            <div className="edu__icon">🎓</div>
            <div>
              <p className="edu__school">Faculté des Sciences Économiques et de Gestion de Tunis</p>
              <h3 className="edu__degree">Licence Business Computing</h3>
              <p className="edu__period">09/2024 – en cours · Tunis</p>
            </div>
          </div>
          <div className="edu__certs">
            <h3 className="edu__certs-title">Certifications</h3>
            {[
              { org: "DataCamp", name: "Intermediate Python", date: "Jan 2026" },
              { org: "DataCamp", name: "Data Manipulation with pandas", date: "Fév 2026" },
              { org: "JCI", name: "Best Content Creator of the Year 2025", date: "2025" },
              { org: "JCI", name: "Chella of the Year 2025", date: "2025" },
            ].map(c => (
              <div key={c.name} className="cert">
                <span className="cert__org">{c.org}</span>
                <span className="cert__name">{c.name}</span>
                <span className="cert__date">{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="section__label">05 — Contact</div>
        <h2 className="section__heading">Travaillons ensemble</h2>
        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">
              Disponible pour des opportunités en Data Science & Business Intelligence.
              N'hésitez pas à me contacter !
            </p>
            {[
              { icon: "✉", label: "Email", val: "rayenbenyoussef815@gmail.com", href: "mailto:rayenbenyoussef815@gmail.com" },
              { icon: "📞", label: "Téléphone", val: "+216 52 925 815", href: "tel:+21652925815" },
              { icon: "📍", label: "Adresse", val: "Rafraf 7015, Bizerte" },
              { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/rayen-ben-youssef", href: "https://linkedin.com/in/rayen-ben-youssef-a7b727361" },
            ].map(c => (
              <div key={c.label} className="contact__item">
                <span className="contact__icon">{c.icon}</span>
                <div>
                  <p className="contact__item-label">{c.label}</p>
                  {c.href
                    ? <a href={c.href} className="contact__item-val contact__link">{c.val}</a>
                    : <p className="contact__item-val">{c.val}</p>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="contact__card">
            <p className="contact__card-text">
              "Rigoureux, autonome et curieux — je cherche à mettre mes compétences
              au service d'une startup innovante dans le domaine de la Data Science."
            </p>
            <div className="contact__card-sig">— Rayen Ben youssef</div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Rayen Ben youssef · Conçu & développé avec passion</p>
      </footer>
    </div>
  );
}
