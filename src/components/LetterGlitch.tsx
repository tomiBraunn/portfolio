import { useEffect, useRef } from "react"
import { reducedMotion } from "@/lib/smooth-scroll"

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789{}[]<>/=+-*#$&!?;:"
const FONT = 14
const CW = 10 // ancho de celda
const CH = 18 // alto de celda
const PALETTE = ["#9a3f17", "#c47a1c", "#b88a1e"]

/**
 * Fondo de letras que "glitchean" (idea de reactbits Letter Glitch) en canvas 2D:
 * cada frame algunas celdas cambian de carácter y se encienden en la paleta,
 * después se apagan de nuevo al color base. Solo anima mientras está visible.
 */
export function LetterGlitch({
  colors = PALETTE,
  base = "#3d3731",
  rate = 0.012,
  className,
}: {
  colors?: string[]
  base?: string
  rate?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext("2d")!
    let cols = 0
    let rows = 0
    let chars: string[] = []
    let heat: Float32Array = new Float32Array(0)
    let tint: Uint8Array = new Uint8Array(0)
    const pick = () => CHARS[(Math.random() * CHARS.length) | 0]

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      c.width = c.clientWidth * dpr
      c.height = c.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT}px "JetBrains Mono", monospace`
      ctx.textBaseline = "top"
      cols = Math.ceil(c.clientWidth / CW)
      rows = Math.ceil(c.clientHeight / CH)
      chars = Array.from({ length: cols * rows }, pick)
      heat = new Float32Array(cols * rows)
      tint = new Uint8Array(cols * rows)
      paint()
    }

    const paint = () => {
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
      for (let i = 0; i < chars.length; i++) {
        const h = heat[i]
        ctx.globalAlpha = 0.55 + h * 0.45
        ctx.fillStyle = h > 0.05 ? colors[tint[i] % colors.length] : base
        ctx.fillText(chars[i], (i % cols) * CW, ((i / cols) | 0) * CH)
      }
      ctx.globalAlpha = 1
    }

    let raf = 0
    let last = 0
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (t - last < 50) return // ~20fps alcanza para un glitch
      last = t
      const n = Math.ceil(chars.length * rate)
      for (let k = 0; k < n; k++) {
        const i = (Math.random() * chars.length) | 0
        chars[i] = pick()
        heat[i] = 1
        tint[i] = (Math.random() * colors.length) | 0
      }
      for (let i = 0; i < heat.length; i++) heat[i] *= 0.88
      paint()
    }

    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting && !reducedMotion) raf = requestAnimationFrame(frame)
    })
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    io.observe(c)
    document.fonts?.ready.then(resize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [colors, base, rate])

  return <canvas ref={ref} aria-hidden className={className} />
}
