import { cn } from "@/lib/utils"

const CORNERS = [
  "-left-2 -top-2 border-l border-t",
  "-right-2 -top-2 border-r border-t",
  "-bottom-2 -left-2 border-b border-l",
  "-bottom-2 -right-2 border-b border-r",
]

/** Marcas de corte en las 4 esquinas del padre (que debe ser relative). */
export function CropMarks({ className }: { className?: string }) {
  return (
    <>
      {CORNERS.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn(
            "pointer-events-none absolute size-3.5 border-line-strong",
            pos,
            className,
          )}
        />
      ))}
    </>
  )
}
