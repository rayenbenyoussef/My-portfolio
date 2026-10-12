import { useState } from "react";
import { profile, pipelineStages, projects, skills, softSkills, languages, education, certs, interests } from "./data";

function Slot({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`slot ${className}`}>
      {ok ? (
        <img src={src} alt={label} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="slot-empty">
          <span>Add a screenshot</span>
          <code>public{src}</code>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="top">
        <a className="brand" href="#top">RBY</a>
        <nav aria-label="Sections">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="layout" id="top">
        <main>
          <section className="hero">
            <p className="role">{profile.role}</p>
            <h1>{profile.name}</h1>
            <p className="lead">{profile.intro}</p>
            <ol className="pipeline" aria-label="Data pipeline from extraction to dashboard">
              {pipelineStages.map((s) => (
                <li key={s}>{s}</li>
              ))}
              <span className="packet" aria-hidden="true" />
            </ol>
            <p className="avail">{profile.availability}</p>
          </section>

          <section id="about" className="block">
            <h2>Profile</h2>
            <p className="prose">{profile.about}</p>
          </section>

          <section id="projects" className="block">
            <h2>Projects</h2>
            {projects.map((p) => (
              <article className="project" key={p.title}>
                <div className="gallery">
                  <Slot src={p.images[0]} label={`${p.title} main screenshot`} className="big" />
                  <Slot src={p.images[1]} label={`${p.title} screenshot 2`} />
                  <Slot src={p.images[2]} label={`${p.title} screenshot 3`} />
                </div>
                <div className="pbody">
                  <div className="phead">
                    <h3>{p.title}</h3>
                    <span className="badge">{p.duration}</span>
                  </div>
                  <p className="kind">{p.kind}</p>
                  <p className="period">{p.period}</p>
                  <ul>
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ul className="tags" aria-label="Tech stack">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="link" href={p.github} target="_blank" rel="noreferrer">View on GitHub</a>
                </div>
              </article>
            ))}
          </section>

          <section id="skills" className="block">
            <h2>Skills</h2>
            <ul className="chips">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3 className="sub">Soft skills</h3>
            <ul className="chips soft">
              {softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section id="education" className="block">
            <h2>Education</h2>
            <p className="period">{education.period}</p>
            <p className="edu-school">{education.school}</p>
            <p className="prose">{education.degree}, {education.place}</p>

            <h3 className="sub">Languages</h3>
            <div className="langs">
              {languages.map((l) => (
                <div key={l.name} className="lang">
                  <div className="lang-row"><strong>{l.name}</strong><span>{l.level}</span></div>
                  <div className="bar" role="img" aria-label={`${l.name}: ${l.level}`}><i style={{ width: `${l.pct}%` }} /></div>
                </div>
              ))}
            </div>

            <h3 className="sub">Certifications & achievements</h3>
            {certs.map((c) => (
              <div key={c.issuer} className="cert">
                <strong>{c.issuer}</strong>
                <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </section>
        </main>

        <aside id="contact">
          <div className="portrait">
            <Slot src={profile.photo} label={`Portrait of ${profile.name}`} className="photo" />
          </div>
          <ul className="contact">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            <li>{profile.location}</li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
          <h3 className="sub">Interests</h3>
          <ul className="plain">{interests.map((i) => <li key={i}>{i}</li>)}</ul>
        </aside>
      </div>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
