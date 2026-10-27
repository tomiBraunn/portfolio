import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { hero, site } from "@/data/content"
import { STRIP_STEPS } from "@/lib/brand"
import { LOGO, LOGO_TRACKING, loadLogoFont, logoFont } from "./Wordmark"

// Lámina de construcción del logo. Todo se mide de la fuente real a F px,
// así las guías caen exactamente sobre las letras.
const F = 200
const P = 34 // aire alrededor del texto, en unidades del SVG
const PB = 76 // aire de abajo: ahí van la tira y la numeración
const STRIP_GAP = 0.1 * F // mismas proporciones que <Wordmark>: 0.1em de aire, 0.09em de alto
const STRIP_H = 0.09 * F
const GRID = 20
const SLANT = 12 // ° de la itálica (guías de inclinación)
const FAR = 6000 // las líneas de métrica cruzan todo el hero
const LABEL = { fontFamily: "JetBrains Mono, monospace", fontSize: 9 }

type Metrics = { left: number; right: number; asc: number; desc: number; xh: number; advances: number[] }

function measure(): Metrics {
  const ctx = document.createElement("canvas").getContext("2d")!
  ctx.font = logoFont(F)
  ctx.letterSpacing = `${LOGO_TRACKING * F}px`
  const m = ctx.measureText(LOGO)
  const advances = [...LOGO].map((_, i) => ctx.measureText(LOGO.slice(0, i)).width)
  return {
    left: m.actualBoundingBoxLeft,
    right: m.actualBoundingBoxRight,
    asc: m.actualBoundingBoxAscent,
    desc: m.actualBoundingBoxDescent,
    xh: ctx.measureText("x").actualBoundingBoxAscent,
    advances,
  }
}

