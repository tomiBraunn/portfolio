import { cn } from "@/lib/utils"
import { STRIP_STEPS } from "@/lib/brand"

/** El logo: "tomasbraun" en Mikro Super Bold Italic (clase .logo-font) con la tira de 7 grises debajo. */
export const LOGO = "tomasbraun"
export const LOGO_TRACKING = -0.03 // em, igual que .logo-font
export const logoFont = (px: number) => `italic 700 ${px}px "Mikro Super Bold Italic"`

/** Espera la fuente del logo (con tope, para no colgar el loader si el CDN falla). */
export const loadLogoFont = () =>
  Promise.race([document.fonts.load(logoFont(100)), new Promise((r) => setTimeout(r, 1500))])

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("logo-font inline-flex flex-col leading-none", className)}>
      <span className="whitespace-nowrap">{LOGO}</span>
      <LogoStrip className="mt-[0.1em] h-[0.09em]" />
    </span>
  )
}

/** Tira de 7 grises, del ancho del contenedor. El filete deja leer el paso negro sobre tinta. */
export function LogoStrip({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex w-full outline outline-1 outline-white/25", className)}>
      {STRIP_STEPS.map((c) => (
        <i key={c} className="flex-1" style={{ background: c }} />
      ))}
    </span>
  )
}

/**
 * Favicon "tb" en la tipografía del logo. Un SVG no puede cargar la webfont,
 * así que se dibuja en canvas cuando la fuente está lista y se reemplaza el ícono.
 */
export async function setLogoFavicon() {
  await loadLogoFont()
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#0d0c0b"
  ctx.beginPath()
  ctx.roundRect(0, 0, 64, 64, 12)
  ctx.fill()
  ctx.font = logoFont(40)
  ctx.letterSpacing = `${LOGO_TRACKING * 40}px`
  ctx.fillStyle = "#f2f0eb"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("tb", 31, 34)
  const link = document.querySelector<HTMLLinkElement>("link[rel=icon]")
  if (link) link.href = c.toDataURL("image/png")
}
