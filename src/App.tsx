import { useCallback, useEffect, useState } from "react"
import { Loader } from "@/components/Loader"
import { Frame } from "@/components/Frame"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { Work } from "@/components/Work"
import { Archive } from "@/components/Archive"
import { Lab } from "@/components/Lab"
import { Stack } from "@/components/Stack"
import { About } from "@/components/About"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { setLogoFavicon } from "@/components/Wordmark"

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])
  useEffect(() => {
    setLogoFavicon()
  }, [])

  return (
    <>
      <Loader onDone={onLoaded} />
      <Frame />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Work />
        <Archive />
        <Lab />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
