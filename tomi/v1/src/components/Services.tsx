import { services, principles } from "@/data/content"
import { Reveal, SectionLabel } from "./Reveal"

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1200px] px-6 py-28">
      <Reveal>
        <SectionLabel>Who I work with</SectionLabel>
        <h2 className="mt-4 max-w-[640px] text-[clamp(30px,4vw,44px)] leading-tight tracking-[-0.02em]">
          One developer, the <span className="serif-accent">whole</span> stack.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[15px] border border-line bg-line md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.08} className="bg-black">
            <div className="flex h-full flex-col gap-16 p-8">
              <span className="text-[13px] text-muted">0{i + 1}</span>
              <div>
                <h3 className="text-xl tracking-[-0.01em]">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {service.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-28 grid gap-14 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionLabel>How I work</SectionLabel>
        </Reveal>
        <div className="flex flex-col">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.05}>
              <div className="grid gap-3 border-t border-line py-8 md:grid-cols-[1fr_1.6fr] md:gap-8">
                <h3 className="text-lg tracking-[-0.01em]">{principle.title}</h3>
                <p className="leading-relaxed text-muted">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
