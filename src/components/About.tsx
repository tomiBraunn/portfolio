import { about, principles, timeline } from "@/data/content"
import { LetterGlitch } from "./LetterGlitch"
import { BinaryLens } from "./BinaryLens"
import { Bend } from "./canvasui/Bend"
import { Plate } from "./Plate"

/**
 * About: letter-glitch muy tenue de fondo, una lupa binaria sobre el
 * retrato y una "ventana de log" cuyos bordes se pliegan al scrollear (bend).
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]">
        <LetterGlitch className="h-full w-full" />
      </div>

      <div className="frame-x relative grid grid-cols-12 gap-[var(--gutter)]">
        <p className="mono col-span-12 text-muted md:col-span-3">[03] About</p>

        <div className="col-span-12 grid grid-cols-9 gap-[var(--gutter)] md:col-span-9">
          <h2 id="about-title" className="display col-span-9 text-[clamp(34px,4.6vw,78px)] md:col-span-6">
            {about.lead}
          </h2>
          <Plate tone="20% 40%" gray className="col-span-5 aspect-[3/4] md:col-span-3 md:col-start-7">
            <BinaryLens tone="20% 40%" />
            <span className="mono pointer-events-none absolute bottom-3 left-3 text-foreground/80">
              Portrait — placeholder
            </span>
          </Plate>
        </div>

        <p className="col-span-12 mt-12 text-[clamp(17px,1.4vw,21px)] leading-snug text-foreground/80 md:col-span-5 md:col-start-4">
          {about.body}
        </p>

        {/* ventana de log: scroll interno con bordes plegados */}
        <div data-lenis-prevent className="log-scroll col-span-12 mt-12 md:col-span-4 md:col-start-9">
          <div className="mono flex justify-between border border-b-0 border-line px-3 py-2 text-[10px] text-muted">
            <span>principles.log</span>
            <span>scroll ↕</span>
          </div>
          <Bend zone={70} angle={70} rounding={30} className="h-[380px] border border-line bg-ink/80">
            <div className="px-4 py-6">
              {principles.map((p, i) => (
                <div key={p.title} className="border-b border-line py-4">
                  <p className="mono text-[10px] text-accent">P.{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-medium">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">{p.body}</p>
                </div>
              ))}
              {timeline.map((t) => (
                <div key={t.year} className="flex gap-4 border-b border-line py-3 text-sm">
                  <span className="mono text-[11px] text-muted">{t.year}</span>
                  <span className="text-foreground/75">{t.text}</span>
                </div>
              ))}
            </div>
          </Bend>
        </div>
      </div>
    </section>
  )
}
