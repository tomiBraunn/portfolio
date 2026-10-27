import { useEffect, useRef } from "react"

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0")

// Ruido para el grano (mismo efecto que el mesh gradient del Figma)
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

/**
 * Capa fija de "andamiaje": columnas de la grilla, crosshair con coordenadas,
 * guías al hacer hover sobre [data-guide] y grano. Todo se actualiza por refs
 * en un solo loop, sin re-renders.
 */
export function Frame() {
  const crossX = useRef<HTMLDivElement>(null)
  const crossY = useRef<HTMLDivElement>(null)
  const coords = useRef<HTMLDivElement>(null)
  const guide = useRef<HTMLDivElement>(null)
  const guideLabel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const mouse = { x: -100, y: -100 }
    let target: HTMLElement | null = null
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      target = (e.target as HTMLElement).closest?.("[data-guide]") as HTMLElement | null
    }

    const loop = () => {
      if (crossX.current && crossY.current && coords.current) {
        crossX.current.style.transform = `translateY(${mouse.y}px)`
        crossY.current.style.transform = `translateX(${mouse.x}px)`
        coords.current.style.transform = `translate(${mouse.x + 12}px, ${mouse.y + 12}px)`
        coords.current.textContent = `x ${pad(mouse.x)}  y ${pad(mouse.y + window.scrollY)}`
      }
      const g = guide.current
      if (g) {
        if (target && target.isConnected) {
          const r = target.getBoundingClientRect()
          g.style.opacity = "1"
          g.style.setProperty("--l", `${r.left}px`)
          g.style.setProperty("--t", `${r.top}px`)
          g.style.setProperty("--w", `${r.width}px`)
          g.style.setProperty("--h", `${r.height}px`)
          if (guideLabel.current) {
            const name = target.dataset.guide
            guideLabel.current.textContent = `${name ? name + " · " : ""}${Math.round(r.width)} × ${Math.round(r.height)}`
          }
        } else {
          g.style.opacity = "0"
        }
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {/* columnas de la grilla de 12 */}
      <div className="frame-x absolute inset-0 hidden md:block">
        <div className="grid h-full grid-cols-12 gap-[var(--gutter)]">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="border-x border-white/[0.035]" />
          ))}
        </div>
      </div>

      {/* crosshair */}
      <div ref={crossX} className="absolute inset-x-0 top-0 hidden h-px bg-white/15 [@media(pointer:fine)]:block" />
      <div ref={crossY} className="absolute inset-y-0 left-0 hidden w-px bg-white/15 [@media(pointer:fine)]:block" />
      <div
        ref={coords}
        className="mono absolute left-0 top-0 hidden whitespace-pre text-[10px] text-white/55 [@media(pointer:fine)]:block"
      />

      {/* guía del elemento bajo el cursor */}
      <div ref={guide} className="absolute inset-0 opacity-0 transition-opacity duration-200">
        <span className="absolute inset-x-0 h-px bg-accent/40" style={{ top: "var(--t)" }} />
        <span className="absolute inset-x-0 h-px bg-accent/40" style={{ top: "calc(var(--t) + var(--h))" }} />
        <span className="absolute inset-y-0 w-px bg-accent/40" style={{ left: "var(--l)" }} />
        <span className="absolute inset-y-0 w-px bg-accent/40" style={{ left: "calc(var(--l) + var(--w))" }} />
        <span
          className="absolute border border-accent"
          style={{ left: "var(--l)", top: "var(--t)", width: "var(--w)", height: "var(--h)" }}
        />
        <span
          ref={guideLabel}
          className="mono absolute whitespace-nowrap bg-accent px-1.5 py-0.5 text-[10px] text-ink"
          style={{ left: "var(--l)", top: "calc(var(--t) + var(--h) + 6px)" }}
        />
      </div>

      {/* grano */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
    </div>
  )
}
