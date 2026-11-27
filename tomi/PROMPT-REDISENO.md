# Rehacer mi portfolio: brief completo

Soy Tomas Braun, desarrollador full-stack en Buenos Aires. Quiero que rehagas el sitio de mi portfolio en este repo (`tomiBraunn/portfolio`). Antes de tocar nada, leé el código actual y el brief completo. Muchas decisiones ya las probamos y las descartamos; abajo te explico cuáles y por qué, para que no vuelvas a ellas.

## La idea

Es mi portfolio de programador y lo que tiene que transmitir es que **soy una persona muy prolija**. Para mostrarlo, el sitio deja ver su estructura como si estuviera "en proceso": líneas de alineamiento, bordes alrededor de los objetos, una grilla tipo **hoja de corte** (cutting mat) y guías con medidas, como cuando seleccionás algo en Figma. No hace falta decir "soy prolijo": se tiene que notar en que todo cae exactamente sobre una línea.

## Moodboard en Figma

Archivo: https://www.figma.com/design/gKhXSlHiHHNKor86Nefji0/Portfolio. Miralo entero con el MCP de Figma.

- **Estética "en proceso"** (frames azul y gris, nodos 1:23 y 1:24): grilla milimetrada, reglas numeradas 0·5·10·15·20, líneas punteadas de ángulos 15°/30°/45°/60° y un arco.
- **Gradient (nodo 1:20):** mesh granulado naranja quemado → ámbar/mostaza → casi negro. **Es el color de marca.** Paleta: `#0d0c0b` tinta, `#9a3f17` óxido, `#c47a1c` ámbar, `#b88a1e` mostaza, `#b8401a` rojo-naranja, acento de UI `#e0952e`. Reemplazó al rojo vino del v1.
- **Tipografía:** Inter ExtraBold para títulos (109px, line-height 95%, tracking −4,5%). Para labels y metadatos uso JetBrains Mono.
- **Tech Stack card:** tabla con "Toolkit / Tech Stack", filas separadas por divisores finos y los items a la derecha.
- **Daniel Sun, skarlo y ESR:** nombre gigante de borde a borde, tarjetas con imagen grande y footer con wordmark enorme, una línea y columnas de links.
- **LOADER (nodo 25:3):** tira de calibración de 7 grises, de negro a casi blanco.
- **Sección "logo · exploraciones" (nodo 30:2):** variantes del logo en vectores. Lo explico más abajo.
- **Recursos de código:** canvasui particle-object, asciify (charset=binary), bend y ascii-object.

## Referencias de efectos (dónde va cada una)

