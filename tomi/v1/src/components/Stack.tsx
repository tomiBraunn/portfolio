import { stack } from "@/data/content"
import { Reveal, SectionLabel } from "./Reveal"

export function Stack() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28">
      <Reveal>
        <SectionLabel>Tools</SectionLabel>
        <h2 className="mt-4 text-[clamp(30px,4vw,44px)] leading-tight tracking-[-0.02em]">
          The stack I <span className="serif-accent">think</span> in.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-5 py-2.5 text-[15px] text-muted transition-colors hover:border-white/40 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
