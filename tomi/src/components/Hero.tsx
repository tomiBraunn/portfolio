import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { hero, site } from "@/data/content"
import { OPPOSITE, SPAN } from "@/lib/brand"
import { useLang, useT } from "@/lib/i18n"
import { useSize } from "@/lib/use-size"
import { CropMarks } from "./CropMarks"
import { LOGO, LOGO_TRACKING, loadLogoFont, logoFont } from "./Wordmark"

// Prueba de impresión del logo: la tira de 7 pasos del loader vuelve en color
// (el gradient de marca en 7 exposiciones), del alto del hero, con el nombre
// cruzándola. Todo se mide de la fuente real a F px, así las guías caen
// exactamente sobre las letras.
const F = 200
const PHI = 1.618033988749895
const SLANT = 12 // ° de la itálica
const FAR = 6000 // las líneas de métrica cruzan todo el hero
// Los 7 pasos van de subexpuesto a expuesto: velo de tinta que se levanta de izquierda a derecha
// hasta dejar el gradient puro; así el nombre claro se lee en todos.
const EXPOSURE = [-90, -75, -60, -45, -30, -15, 0]
const STEPS = EXPOSURE.length
const veil = (e: number) => `rgba(13,12,11,${-e / 100})`
const signed = (e: number) => (e > 0 ? `+${e}` : e < 0 ? `−${-e}` : "0")
// recorte del gradient que se reparte entre los 7 pasos: la zona ámbar, sin la esquina roja ni la negra
const CROP = { x: 0.3, y: 0.1, w: 0.58, h: 0.4 }
const IMG_W = STEPS / CROP.w // ancho de la imagen completa, medido en pasos

type Metrics = { fa: number; fd: number; left: number; right: number; asc: number; desc: number; xh: number; advances: number[] }

function measure(): Metrics {
  const ctx = document.createElement("canvas").getContext("2d")!
  ctx.font = logoFont(F)
  ctx.letterSpacing = `${LOGO_TRACKING * F}px`
  const m = ctx.measureText(LOGO)
  return {
    fa: m.fontBoundingBoxAscent,
    fd: m.fontBoundingBoxDescent,
    left: m.actualBoundingBoxLeft,
    right: m.actualBoundingBoxRight,
    asc: m.actualBoundingBoxAscent,
    desc: m.actualBoundingBoxDescent,
    xh: ctx.measureText("x").actualBoundingBoxAscent,
    // dónde arranca cada letra, más el final de la última
    advances: Array.from({ length: LOGO.length + 1 }, (_, i) => ctx.measureText(LOGO.slice(0, i)).width),
  }
}

