import { useCallback, useEffect, useState } from "react"
import { Loader } from "@/components/Loader"
import { Frame } from "@/components/Frame"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Work } from "@/components/Work"
import { Archive } from "@/components/Archive"
import { Vibe } from "@/components/Vibe"
import { Stack } from "@/components/Stack"
import { About } from "@/components/About"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { setLogoFavicon } from "@/components/Wordmark"
import { ProjectPage } from "@/components/ProjectPage"
import { projects } from "@/data/content"
import { scrollAfterRoute, takePendingSection, useProjectSlug } from "@/lib/route"

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])
  useEffect(() => {
    setLogoFavicon()
  }, [])

  const slug = useProjectSlug()
  const project = projects.find((p) => p.slug === slug)
  useEffect(() => {
    scrollAfterRoute(project ? undefined : takePendingSection())
  }, [project])

  return (
    <>
      <Loader onDone={onLoaded} />
      <Frame />
      <Nav />
      {project ? (
        <ProjectPage project={project} />
      ) : (
        <main>
          <Hero ready={ready} />
          <Work />
          <Archive />
          <Vibe />
          <Stack />
          <About />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
