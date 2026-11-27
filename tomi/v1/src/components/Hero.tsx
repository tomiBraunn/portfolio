import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/content";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// ─── Layout del hero ────────────────────────────────────────────────────────
// Posición vertical de cada bloque, en % del alto del hero (borde superior).
const Y = {
  label: "1%",
  tomas: "21.6%",
  braun: "38.7%",
  bottom: "80%",
};

// Posición horizontal (borde izquierdo) de cada bloque, en % del ancho.
// "right" en actions es la distancia desde el borde derecho.
const X = {
  label: "61.8%",
  tomas: "2%",
  braun: "5%",
  text: "38.2%",
  actions: { right: "2%" },
};

// Tamaños tipográficos. El wordmark escala en vw puro para que su relación
// con las columnas de la grilla sea idéntica en cualquier ancho de pantalla.
const SIZE = {
  wordmark: "10.5vw",
  label: "clamp(10px, 0.95vw, 14px)",
  text: "clamp(12px, 1.15vw, 17px)",
  textWidth: "30%",
};
// ────────────────────────────────────────────────────────────────────────────

// Poné en false para ocultar la grilla en producción.
const SHOW_GUIDES = true;

type Box = { top: number; left: number; width: number; height: number };

/**
 * Dibuja las guías a partir del bounding box REAL de cada elemento del hero.
 * Como se miden con getBoundingClientRect() y se re-miden con ResizeObserver,
 * las líneas siguen a los elementos en cualquier resolución: nunca se rompen
 * porque literalmente son los bordes de cada caja.
 */
function ElementGuides({ boxes }: { boxes: Box[] }) {
  if (!boxes.length) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {boxes.map((b, i) => (
        <div key={i}>
          {/* Bordes verticales de la caja (izquierdo y derecho) */}
          <span
            className="absolute inset-y-0 w-px bg-accent/50"
            style={{ left: b.left }}
          />
          <span
            className="absolute inset-y-0 w-px bg-accent/50"
            style={{ left: b.left + b.width }}
          />
          {/* Bordes horizontales de la caja (superior e inferior) */}
          <span
            className="absolute inset-x-0 h-px bg-accent/50"
            style={{ top: b.top }}
          />
          <span
            className="absolute inset-x-0 h-px bg-accent/50"
            style={{ top: b.top + b.height }}
          />
          {/* Marca la caja en sí, tenue, para leer el bounding de un vistazo */}
          <span
            className="absolute border border-accent/20"
            style={{
              top: b.top,
              left: b.left,
              width: b.width,
              height: b.height,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Un ref por elemento a encuadrar.
  const labelRef = useRef<HTMLParagraphElement>(null);
  const tomasRef = useRef<HTMLSpanElement>(null);
  const braunRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const [boxes, setBoxes] = useState<Box[]>([]);

  useLayoutEffect(() => {
    if (!SHOW_GUIDES) return;
    const section = sectionRef.current;
    if (!section) return;

    const targets = [labelRef, tomasRef, braunRef, textRef, actionsRef];

    const measure = () => {
      const base = section.getBoundingClientRect();
      const next: Box[] = [];
      for (const ref of targets) {
        const el = ref.current;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next.push({
          top: r.top - base.top,
          left: r.left - base.left,
          width: r.width,
          height: r.height,
        });
      }
      setBoxes(next);
    };

    measure();

    // Re-medir ante cualquier cambio de tamaño (ventana o elementos).
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    for (const ref of targets) if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);

    // Re-medir cuando la fuente del wordmark termina de cargar (cambia el alto).
    if (document.fonts?.ready) document.fonts.ready.then(measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgb(0,0,0) 0%, rgb(48,2,16) 30%, rgb(86,3,25) 60%, rgb(86,3,25) 100%)",
      }}
    >
      <ElementGuides boxes={boxes} />

      <motion.p
        ref={labelRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute z-10 text-accent"
        style={{ top: Y.label, left: X.label, fontSize: SIZE.label }}
      >
        Full-stack developer — {site.location}
      </motion.p>

      {/* Giant offset wordmark */}
      <h1 className="logo-font absolute inset-0 z-10 select-none leading-[0.75] text-accent tracking-[-0.03em]">
        <motion.span
          ref={tomasRef}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="absolute block tracking-[-0.01em]"
          style={{ top: Y.tomas, left: X.tomas, fontSize: SIZE.wordmark }}
        >
          Tomas
        </motion.span>
        <motion.span
          ref={braunRef}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="absolute block tracking-[-0.01em]"
          style={{ top: Y.braun, left: X.braun, fontSize: SIZE.wordmark }}
        >
          Braun
        </motion.span>
      </h1>

      {/* Bottom: description on its column, actions against the right edge */}
      <motion.p
        ref={textRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="absolute z-10 leading-relaxed text-muted"
        style={{
          top: Y.bottom,
          left: X.text,
          fontSize: SIZE.text,
          maxWidth: SIZE.textWidth,
        }}
      >
        I design, build and deploy web products end to end — database, API,
        frontend and everything in between.
      </motion.p>
      <motion.div
        ref={actionsRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="absolute z-10 flex items-center gap-3"
        style={{ top: Y.bottom, right: X.actions.right }}
      >
        <a
          href="#work"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
        >
          See the work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-white/40"
        >
          Get in touch
        </a>
      </motion.div>
    </section>
  );
}
