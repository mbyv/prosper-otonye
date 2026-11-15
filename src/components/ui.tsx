import { useEffect, useRef, type ReactNode } from 'react'
import { input } from '../input'

/** Feeds scroll + pointer position into the 3D scene and drives the top progress bar. */
export function useScrollInput() {
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
  return progressRef
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
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

export function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <h2 className="section-title">
        <span className="mono accent">{index}</span> {title}
        <span className="line" />
      </h2>
    </Reveal>
  )
}

