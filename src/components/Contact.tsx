import { lazy, Suspense, useState } from "react"
import { site } from "@/data/content"
import { ParticleText } from "./ParticleText"

// three.js pesa: se carga aparte, cuando la sección se monta
const Ribbons = lazy(() => import("./Ribbons").then((m) => ({ default: m.Ribbons })))

/** CTA final: "Let's build it." en partículas (se dispersan con el cursor) sobre las cintas WebGL. */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <Suspense fallback={null}>
        <Ribbons className="absolute inset-0" />
      </Suspense>
      <div className="frame-x pointer-events-none relative grid h-full grid-cols-12 content-start gap-[var(--gutter)] pt-28">
        <p className="mono col-span-12 text-foreground/70 md:col-span-3">[04] Contact</p>
        <div className="col-span-12 md:col-span-9">
          <ParticleText
            text="Let's build it."
            font="800 220px Inter"
            letterSpacing="-10px" // −4,5 % de 220px, igual que .display
            className="pointer-events-auto"
          >
            <h2 id="contact-title" data-guide="cta" className="display text-[clamp(56px,10vw,176px)]">
              Let's build it.
            </h2>
          </ParticleText>
          <p className="mt-6 max-w-[40ch] text-[clamp(16px,1.3vw,20px)] leading-snug text-foreground/80">
            Currently taking on new projects. Tell me what you're building and I'll reply within 24 hours.
          </p>
          <div className="pointer-events-auto mt-10 flex flex-wrap gap-2">
            <button
              onClick={copyEmail}
              data-guide="email"
              className="mono bg-foreground px-5 py-3.5 text-ink transition-colors hover:bg-accent"
            >
              {copied ? "Copied ✓" : site.email}
            </button>
            <a
              href={`mailto:${site.email}`}
              className="mono border border-white/30 bg-ink/30 px-5 py-3.5 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Send an email →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
