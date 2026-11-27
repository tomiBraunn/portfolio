import { useLayoutEffect, useRef } from "react"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { cn } from "@/lib/utils"
import { hero, nav, site } from "./content"

type Crop = { cx: number; cy: number; r: number }

/** Plato visto desde arriba, recortado en círculo justo en el borde del plato de la foto. */
export function Plato({ src, alt, crop, className }: { src: string; alt: string; crop: Crop; className?: string }) {
  const size = 50 / crop.r // % del contenedor que ocupa la foto para que el plato lo llene
  return (
    <div className={cn("sombra-plato relative aspect-square overflow-hidden rounded-full bg-espuma", className)}>
      <img
        src={src}
        alt={alt}
        className="absolute max-w-none"
        style={{ width: `${size}%`, left: `${50 - crop.cx * size}%`, top: `${50 - crop.cy * size}%` }}
      />
    </div>
  )
}

/**
 * Como en el video: la cookie y el café se apoyan sobre el papel al cargar (entran girando)
 * y después giran y se desplazan a distinta velocidad con el scroll.
 * En escritorio todo va en la "escena" de 1920 × 1080 del Figma (medidas en var(--u)).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-line]", { yPercent: 110, duration: 1.2, stagger: 0.09 }, 0.1)
        .from("[data-plato]", { xPercent: 70, rotate: 120, opacity: 0, duration: 1.6, stagger: 0.12 }, 0)
        .from("[data-ring]", { rotate: -90, opacity: 0, duration: 1.8 }, 0.2)
        .from("[data-fade]", { opacity: 0, y: 16, duration: 1, stagger: 0.08 }, 0.6)

      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true }
      gsap.to("[data-giro='cookie']", { rotate: 50, yPercent: -12, ease: "none", scrollTrigger: scrub })
      gsap.to("[data-giro='cafe']", { rotate: -80, yPercent: -55, ease: "none", scrollTrigger: scrub })
      gsap.to("[data-ring] svg", { rotate: -140, ease: "none", scrollTrigger: scrub })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="inicio" className="relative overflow-hidden pb-28 md:flex md:min-h-svh md:items-center md:pb-0">
      <div className="escena px-g md:px-0">
        {/* en escritorio el header se "disuelve" y logo y nav se ubican en la escena */}
        <header className="relative z-10 flex items-center justify-between py-4 md:contents">
          <a
            href="#inicio"
            className="text-[26px] font-semibold italic md:absolute md:left-[calc(46*var(--u))] md:top-[calc(51*var(--u))] md:text-[calc(40*var(--u))] md:leading-[1.23]"
          >
            {site.name}
          </a>
          <nav
            aria-label="Secciones"
            className="flex gap-5 text-[16px] md:absolute md:right-[calc(46*var(--u))] md:top-[calc(57*var(--u))] md:z-10 md:gap-[calc(36*var(--u))] md:text-[calc(30*var(--u))] md:leading-[1.23]"
          >
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "underline decoration-caramelo/0 decoration-2 underline-offset-[6px] transition-colors hover:decoration-caramelo",
                  l.href !== "#contacto" && "max-sm:hidden",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </header>

        <h1 className="titular mt-12 text-[clamp(54px,14vw,96px)] md:absolute md:left-[calc(46*var(--u))] md:top-[calc(250*var(--u))] md:mt-0 md:whitespace-nowrap md:text-[calc(200*var(--u))]">
          {hero.lines.map((l) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <span data-line className="block">
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-fade
          className="mt-6 max-w-[30ch] text-[19px] leading-[1.65] text-leche md:absolute md:left-[calc(46*var(--u))] md:top-[calc(626*var(--u))] md:mt-0 md:w-[calc(797*var(--u))] md:max-w-none md:text-[calc(40*var(--u))]"
        >
          {hero.intro}
        </p>
        <a
          data-fade
          href="#dulces"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-caramelo px-7 py-4 text-[17px] text-hoja transition-colors hover:bg-cacao md:absolute md:left-[calc(53*var(--u))] md:top-[calc(790*var(--u))] md:mt-0 md:h-[calc(80*var(--u))] md:w-[calc(300*var(--u))] md:p-0 md:text-[calc(30*var(--u))]"
        >
          {hero.cta}
        </a>

        {/* la mesa: la cookie con su aro de texto y el café al costado */}
        <div className="relative mx-auto mt-16 aspect-square w-[min(88vw,520px)] md:absolute md:left-[calc(1183*var(--u))] md:top-[calc(172*var(--u))] md:mt-0 md:w-[calc(737*var(--u))]">
          <div data-ring className="pointer-events-none absolute left-[10.2%] top-[10%] aspect-square w-[82.2%]">
            <svg viewBox="0 0 200 200" className="h-full w-full text-leche" aria-hidden>
              <defs>
                <path id="aro" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
              </defs>
              <text fontSize="7.9" fill="currentColor" style={{ fontStyle: "italic", letterSpacing: "0.02em" }}>
                <textPath href="#aro" textLength={590} lengthAdjust="spacing">
                  {hero.ring.repeat(2)}
                </textPath>
              </text>
            </svg>
          </div>
          {/* data-plato: la entrada; data-giro: el scroll (capas separadas para que no se pisen) */}
          <div data-plato className="absolute inset-0">
            <div data-giro="cookie" className="h-full w-full">
              <img
                src={hero.cookie.src}
                alt={hero.cookie.alt}
                className="h-full w-full object-contain [filter:drop-shadow(0_14px_18px_rgb(43_26_18/.2))]"
              />
            </div>
          </div>
          <div data-plato className="absolute left-[1.2%] top-[58.6%] w-[32.8%]">
            <div data-giro="cafe">
              <Plato {...hero.cafe} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
