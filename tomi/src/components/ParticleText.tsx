import { lazy, Suspense, useEffect, useState, type ReactNode } from "react"
import { useSize } from "@/lib/use-size"
import { cn } from "@/lib/utils"

// three.js pesa: se carga aparte, solo si hay partículas
const ParticleObject = lazy(() => import("./canvasui/ParticleObject").then((m) => ({ default: m.ParticleObject })))

// Alto visible de la escena de ParticleObject (fov 65°, cámara a 4.2 unidades).
const VIEW_H = 2 * 4.2 * Math.tan((65 / 2) * (Math.PI / 180))
const BLEED = 1.24 // el canvas sobresale 12% por lado para que las partículas tengan aire

/** Rasteriza el texto con la fuente real para que ParticleObject lo convierta en puntos. */
async function textToDataUrl(text: string, font: string, color: string, letterSpacing: string) {
  await document.fonts.load(font)
  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")!
  ctx.font = font
  ctx.letterSpacing = letterSpacing
  const m = ctx.measureText(text)
  const pad = 20
  c.width = Math.ceil(m.actualBoundingBoxLeft + m.actualBoundingBoxRight) + pad * 2
  c.height = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + pad * 2
  ctx.font = font
  ctx.letterSpacing = letterSpacing // se resetea al cambiar el tamaño del canvas
  ctx.fillStyle = color
  ctx.fillText(text, pad + m.actualBoundingBoxLeft, pad + m.actualBoundingBoxAscent)
  return c.toDataURL("image/png")
}

/**
 * Texto que se arma con partículas y se dispersa con el cursor (canvasui
 * particle-object). `children` es el texto real: define el tamaño, lo leen los
 * lectores de pantalla y queda visible en touch / reduced-motion.
 */
export function ParticleText({
  text,
  font,
  color = "#f2f0eb",
  letterSpacing = "0px",
  className,
  children,
}: {
  text: string
  font: string
  color?: string
  /** tracking del texto real, en px del tamaño de `font` */
  letterSpacing?: string
  className?: string
  children: ReactNode
}) {
  const [ref, size] = useSize<HTMLDivElement>()
  const [src, setSrc] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const ok = window.matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches
    if (ok) textToDataUrl(text, font, color, letterSpacing).then(setSrc)
  }, [text, font, color, letterSpacing])

  const scale = size.height ? ((VIEW_H * (size.width / size.height)) / BLEED) * 0.92 : 6

  return (
    <div ref={ref} className={cn("relative w-fit", className)}>
      <div className={cn("transition-opacity duration-700", ready && "opacity-0")}>{children}</div>
      {src && (
        <div className="absolute inset-[-12%]">
          <Suspense fallback={null}>
            <ParticleObject
              src={src}
              className="h-full w-full"
              count={30000}
              size={1.4}
              sizeVariance={0.3}
              color={color}
              radius={120}
              strength={1.3}
              swirl={0.9}
              drift={0}
              scale={scale}
              floatIntensity={0.15}
              rotationIntensity={0}
              orbit={false}
              onLoad={() => setReady(true)}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
}
