import { useLayoutEffect, useRef, useState } from "react"
import { gsap, lenis, reducedMotion } from "@/lib/smooth-scroll"
import { INK_STEPS, OPPOSITE, SPAN } from "@/lib/brand"
import { CropMarks } from "./CropMarks"
import { LOGO, loadLogoFont } from "./Wordmark"

// Tira de calibración del Figma: 7 pasos de negro a casi blanco.
const GRAYS = ["#000000", "#222222", "#484848", "#6e6e6e", "#929292", "#b8b8b8", "#dcdcdc"]
const INK = GRAYS.map((_, i) => `${Math.round(100 - (i * 100) / 7)}%`) // % de tinta de cada paso

/**
 * Loader = logo + tira de grises.
 * 1. los 7 bloques se imprimen mientras cuenta 000→100
 * 2. el logo entra cortado en 7 franjas, cada una en el gris opuesto a su bloque
 * 3. la tira se cierra como persiana y el logo queda un instante en sus 7 grises
 * 4. el logo vuela al nav y pasa a blanco
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(!reducedMotion)
  const root = useRef<HTMLDivElement>(null)
  const bars = useRef<HTMLDivElement[]>([])
  const slices = useRef<HTMLSpanElement[]>([])
  const logo = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const meta = useRef<HTMLDivElement>(null)
  const labels = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const html = document.documentElement
    if (reducedMotion) {
      onDone()
      return
    }
    html.dataset.loading = ""
    lenis?.stop()
    window.scrollTo(0, 0)

    const counterState = { v: 0 }
    // context: en StrictMode el efecto corre dos veces; revert() deshace los .from() del primer pase
    let tl!: gsap.core.Timeline
    let cancelled = false
    const ctx = gsap.context(() => {
      // arranca pausado: espera la fuente del logo para medirlo contra la tira
      tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          delete html.dataset.loading
          lenis?.start()
          setVisible(false)
          onDone()
        },
      })

      tl.from(meta.current!.children, { opacity: 0, y: 8, stagger: 0.05, duration: 0.4 }, 0)
        .from(bars.current, {
          scaleY: 0,
          transformOrigin: "50% 100%",
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        }, 0.1)
        .to(counterState, {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(counterState.v)).padStart(3, "0")
          },
        }, 0.1)
        .from(slices.current, {
          yPercent: 110,
          stagger: 0.06,
          duration: 0.8,
          ease: "power4.out",
        }, 0.7)
        // persiana: los bloques se cierran alternando arriba/abajo
        .to(bars.current, {
          scaleY: 0,
          transformOrigin: (i: number) => (i % 2 ? "50% 0%" : "50% 100%"),
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.inOut",
        }, 2.1)
        .to(root.current, { backgroundColor: "rgba(13,12,11,0)", duration: 0.7, ease: "power2.inOut" }, 2.1)
        .to([...meta.current!.children, labels.current], { opacity: 0, duration: 0.3 }, 2.1)
        // logo B: cada franja toma su paso de la tira sobre tinta
        .to(slices.current, { color: (i: number) => INK_STEPS[i], duration: 0.5, stagger: 0.04 }, 2.3)
        // al volar al hero cada franja toma el tono con el que queda en la placa
        .to(slices.current, { color: (i: number) => OPPOSITE[i], duration: 0.6, ease: "power2.inOut" }, 3.2)
        .add(() => {
          // FLIP: la tira entera se superpone a la placa del hero y el texto cae sobre su lugar
          const target = document.querySelector<SVGRectElement>("[data-hero-logo]")
          if (!target) return
          const group = logo.current!.getBoundingClientRect()
          const from = slices.current[0].getBoundingClientRect()
          const to = target.getBoundingClientRect()
          const k = to.width / group.width
          gsap.to(logo.current, {
            x: to.left - group.left,
            y: to.top - group.top - k * (from.top - group.top),
            scale: k,
            transformOrigin: "0 0",
            duration: 0.65,
            ease: "expo.inOut",
          })
        }, 3.0)
        .to({}, { duration: 0.95 }, 3.0) // espera a que aterrice el FLIP
    }, root)
    tl.timeScale(1.45) // ~2,8 s en total; el FLIP de arriba ya está ajustado a esta escala

    // si la fuente falla o tarda, arranca igual
    Promise.race([loadLogoFont(), new Promise((r) => setTimeout(r, 600))]).catch(() => {}).then(() => {
      if (cancelled) return
      const strip = bars.current[0]?.parentElement
      if (!logo.current || !strip || !slices.current[0]) return
      logo.current.style.fontSize = "100px"
      // 0.96: casi el ancho de la tira, así cada franja coincide con un paso de gris
      const ratio = strip.offsetWidth / slices.current[0].offsetWidth
      logo.current.style.fontSize = `${100 * ratio * SPAN}px`
      tl.play()
    })

    return () => {
      cancelled = true
      tl.kill()
      ctx.revert()
      delete html.dataset.loading
      lenis?.start()
    }
  }, [onDone])

  if (!visible) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-paper text-ink"
    >
      <div ref={meta} className="mono pointer-events-none absolute inset-0 frame-x py-5 text-ink/70">
        <span className="absolute left-[var(--frame)] top-5">tomasbraun / portfolio — v2.0</span>
        <span className="absolute right-[var(--frame)] top-5 hidden sm:block">calibrating output</span>
        <span className="absolute bottom-5 left-[var(--frame)]">
          <span ref={counter}>000</span> / 100
        </span>
        <span className="absolute bottom-5 right-[var(--frame)]">{new Date().getFullYear()} — Buenos Aires</span>
      </div>

      <div className="relative w-[min(82vw,1040px)]">
        <CropMarks className="border-ink/40" />
        <div className="flex h-[min(26vw,280px)] overflow-hidden">
          {GRAYS.map((g, i) => (
            <div
              key={g}
              ref={(el) => {
                if (el) bars.current[i] = el
              }}
              className="h-full flex-1"
              style={{ background: g }}
            />
          ))}
        </div>

        {/* logo: 7 copias del tamaño de la tira, cada una recortada a su columna */}
        <div ref={logo} className="logo-font pointer-events-none will-change-transform absolute inset-x-0 top-0 h-[min(26vw,280px)] leading-none">
          {GRAYS.map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{ clipPath: `inset(0 ${((6 - i) / 7) * 100}% 0 ${(i / 7) * 100}%)` }}
            >
              <span
                ref={(el) => {
                  if (el) slices.current[i] = el
                }}
                className="whitespace-nowrap"
                style={{ color: i === 3 ? '#f2f0eb' : GRAYS[6 - i] }}
              >
                {LOGO}
              </span>
            </div>
          ))}
        </div>

        <div ref={labels} className="mono mt-3 flex text-[10px] text-ink/60">
          {INK.map((k) => (
            <span key={k} className="flex-1">
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
