// Única fuente de contenido del sitio. Todo lo marcado como placeholder
// se reemplaza por contenido real sin tocar los componentes.

export const site = {
  name: "Tomas Braun",
  role: "Full-stack developer",
  email: "hello@tomasbraun.dev",
  location: "Buenos Aires, Argentina",
  coords: "34°36′S 58°22′W",
  availability: "Available — Q4 2026",
  socials: [
    { label: "GitHub", href: "https://github.com/tomasbraun" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tomasbraun" },
    { label: "X / Twitter", href: "https://x.com/tomasbraun" },
  ],
}

export const hero = {
  intro:
    "Tomas Braun, Buenos Aires. Full-stack developer — database, API, frontend and every pixel in between.",
}

export type Project = {
  index: string
  name: string
  tagline: string
  description: string
  role: string
  year: string
  stack: string[]
  href: string
  // Placeholder visual: un recorte del gradient de marca hasta tener screenshots.
  tone: string
}

export const projects: Project[] = [
  {
    index: "01",
    name: "Turnia",
    tagline: "Booking infrastructure for local businesses",
    description:
      "A scheduling platform used by barbershops and clinics across Buenos Aires. Owners manage their calendar, clients book in seconds, and no-shows dropped thanks to automated WhatsApp reminders.",
    role: "Design, full-stack, deploy",
    year: "2025",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Mercado Pago"],
    href: "#",
    tone: "15% 70%",
  },
  {
    index: "02",
    name: "Ledgerly",
    tagline: "Personal finance that respects inflation",
    description:
      "A finance tracker built for economies where money moves fast. Multi-currency accounts, automatic inflation adjustment and clear monthly insights, with realtime sync between devices.",
    role: "Product, frontend & backend",
    year: "2025",
    stack: ["React", "Node.js", "Supabase", "Tailwind"],
    href: "#",
    tone: "70% 35%",
  },
  {
    index: "03",
    name: "Quipu",
    tagline: "Inventory over WhatsApp for small shops",
    description:
      "Small shops don't want dashboards — they want to text. Quipu lets owners track stock, register sales and get a daily summary entirely through WhatsApp.",
    role: "Architecture, bot & API",
    year: "2024",
    stack: ["Node.js", "WhatsApp API", "Redis", "Docker"],
    href: "#",
    tone: "95% 90%",
  },
  {
    index: "04",
    name: "Kinetix",
    tagline: "Motion tooling for product teams",
    description:
      "Placeholder — a fourth slot so the horizontal track breathes. Swap it for a real project or delete it; the track adapts to any length.",
    role: "Frontend, motion",
    year: "2026",
    stack: ["React", "GSAP", "Canvas"],
    href: "#",
    tone: "45% 10%",
  },
]

// Filas del marquee tipográfico. Cada palabra alterna estilo (bold/outline/light).
export const marqueeRows = [
  ["Measure", "Align", "Ship", "Iterate"],
  ["TypeScript", "React", "Node.js", "PostgreSQL"],
  ["Schema", "API", "Interface", "Deploy"],
  ["Buenos Aires", "Remote", "Worldwide", "Since 2021"],
]

// Archivo: trabajos chicos / experimentos. Placeholders.
export const archive = [
  { title: "Booking widget", year: "2025", kind: "UI", tone: "10% 20%", span: "md:col-span-4", ratio: "aspect-[4/5]", offset: "md:mt-0" },
  { title: "Inflation API", year: "2025", kind: "Backend", tone: "80% 40%", span: "md:col-span-5 md:col-start-8", ratio: "aspect-[16/10]", offset: "md:mt-40" },
  { title: "Stock bot", year: "2024", kind: "Automation", tone: "50% 90%", span: "md:col-span-4 md:col-start-3", ratio: "aspect-square", offset: "md:-mt-10" },
  { title: "Design tokens", year: "2024", kind: "System", tone: "30% 60%", span: "md:col-span-3 md:col-start-9", ratio: "aspect-[3/4]", offset: "md:mt-24" },
  { title: "Realtime sync", year: "2023", kind: "Infra", tone: "90% 10%", span: "md:col-span-6 md:col-start-1", ratio: "aspect-[16/9]", offset: "md:mt-8" },
  { title: "CLI scaffolder", year: "2023", kind: "Tooling", tone: "60% 75%", span: "md:col-span-4 md:col-start-8", ratio: "aspect-[4/5]", offset: "md:mt-32" },
]

// Lab: pared de capturas. Placeholder: fotos grises de picsum hasta tener screenshots.
export const lab = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164].map(
  (id, i) => ({
    image: `https://picsum.photos/id/${id}/600/400?grayscale`,
    title: `Experiment ${String(i + 1).padStart(2, "0")}`,
  }),
)

export const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind"] },
  { group: "Mobile", items: ["React Native", "Expo"] },
  { group: "Backend", items: ["Node.js", "Supabase", "PostgreSQL", "Redis"] },
  { group: "Cloud & DevOps", items: ["Docker", "AWS", "Vercel", "Git"] },
]

export const about = {
  lead:
    "I'm Tomas, a developer who cares about the parts nobody sees: the schema, the edge cases, the 1px that's off.",
  body:
    "I learned to build with TypeScript, serverless and AI tooling from day one. I own the whole stack so decisions stay fast and nothing falls between the cracks.",
}

export const principles = [
  { title: "Ship, then polish", body: "Working software in front of real users beats a perfect plan." },
  { title: "Own the whole stack", body: "Database, API, frontend, deploy — one person, fewer handoffs." },
  { title: "Measure twice", body: "Every block sits on the grid. Every query has an index." },
  { title: "Write it down", body: "Readable code, clear PRs, decisions documented where they happen." },
  { title: "Native to the modern stack", body: "TypeScript, serverless and AI tooling from day one, not migrated to." },
]

export const timeline = [
  { year: "2026", text: "Independent — building products for startups and agencies." },
  { year: "2025", text: "Shipped Turnia and Ledgerly to production." },
  { year: "2024", text: "Quipu: inventory over WhatsApp for small shops." },
  { year: "2023", text: "First freelance clients. Realtime sync and tooling." },
  { year: "2021", text: "Wrote my first line of TypeScript." },
]
