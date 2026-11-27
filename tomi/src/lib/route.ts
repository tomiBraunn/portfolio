import { useSyncExternalStore } from "react"
import { lenis, ScrollTrigger } from "./smooth-scroll"

// Router mínimo por hash: "#/work/<slug>" abre la página del proyecto, cualquier otro hash es la home.
// Por hash y no por path para que funcione en cualquier hosting estático sin rewrites.
const PREFIX = "#/work/"

const read = () => (location.hash.startsWith(PREFIX) ? decodeURIComponent(location.hash.slice(PREFIX.length)) : null)

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb)
  return () => window.removeEventListener("hashchange", cb)
}

export const useProjectSlug = () => useSyncExternalStore(subscribe, read, () => null)

export const projectHref = (slug: string) => `${PREFIX}${slug}`

const jump = (y: number | HTMLElement) => {
  if (lenis) {
    lenis.resize() // la altura cambió con la página: sin esto Lenis recorta el destino
    lenis.scrollTo(y, { immediate: true, force: true })
  }
  else if (typeof y === "number") window.scrollTo(0, y)
  else y.scrollIntoView()
}

/** Al cambiar de página: arriba de todo, o a la sección pedida cuando la home ya montó. */
export function scrollAfterRoute(section?: string) {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    const el = section ? document.getElementById(section) : null
    jump(el ?? 0)
  })
}

let pending: string | undefined
export const takePendingSection = () => {
  const s = pending
  pending = undefined
  return s
}

/** Vuelve a la home y, opcionalmente, a una sección (#work, #about…). */
export function goHome(section?: string) {
  pending = section
  history.pushState(null, "", section ? `#${section}` : location.pathname)
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

// En la página de un proyecto, los anclas de sección (#work, #about…) del nav y el footer
// no tienen destino: se interceptan antes que Lenis y vuelven a la home. #top sube.
document.addEventListener(
  "click",
  (e) => {
    if (!read()) return
    const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]')
    const id = a?.getAttribute("href")!.slice(1)
    if (!a || !id || id.startsWith("/")) return
    e.preventDefault()
    e.stopPropagation()
    if (id === "top") jump(0)
    else goHome(id)
  },
  true,
)
