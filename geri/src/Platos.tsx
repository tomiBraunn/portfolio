import { useLayoutEffect, useRef, useState } from "react"
import { gsap, lenis, ScrollTrigger } from "@/lib/smooth-scroll"
import { cn } from "@/lib/utils"
import { platos } from "./content"

/** Contorno ondulado en %, para clip-path: `ondas` lóbulos de `hondo` % de profundidad. */
function ondulado(ondas: number, hondo: number) {
  const n = ondas * 12
  const puntos = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    const r = 50 - hondo + hondo * Math.cos(a * ondas)
    return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`
  })
  return `polygon(${puntos.join(",")})`
}

/** Cortante de galletitas con forma de flor (para la foto de Geri). */
export const FLOR = ondulado(8, 5)

type Plato = (typeof platos)[number]

function Datos({ p, className }: { p: Plato; className?: string }) {
  return (
    <dl className={cn("flex flex-wrap", className)}>
      {[
        ["Tiempo", p.tiempo],
        ["Porciones", p.porciones],
        ["Molde", p.molde],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-[2px]">
          <dt className="italic text-leche/75">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Lo que sale del horno. En escritorio la sección queda fija y cada tramo de scroll muestra
 * un dulce: la foto redonda y su ficha cambian, y la lista de la izquierda marca cuál es.
 * En mobile (o sin animaciones) es una lista común, uno abajo del otro.
 */
export function Platos() {
  const root = useRef<HTMLElement>(null)
  const [actual, setActual] = useState(0)
  const n = platos.length

  useLayoutEffect(() => {
    if (!root.current) return
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => setActual(Math.min(n - 1, Math.floor(s.progress * n))),
      })
      return () => st.kill()
    })
    return () => mm.revert()
  }, [n])

  // lleva el scroll al tramo del dulce i
  const ir = (i: number) => {
    const el = root.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight)
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section ref={root} id="dulces" aria-labelledby="platos-title" className="relative py-24 md:h-[600svh] md:py-0">
      <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center md:overflow-hidden">
        <div className="escena px-g md:px-0">
          {/* la carta: título, intro y la lista (marca el dulce que se ve) */}
          <div className="md:absolute md:left-[calc(71*var(--u))] md:top-[calc(123*var(--u))] md:w-[calc(590*var(--u))]">
            <h2 id="platos-title" className="titular text-[clamp(46px,12vw,72px)] md:text-[calc(130*var(--u))]">
              Lo que sale de mi horno
            </h2>
            <p className="mt-6 max-w-[34ch] text-[19px] leading-[1.65] text-leche md:mt-[calc(24*var(--u))] md:w-[calc(601*var(--u))] md:max-w-none md:text-[calc(30*var(--u))]">
              Los dulces que repito, los que me piden y alguno que todavía estoy aprendiendo.
            </p>
            <ol className="mt-[calc(48*var(--u))] hidden flex-col items-start gap-[calc(4*var(--u))] md:flex">
              {platos.map((p, i) => (
                <li key={p.name}>
                  <button
                    onClick={() => ir(i)}
                    aria-current={i === actual ? "true" : undefined}
                    className={cn(
                      "text-left text-[calc(40*var(--u))] font-semibold leading-[1.1] tracking-[-0.025em] transition-colors duration-300",
                      i === actual ? "text-caramelo" : "text-cacao/70 hover:text-cacao",
                    )}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* escritorio: la foto y la ficha del dulce actual, con fundido entre uno y otro */}
          <div className="hidden md:block">
            <div className="absolute left-[calc(1042*var(--u))] top-[calc(123*var(--u))] size-[calc(600*var(--u))] overflow-hidden rounded-full bg-espuma">
              {platos.map((p, i) => (
                <img
                  key={p.name}
                  src={p.src}
                  alt={i === actual ? p.name : ""}
                  aria-hidden={i !== actual}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-700 ease-out",
                    i === actual ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
            </div>
            {platos.map((p, i) => (
              <div
                key={p.name}
                aria-hidden={i !== actual}
                className={cn(
                  "absolute left-[calc(1152*var(--u))] top-[calc(795*var(--u))] w-[calc(489*var(--u))] transition-opacity duration-500",
                  i === actual ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <div className="flex items-baseline justify-between gap-[calc(16*var(--u))]">
                  <h3 className="whitespace-nowrap text-[calc(50*var(--u))] font-semibold leading-none tracking-[-0.02em]">{p.name}</h3>
                  <p className="mano -rotate-3 whitespace-nowrap text-[calc(26*var(--u))] font-bold text-mandarina">{p.note}</p>
                </div>
                <p className="mt-[calc(12*var(--u))] w-[calc(380*var(--u))] text-[calc(22*var(--u))] leading-[1.65] text-leche">{p.story}</p>
                <Datos p={p} className="mt-[calc(20*var(--u))] gap-[calc(40*var(--u))] text-[calc(16*var(--u))] leading-[1.23]" />
              </div>
            ))}
          </div>

          {/* mobile: uno abajo del otro */}
          <div className="mt-16 space-y-20 md:hidden">
            {platos.map((p) => (
              <article key={p.name}>
                <div className="mx-auto aspect-square w-[min(82vw,420px)] overflow-hidden rounded-full bg-espuma">
                  <img src={p.src} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[32px] font-semibold leading-none tracking-[-0.02em]">{p.name}</h3>
                  <p className="mano -rotate-3 text-[24px] font-bold text-mandarina">{p.note}</p>
                </div>
                <p className="mt-3 text-[17px] leading-[1.65] text-leche">{p.story}</p>
                <Datos p={p} className="mt-5 gap-x-8 gap-y-3 text-[15px] leading-[1.3]" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
