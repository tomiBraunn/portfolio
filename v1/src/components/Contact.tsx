import { useState } from "react"
import { site } from "@/data/content"
import { Reveal, SectionLabel } from "./Reveal"

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
    <section id="contact" className="mx-auto max-w-[1200px] px-6 py-36">
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-6 max-w-[820px] text-[clamp(38px,6.5vw,72px)] leading-[1.05] tracking-[-0.02em]">
          Have an idea? Let's <span className="serif-accent">build</span> it.
        </h2>
        <p className="mt-8 max-w-[440px] text-lg leading-relaxed text-muted">
          Currently taking on new projects. Tell me what you're building and
          I'll reply within 24 hours.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={copyEmail}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
          >
            {copied ? "Copied" : site.email}
          </button>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-white/40"
          >
            Send an email
          </a>
        </div>
      </Reveal>
    </section>
  )
}
