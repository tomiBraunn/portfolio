import { about } from "@/data/content"
import { useLang, useT } from "@/lib/i18n"
import { LetterGlitch } from "./LetterGlitch"
import { BinaryLens } from "./BinaryLens"
import { Plate } from "./Plate"

/**
 * About: letter-glitch muy tenue de fondo, una lupa binaria sobre el
 * retrato.
 */
export function About() {
  const t = useT()
  const lang = useLang()
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-line py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]">
        <LetterGlitch className="h-full w-full" />
      </div>

      <div className="frame-x relative grid grid-cols-12 gap-[var(--gutter)]">
        <p className="mono col-span-12 text-muted md:col-span-3">{t("about")}</p>

        <div className="col-span-12 grid grid-cols-9 gap-[var(--gutter)] md:col-span-9">
          <h2 id="about-title" className="display col-span-9 text-[clamp(34px,4.6vw,78px)] md:col-span-6">
            {about.lead[lang]}
          </h2>
          <Plate tone="20% 40%" gray className="col-span-5 aspect-[3/4] md:col-span-3 md:col-start-7">
            <BinaryLens tone="20% 40%" />
            <span className="mono pointer-events-none absolute bottom-3 left-3 text-foreground/80">
              {t("portrait")}
            </span>
          </Plate>
        </div>

        <p className="col-span-12 mt-12 text-[clamp(17px,1.4vw,21px)] leading-snug text-foreground/80 md:col-span-5 md:col-start-4">
          {about.body[lang]}
        </p>
      </div>
    </section>
  )
}
