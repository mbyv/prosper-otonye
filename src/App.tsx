import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Reveal, SectionTitle, useScrollInput } from './components/ui'
import { education, experience, profile, projects, skillGroups, stats, type Project } from './data'

const Scene = lazy(() => import('./components/Scene'))

function useTyping(words: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    let w = 0, i = 0, deleting = false
    let timer: number
    const tick = () => {
      const word = words[w]
      i += deleting ? -1 : 1
      setText(word.slice(0, i))
      let delay = deleting ? 35 : 70
      if (!deleting && i === word.length) { deleting = true; delay = 1800 }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300 }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])
  return text
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const onLeave = () => {
    ref.current!.style.setProperty('--rx', '0deg')
    ref.current!.style.setProperty('--ry', '0deg')
  }
  return (
    <Reveal delay={(i % 3) * 90} className={p.featured ? 'featured' : ''}>
      <article ref={ref} className="card project" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="project-top">
          <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
          {p.featured && <span className="pill live">● Featured</span>}
        </div>
        <h3>{p.title}</h3>
        <p className="mono accent small">{p.tagline}</p>
        <p className="muted">{p.description}</p>
        <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="links">
          {p.caseStudy && <a className="case-link" href={p.caseStudy}>Read case study →</a>}
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site ↗</a>}
          {p.github && <a href={p.github} target="_blank" rel="noreferrer">Source code ↗</a>}
        </div>
      </article>
    </Reveal>
  )
}

export default function App() {
  const typed = useTyping(profile.roles)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const progressRef = useScrollInput()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { window.location.href = `mailto:${profile.email}` }
  }

  const nav = [['about', 'About'], ['skills', 'Skills'], ['work', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']]

  return (
    <>
      <div className="bg-gradient" aria-hidden />
      <Suspense fallback={null}><Scene /></Suspense>
      <div className="grain" aria-hidden />
      <div className="progress" ref={progressRef} aria-hidden />

      <header className="nav">
        <a href="#top" className="logo mono">&lt;PO /&gt;</a>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          {nav.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span className="mono accent">0{i + 1}.</span> {label}
            </a>
          ))}
          <a className="btn small" href={profile.cv} target="_blank" rel="noreferrer">Résumé</a>
          <a className="btn small primary" href={`mailto:${profile.email}?subject=Let's%20talk%20%E2%80%94%20opportunity%20for%20Prosper`}>Say hello ✉</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <p className="pill status"><span className="dot" /> {profile.availability}</p>
            <p className="mono accent hello">Hi, I'm</p>
            <h1 className="glitch" data-text={profile.name}>{profile.name}</h1>
            <p className="typed">
              <span className="mono muted">&gt; </span>{typed}<span className="caret">▍</span>
            </p>
            <p className="lead muted">
              <strong>6+ years</strong> turning ideas into fast, production-grade web apps. I work across the whole
              stack (React, Next.js, Vue, Node.js, Python/Django and Postgres) and I've founded, built and launched{' '}
              <strong>two live products</strong> on my own. Give me a problem and I'll ship the solution.
            </p>
            <div className="cta">
              <a className="btn primary" href="#work">View my work</a>
              <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">Download CV</a>
              <a className="btn ghost" href={`mailto:${profile.email}?subject=Let's%20talk%20%E2%80%94%20opportunity%20for%20Prosper`}>Say hello ✉</a>
            </div>
            <div className="socials mono">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
          <a href="#about" className="scroll-cue mono" aria-label="Scroll down">scroll<span /></a>
        </section>

        {/* ABOUT */}
        <section id="about">
          <SectionTitle index="01." title="About me" />
          <div className="about-grid">
            <Reveal>
              <div className="card glass">
                <p>{profile.summary}</p>
                <p className="muted">
                  As founder of <strong>D4TF Connect</strong>, I've owned everything from data modelling and auth to deployment and
                  go-to-market — including a full pivot driven by user feedback. On <strong>ApplyFlow AI</strong>, I apply
                  senior-level discipline solo: architecture decision records, CI/CD, pre-commit checks and end-to-end tests.
                </p>
                <p className="muted">
                  What you get: an engineer who has worked with clients, startups and an agency, and as a founder, who understands
                  the product as well as the code, and who doesn't need hand-holding to ship. Based in {profile.location},
                  open to <strong>full-time</strong> front-end, back-end and full-stack roles.
                </p>
              </div>
            </Reveal>
            <div className="stats">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="card stat">
                    <span className="stat-value">{s.value}</span>
                    <span className="muted small">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <SectionTitle index="02." title="Tech stack" />
          <div className="skills-grid">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 90}>
                <div className="card glass skill-card">
                  <h3><span className="mono accent">{'//'}</span> {g.title}</h3>
                  <ul className="tags big">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work">
          <SectionTitle index="03." title="Things I've built" />
          <div className="projects-grid">
            {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <SectionTitle index="04." title="Experience" />
          <ol className="timeline">
            {experience.map((e, i) => (
              <li key={e.role + e.company}>
                <Reveal delay={i * 60}>
                  <div className="card glass">
                    <div className="exp-head">
                      <div>
                        <h3>{e.role}</h3>
                        <p className="accent">{e.company}</p>
                      </div>
                      <span className="mono muted small">{e.period}</span>
                    </div>
                    <ul className="points">{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <div className="edu">
              {education.map((ed) => (
                <div key={ed.title} className="card glass small-card">
                  <h3>{ed.title}</h3>
                  <p className="muted small">{ed.place} · <span className="mono">{ed.period}</span></p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <Reveal>
            <p className="mono accent">05. What's next?</p>
            <h2 className="contact-title">Got a product to ship?<br /><span className="gradient-text">Let's make it happen.</span></h2>
            <p className="muted lead center">
              I'm ready for my next full-time role, front-end, back-end or full-stack. If your team builds with React,
              Next.js, Vue, Node.js, Django or Postgres, I can add value from week one. My inbox is open and I reply fast.
            </p>
            <a className="email-big mono" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="cta center">
              <a className="btn primary big" href={`mailto:${profile.email}?subject=Let's%20talk%20%E2%80%94%20opportunity%20for%20Prosper`}>Say hello ✉</a>
              <button className="btn big" onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy email'}</button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer mono muted small">
        <span>Designed & built by {profile.name} · React · Three.js · WebGL shaders</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
