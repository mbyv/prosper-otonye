import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { input } from './input'
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

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <h2 className="section-title">
        <span className="mono accent">{index}</span> {title}
        <span className="line" />
      </h2>
    </Reveal>
  )
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
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      input.scroll = max > 0 ? window.scrollY / max : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${input.scroll})`)
    }
    const onMove = (e: PointerEvent) => {
      input.mx = (e.clientX / window.innerWidth) * 2 - 1
      input.my = (e.clientY / window.innerHeight) * 2 - 1
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

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
              I build and ship production web apps end-to-end — from Postgres schema to polished UI — with React, Next.js,
              TypeScript and Node.js. Currently running two live products I built solo.
            </p>
            <div className="cta">
              <a className="btn primary" href="#work">View my work</a>
              <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">Download CV</a>
              <a className="btn ghost" href="#contact">Hire me →</a>
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
                  I'm based in {profile.location} and actively looking for a <strong>full-time role in Canada</strong>. I'm
                  relocation-ready and can start quickly.
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
            <h2 className="contact-title">Let's build something<br /><span className="gradient-text">great together.</span></h2>
            <p className="muted lead center">
              I'm looking for a full-time front-end, back-end or full-stack role in Canada, and I'm open to visa sponsorship
              and relocation. If your team ships with React, Next.js, Node.js or Postgres, I'd love to talk.
            </p>
            <div className="cta center">
              <a className="btn primary big" href={`mailto:${profile.email}?subject=Opportunity%20for%20Prosper`}>Say hello ✉</a>
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
