import { projects } from "@/data/content"
import { Reveal, SectionLabel } from "./Reveal"

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 py-28">
      <Reveal>
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="mt-4 max-w-[640px] text-[clamp(30px,4vw,44px)] leading-tight tracking-[-0.02em]">
          Three products, built <span className="serif-accent">properly</span> —
          from first schema to final pixel.
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.05}>
            <a
              href={project.href}
              className="group grid gap-8 border-t border-line py-14 md:grid-cols-[1fr_1.1fr] md:gap-14"
            >
              <div
                className="aspect-[4/3] w-full rounded-[15px] transition-transform duration-500 group-hover:scale-[0.985]"
                style={{ background: project.gradient }}
              >
                <div className="flex h-full items-end p-6">
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[13px] text-white backdrop-blur-sm">
                    {project.tagline}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[clamp(26px,3vw,34px)] tracking-[-0.02em]">
                      {project.name}
                    </h3>
                    <span className="text-[13px] text-muted">
                      {project.index} / {project.year}
                    </span>
                  </div>
                  <p className="mt-5 max-w-[480px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 text-[13px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{project.role}</span>
                    <span className="font-medium transition-colors group-hover:text-accent">
                      View project →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
