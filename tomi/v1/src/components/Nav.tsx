export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 py-5 text-white">
        <a href="#top" className="logo-font text-[24px] leading-none lowercase">
          tomasbraun
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#work"
            className="serif-accent text-[17px] transition-opacity hover:opacity-70"
          >
            Work
          </a>
          <a
            href="#services"
            className="serif-accent text-[17px] transition-opacity hover:opacity-70"
          >
            Services
          </a>
          <a
            href="#contact"
            className="serif-accent text-[17px] transition-opacity hover:opacity-70"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