function Proof({ m }: { m: Metrics }) {
  const [plate, size] = useSize<HTMLDivElement>()
  // El SVG usa las unidades de la fuente (px a F) y toma la proporción de la placa.
  const adv = m.advances[LOGO.length]
  const vw = adv / SPAN // el ancho del texto es SPAN de la placa, igual que en el loader
  const vh = size.width ? (vw * size.height) / size.width : vw / 2.75
  const px = size.width ? vw / size.width : 1 // 1 px de pantalla, en unidades
  const bw = vw / STEPS
  const x = (vw - adv) / 2 // origen del texto: centrado en la placa
  // proporción áurea: la línea base cae a 1/φ (61,8 %) del alto de la placa; el tope y el pie dejan aire para la cota y las marcas
  const y = Math.min(Math.max(vh / PHI, m.asc + 56), vh - m.desc - 40) // baseline
  const spanTop = y - ((F - (m.fa + m.fd)) / 2 + m.fa) // tope de la caja de línea (line-height 1), como el texto del loader
  const tan = Math.tan((SLANT * Math.PI) / 180)
  const lines = [
    { y: y - m.asc, label: "ascender", value: m.asc },
    { y: y - m.xh, label: "x-height", value: m.xh },
    { y, label: "baseline", value: 0 },
  ]
  const cota = y - m.asc - 24
  const below = y + m.desc
  const left = (u: number) => `${(u / vw) * 100}%`
  const top = (u: number) => `${(u / vh) * 100}%`

  return (
    <div ref={plate} data-hero-word className="relative min-h-0 flex-1">
      <CropMarks />

      {/* los 7 pasos: el mismo gradient, cada uno con la exposición que dice su rótulo.
          El filete deja leer el paso más oscuro sobre el fondo de tinta. */}
      <div className="flex h-full outline outline-1 outline-white/15">
        {EXPOSURE.map((e, i) => (
          <div
            key={e}
            data-band
            data-guide={`exposure ${signed(e)}`}
            className="h-full flex-1"
            style={{
              backgroundImage: `linear-gradient(${veil(e)},${veil(e)}),url(/gradient-wide.webp)`,
              backgroundSize: `auto, ${IMG_W * 100}% ${100 / CROP.h}%`,
              backgroundPosition: `0 0, ${((CROP.x * IMG_W + i) / (IMG_W - 1)) * 100}% ${(CROP.y / (1 - CROP.h)) * 100}%`,
            }}
          />
        ))}
      </div>

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          {OPPOSITE.map((_, i) => (
            <clipPath key={i} id={`slice-${i}`}>
              <rect x={i * bw} y={y - m.asc - 8} width={bw} height={m.asc + m.desc + 16} />
            </clipPath>
          ))}
          <g id="guides" strokeWidth={px} fill="none">
            {/* caja de cada letra, con la inclinación de la itálica */}
            <g data-sheet-label strokeOpacity={0.3} strokeDasharray={`${4 * px} ${5 * px}`}>
              {m.advances.map((a, i) => (
                <line key={i} x1={x + a} y1={y} x2={x + a + m.asc * tan} y2={y - m.asc} />
              ))}
            </g>
            {/* métricas medidas de la fuente: cruzan todo el ancho */}
            <g strokeOpacity={0.55}>
              {lines.map((l) => (
                <line key={l.label} data-sheet-metric x1={-FAR} x2={FAR} y1={l.y} y2={l.y} pathLength={1} strokeDasharray={1} />
              ))}
            </g>
            {/* cota del ancho + una marca por letra */}
            <g data-sheet-label strokeOpacity={0.7}>
              <path d={`M${x - m.left} ${cota - 4 * px} v${8 * px} M${x + m.right} ${cota - 4 * px} v${8 * px} M${x - m.left} ${cota} H${x + m.right}`} />
              {m.advances.map((a, i) => (
                <line key={i} x1={x + a} x2={x + a} y1={below + 6} y2={below + 16} />
              ))}
            </g>
          </g>
        </defs>
        <use href="#guides" stroke="var(--color-foreground)" />

        {/* destino del vuelo del loader: la caja del texto, a todo el ancho de la placa */}
        <rect data-hero-logo x={0} y={spanTop} width={vw} height={F} fill="none" />

        {/* el nombre: 7 copias, cada una recortada a su paso */}
        {OPPOSITE.map((fill, i) => (
          <g key={i} clipPath={`url(#slice-${i})`}>
            <text data-slice x={x} y={y} className="logo-font" fontSize={F} fill={fill}>
              {LOGO}
            </text>
          </g>
        ))}
      </svg>

      {/* etiquetas en HTML, para que midan lo mismo en cualquier pantalla */}
      <div aria-hidden className="mono pointer-events-none absolute inset-0 text-[10px] leading-none text-foreground/80 max-lg:hidden">
        {lines.map((l) => (
          <span key={l.label} data-sheet-label className="absolute inset-x-2 flex -translate-y-full justify-between pb-1" style={{ top: top(l.y) }}>
            <span>{l.label}</span>
            <span className="text-ink/80">{Math.round(l.value)}</span>
          </span>
        ))}
        <span data-sheet-label className="absolute -translate-y-full pb-2" style={{ left: left(x - m.left), top: top(cota) }}>
          mikro super bold italic · {F}px · tracking −3% · slant {SLANT}°
        </span>
      </div>
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const t = useT()
  const lang = useLang()
  const section = useRef<HTMLElement>(null)
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(() => {
    loadLogoFont().then(() => setMetrics(measure()))
  }, [])

  // Intro: el nombre ya llegó volando desde el loader; los 7 pasos se imprimen detrás → métricas → cotas y textos.
  useLayoutEffect(() => {
    if (!ready || !metrics || reducedMotion || !section.current) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          "[data-band]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, stagger: 0.08, ease: "power3.out" },
        )
        .from("[data-sheet-metric]", { strokeDashoffset: 1, duration: 1, stagger: 0.12, ease: "expo.inOut" }, 0.3)
        .from("[data-sheet-label]", { opacity: 0, duration: 0.5, stagger: 0.03 }, 1.2)
        .from("[data-hero-reveal]", { opacity: 0, y: 14, duration: 0.7, stagger: 0.06, ease: "power3.out" }, 1.1)
    }, section)
    return () => ctx.revert()
  }, [ready, metrics])

  return (
    <section ref={section} id="top" className="frame-x relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink pb-10 pt-[72px]">
      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      {/* fila superior de metadatos, en la grilla de 12 */}
      <div className="mb-7 grid grid-cols-12 gap-[var(--gutter)]">
        <p data-hero-reveal className="mono col-span-6 text-white/80 md:col-span-3">
          {t("index")}
        </p>
      </div>

      {/* el logo, como prueba de impresión */}
      {metrics && <Proof m={metrics} />}


      {/* fila inferior */}
      <div className="mt-7 grid grid-cols-12 items-end gap-[var(--gutter)]">
        <p
          data-hero-reveal
          data-guide="intro"
          className="col-span-12 max-w-[44ch] text-[clamp(15px,1.25vw,19px)] leading-snug text-foreground/90 md:col-span-5"
        >
          {hero.intro[lang]}
        </p>
        <p data-hero-reveal className="mono col-span-12 hidden text-white/60 md:col-span-2 md:col-start-7 md:block">
          {t("scroll")}
        </p>
        <div data-hero-reveal data-guide="actions" className="col-span-12 flex gap-2 md:col-span-4 md:col-start-9 md:justify-end">
          <a href="#work" className="mono bg-foreground px-4 py-3 text-ink transition-colors hover:bg-accent">
            {t("seeWork")}
          </a>
          <a href="#contact" className="mono border border-white/30 px-4 py-3 transition-colors hover:border-accent hover:text-accent">
            {t("getInTouch")}
          </a>
        </div>
      </div>
    </section>
  )
}
