import DriftWall from "./reactbits/DriftWall"
import { vibe } from "@/data/content"
import { useT } from "@/lib/i18n"

/** "Mi vibe": pared en perspectiva de fotos que me gustan (reactbits Drift Wall). */
export function Vibe() {
  const t = useT()
  return (
    <section aria-labelledby="vibe-title" className="relative h-[110svh] min-h-[640px] overflow-hidden border-y border-line">
      <DriftWall
        items={vibe}
        columns={6}
        tileWidth={230}
        tileHeight={150}
        gap={20}
        radius={0}
        tilt={22}
        turn={-16}
        speed={34}
        lift={56}
        dim={0.4}
        fade={0.7}
        overlayColor="#0d0c0b"
      />
      <div className="frame-x pointer-events-none absolute inset-x-0 top-0 grid grid-cols-12 gap-[var(--gutter)] pt-24">
        <p className="mono col-span-12 text-muted md:col-span-3">{t("vibeLabel")}</p>
        <h2 id="vibe-title" className="display col-span-12 text-[clamp(40px,5.4vw,92px)] md:col-span-7">
          {t("vibeTitle")}
        </h2>
      </div>
      <p className="mono pointer-events-none absolute bottom-8 left-[var(--frame)] text-muted">
        {t("vibeHint").replace("{n}", String(vibe.length))}
      </p>
    </section>
  )
}
