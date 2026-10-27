import DriftWall from "./reactbits/DriftWall"
import { lab } from "@/data/content"

/** Pared en perspectiva de experimentos (reactbits Drift Wall). */
export function Lab() {
  return (
    <section aria-labelledby="lab-title" className="relative h-[110svh] min-h-[640px] overflow-hidden border-y border-line">
      <DriftWall
        items={lab}
        columns={6}
        tileWidth={230}
        tileHeight={150}
        gap={20}
        radius={0}
        tilt={22}
        turn={-16}
        speed={34}
        lift={56}
        dim={0.6}
        fade={0.7}
        grayscale
        overlayColor="#0d0c0b"
      />
      <div className="frame-x pointer-events-none absolute inset-x-0 top-0 grid grid-cols-12 gap-[var(--gutter)] pt-24">
        <p className="mono col-span-12 text-muted md:col-span-3">[01.c] Lab</p>
        <h2 id="lab-title" className="display col-span-12 text-[clamp(40px,5.4vw,92px)] md:col-span-7">
          Sketches, prototypes <br /> & half-finished ideas.
        </h2>
      </div>
      <p className="mono pointer-events-none absolute bottom-8 left-[var(--frame)] text-muted">
        Hover to lift — {lab.length} experiments
      </p>
    </section>
  )
}
