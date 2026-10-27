import { site } from "@/data/content"

export function Footer() {
  const linkClass =
    "serif-accent text-lg leading-relaxed transition-colors duration-300 hover:text-white"

  return (
    <footer
      className="relative overflow-hidden text-accent"
      style={{
        background: "linear-gradient(180deg, rgb(0,0,0) 0%, #560319 100%)",
      }}
    >
      <div className="flex flex-col px-4 pb-10 pt-24">
        <div className="mx-auto w-full max-w-[1400px]">
          <hr className="border-accent/40" />

          <div className="mt-12 grid gap-10 md:grid-cols-4">
            <ul className="flex flex-col gap-1">
              <li>
                <a href="#work" className={linkClass}>
                  Work
                </a>
              </li>
              <li>
                <a href="#services" className={linkClass}>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className={linkClass}>
                  Contact
                </a>
              </li>
            </ul>

            <ul className="flex flex-col gap-1">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="serif-accent text-lg leading-relaxed">
              <p>Buenos Aires</p>
              <p>Argentina</p>
            </div>

            <div className="serif-accent text-lg leading-relaxed">
              <p>Remote friendly</p>
              <p>Working worldwide</p>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-1 text-[15px]">
            <p>Crafted in Buenos Aires. Shipping worldwide.</p>
            <p>© {new Date().getFullYear()}, {site.name}®</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
