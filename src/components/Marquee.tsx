import { useLayoutEffect, useRef } from "react"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { marqueeRows } from "@/data/content"

const STYLES = ["display", "outline-text display", "font-normal tracking-[-0.04em]"]

/**
 * Filas de palabras que se desplazan con el scroll y se pliegan en X al
 * entrar/salir del viewport (como el video scroll-26).
 */
export function Marquee() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const dir = i % 2 ? 1 : -1
        gsap.fromTo(
          row.querySelector("[data-track]"),
          { xPercent: dir < 0 ? 0 : -25 },
          {
            xPercent: dir < 0 ? -25 : 0,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          },
        )
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          })
          .fromTo(row, { rotateX: -75, opacity: 0.2 }, { rotateX: 0, opacity: 1, ease: "power2.out" })
          .to(row, { rotateX: 75, opacity: 0.2, ease: "power2.in" })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-label="Principles" className="relative overflow-hidden py-24 [perspective:900px]">
      {marqueeRows.map((words, r) => {
        // se repite la fila para que nunca quede hueco al desplazarse
        const line = Array.from({ length: 4 }, () => words).flat()
        return (
          <div key={r} data-row className="relative border-t border-line [transform-style:preserve-3d] last:border-b">
            <span className="mono absolute left-[var(--frame)] top-2 z-10 text-[10px] text-muted">
              R{String(r + 1).padStart(2, "0")}
            </span>
            <div
              data-track
              className="flex w-max items-center gap-[0.35em] whitespace-nowrap py-2 text-[clamp(52px,9vw,150px)] leading-[1]"
            >
              {line.map((w, i) => (
                <span key={i} className={STYLES[(i + r) % STYLES.length]}>
                  {w}
                  <span className="mx-[0.2em] align-middle text-[0.3em] text-accent">◆</span>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
