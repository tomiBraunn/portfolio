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
    { label: "GitHub", href: "https://github.com/tomiBraunn" },
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
    name: "Kinetix",
    tagline: "Physical rehab, turned into games",
    description:
      "Rehab exercises for older adults, reimagined as games. While the patient plays, computer vision tracks balance, posture and movement in real time, and the physiotherapist follows metrics, history and progress from a dashboard.",
    role: "Full-stack, computer vision, mobile",
    year: "2026",
    stack: ["React", "MediaPipe", "Phaser", "Express", "Supabase", "Expo"],
    href: "https://github.com/tomiBraunn/Kinetix",
    tone: "45% 10%",
  },
  {
    index: "02",
    name: "SlidesPlus",
    tagline: "AI presentation builder, slide by slide in HTML",
    description:
      "Builds full presentations from an idea, a prompt or a document. Every slide is a 1920×1080 HTML section, so layouts, type and animation go beyond a classic slide engine. Edit visually, in code with Monaco, or by chatting.",
    role: "Product, frontend & backend",
    year: "2026",
    stack: ["React", "GSAP", "Monaco", "Express", "PostgreSQL", "Supabase"],
    href: "https://github.com/tomiBraunn/Slidesplus",
    tone: "15% 70%",
  },
  {
    index: "03",
    name: "synqfy",
    tagline: "Your lights, synced to what's playing",
    description:
      "Extracts the palette from the current Spotify album cover and projects it onto Home Assistant lights. Runs server-side, with synced lyrics, queue, night mode and a kiosk view for tablets.",
    role: "Full-stack, home automation",
    year: "2026",
    stack: ["Node.js", "Spotify API", "Home Assistant", "Docker"],
    href: "https://github.com/tomiBraunn/synqfy",
    tone: "70% 35%",
  },
  {
    index: "04",
    name: "Tinta",
    tagline: "Live polls, drawn in ink",
    description:
      "Create a poll, share the link, watch results appear in real time. No account needed to vote, optional passwords and a handcrafted paper-and-ink design. Started as a school project, grew into a small product.",
    role: "Design, full-stack",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Supabase"],
    href: "https://github.com/tomiBraunn/Tinta",
    tone: "95% 90%",
  },
  {
    index: "05",
    name: "Backlight",
    tagline: "A guard against hidden prompt injection",
    description:
      "A Claude skill that inspects documents for hidden instructions (white text, zero-size fonts, invisible Unicode) before acting on them, and reports what it finds instead of silently obeying.",
    role: "Author",
    year: "2026",
    stack: ["Claude Skills", "Prompt engineering"],
    href: "https://github.com/tomiBraunn/backlight-skill",
    tone: "30% 60%",
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
