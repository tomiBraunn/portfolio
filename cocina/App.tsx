import { useState, type FormEvent } from "react"
import DriftWall from "@/components/reactbits/DriftWall"
import { contacto, cuaderno, etiqueta, nav, site, sobreMi } from "./content"
import { Hero } from "./Hero"
import { FLOR, Platos } from "./Platos"
import { Receta } from "./Receta"

/*
 * En escritorio cada sección es una pantalla del Figma (1920 × 1080) montada en `.escena`
 * y medida en var(--u) (1u = 1px del diseño). En mobile todo vuelve a ser una columna.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Platos />
        <Receta />
        <Cuaderno />
        <SobreMi />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

/** Pared de fotos inclinada (reactbits Drift Wall), sola, a pantalla completa. */
function Cuaderno() {
  return (
    <section id="cuaderno" aria-labelledby="cuaderno-title" className="relative h-svh min-h-[560px] overflow-hidden">
      <h2 id="cuaderno-title" className="sr-only">
        Del cuaderno: fotos de lo que fui cocinando
      </h2>
      <DriftWall
        items={cuaderno}
        columns={6}
        tileWidth={290}
        tileHeight={192}
        gap={34}
        radius={8}
        tilt={0}
        turn={0}
        roll={-8.5}
        speed={26}
        lift={40}
        dim={0.5}
        fade={0.15}
        overlayColor="#ece6dd"
      />
    </section>
  )
}

