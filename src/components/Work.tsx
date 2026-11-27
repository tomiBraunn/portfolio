import { useLayoutEffect, useRef } from "react"
import { projectHref } from "@/lib/route"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { localized, projects } from "@/data/content"
import { useLang, useT } from "@/lib/i18n"
import { Plate } from "./Plate"

/**
 * Proyectos en scroll lateral (estilo gsap.com): la sección se fija y el
 * scroll vertical mueve la pista en X. En mobile / reduced-motion es una lista.
 */
export function Work() {
  const t = useT()
  const lang = useLang()
  const root = useRef<HTMLElement>(null)
  const fill = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !root.current) return
    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px)", () => {
      const pin = root.current!.querySelector<HTMLElement>("[data-pin]")!
      const track = root.current!.querySelector<HTMLElement>("[data-track]")!
      const dist = () => track.scrollWidth - window.innerWidth

      const scroll = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill.current) fill.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      // cada placa se "imprime" de izquierda a derecha al entrar
      gsap.utils.toArray<HTMLElement>("[data-plate]", root.current).forEach((plate) => {
        gsap.fromTo(
          plate,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: plate,
              containerAnimation: scroll,
              start: "left 95%",
              end: "left 45%",
              scrub: true,
            },
          },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="work" className="relative">
      <div data-pin className="relative overflow-hidden md:h-[100svh]">
        <div
          data-track
          className="flex flex-col gap-20 px-[var(--frame)] py-24 md:h-full md:w-max md:flex-row md:items-center md:gap-[6vw] md:py-0"
        >
          {/* panel de apertura */}
          <header className="flex shrink-0 flex-col justify-between gap-10 md:h-[64vh] md:w-[min(34vw,520px)]">
            <p className="mono text-muted">{t("selectedWork")}</p>
            <div>
              <h2 data-guide="title" className="display text-[clamp(64px,10vw,168px)]">
                {t("work")}
              </h2>
              <p className="mt-6 max-w-[34ch] text-[17px] leading-snug text-foreground/80">
                {t("workLead")}
              </p>
            </div>
            <p className="mono text-muted">
              {projects.length} {t("projects")} <span className="hidden md:inline">{t("scrollHint")}</span>
            </p>
          </header>

          {projects.map((base) => {
            const p = localized(base, lang)
            return (
            <article
              key={p.name}
              data-guide={p.name}
              className="grid shrink-0 gap-8 md:h-[64vh] md:w-[min(74vw,1180px)] md:grid-cols-[1.35fr_1fr] md:gap-10"
            >
              <a href={projectHref(p.slug)} data-plate className="block h-[52vw] md:h-full">
                <Plate tone={p.tone} src={p.image} className="h-full">
                  <span className="mono absolute left-4 top-4 bg-ink/70 px-2 py-1 text-foreground backdrop-blur-sm">
                    {p.tagline}
                  </span>
                </Plate>
              </a>

              <div className="flex flex-col justify-between gap-8">
                <div>
                  <h3 className="display text-[clamp(40px,4.6vw,76px)]">
                    <a href={projectHref(p.slug)} className="transition-colors hover:text-accent">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="h-[1em] w-auto transition-opacity hover:opacity-80" />
                      ) : (
                        p.name
                      )}
                    </a>
                  </h3>
                  <p className="mt-5 max-w-[42ch] leading-relaxed text-foreground/75">{p.description}</p>
                </div>
                <dl className="mono text-[11px]">
                  {[
                    [t("year"), p.year],
                    [t("role"), p.role],
                    [t("stack"), p.stack.join(", ")],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-t border-line py-2.5">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right text-foreground/90">{v}</dd>
                    </div>
                  ))}
                  <a
                    href={projectHref(p.slug)}
                    className="flex justify-between border-y border-line py-2.5 transition-colors hover:text-accent"
                  >
                    <span>{t("viewProject")}</span>
                    <span>→</span>
                  </a>
                </dl>
              </div>
            </article>
            )
          })}
          <div aria-hidden className="hidden w-[8vw] shrink-0 md:block" />
        </div>

        {/* progreso: una regla que se llena */}
        <div className="pointer-events-none absolute inset-x-[var(--frame)] bottom-8 hidden items-center gap-4 md:flex">
          <div className="relative h-3 flex-1">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(255,255,255,.4) 0 1px, transparent 1px 12px)",
              }}
            />
            <div ref={fill} className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