- **Scroll lateral como gsap.com:** la sección Work queda fijada y el scroll vertical mueve los proyectos en horizontal.
- **Smooth scroll como lenis.dev:** en todo el sitio, sincronizado con GSAP.
- **CTA final como https://fungui.resn.co.nz:** cintas WebGL brillantes que reaccionan al mouse.
- **reactbits Drift Wall** (https://reactbits.dev/components/drift-wall): una pared en perspectiva para la sección Lab.
- **Efecto hover** https://animmaster-vid.fra1.digitaloceanspaces.com/hover-13-650.webm: texto hecho de puntos que se dispersan con el cursor.
- **Para una sección** https://animmaster-vid.fra1.digitaloceanspaces.com/scroll-26-650.webm: filas de palabras gigantes que se desplazan con el scroll, alternan bold, outline y light, y se pliegan en 3D al entrar y salir.
- **Otra sección** https://animmaster-vid.fra1.digitaloceanspaces.com/scroll-57-650.webm: galería escalonada en grilla asimétrica, con captions mono y un revelado "pixel a pixel".
- **canvasui:** ascii-object, particle-scroll (para el scroll lateral), bend (para alguna sección), asciify?charset=binary y particle-object.
- **reactbits Letter Glitch** (https://reactbits.dev/backgrounds/letter-glitch) como fondo de alguna sección.

## El logo (lo más importante)

- Mi logo es **"tomasbraun"** en **Mikro Super Bold Italic**, con tracking −3% e itálica de 12°. **Me gusta esa tipografía; no la cambies.** Hoy se carga desde el CDN de Framer (es la de skarlo) y para producción hay que licenciarla. Por ahora dejala así y avisame.
- Lo combinamos con la **tira de 7 grises del loader**. Lo que más me gusta es **el último frame del loader: rectángulos altos de gris (blanco → gris → negro) y el nombre cruzándolos, con cada franja del nombre en el gris opuesto al de su rectángulo.** Las variantes están en el Figma (nodo 30:2) y en `logo-lab.html`:
  1. El frame final del loader.
  2. Rectángulos más altos, casi un cuadrado.
  2b. El nombre calado, del color del fondo.
  3. Los 7 rectángulos como isotipo al costado del nombre.

  **Todavía no elegí cuál.** Preguntame antes de aplicarla en todo el sitio.
- **Ojo con la franja del medio:** el gris opuesto al rectángulo del medio es ese mismo gris, así que la letra desaparece. Esa franja va en blanco. El loader actual tiene ese bug.
- El logo aparece en el loader, el hero, el nav, el footer y el favicon ("tb").

**Cosas que probamos con el logo y NO quiero:**
- Barritas finas inclinadas antes del nombre: no me gustó cómo quedaron las líneas.
- Una línea baja y fina de grises debajo del nombre: prefiero los rectángulos altos.
- Un logo con letras geométricas dibujadas en grilla y otra tipografía: me gusta la de antes.

## Loader (me encanta, mantenelo)

1. Fondo papel (`#efeee9`). Los 7 bloques de gris se "imprimen" en secuencia mientras cuenta 000 → 100 en mono, con marcas de corte alrededor de la tira y el % de tinta de cada paso abajo.
2. El logo entra cortado en 7 franjas verticales, cada una en el gris opuesto a su bloque (la del medio en blanco).
3. La tira se cierra como persiana (alternando arriba y abajo) y el fondo pasa a tinta.
4. El logo vuela con un FLIP exacto a la posición del logo del nav.
5. Recién ahí entra el hero, con su propia intro.

## Hero

- **El hero es mi logo.** Ahora está como "lámina de construcción": el logo grande sobre una grilla, con baseline, x-height y ascender medidos de la fuente real, guías de la inclinación de 12°, cajas y números por letra y la cota "mikro super bold italic · 200px · tracking −3% · slant 12°". Aparece dibujándose cuando termina el loader. Cuando elija la variante de rectángulos, el hero tiene que mostrar esa versión.
- Arriba va una fila de metadatos en una grilla de 12 columnas: index, rol, ubicación con coordenadas, disponibilidad. Abajo, una intro corta y dos botones.
- Fondo: el gradient naranja del Figma.

**Probado y descartado en el hero:**
- El nombre en partículas que se dispersan: no se leía bien. Ese efecto lo pasamos al CTA.
- Un titular grande en Inter ("I build web products end to end — measured twice, shipped once."): lo quería "más normal" y tampoco me gustó.
- La hoja de corte completa de fondo con reglas, ángulos y arco: quedaba demasiado cargado.

## Resto de las secciones

- **Nav:** fijo, con `mix-blend-difference`, el logo a la izquierda y los links "[01] Work", "[02] Stack", "[03] About" y "[04] Contact".
- **Capa de andamiaje (en todo el sitio):** columnas de la grilla de 12 muy tenues, un crosshair que sigue al cursor con coordenadas x/y, y al pasar sobre un bloque (`data-guide`) sus guías extendidas con la medida "ancho × alto", como en Figma. También un grano sutil.
- **Marquee** (video scroll-26).
- **Work:** scroll lateral fijado, con proyectos en tarjetas tipo "placa" con marcas de corte, metadatos mono (index, año, rol, stack), una regla de progreso abajo y una página de detalle por proyecto (`ProjectPage`).
- **Archive:** galería escalonada (video scroll-57) con revelado pixel a pixel.
- **Lab:** Drift Wall con capturas y experimentos.
- **Stack:** la tabla del Figma más un **render ASCII de una Macintosh 128K retro en 3D**: un modelo GLB que rota y se puede arrastrar. **Tiene que ser 3D**; una silueta 2D extruida no sirve.
- **About:** Letter Glitch muy tenue de fondo, un retrato con una lupa binaria (0 y 1 alrededor del cursor) y una "ventana de log" con principios y una línea de tiempo cuyos bordes se pliegan (bend).
- **CTA final:** "Let's build it." en partículas que se dispersan con el cursor, sobre las cintas WebGL estilo fungui, con el mail (botón para copiarlo) y un botón para enviar un email.
- **Footer:** el logo de borde a borde, una línea y columnas (Index, Elsewhere, Based in, Colophon).

## Lo que pedí SACAR (no lo vuelvas a poner)

- Las **reglas laterales** con números a los dos costados de la página: molestaban.
- El **contador de scroll en porcentaje** (abajo a la derecha).
- **Cualquier texto en mayúsculas**, en ningún lugar. Las etiquetas mono van en minúscula normal ("[00] Index", "See the work").
- El pie **"fig. 02 — Macintosh 128K, 1984 · ascii render · drag to rotate"** de la sección Stack.

## Reglas técnicas

- El stack actual es Vite, React 19, TypeScript, Tailwind 4, GSAP con ScrollTrigger, Lenis y three.js. El contenido vive en `src/data/content.ts`.
- **No toques `/v1`:** es el portfolio viejo y lo quiero conservar intacto.
- Respetá `prefers-reduced-motion` (sin smooth scroll ni canvas pesados). En mobile apagá los efectos pesados y verificá que no haya scroll horizontal ni canvas que bloqueen el scroll con el dedo.
- Lo que ya aprendimos:
  - **particle-scroll y bend de canvasui** solo funcionan con el flag experimental "HTML-in-Canvas" de Chrome. Para la mayoría de la gente no se ven, así que usá un fallback que funcione en cualquier navegador.
  - El **fallback de Asciify** reacomodaba mal el texto. Por eso hicimos una lupa binaria propia.
  - El **Letter Glitch de reactbits** pintaba toda la sección de gris. Por eso hicimos uno propio en canvas 2D.
  - **Mikro Super no está instalada en Figma.** Para el Figma, el logo se convirtió a vectores.
- Cargá three.js con lazy loading para que no pese en la carga inicial.
- Verificá todo en el navegador (desktop y mobile) y que `npm run build` pase.

## Pendiente

- El contenido real (proyectos, fotos, textos): ahora hay placeholders.
- El dominio va a ser **tomasbraun.dev**.
- Elegir la variante del logo con rectángulos altos. **Mostrame opciones y preguntame antes de aplicarla.**

Trabajá por partes y mostrame avances. Si algo no está claro, preguntá antes de decidir por tu cuenta, sobre todo con el logo y el hero.
