import { useLayoutEffect, useRef, type ReactNode } from "react"
import { gsap, reducedMotion } from "@/lib/smooth-scroll"
import { cn } from "@/lib/utils"

const COLS = 10
const ROWS = 8

/**
 * Revela el contenido "pixel a pixel" (video scroll-57): una grilla de celdas
 * color tinta que se apagan en orden aleatorio cuando el bloque entra en pantalla.
 */
export function PixelReveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to("[data-px]", {
        opacity: 0,
        duration: 0.01,
        stagger: { each: 0.008, from: "random" },
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className={cn("relative", className)}>
      {children}
      {!reducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => (
            <span key={i} data-px className="-m-px bg-ink" />
          ))}
        </div>
      )}
    </div>
  )
}
