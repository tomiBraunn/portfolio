import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Work } from "@/components/Work"
import { Services } from "@/components/Services"
import { Stack } from "@/components/Stack"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
