// Single source of truth for the site's content.
// Swap the placeholder projects below for Tomas's real three.

export const site = {
  name: "Tomas Braun",
  email: "hello@tomasbraun.dev",
  location: "Buenos Aires, Argentina",
  socials: [
    { label: "GitHub", href: "https://github.com/tomasbraun" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tomasbraun" },
    { label: "X / Twitter", href: "https://x.com/tomasbraun" },
  ],
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
  // Placeholder visual: a gradient until real screenshots exist.
  gradient: string
}

export const projects: Project[] = [
  {
    index: "01",
    name: "Turnia",
    tagline: "Booking infrastructure for local businesses",
    description:
      "A scheduling platform used by barbershops and clinics across Buenos Aires. Owners manage their calendar, clients book in seconds, and no-shows dropped thanks to automated WhatsApp reminders. Built end to end: data model, payments, notifications and a polished booking flow.",
    role: "Design, full-stack development, deployment",
    year: "2025",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Mercado Pago"],
    href: "#",
    gradient: "linear-gradient(135deg, #b28dff 0%, #4fd0ff 100%)",
  },
  {
    index: "02",
    name: "Ledgerly",
    tagline: "Personal finance that respects inflation",
    description:
      "A finance tracker built for economies where money moves fast. Multi-currency accounts, automatic inflation adjustment and clear monthly insights. Handles thousands of transactions with realtime sync between devices.",
    role: "Product, frontend & backend",
    year: "2025",
    stack: ["React", "Node.js", "Supabase", "Tailwind"],
    href: "#",
    gradient: "linear-gradient(135deg, #23d3a4 0%, #f2e26c 100%)",
  },
  {
    index: "03",
    name: "Quipu",
    tagline: "Inventory over WhatsApp for small shops",
    description:
      "Small shops don't want dashboards — they want to text. Quipu lets shop owners track stock, register sales and get a daily summary entirely through WhatsApp. A conversational interface backed by a real inventory engine.",
    role: "Architecture, bot & API development",
    year: "2024",
    stack: ["Node.js", "WhatsApp API", "Redis", "Docker"],
    href: "#",
    gradient: "linear-gradient(135deg, #f8b8ac 0%, #e11438 100%)",
  },
]

export const services = [
  {
    title: "For startups",
    body: "You have an idea and a deadline. I build MVPs that are ready for real users — not prototypes that get thrown away. From first commit to first customer in weeks.",
  },
  {
    title: "For businesses",
    body: "Manual work is expensive. I build internal tools, automations and integrations that quietly save your team hours every single week.",
  },
  {
    title: "For agencies",
    body: "Extra hands that don't need hand-holding. I plug into your team, pick up tickets on day one and ship production-quality code under your flag.",
  },
]

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "React Native",
  "Docker",
  "Redis",
  "AWS",
  "Git",
]

export const principles = [
  {
    title: "Ship, then polish",
    body: "Working software in front of real users beats a perfect plan. I ship early, measure and iterate.",
  },
  {
    title: "Own the whole stack",
    body: "Database, API, frontend, deploy. One person who understands the entire system means fewer meetings and faster decisions.",
  },
  {
    title: "Native to the modern stack",
    body: "I didn't migrate to TypeScript, serverless and AI tooling — I learned to build with them from day one.",
  },
]
