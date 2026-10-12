import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Skills", "Experience", "Education", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const projects = [
    {
      title: "Medical Data Quality Pipeline",
      subtitle: "Personal Project - Medical Data Quality Pipeline - Data Engineering & Data Science",
      location: "Tunis",
      dates: "05/2026 – 07/2026",
      bullets: [
        "Built an end-to-end ELT pipeline on real-world healthcare data (MIMIC-IV) using Python, Airflow, dbt, PostgreSQL and Docker.",
        "Created Grafana monitoring dashboards and a Logistic Regression prototype for emergency admission prediction.",
      ],
      tech: ["Python", "Airflow", "dbt", "Docker", "PostgreSQL"],
      link: "https://github.com/rayenbenyoussef/Medical_data_quality_pipeline"
    },
    {
      title: "FSEGT - Scrum Master & Java Developer",
      subtitle: "Team Project - FSEGT - Scrum Master & Java Developer",
      location: "Tunis",
      dates: "04/2026",
      bullets: [
        "Led an Agile team as Scrum Master (task tracking, sprint coordination) while developing Java features.",
      ],
      tech: ["Java", "Scrum", "Team Lead"],
      link: "https://github.com/rayenbenyoussef/GymFlow_Agile_2025"
    },
    {
      title: "Clubio App",
      subtitle: "Personal Project - Clubio - Android & PHP Club Management App",
      location: "Tunis",
      dates: "2026",
      bullets: [
        "Designed and built an Android prototype (Java/XML) with member, moderator and admin roles, event registration and dashboards.",
        "Developed the PHP web admin interface.",
      ],
      tech: ["Java", "PHP", "Android"],
      link: "https://github.com/rayenbenyoussef/Clubio_app"
    }
  ];

  const skills = [
    "Python (Pandas, NumPy, Scikit-learn)",
    "SQL (PostgreSQL, PL/SQL)",
    "ETL / ELT & Data Warehousing",
    "Data Pipelines: Airflow, dbt",
    "Data Analysis & Data Modeling",
    "Machine Learning",
    "Data Visualization (Power BI, Grafana)",
    "Git & GitHub",
    "Java, C, PHP",
    "Android Development (Java/XML)",
    "Agile / Scrum"
  ];

  const softSkills = [
    "Problem Solving",
    "Attention to Detail",
    "Autonomy & Organization",
    "Analytical Thinking",
    "Teamwork"
  ];

  const languages = [
    { name: "Arabic", level: "Native", pct: 100 },
    { name: "French", level: "Intermediate", pct: 70 },
    { name: "English", level: "Intermediate", pct: 70 },
    { name: "German", level: "Beginner", pct: 30 }
  ];

  const interests = ["Active member of JCI Rafraf (2 years)", "Active member of NEXUS FSEGT (1 year)", "Volleyball"];

  const certs = [
    "DataCamp: Intermediate Python (Jan 2026)",
    "DataCamp: Data Manipulation with pandas (Feb 2026)",
    "JCI Rafraf: Best Content Creator of the Year 2025"
  ];

  const sectionContent = {
    name: "Rayen Ben youssef",
    title: "Data Science & Business Intelligence Student",
    headline: "Business Computing student at FSEGT, specialized in Data Science, Business Intelligence and data analytics. I build data pipelines and predictive models from raw data to dashboards.",
    photo: "/photo.jpg",
    email: "rayenbenyoussef815@gmail.com",
    phone: "+216 52 925 815",
    location: "Tunis, Tunisia",
    linkedin: "https://linkedin.com/in/rayen-ben-youssef-a7b727361",
    github: "https://github.com/rayenbenyoussef"
  };

  return (
    <div className="app-shell">
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => scrollTo("hero")}>RB</div>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {NAV_LINKS.map(item => (
            <li key={item}><button onClick={() => scrollTo(item)}>{item}</button></li>
          ))}
        </ul>
        <button className="nav__burger" aria-label="Menu" onClick={() => setMenuOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </nav>

      <main className="cv-page">
        <div className="main-column">
          <header id="hero" className="hero-header">
            <div className="title-block">
              <h1>{sectionContent.name}</h1>
              <p className="subtitle">{sectionContent.title}</p>
            </div>
            <div className="profile-photo">
              <img src={sectionContent.photo} alt={sectionContent.name} onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("profile-photo--placeholder");
              }} />
              <div className="profile-photo__fallback">RB</div>
            </div>
          </header>

          <Section id="about" className="profile-section">
            <h2>Profile</h2>
            <p>
              Business Computing student at FSEGT, specialized in Data Science, Business Intelligence and data analytics.
              I build data pipelines and predictive models from raw data to dashboards, with hands-on experience in ELT/ETL,
              data quality, data warehousing and Machine Learning (Python, SQL, Airflow, dbt, Power BI).
            </p>
            <p>
              I am interested in applying data to healthcare, business and finance. Detail-oriented, autonomous and analytical,
              I'm looking for a graduation internship (PFE) from February 1 to May 30, 2027.
            </p>
          </Section>

          <Section id="projects" className="profile-section">
            <h2>Projects</h2>
            {projects.map((project, index) => (
              <article key={index} className="project-row">
                <div className="project-copy">
                  <div className="project-header-line">
                    <span className="project-title">{project.title}</span>
                    <span className="project-badge">{project.tech[0]}</span>
                  </div>
                  <div className="project-meta">{project.location} · {project.dates}</div>
                  <ul>
                    {project.bullets.map((bullet, idx) => <li key={idx}>{bullet}</li>)}
                  </ul>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                </div>
                <div className="project-image">
                  <span className="project-image__placeholder">Project Photo</span>
                </div>
              </article>
            ))}
          </Section>

          <Section id="education" className="profile-section">
            <h2>Education</h2>
            <div className="education-row">
              <span className="dates">09/2024 – Present</span>
              <div>
                <p className="institution">Faculty of Economics and Management of Tunis (FSEGT)</p>
                <p className="degree">Bachelor's Degree in Business Computing</p>
              </div>
            </div>
          </Section>

          <Section id="languages" className="profile-section">
            <h2>Languages</h2>
            <div className="language-grid">
              {languages.map(lang => (
                <div key={lang.name} className="language-item">
                  <div className="language-row">
                    <span>{lang.name}</span>
                    <span className="language-level">{lang.level}</span>
                  </div>
                  <div className="prog-bar"><span style={{ width: `${lang.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="sidebar-column">
          <div className="profile-card">
            <div className="profile-photo profile-photo--sidebar">
              <img src={sectionContent.photo} alt={sectionContent.name} onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("profile-photo--placeholder");
              }} />
              <div className="profile-photo__fallback">RB</div>
            </div>

            <div className="sidebar-info">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href={`mailto:${sectionContent.email}`}>{sectionContent.email}</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <a href={`tel:${sectionContent.phone.replace(/\s+/g, "")}`}>{sectionContent.phone}</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span>{sectionContent.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <a href={sectionContent.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/rayen-ben-youssef</a>
              </div>
            </div>

            <div className="sidebar-block">
              <h3>Technical skills</h3>
              <ul>
                {skills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>

            <div className="sidebar-block">
              <h3>Soft skills</h3>
              <ul>
                {softSkills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>

            <div className="sidebar-block">
              <h3>Interests</h3>
              <ul>
                {interests.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="sidebar-block">
              <h3>Certifications & Achievements</h3>
              <ul>
                {certs.map(cert => <li key={cert}>{cert}</li>)}
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
