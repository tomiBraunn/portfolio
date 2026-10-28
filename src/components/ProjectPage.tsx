import { useLayoutEffect, useRef } from "react"
import { projects, type Project } from "@/data/content"
import { goHome, projectHref } from "@/lib/route"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { Plate } from "./Plate"

/** Página de detalle de un proyecto: portada, ficha y el espacio para la demo. */
export function ProjectPage({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null)
  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]

  useLayoutEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", { opacity: 0, y: 24, stagger: 0.06, duration: 0.8, ease: "power3.out" })
    }, root)
    return () => ctx.revert()
  }, [project])

  return (
    <main ref={root} className="frame-x pb-24 pt-28 md:pt-36">
      <div data-in className="mono flex justify-between text-muted">
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault()
            goHome("work")
          }}
          className="transition-colors hover:text-accent"
        >
          ← Work
        </a>
        <span>
          {project.index} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <header className="mt-10 grid gap-8 md:mt-16 md:grid-cols-[1.35fr_1fr] md:gap-10">
        <div>
          <h1 data-in className="display text-[clamp(64px,11vw,184px)]">
            {project.name}
          </h1>
          <p data-in className="mt-6 max-w-[34ch] text-[clamp(20px,2vw,28px)] leading-snug text-foreground/85">
            {project.tagline}
          </p>
        </div>
        <dl data-in className="mono self-end text-[11px]">
          {[
            ["Year", project.year],
            ["Role", project.role],
            ["Stack", project.stack.join(", ")],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-t border-line py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right text-foreground/90">{v}</dd>
            </div>
          ))}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="flex justify-between border-y border-line py-2.5 transition-colors hover:text-accent"
          >
            <span>Source on GitHub</span>
            <span>↗</span>
          </a>
        </dl>
      </header>

      <div data-in className="mt-16 aspect-[4/3] md:mt-24 md:aspect-[16/10]">
        <Plate tone={project.tone} src={project.image} className="h-full" />
      </div>

      <section className="mt-16 grid gap-8 md:mt-24 md:grid-cols-[1fr_2fr] md:gap-10">
        <p className="mono text-muted">[01] Overview</p>
        <p className="max-w-[60ch] text-[clamp(18px,1.6vw,22px)] leading-relaxed text-foreground/85">
          {project.description}
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:mt-24 md:grid-cols-[1fr_2fr] md:gap-10">
        <p className="mono text-muted">[02] Demo</p>
        <div className="aspect-[16/10]">
          {project.demo ? (
            <iframe
              src={project.demo}
              title={`${project.name} demo`}
              className="h-full w-full border border-line bg-ink-2"
              allow="autoplay; fullscreen"
            />
          ) : (
            <Plate tone={project.tone} className="h-full">
              <span className="mono absolute inset-0 grid place-items-center text-foreground/80">
                demo coming soon
              </span>
            </Plate>
          )}
        </div>
      </section>

      <a
        href={projectHref(next.slug)}
        className="group mt-24 flex items-end justify-between gap-6 border-t border-line pt-6 md:mt-36"
      >
        <span className="mono text-muted">Next project</span>
        <span className="display text-[clamp(40px,7vw,120px)] transition-colors group-hover:text-accent">
          {next.name} →
        </span>
      </a>
    </main>
  )
}
