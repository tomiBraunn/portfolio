import { archive } from "@/data/content"
import { useT } from "@/lib/i18n"
import { Plate } from "./Plate"
import { PixelReveal } from "./PixelReveal"

/** Grilla asimétrica de trabajos chicos con caption mono (video scroll-57). */
export function Archive() {
  const t = useT()
  return (
    <section aria-labelledby="archive-title" className="frame-x relative py-32">
      <div className="grid grid-cols-12 gap-[var(--gutter)]">
        <p className="mono col-span-12 text-muted md:col-span-3">{t("archive")}</p>
        <h2 id="archive-title" data-guide="title" className="display col-span-12 text-[clamp(40px,5.4vw,92px)] md:col-span-8">
          {t("archiveTitle")}
        </h2>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-16">
        {archive.map((a, i) => (
          <figure key={a.title} data-guide={a.title} className={`col-span-12 ${a.span} ${a.offset}`}>
            <PixelReveal>
              <Plate tone={a.tone} gray={i % 3 === 1} className={a.ratio} />
            </PixelReveal>
            <figcaption className="mono mt-3 flex justify-between text-[11px]">
              <span>
                {a.title} — {a.year}
              </span>
              <span className="text-muted">{a.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
