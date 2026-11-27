import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Lenis maneja el scroll suave; GSAP le da el reloj para que ScrollTrigger
// y Lenis lean exactamente el mismo frame. Con reduced-motion: scroll nativo.
export const lenis = reducedMotion
  ? null
  : new Lenis({ autoRaf: false, lerp: 0.09, anchors: true })

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger }
