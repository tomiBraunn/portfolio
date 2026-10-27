import { Wordmark } from "./Wordmark"

const LINKS = [
  { href: "#work", label: "Work", n: "01" },
  { href: "#stack", label: "Stack", n: "02" },
  { href: "#about", label: "About", n: "03" },
  { href: "#contact", label: "Contact", n: "04" },
]

export function Nav() {
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
              <span className="hidden text-[9px] text-white/40 md:inline">[{l.n}]</span>
              <span className={l.label === "Stack" || l.label === "About" ? "hidden sm:inline" : ""}>
                {l.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
