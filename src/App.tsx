import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./App.css";

/* ===== CONTENT (from the CV) ===== */
const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Contact"];

const PROJECTS = [
  {
    role: "Medical Data Quality Pipeline",
    type: "Personal project · Data Engineering & Data Science",
    period: "05/2026 – 07/2026",
    duration: "2 months",
    location: "Tunis",
    bullets: [
      "Built an end-to-end ELT pipeline on real-world healthcare data (MIMIC-IV-ED) using Python, Airflow, dbt, PostgreSQL and Docker, with 166 automated data quality tests.",
      "Created Grafana monitoring dashboards and a Logistic Regression prototype for emergency admission prediction.",
    ],
    tags: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker", "Grafana", "Scikit-learn"],
    link: "https://github.com/rayenbenyoussef/Medical_data_quality_pipeline",
    images: ["/projects/medical-1.png", "/projects/medical-2.png", "/projects/medical-3.png"],
  },
  {
    role: "Clubiqo",
    type: "Personal project · Android & PHP club management app",
    period: "2026",
    duration: "2 months",
    location: "Tunis",
    bullets: [
      "Designed and built an Android prototype (Java/XML) with member, moderator and admin roles, event registration and dashboards, based on UML 2.0 diagrams.",
      "Developed the PHP web admin interface.",
    ],
    tags: ["Java", "XML", "PHP", "UML 2.0", "Android"],
    link: "https://github.com/rayenbenyoussef/Clubiqo_app",
    images: ["/projects/clubiqo-1.png", "/projects/clubiqo-2.png", "/projects/clubiqo-3.png"],
  },
  {
    role: "GymFlow",
    type: "Team project · FSEGT · Scrum Master & Java Developer",
    period: "04/2026",
    duration: "2 weeks",
    location: "Tunis",
    bullets: ["Led an Agile team as Scrum Master (task tracking, sprint coordination) while developing Java features."],
    tags: ["Java", "Agile / Scrum", "Git & GitHub"],
    link: "https://github.com/rayenbenyoussef/GymFlow_Agl_ds_main",
    images: ["/projects/gymflow-1.png", "/projects/gymflow-2.png", "/projects/gymflow-3.png"],
  },
];

const SKILL_GROUPS = [
  { title: "Data & Machine Learning", items: ["Python (Pandas, NumPy, Scikit-learn)", "SQL (PostgreSQL, PL/SQL)", "Machine Learning", "Data Analysis & Data Modeling"] },
  { title: "Pipelines & Warehousing", items: ["ETL/ELT & Data Warehousing", "Airflow", "dbt", "Docker"] },
  { title: "Visualization & Tooling", items: ["Power BI", "Grafana", "Git & GitHub"] },
  { title: "Software Engineering", items: ["Java, C, PHP", "Android (Java/XML)", "UML", "Agile / Scrum"] },
];

const SOFT_SKILLS = ["Problem Solving", "Attention to Detail", "Autonomy & Organization", "Analytical Thinking", "Teamwork"];
const LANGS = [
  { lang: "Arabic", level: "Native", pct: 100 },
  { lang: "French", level: "Intermediate", pct: 70 },
  { lang: "English", level: "Intermediate", pct: 65 },
  { lang: "German", level: "Beginner", pct: 20 },
];
const CERTS = [
  { org: "DataCamp", name: "Intermediate Python", date: "Jan 2026" },
  { org: "DataCamp", name: "Data Manipulation with pandas", date: "Feb 2026" },
  { org: "JCI Rafraf", name: "Best Content Creator of the Year 2025", date: "2025" },
];
const INTERESTS = ["Healthcare & Data", "Business & Finance", "JCI Rafraf (2 years)", "NEXUS FSEGT (1 year)", "Volleyball"];
const CONTACTS = [
  { icon: "✉", label: "Email", val: "rayen.benyoussef@etudiant-fsegt.utm.tn", href: "mailto:rayen.benyoussef@etudiant-fsegt.utm.tn" },
  { icon: "📞", label: "Phone", val: "+216 52 925 815", href: "tel:+21652925815" },
  { icon: "📍", label: "Location", val: "Tunis, Tunisia" },
  { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/rayen-ben-youssef", href: "https://linkedin.com/in/rayen-ben-youssef-a7b727361" },
  { icon: "🔗", label: "GitHub", val: "github.com/rayenbenyoussef", href: "https://github.com/rayenbenyoussef" },
];

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

function Slot({ src, label, big = false }: { src: string; label: string; big?: boolean }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`slot ${big ? "slot--big" : ""}`}>
      {ok ? (
        <img src={src} alt={label} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="slot__empty"><span>Add a screenshot</span><code>public{src}</code></div>
      )}
    </div>
  );
}

const Bar = ({ pct }: { pct: number }) => ({ "--w": `${pct}%` } as CSSProperties);

