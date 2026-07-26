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
            <h2 className="hero__title">Data Engineer & Machine Learning Builder</h2>
            <p className="hero__tagline">
              20-year-old Business Intelligence student at FSEGT · Driven by AI, data science,
              and the vision of transforming healthcare through intelligent, predictive solutions.
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
                I'm leveraging the power of data to build intelligent, forward-looking solutions — with a particular dream
                of applying this to <strong>healthcare</strong>, turning raw data into insights that improve lives.
              </p>
              <p>
                While I possess a broad technical toolkit, my true passion lies in <strong>Data Science, AI, and Machine Learning</strong>.
                I don't just write code; I build the <strong>"scaffolding"</strong> necessary to deploy models that turn raw information 
                into strategic insights — from data pipelines to production dashboards.
              </p>
              <p>
                Driven by <strong>Innovate. Analyze. Predict.</strong> — I'm eager to connect with fellow researchers, data scientists, 
                and developers passionate about the future of AI, predictive analytics, and its potential to transform healthcare.
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
            {["AI & Healthcare", "Predictive Analytics", "Data Pipelines"].map(i => (
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
            <h3 className="skills__group-title">AI & Machine Learning</h3>
            {[
              { name: "TensorFlow & Keras", lvl: 75 },
              { name: "Scikit-learn", lvl: 78 },
              { name: "Model Deployment & Inference", lvl: 72 },
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

            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Data Engineering & Orchestration</h3>
            {[
              { name: "Python 3.12 (Pandas, NumPy, Pandera)", lvl: 82 },
              { name: "Apache Airflow 3", lvl: 78 },
              { name: "dbt Core", lvl: 75 },
              { name: "SQL & PL/SQL", lvl: 80 },
              { name: "PostgreSQL", lvl: 78 },
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

            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Infrastructure & Reliability</h3>
            {[
              { name: "Docker & Docker Compose", lvl: 75 },
              { name: "Grafana & Prometheus", lvl: 72 },
              { name: "pytest & Testing", lvl: 70 },
              { name: "Git & GitHub", lvl: 75 },
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

            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Engineering Foundation</h3>
            {[
              { name: "C, Java, PHP", lvl: 65 },
              { name: "UML 2.0 Modeling", lvl: 68 },
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
              {["Problem Solving", "Model Architecture", "Rigueur & Sens du détail", "Autonomie & Organisation"].map(s => (
                <div key={s} className="soft-skill">{s}</div>
              ))}
            </div>
            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Langues</h3>
            <div className="langs">
              {[
                { lang: "Arabe", level: "Langue maternelle", pct: 100 },
                { lang: "Anglais", level: "Opérationnel", pct: 70 },
                { lang: "Français", level: "Notions", pct: 45 },
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
              role: "Data Engineer — Medical Data Quality Pipeline",
              type: "Projet Personnel - Production-Grade",
              period: "02/2026 – Actuel",
              duration: "4+ mois",
              location: "Tunis",
              bullets: [
                "Architecture ELT complète avec Apache Airflow 3, dbt Core et PostgreSQL — 57,000+ entreprises en production utilisent cette stack",
                "3 DAGs orchestrés (medical_etl_init, medical_etl_daily, data_quality_dag) avec scheduling, retries et dépendances",
                "166 dbt tests (not_null, unique, relationships, expressions) + validation Pandera sur 5 marts",
                "Docker Compose multi-service (Airflow, PostgreSQL, Grafana) avec volumes, networking et env config",
                "Dashboards Grafana : admission rates, length of stay, vital signs tracking, medication patterns",
                "Star Schema: 7 dimensions + 5 facts + 1 bridge table — modélisation clinique complète",
              ],
              tags: ["Python 3.12", "Apache Airflow", "dbt", "PostgreSQL", "Docker", "Grafana", "Pandera", "pytest"],
              link: "https://github.com/rayenbenyoussef/Medical_data_quality_pipeline"
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
                {exp.link && (
                  <div style={{ marginTop: "1rem" }}>
                    <a href={exp.link} className="contact__link" target="_blank" rel="noopener noreferrer">
                      → Voir le projet →
                    </a>
                  </div>
                )}
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
              Keen to connect with researchers, data scientists, and developers passionate about 
              AI, predictive analytics, and healthcare transformation. Let's talk!
            </p>
            {[
              { icon: "✉", label: "Email", val: "rayenbenyoussef815@gmail.com", href: "mailto:rayenbenyoussef815@gmail.com" },
              { icon: "📞", label: "Téléphone", val: "+216 52 925 815", href: "tel:+21652925815" },
              { icon: "📍", label: "Adresse", val: "Rafraf 7015, Bizerte" },
              { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/rayen-ben-youssef", href: "https://linkedin.com/in/rayen-ben-youssef-a7b727361" },
              { icon: "🔗", label: "GitHub", val: "github.com/rayenbenyoussef", href: "https://github.com/rayenbenyoussef" },
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
              "Innovate. Analyze. Predict. — Building the scaffolding to turn raw data 
              into strategic insights, with a dream of transforming healthcare."
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
