import { setLang, useLang, useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Wordmark } from "./Wordmark"

const LINKS = [
  { href: "#work", key: "work" },
  { href: "#stack", key: "stack" },
  { href: "#about", key: "about" },
  { href: "#contact", key: "contact" },
] as const

export function Nav() {
  const t = useT()
  const lang = useLang()
  return (
    <header className="frame-x fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between py-4 text-white">
        <a href="#top" aria-label="tomasbraun — inicio" data-nav-logo className="block">
          <Wordmark className="text-[24px]" />
        </a>
        <div className="flex items-center gap-5 md:gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono group flex items-baseline gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <span className={l.key === "stack" || l.key === "about" ? "hidden sm:inline" : ""}>
                {t(l.key)}
              </span>
            </a>
          ))}
          <div className="mono flex gap-1.5" role="group" aria-label="Language">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn("transition-colors hover:text-white", lang === l ? "text-white" : "text-white/40")}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
