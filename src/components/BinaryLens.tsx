import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const CELL = 9 // px por dígito

/**
 * Lupa binaria (idea de canvasui "asciify?charset=binary"): alrededor del
 * cursor la imagen se ve como 0s y 1s. Los dígitos se tiñen con la imagen por
 * composición de canvas (sin leer píxeles), así funciona en cualquier navegador.
 * `tone` replica el recorte de <Plate> (background-size 260% + position).
 */
export function BinaryLens({
  src = "/gradient.webp",
  tone = "50% 50%",
  className,
}: {
  src?: string
  tone?: string
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = host.current
    const c = canvas.current
    if (!el || !c) return
    const img = new Image()
    img.src = src

    const draw = () => {
      if (!img.complete || !img.naturalWidth) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = el.clientWidth
      const h = el.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      const ctx = c.getContext("2d")!
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 1. dígitos en blanco
      ctx.clearRect(0, 0, w, h)
      ctx.font = `500 ${CELL}px "JetBrains Mono", monospace`
      ctx.textBaseline = "top"
      ctx.fillStyle = "#fff"
      for (let y = 0; y < h; y += CELL + 2) {
        for (let x = 0; x < w; x += CELL * 0.62) {
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y)
        }
      }
      // 2. teñidos con la imagen (mismo recorte que el Plate)
      const [px, py] = tone.split(" ").map((v) => parseFloat(v) / 100)
      const dw = w * 2.6
      const dh = (img.naturalHeight / img.naturalWidth) * dw
      ctx.globalCompositeOperation = "source-in"
      ctx.filter = "brightness(1.6) saturate(1.2)"
      ctx.drawImage(img, (w - dw) * px, (h - dh) * py, dw, dh)
      // 3. fondo tinta detrás de los dígitos
      ctx.filter = "none"
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = "#0d0c0b"
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "source-over"
    }

    img.onload = draw
    const ro = new ResizeObserver(draw)
    ro.observe(el)

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    const enter = () => el.style.setProperty("--r", "130px")
    const leave = () => el.style.setProperty("--r", "0px")
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerenter", enter)
    el.addEventListener("pointerleave", leave)
    return () => {
      ro.disconnect()
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerenter", enter)
      el.removeEventListener("pointerleave", leave)
    }
  }, [src, tone])

  return (
    <div ref={host} className={cn("absolute inset-0", className)} style={{ transition: "--r .45s cubic-bezier(.2,.7,.2,1)" }}>
      <canvas
        ref={canvas}
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(circle var(--r) at var(--mx, 50%) var(--my, 50%), #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--mx, 50%) var(--my, 50%), #000 55%, transparent 100%)",
        }}
      />
    </div>
  )
}
