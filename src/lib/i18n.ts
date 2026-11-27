import { useSyncExternalStore } from "react"

export type Lang = "en" | "es"

const read = (): Lang => {
  try {
    const s = localStorage.getItem("lang")
    if (s === "en" || s === "es") return s
  } catch {}
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en"
}

let lang: Lang = read()
const subs = new Set<() => void>()
document.documentElement.lang = lang

export function setLang(l: Lang) {
  lang = l
  document.documentElement.lang = l
  try {
    localStorage.setItem("lang", l)
  } catch {}
  subs.forEach((f) => f())
}

export const useLang = () =>
  useSyncExternalStore(
    (cb) => (subs.add(cb), () => subs.delete(cb)),
    () => lang,
  )

// Textos de interfaz. Los de contenido (proyectos, about) viven en data/content.ts.
const ui = {
  work: { en: "Work", es: "Trabajo" },
  stack: { en: "Stack", es: "Stack" },
  about: { en: "About", es: "Sobre mí" },
  contact: { en: "Contact", es: "Contacto" },
  index: { en: "Index", es: "Índice" },
  seeWork: { en: "See the work", es: "Ver el trabajo" },
  getInTouch: { en: "Get in touch", es: "Escribime" },
  scroll: { en: "Scroll ↓", es: "Scrolleá ↓" },
  selectedWork: { en: "Selected work", es: "Trabajo seleccionado" },
  workLead: {
    en: "Products built properly, from first schema to final pixel. Each one shipped, measured and iterated with real users.",
    es: "Productos hechos bien, del primer esquema al último píxel. Cada uno publicado, medido e iterado con usuarios reales.",
  },
  projects: { en: "projects", es: "proyectos" },
  scrollHint: { en: "scroll →", es: "scrolleá →" },
  viewProject: { en: "View project", es: "Ver proyecto" },
  year: { en: "Year", es: "Año" },
  role: { en: "Role", es: "Rol" },
  archive: { en: "Archive", es: "Archivo" },
  archiveTitle: { en: "Everything else I've built.", es: "Todo lo demás que hice." },
  vibeLabel: { en: "Photos I like", es: "Fotos que me gustan" },
  vibeTitle: { en: "My vibe.", es: "Mi vibe." },
  vibeHint: { en: "Hover to lift, {n} photos", es: "Pasá el mouse para levantar, {n} fotos" },
  toolkit: { en: "Toolkit", es: "Herramientas" },
  techStack: { en: "Tech Stack", es: "Tech Stack" },
  stackLead: {
    en: "A snapshot of what I work with. Plenty more I'd love to learn.",
    es: "Lo que uso hoy. Y mucho más que quiero aprender.",
  },
  portrait: { en: "Portrait, placeholder", es: "Retrato, provisorio" },
  cta: { en: "Let's build it.", es: "Hagámoslo." },
  ctaLead: {
    en: "Currently taking on new projects. Tell me what you're building and I'll reply within 24 hours.",
    es: "Tomando proyectos nuevos. Contame qué estás armando y te respondo en 24 horas.",
  },
  sendEmail: { en: "Send an email →", es: "Enviar un email →" },
  copied: { en: "Copied ✓", es: "Copiado ✓" },
  elsewhere: { en: "Elsewhere", es: "En otros lados" },
  basedIn: { en: "Based in", es: "Desde" },
  colophon: { en: "Colophon", es: "Colofón" },
  colophonText: {
    en: "Set in Inter, JetBrains Mono & Mikro Super. Built with React, GSAP, Lenis & Three.js.",
    es: "Tipografías Inter, JetBrains Mono y Mikro Super. Hecho con React, GSAP, Lenis y Three.js.",
  },
  tagline: { en: "Measured twice, shipped once.", es: "Medido dos veces, publicado una." },
  backToTop: { en: "Back to top ↑", es: "Volver arriba ↑" },
  backToWork: { en: "← Work", es: "← Trabajo" },
  sourceOnGithub: { en: "Source on GitHub", es: "Código en GitHub" },
  overview: { en: "Overview", es: "Resumen" },
  demo: { en: "Demo", es: "Demo" },
  demoSoon: { en: "demo coming soon", es: "demo próximamente" },
  nextProject: { en: "Next project", es: "Próximo proyecto" },
  // grupos de la tabla de stack
  Languages: { en: "Languages", es: "Lenguajes" },
  Frontend: { en: "Frontend", es: "Frontend" },
  Mobile: { en: "Mobile", es: "Mobile" },
  Backend: { en: "Backend", es: "Backend" },
  "Cloud & DevOps": { en: "Cloud & DevOps", es: "Cloud y DevOps" },
} as const

export type UiKey = keyof typeof ui

export function useT() {
  const l = useLang()
  return (k: UiKey | (string & {})) => (ui as Record<string, { en: string; es: string }>)[k]?.[l] ?? k
}
