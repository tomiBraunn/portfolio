import { site } from "@/data/content"
import { Wordmark } from "./Wordmark"

const COLUMNS = [
  {
    title: "Index",
    links: [
      { label: "Work", href: "#work" },
      { label: "Stack", href: "#stack" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [{ label: site.email, href: `mailto:${site.email}` }, ...site.socials],
  },
]

/** Footer estilo skarlo / ESR: logo de borde a borde, una línea y columnas. */
export function Footer() {
  return (
    <footer className="frame-x relative overflow-hidden pb-14 pt-24">
      <div data-guide="wordmark">
        <Wordmark className="-ml-[0.04em] text-[calc((100vw-2*var(--frame))*0.192)] leading-[0.8] text-foreground" />
      </div>

      <hr className="mt-10 border-line-strong" />

      <div className="mt-10 grid grid-cols-2 gap-[var(--gutter)] gap-y-10 md:grid-cols-12">
        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-3">
            <p className="mono text-muted">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-3">
          <p className="mono text-muted">Based in</p>
          <p className="mt-4 leading-relaxed">
            {site.location}
            <br />
            <span className="mono text-muted">{site.coords}</span>
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="mono text-muted">Colophon</p>
          <p className="mt-4 leading-relaxed text-foreground/75">
            Set in Inter, JetBrains Mono & Mikro Super. Built with React, GSAP, Lenis & Three.js.
          </p>
        </div>
      </div>

      <div className="mono mt-20 flex flex-wrap justify-between gap-4 text-muted">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Measured twice, shipped once.</span>
        <a href="#top" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
