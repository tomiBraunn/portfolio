import { lazy, Suspense } from "react"
import { stack } from "@/data/content"
import { CropMarks } from "./CropMarks"

// three.js pesa: se carga aparte, cuando la sección se monta
const AsciiObject = lazy(() => import("./canvasui/AsciiObject").then((m) => ({ default: m.AsciiObject })))

/** Tabla "Tech Stack" del Figma + una Macintosh 128K en ASCII al costado. */
export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="frame-x relative py-32">
      <div className="grid grid-cols-12 gap-[var(--gutter)]">
        <div className="col-span-12 md:col-span-6">
          <p className="mono text-muted">Toolkit</p>
          <h2 id="stack-title" data-guide="title" className="mt-4 text-[clamp(40px,4.4vw,72px)] font-extrabold tracking-[-0.035em]">
            Tech Stack
          </h2>
          <p className="mt-5 max-w-[46ch] font-mono text-[15px] leading-relaxed text-foreground/75">
            A snapshot of what I work with. Plenty more I'd love to learn.
          </p>

          <dl className="mt-14">
            {stack.map((row) => (
              <div
                key={row.group}
                data-guide={row.group}
                className="flex items-baseline justify-between gap-6 border-b border-line py-5 first:border-t"
              >
                <dt className="font-mono text-[clamp(16px,1.4vw,21px)] font-medium">{row.group}</dt>
                <dd className="mono text-right text-[12px] text-foreground/70">{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* en touch el canvas no captura el dedo: si no, bloquearía el scroll de la página */}
        <div className="relative col-span-12 mt-10 h-[min(70vw,560px)] md:col-span-5 md:col-start-8 md:mt-0 md:h-auto [@media(pointer:coarse)]:pointer-events-none">
          <CropMarks />
          <Suspense fallback={null}>
            <AsciiObject
              src="/macintosh.glb" // generado por scripts/build-macintosh.mjs
              className="h-full w-full"
              colored={false}
              color="#e0952e"
              cellSize={8}
              contrast={1.8}
              scale={3.3}
              orbit
              autoRotate
              autoRotateSpeed={0.8}
              floatIntensity={0.5}
              rotationIntensity={0.4}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
