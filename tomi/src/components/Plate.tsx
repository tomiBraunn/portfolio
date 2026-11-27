import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CropMarks } from "./CropMarks"

/**
 * Placeholder de imagen: un recorte del gradient de marca con marcas de corte.
 * Cuando haya screenshots reales se pasa `src` y listo.
 */
export function Plate({
  tone = "50% 50%",
  src,
  gray,
  className,
  children,
}: {
  tone?: string
  src?: string
  gray?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={cn("relative", className)}>
      <CropMarks />
      <div
        className={cn("absolute inset-0 overflow-hidden bg-ink-2", gray && "grayscale")}
        style={
          src
            ? { backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { backgroundImage: "url(/gradient.webp)", backgroundSize: "260%", backgroundPosition: tone }
        }
      >
        {/* grilla fina tipo hoja de corte */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {children}
      </div>
    </div>
  )
}
