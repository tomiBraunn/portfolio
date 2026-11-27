import { useEffect, useRef } from "react"
import { lenis } from "@/lib/smooth-scroll"
import { receta } from "./content"

/**
 * La receta vive en un cuadernito: la tapa (o el botón) abre un <dialog> nativo
 * con la receta escrita a mano en hojas rayadas. Esc, el ✕ o un clic afuera lo cierran.
 */
export function Receta() {
  const dialog = useRef<HTMLDialogElement>(null)
  const libro = useRef<HTMLDivElement>(null)

  // Con las hojas lado a lado, achica el renglón (y con él la letra) hasta que las dos entren sin scroll.
  // En mobile las hojas van una abajo de la otra y se scrollea normal.
  const ajustar = () => {
    const el = libro.current
    if (!el || !dialog.current?.open) return
    el.style.removeProperty("--linea")
    if (!matchMedia("(min-width: 768px)").matches) return
    const hojas = [...el.querySelectorAll<HTMLElement>(".hoja")]
    for (let l = 34; l > 18; l--) {
      el.style.setProperty("--linea", `${l}px`)
      if (hojas.every((h) => h.scrollHeight <= h.clientHeight)) return
    }
  }
  useEffect(() => {
    addEventListener("resize", ajustar)
    return () => removeEventListener("resize", ajustar)
  })

  const abrir = () => {
    dialog.current?.showModal()
    ajustar()
    lenis?.stop() // la página no se mueve mientras el cuaderno está abierto
  }
  const cerrar = () => dialog.current?.close()

  return (
    <section id="receta" aria-labelledby="receta-title" className="relative py-24 md:flex md:min-h-svh md:items-center md:py-0">
      {/* en escritorio, la pantalla del Figma (1920 × 1080) escalada con var(--u) */}
      <div className="escena px-g md:px-0">
        <div className="md:absolute md:left-[calc(71*var(--u))] md:top-[calc(170*var(--u))] md:w-[calc(601*var(--u))]">
          <h2 id="receta-title" className="titular text-[clamp(46px,12vw,72px)] md:w-[calc(590*var(--u))] md:text-[calc(130*var(--u))]">
            {receta.name}
          </h2>
          <p className="mt-6 max-w-[38ch] text-[19px] leading-[1.65] text-leche md:mt-[calc(24*var(--u))] md:max-w-none md:text-[calc(30*var(--u))]">
            {receta.intro}
          </p>
        </div>
        <dl className="mt-8 flex gap-10 md:absolute md:left-[calc(71*var(--u))] md:top-[calc(603*var(--u))] md:mt-0 md:gap-[calc(40*var(--u))]">
          {receta.datos.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[16px] italic leading-[1.23] text-leche md:text-[calc(16*var(--u))]">{k}</dt>
              <dd className="text-[26px] font-semibold leading-[1.23] tracking-[-0.02em] md:text-[calc(26*var(--u))]">{v}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={abrir}
          className="mt-10 rounded-full bg-caramelo px-7 py-4 text-[17px] text-hoja transition-colors hover:bg-cacao md:absolute md:left-[calc(71*var(--u))] md:top-[calc(700*var(--u))] md:mt-0 md:px-[calc(28*var(--u))] md:py-[calc(16*var(--u))] md:text-[calc(20*var(--u))] md:leading-[1.23]"
        >
          Abrir la receta
        </button>

        {/* la foto, con el cuaderno cerrado apoyado encima (es el botón que lo abre) */}
        <div className="relative mb-[58%] ml-auto mt-16 aspect-[600/641] w-[min(86vw,460px)] md:absolute md:mb-0 md:left-[calc(1148*var(--u))] md:top-[calc(170*var(--u))] md:mt-0 md:w-[calc(600*var(--u))]">
          <img src={receta.src} alt={receta.alt} loading="lazy" className="h-full w-full rounded-[22px] object-cover md:rounded-[calc(30*var(--u))]" />
          <Tapa onClick={abrir} />
          <p className="mano pointer-events-none absolute left-[48%] top-[103%] -rotate-3 md:left-[23.5%] whitespace-nowrap text-[24px] font-bold text-mandarina md:top-[105.6%] md:text-[calc(26*var(--u))]">
            ¡Tocá el cuaderno!
          </p>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="cuaderno-title"
        data-lenis-prevent
        onClose={() => lenis?.start()}
        onClick={(e) => e.target === e.currentTarget && cerrar()} // clic en el fondo
        className="cuaderno m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0"
      >
        <div ref={libro} className="libro relative grid w-[min(1120px,94vw)] max-md:max-h-[88svh] max-md:gap-3 max-md:overflow-y-auto md:h-[min(720px,88svh)] md:grid-cols-2">
          <button
            onClick={cerrar}
            aria-label="Cerrar la receta"
            className="absolute right-2 top-2 z-20 grid max-md:fixed max-md:right-4 max-md:top-4 size-11 place-items-center rounded-full bg-cacao text-[18px] text-hoja shadow-lg transition-colors hover:bg-mandarina md:-right-4 md:-top-4"
          >
            ✕
          </button>

          {/* espiral del medio */}
          <div aria-hidden className="pointer-events-none absolute inset-y-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col justify-between md:flex">
            {Array.from({ length: 17 }, (_, i) => (
              <span key={i} className="block h-3 w-11 rounded-full border-2 border-[#8f8a82] bg-gradient-to-b from-[#f6f3ee] to-[#b3ada4]" />
            ))}
          </div>

          <article className="hoja hoja-izq relative">
            <h3 id="cuaderno-title" className="cuaderno-titulo">
              {receta.cuaderno}
            </h3>
            <p className="text-mandarina">rinde 20, tarda 40 min</p>
            {/* polaroid pegada con cinta */}
            <figure aria-hidden className="absolute right-6 top-8 w-[34%] max-w-[150px] rotate-[5deg] bg-white p-2 pb-6 shadow-md max-md:hidden">
              <img src={receta.polaroid} alt="" className="aspect-square w-full object-cover" />
              <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-6 bg-[#f3e3a8]/80" />
            </figure>
            <p className="cuaderno-sub mt-[var(--linea)]">Ingredientes</p>
            <ul>
              {receta.ingredientes.map((i) => (
                <li key={i}>– {i}</li>
              ))}
            </ul>
          </article>

          <article className="hoja hoja-der relative">
            <p className="cuaderno-sub">Cómo se hace</p>
            <ol>
              {receta.pasos.map((p, i) => (
                <li key={p.texto} className="relative">
                  {/* el número va en el margen, a la izquierda de la línea roja */}
                  <span className="absolute -left-[3.2rem] w-8 text-right text-mandarina">{i + 1}.</span>
                  {p.texto}
                  {p.nota && <span className="ml-2 inline-block -rotate-2 text-mandarina">({p.nota})</span>}
                </li>
              ))}
            </ol>
            <p className="mt-[var(--linea)]">
              <mark className="bg-[linear-gradient(transparent_55%,rgb(243_214_120/.7)_55%)] text-inherit">{receta.nota}</mark>
            </p>
            <p className="text-right text-[calc(var(--linea)*.88)] text-mandarina">— Geri</p>
          </article>
        </div>
      </dialog>
    </section>
  )
}

/**
 * La tapa del cuaderno, cerrado y apoyado sobre la foto: es el botón que lo abre.
 * Se ubica y escala en % de la foto, y por dentro en cqw (240 de ancho en el Figma = 100cqw).
 */
function Tapa({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir la receta en el cuaderno"
      className="absolute left-[-8%] top-[80.3%] w-[40%] rotate-[-18.69deg] transition-transform duration-500 [container-type:inline-size] hover:-translate-y-2 hover:rotate-[-12deg] md:left-[-23.8%]"
    >
      <span className="relative block aspect-[3/4] rounded-[1.7cqw_5.8cqw_5.8cqw_1.7cqw] bg-[#b4622c] [filter:drop-shadow(0_12.5cqw_10.4cqw_rgb(43_26_18/.6))]">
        {/* espiral */}
        <span aria-hidden className="absolute inset-y-[5cqw] -left-[3.3cqw] flex flex-col justify-between">
          {Array.from({ length: 11 }, (_, i) => (
            <i key={i} className="block h-[4.2cqw] w-[10cqw] rounded-full border-[0.8cqw] border-[#8f8a82] bg-[#dcd7cf]" />
          ))}
        </span>
        {/* etiqueta */}
        <span className="absolute left-[18%] top-[14.2%] w-[66.3%] -rotate-2 bg-hoja p-[5cqw] text-left shadow-[0_1px_2px_rgb(43_26_18/.15)]">
          <span className="mano block text-[14.2cqw] font-bold leading-none text-tinta">recetas</span>
          <span className="mano block text-[10cqw] font-bold text-mandarina">de geri</span>
        </span>
        {/* elástico */}
        <span aria-hidden className="absolute inset-y-0 left-[83.75%] w-[4.2cqw] bg-cacao" />
      </span>
    </button>
  )
}