/* ===== APP ===== */
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
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => scrollTo("hero")}>RB</div>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {NAV_LINKS.map((l) => (<li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>))}
        </ul>
        <button className="nav__burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu"><span /><span /><span /></button>
      </nav>

      <section id="hero" className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" /><div className="hero__orb hero__orb--2" /><div className="hero__grid" />
        </div>
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
            <p className="hero__eyebrow">Hello, I'm</p>
            <h1 className="hero__name">Rayen Ben Youssef</h1>
            <h2 className="hero__title">Data Science & Business Intelligence Student</h2>
            <p className="hero__tagline">
              I build data pipelines and predictive models, from raw data to dashboards.
              Looking for a graduation internship (PFE) from February 1 to May 30, 2027.
            </p>
            <div className="hero__ctas">
              <button className="btn btn--primary" onClick={() => scrollTo("Contact")}>Contact me</button>
              <button className="btn btn--ghost" onClick={() => scrollTo("Projects")}>See my projects</button>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint"><span>Scroll</span><div className="hero__scroll-line" /></div>
      </section>

      <Section id="about">
        <div className="about__inner">
          <div className="section__label">01 — Profile</div>
          <h2 className="section__heading">About me</h2>
          <div className="about__grid">
            <div className="about__text">
              <p>
                Business Computing student at FSEGT, specialized in <strong>Data Science, Business Intelligence</strong> and data analytics.
                I build data pipelines and predictive models, from raw data to dashboards.
              </p>
              <p>
                I have hands-on experience in <strong>ELT/ETL, data quality, data warehousing and Machine Learning</strong> (Python, SQL, Airflow, dbt, Power BI).
                I'm interested in applying data to <strong>healthcare, business and finance</strong>.
              </p>
              <p>Detail-oriented, autonomous and analytical.</p>
            </div>
            <div className="about__stats">
              {[{ n: "3", label: "Projects built" }, { n: "166", label: "Automated data quality tests" }, { n: "2", label: "DataCamp certificates" }].map((s) => (
                <div key={s.label} className="about__stat"><span className="about__stat-n">{s.n}</span><span className="about__stat-l">{s.label}</span></div>
              ))}
            </div>
          </div>
          <div className="about__interests">{INTERESTS.map((i) => (<span key={i} className="tag">{i}</span>))}</div>
        </div>
      </Section>

      <Section id="skills" className="section--alt">
        <div className="section__label">02 — Skills</div>
        <h2 className="section__heading">What I work with</h2>
        <div className="skills__grid">
          <div className="skills__group">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title}>
                <h3 className="skills__group-title">{g.title}</h3>
                <div className="skills__tags">{g.items.map((i) => (<span key={i} className="tag">{i}</span>))}</div>
              </div>
            ))}
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Soft skills</h3>
            <div className="soft-skills">{SOFT_SKILLS.map((s) => (<div key={s} className="soft-skill">{s}</div>))}</div>
            <h3 className="skills__group-title" style={{ marginTop: "2rem" }}>Languages</h3>
            <div className="langs">
              {LANGS.map((l) => (
                <div key={l.lang} className="lang-item">
                  <div className="lang-item__header"><span className="lang-item__name">{l.lang}</span><span className="lang-item__level">{l.level}</span></div>
                  <div className="lang-item__bar"><div className="lang-item__fill" style={Bar({ pct: l.pct })} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="section__label">03 — Projects</div>
        <h2 className="section__heading">Things I've built</h2>
        <div className="timeline">
          {PROJECTS.map((p) => (
            <div key={p.role} className="timeline__item">
              <div className="timeline__marker"><div className="timeline__dot" /><div className="timeline__line" /></div>
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <p className="timeline__type">{p.type}</p>
                    <h3 className="timeline__role">{p.role}</h3>
                    <p className="timeline__meta">{p.location} · {p.period}</p>
                  </div>
                  <span className="timeline__duration">{p.duration}</span>
                </div>
                <div className="proj-gallery">
                  <Slot big src={p.images[0]} label={`${p.role} main screenshot`} />
                  <Slot src={p.images[1]} label={`${p.role} screenshot 2`} />
                  <Slot src={p.images[2]} label={`${p.role} screenshot 3`} />
                </div>
                <ul className="timeline__bullets">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="timeline__tags">{p.tags.map((t) => <span key={t} className="tag tag--sm">{t}</span>)}</div>
                <div style={{ marginTop: "1rem" }}>
                  <a href={p.link} className="contact__link" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education" className="section--alt">
        <div className="section__label">04 — Education</div>
        <h2 className="section__heading">Academic path</h2>
        <div className="edu__grid">
          <div className="edu__card edu__card--main">
            <div className="edu__icon">🎓</div>
            <div>
              <p className="edu__school">Faculty of Economics and Management of Tunis (FSEGT)</p>
              <h3 className="edu__degree">Bachelor's Degree in Business Computing</h3>
              <p className="edu__period">09/2024 – Present · Tunis</p>
            </div>
          </div>
          <div className="edu__certs">
            <h3 className="edu__certs-title">Certifications & achievements</h3>
            {CERTS.map((c) => (
              <div key={c.name} className="cert"><span className="cert__org">{c.org}</span><span className="cert__name">{c.name}</span><span className="cert__date">{c.date}</span></div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="section__label">05 — Contact</div>
        <h2 className="section__heading">Let's work together</h2>
        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">I'm looking for a graduation internship (PFE) from February 1 to May 30, 2027. Get in touch if you have a data project in healthcare, business or finance.</p>
            {CONTACTS.map((c) => (
              <div key={c.label} className="contact__item">
                <span className="contact__icon">{c.icon}</span>
                <div>
                  <p className="contact__item-label">{c.label}</p>
                  {c.href ? <a href={c.href} className="contact__item-val contact__link">{c.val}</a> : <p className="contact__item-val">{c.val}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="contact__card">
            <p className="contact__card-text">"Innovate. Analyze. Predict. — Building the scaffolding to turn raw data into strategic insights."</p>
            <div className="contact__card-sig">— Rayen Ben Youssef</div>
          </div>
        </div>
      </Section>

      <footer className="footer"><p>© 2026 Rayen Ben Youssef</p></footer>
    </div>
  );
}