function LogoSheet({ m }: { m: Metrics }) {
  const x0 = -m.left - P
  const y0 = -m.asc - P
  const w = m.left + m.right + P * 2
  const h = m.asc + m.desc + P + PB
  const tan = Math.tan((SLANT * Math.PI) / 180)
  const metrics = [
    { y: -m.asc, label: "ascender" },
    { y: -m.xh, label: "x-height" },
    { y: 0, label: "baseline" },
  ]
  const box = { l: -m.left, r: m.right, t: -m.asc, b: m.desc }
  const stripY = box.b + STRIP_GAP
  const stripW = (box.r - box.l) / STRIP_STEPS.length
  const below = stripY + STRIP_H // la numeración va debajo de la tira

  return (
    <svg viewBox={`${x0} ${y0} ${w} ${h}`} className="block w-full overflow-visible text-foreground" aria-hidden data-guide="logo">
      <defs>
        <clipPath id="sheet-clip">
          <rect x={x0} y={y0} width={w} height={h} />
        </clipPath>
        <clipPath id="logo-wipe">
          <rect data-wipe x={x0} y={y0} width={w} height={h} />
        </clipPath>
      </defs>

      {/* grilla + guías de inclinación de la itálica */}
      <g data-sheet-grid clipPath="url(#sheet-clip)" stroke="white" strokeWidth={0.5}>
        <g strokeOpacity={0.1}>
          {Array.from({ length: Math.ceil(w / GRID) + 2 }, (_, i) => {
            const x = Math.floor(x0 / GRID) * GRID + i * GRID
            return <line key={`v${i}`} x1={x} x2={x} y1={y0} y2={y0 + h} />
          })}
          {Array.from({ length: Math.ceil(h / GRID) + 2 }, (_, i) => {
            const y = Math.floor(y0 / GRID) * GRID + i * GRID
            return <line key={`h${i}`} x1={x0} x2={x0 + w} y1={y} y2={y} />
          })}
        </g>
        <g strokeOpacity={0.22} strokeDasharray="4 5">
          {Array.from({ length: Math.ceil((w + h * tan) / (GRID * 3)) + 1 }, (_, i) => {
            const x = x0 - h * tan + i * GRID * 3
            return <line key={`s${i}`} x1={x} y1={y0 + h} x2={x + h * tan} y2={y0} />
          })}
        </g>
      </g>

      {/* métricas medidas de la fuente: cruzan todo el ancho */}
      <g stroke="var(--color-accent)" strokeOpacity={0.6} strokeWidth={0.8}>
        {metrics.map((l) => (
          <line key={l.label} data-sheet-metric x1={-FAR} x2={FAR} y1={l.y} y2={l.y} pathLength={1} strokeDasharray={1} />
        ))}
      </g>
      <g className="max-md:hidden" fill="var(--color-accent)" style={LABEL}>
        {metrics.map((l) => (
          <text key={l.label} data-sheet-label x={x0 + 4} y={l.y - 4}>
            {l.label} · {Math.round(-l.y)}
          </text>
        ))}
      </g>

      {/* el logo, revelado de izquierda a derecha */}
      <text
        x={0}
        y={0}
        className="logo-font"
        fontSize={F}
        fill="currentColor"
        clipPath="url(#logo-wipe)"
      >
        {LOGO}
      </text>

      {/* tira de 7 grises del ancho de la palabra */}
      <g stroke="rgba(255,255,255,.25)" strokeWidth={0.8}>
        {STRIP_STEPS.map((c, i) => (
          <rect key={c} data-sheet-strip x={box.l + i * stripW} y={stripY} width={stripW} height={STRIP_H} fill={c} stroke="none" />
        ))}
        <rect x={box.l} y={stripY} width={box.r - box.l} height={STRIP_H} fill="none" />
      </g>

      {/* caja de cada letra + número */}
      <g data-sheet-ticks stroke="var(--color-accent)" strokeOpacity={0.45} strokeWidth={0.6}>
        {m.advances.map((x, i) => (
          <line key={i} x1={x} x2={x} y1={below + 6} y2={below + 16} />
        ))}
      </g>
      <g data-sheet-ticks className="max-md:hidden" fill="var(--color-accent)" style={LABEL}>
        {m.advances.map((x, i) => (
          <text key={i} x={x + 3} y={below + 16}>
            {String(i + 1).padStart(2, "0")}
          </text>
        ))}
      </g>

      {/* cota del ancho + marcas de corte de la caja */}
      <g data-sheet-label stroke="var(--color-accent)" strokeWidth={0.8} fill="none">
        <path d={`M${box.l} ${box.t - 16} v8 M${box.r} ${box.t - 16} v8 M${box.l} ${box.t - 12} H${box.r}`} />
        {[
          [box.l, box.t, 1, 1],
          [box.r, box.t, -1, 1],
          [box.l, box.b, 1, -1],
          [box.r, box.b, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <path key={i} d={`M${x - sx * 14} ${y} h${sx * 8} M${x} ${y - sy * 14} v${sy * 8}`} />
        ))}
      </g>
      <text data-sheet-label className="max-md:hidden" x={(box.l + box.r) / 2} y={box.t - 18} textAnchor="middle" fill="var(--color-accent)" style={LABEL}>
        mikro super bold italic · {F}px · tracking −3% · slant {SLANT}°
      </text>
    </svg>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null)
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(() => {
    loadLogoFont().then(() => setMetrics(measure()))
  }, [])

  // Intro: grilla → métricas → el logo se revela → la tira se imprime → cajas y cotas.
  useLayoutEffect(() => {
    if (!ready || !metrics || reducedMotion || !section.current) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from("[data-sheet-grid]", { opacity: 0, duration: 0.8 })
        .from("[data-sheet-metric]", { strokeDashoffset: 1, duration: 1, stagger: 0.12, ease: "expo.inOut" }, 0.1)
        .from("[data-wipe]", { attr: { width: 0 }, duration: 1.1, ease: "expo.inOut" }, 0.45)
        .from("[data-sheet-strip]", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5, stagger: 0.06, ease: "power3.out" }, 1)
        .from("[data-sheet-label], [data-sheet-ticks]", { opacity: 0, duration: 0.5, stagger: 0.05 }, 1)
        .from("[data-hero-reveal]", { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, ease: "power3.out" }, 1.1)
    }, section)
    return () => ctx.revert()
  }, [ready, metrics])

  return (
    <section ref={section} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      {/* gradient de marca (Figma 1:20) + fundido al negro de la página */}
      <div className="absolute inset-0 bg-[url(/gradient-wide.webp)] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink" />

      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      {/* fila superior de metadatos, en la grilla de 12 */}
      <div className="frame-x absolute inset-x-0 top-[72px] z-10 grid grid-cols-12 gap-[var(--gutter)]">
        <p data-hero-reveal className="mono col-span-6 text-white/80 md:col-span-3">
          [00] Index
        </p>
        <p data-hero-reveal className="mono hidden text-white/80 md:col-span-3 md:block">
          {site.role}
        </p>
        <p data-hero-reveal className="mono hidden text-white/80 md:col-span-3 md:block">
          {site.location} <br /> {site.coords}
        </p>
        <p data-hero-reveal className="mono col-span-6 text-right text-white/80 md:col-span-3">
          <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
          {site.availability}
        </p>
      </div>

      {/* el logo, como lámina de construcción */}
      <div data-hero-word className="frame-x absolute inset-x-0 top-1/2 z-10 -translate-y-1/2">
        {metrics && <LogoSheet m={metrics} />}
      </div>

      {/* fila inferior */}
      <div className="frame-x absolute inset-x-0 bottom-10 z-10 grid grid-cols-12 items-end gap-[var(--gutter)]">
        <p
          data-hero-reveal
          data-guide="intro"
          className="col-span-12 max-w-[44ch] text-[clamp(15px,1.25vw,19px)] leading-snug text-foreground/90 md:col-span-5"
        >
          {hero.intro}
        </p>
        <p data-hero-reveal className="mono col-span-12 hidden text-white/60 md:col-span-2 md:col-start-7 md:block">
          Scroll ↓
        </p>
        <div data-hero-reveal data-guide="actions" className="col-span-12 flex gap-2 md:col-span-4 md:col-start-9 md:justify-end">
          <a href="#work" className="mono bg-foreground px-4 py-3 text-ink transition-colors hover:bg-accent">
            See the work
          </a>
          <a href="#contact" className="mono border border-white/30 px-4 py-3 transition-colors hover:border-accent hover:text-accent">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