function SobreMi() {
  return (
    <section aria-labelledby="sobre-title" className="relative py-28 md:flex md:min-h-svh md:items-center md:py-0">
      <div className="escena px-g md:px-0">
        {/* recortada como con un cortante de galletitas con forma de flor */}
        <div
          className="aspect-square w-[min(80vw,420px)] overflow-hidden md:absolute md:left-[calc(94*var(--u))] md:top-[calc(229*var(--u))] md:w-[calc(596*var(--u))]"
          style={{ clipPath: FLOR }}
        >
          <img src={sobreMi.src} alt={sobreMi.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="mt-12 flex flex-col gap-6 md:absolute md:left-[calc(798*var(--u))] md:top-[calc(310*var(--u))] md:mt-0 md:w-[calc(921*var(--u))] md:gap-[calc(32*var(--u))]">
          <h2 id="sobre-title" className="titular text-[clamp(38px,9vw,56px)] md:text-[calc(80*var(--u))] md:text-wrap">
            {sobreMi.lead}
          </h2>
          <div className="text-[19px] leading-[1.65] text-leche md:text-[calc(30*var(--u))]">
            <p>{sobreMi.body}</p>
            <p>
              {sobreMi.dicho.antes}
              <strong className="font-bold">{sobreMi.dicho.frase}</strong>
            </p>
          </div>
          <p className="mano -rotate-2 self-start text-[34px] font-bold md:text-[calc(38*var(--u))]">{sobreMi.firma}</p>
        </div>
      </div>
    </section>
  )
}

/** Cierre: un talonario de pedidos sobre la mesada de chocolate. Lo que se marca y se escribe arma el mail. */
function Contacto() {
  const [anotado, setAnotado] = useState(false)

  const pedir = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const dulces = f.getAll("dulce").join(", ")
    const renglones = contacto.campos
      .map(([name, rotulo]) => [rotulo, String(f.get(name) ?? "").trim()])
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
    const cuerpo = [dulces && `Quiero: ${dulces}`, ...renglones].filter(Boolean).join("\n")
    const asunto = dulces ? `Pedido: ${dulces}` : "Hola, Geri"
    setAnotado(true)
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative bg-cacao pb-16 pt-28 text-espuma md:flex md:min-h-svh md:items-center md:py-0"
    >
      <div className="escena px-g md:px-0">
        <div className="md:absolute md:left-[calc(92*var(--u))] md:top-[calc(280*var(--u))] md:w-[calc(911*var(--u))]">
          <h2 id="contacto-title" className="titular text-[clamp(52px,13vw,84px)] md:text-[calc(150*var(--u))]">
            {contacto.title}
          </h2>
          <p className="mt-6 max-w-[38ch] text-[19px] leading-[1.65] md:mt-[calc(24*var(--u))] md:w-[calc(828*var(--u))] md:max-w-none md:text-[calc(30*var(--u))]">
            {contacto.body}
          </p>
          <p className="mt-8 text-[19px] md:mt-[calc(30*var(--u))] md:text-[calc(30*var(--u))]">
            ¿Preferís escribir directo?{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-[0.18em] transition-colors hover:text-caramelo">
              {site.email}
            </a>
          </p>
        </div>

        <div className="relative mx-auto mt-16 w-full max-w-[540px] rotate-[1.5deg] [filter:drop-shadow(0_34px_40px_rgb(0_0_0/.45))] md:absolute md:left-[calc(1166*var(--u))] md:top-[calc(252*var(--u))] md:mt-0 md:w-[calc(540*var(--u))] md:max-w-none">
          {/* la copia rosada del talonario, asomando por debajo */}
          <div aria-hidden className="talon absolute inset-0 translate-x-2 translate-y-3 rotate-[2.5deg] [--talon:#efcabd]" />

          <form
            onSubmit={pedir}
            className="talon relative px-6 pb-8 pt-9 text-cacao sm:px-10 md:px-[calc(40*var(--u))] md:pb-[calc(34*var(--u))] md:pt-[calc(36*var(--u))]"
          >
            <div className="flex items-end justify-between border-b-2 border-caramelo pb-3 text-caramelo md:pb-[calc(12*var(--u))]">
              <div>
                <p className="text-[14px] italic md:text-[calc(14*var(--u))]">Cocina de Geri</p>
                <p className="text-[40px] font-semibold leading-none tracking-[-0.025em] md:text-[calc(40*var(--u))]">Pedido</p>
              </div>
              <p aria-hidden className="text-[18px] tabular-nums md:text-[calc(18*var(--u))]">
                {contacto.numero}
              </p>
            </div>

            <fieldset className="mt-6 md:mt-[calc(24*var(--u))]">
              <legend className="text-[15px] italic text-leche md:text-[calc(15*var(--u))]">Qué va</legend>
              <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5 md:mt-[calc(12*var(--u))] md:gap-x-[calc(20*var(--u))] md:gap-y-[calc(10*var(--u))]">
                {contacto.opciones.map((o) => (
                  <label
                    key={o}
                    className="flex cursor-pointer items-center gap-3 text-[16px] leading-tight sm:text-[17px] md:gap-[calc(12*var(--u))] md:text-[calc(17*var(--u))]"
                  >
                    <input type="checkbox" name="dulce" value={o} className="sr-only" />
                    <span className="casilla relative size-[22px] shrink-0 border-[1.5px] border-caramelo md:size-[calc(22*var(--u))]">
                      {/* tilde a birome, más grande que la casilla */}
                      <svg aria-hidden viewBox="0 0 24 24" className="absolute -left-[9%] -top-[45%] size-[145%] overflow-visible">
                        <path d="M3 13 Q6.5 15.5 9 20 Q14 8 23 0" pathLength={1} fill="none" stroke="var(--color-tinta)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 space-y-3 md:mt-[calc(28*var(--u))] md:space-y-[calc(12*var(--u))]">
              {contacto.campos.map(([name, rotulo, ejemplo]) => (
                <label
                  key={name}
                  className="flex items-baseline gap-4 border-b border-dashed border-cacao focus-within:border-solid focus-within:border-caramelo md:gap-[calc(16*var(--u))]"
                >
                  <span className="w-[4.8rem] shrink-0 text-[15px] italic text-leche md:w-[calc(77*var(--u))] md:text-[calc(15*var(--u))]">{rotulo}</span>
                  <input
                    name={name}
                    placeholder={ejemplo}
                    autoComplete="off"
                    className="mano min-w-0 flex-1 bg-transparent pb-0.5 text-[22px] font-bold text-tinta outline-none placeholder:text-tinta/30 sm:text-[26px] md:text-[calc(26*var(--u))]"
                  />
                </label>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:mt-[calc(36*var(--u))]">
              <p className="mano -rotate-2 text-[23px] font-bold text-mandarina md:text-[calc(23*var(--u))]">se abre tu mail con todo anotado</p>
              <button className="rounded-full bg-caramelo px-7 py-4 text-[17px] text-hoja transition-colors hover:bg-cacao md:px-[calc(28*var(--u))] md:py-[calc(16*var(--u))] md:text-[calc(17*var(--u))] md:leading-[1.23]">
                Mandar el pedido
              </button>
            </div>

            {anotado && (
              <span aria-hidden className="sello">
                ¡Anotado!
              </span>
            )}
            <p aria-live="polite" className="sr-only">
              {anotado ? "Se abrió tu mail con el pedido escrito." : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

// Gotas de chocolate que caen del cierre sobre el papel: [centro x, medio ancho, largo] en un lienzo de 1440.
const GOTAS: [number, number, number][] = [
  [70, 15, 46], [190, 24, 88], [300, 11, 34], [430, 19, 64], [575, 27, 104], [700, 13, 40],
  [820, 21, 76], [960, 16, 52], [1080, 26, 96], [1215, 12, 38], [1330, 20, 70],
]
const Y = 16 // borde de la banda de chocolate
const GOTAS_PATH =
  `M0 0H1440V${Y}` +
  [...GOTAS]
    .reverse()
    // hombro ancho que se afina, cuello y gota redonda en la punta (la condición: l > 2.9 w)
    .map(([x, w, l]) => {
      const n = w * 0.7 // medio ancho del cuello
      return (
        `L${x + w + 14} ${Y}C${x + w + 2} ${Y} ${x + n} ${Y + 8} ${x + n} ${Y + l * 0.45}` +
        `C${x + n} ${Y + l * 0.75} ${x + w} ${Y + l - w * 1.6} ${x + w} ${Y + l - w}` +
        `A${w} ${w} 0 0 1 ${x - w} ${Y + l - w}` +
        `C${x - w} ${Y + l - w * 1.6} ${x - n} ${Y + l * 0.75} ${x - n} ${Y + l * 0.45}` +
        `C${x - n} ${Y + 8} ${x - w - 2} ${Y} ${x - w - 14} ${Y}`
      )
    })
    .join("") +
  "H0Z" // vuelve por el borde, no en diagonal hasta la esquina

/** Footer sobre papel: el chocolate del cierre gotea encima y Geri se despide con una etiqueta de regalo escrita a mano. */
function Footer() {
  const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})
  return (
    <footer className="relative -mt-px overflow-hidden pb-10 md:flex md:min-h-svh md:items-center md:pb-0">
      <svg aria-hidden viewBox="0 0 1440 124" preserveAspectRatio="none" className="block h-[70px] w-full md:absolute md:inset-x-0 md:top-0 md:h-auto">
        <path d={GOTAS_PATH} fill="var(--color-cacao)" />
      </svg>

      <div className="escena px-g md:px-0">
        <div className="pt-14 md:absolute md:left-[calc(144*var(--u))] md:top-[calc(346*var(--u))] md:pt-0">
          <p className="titular text-[clamp(46px,12vw,72px)] md:w-[calc(535*var(--u))] md:text-[calc(120*var(--u))] md:text-wrap">Gracias por pasar.</p>
          <p className="mano mt-4 -rotate-1 text-[30px] font-bold text-mandarina md:mt-[calc(16*var(--u))] md:text-[calc(37*var(--u))]">
            siempre hay algo en el horno
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block text-[22px] underline underline-offset-[0.18em] transition-colors hover:text-caramelo md:mt-[calc(40*var(--u))] md:text-[calc(30*var(--u))]"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-16 md:absolute md:left-[calc(1084*var(--u))] md:top-[calc(405*var(--u))] md:mt-0 md:w-[calc(633*var(--u))]">
          <Etiqueta />
        </div>

        <div className="mt-24 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 text-[16px] md:absolute md:left-[calc(32*var(--u))] md:right-[calc(65*var(--u))] md:top-[calc(1015*var(--u))] md:mt-0 md:flex-nowrap md:text-[calc(25*var(--u))]">
          <nav aria-label="Secciones" className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-[calc(24*var(--u))]">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-caramelo">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-6 md:gap-[calc(24*var(--u))]">
            {site.socials.map((l) => (
              <a key={l.label} href={l.href} {...ext(l.href)} className="transition-colors hover:text-caramelo">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-leche">
            © {new Date().getFullYear()} Geri, desde {site.city}
          </p>
          <a href="#inicio" className="transition-colors hover:text-caramelo">
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  )
}

/** Etiqueta de regalo de papel madera, atada con hilo, con los renglones escritos a mano. */
function Etiqueta() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] -rotate-3 transition-transform duration-700 hover:rotate-0 [filter:drop-shadow(0_26px_28px_rgb(43_26_18/.22))] md:max-w-none">
      {/* el hilo sale del agujero (abajo al centro del svg) y se va por arriba */}
      <svg aria-hidden viewBox="0 0 120 160" className="absolute bottom-1/2 left-[calc(5.5%+10px)] z-10 w-[17.5%] -translate-x-1/2 overflow-visible">
        <path d="M60 160 C 30 120, 90 80, 50 40 S 20 -10, 70 -40" fill="none" stroke="var(--color-caramelo)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="etiqueta relative py-8 pl-[17%] pr-7 md:py-[calc(40*var(--u))] md:pr-[calc(40*var(--u))]">
        <span
          aria-hidden
          className="absolute left-[5.5%] top-1/2 size-5 -translate-y-1/2 rounded-full bg-papel shadow-[inset_0_2px_4px_rgb(43_26_18/.4)] md:size-[calc(20*var(--u))]"
        />
        <dl className="space-y-3 md:space-y-[calc(12*var(--u))]">
          {etiqueta.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-4 border-b border-dashed border-cacao pb-1 md:gap-[calc(16*var(--u))]">
              <dt className="w-[5.6rem] shrink-0 text-[15px] italic text-leche md:w-[calc(90*var(--u))] md:text-[calc(15*var(--u))]">{k}</dt>
              <dd className="mano text-[clamp(22px,6vw,34px)] font-bold text-tinta md:text-[calc(34*var(--u))]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
