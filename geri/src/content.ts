// Todo el texto y las fotos de la página. Cambiar el nombre, el mail o los dulces es solo editar acá.
// Fotos: las del diseño de Figma (MoodBoard, página "Geri") y fotos de muestra de Unsplash / Wikimedia Commons (CC0).

const img = (f: string) => `/cocina/${f}.webp`

export const site = {
  name: "geri",
  email: "oriologeri@gmail.com",
  city: "Buenos Aires",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
}

export const nav = [
  { href: "#dulces", label: "Dulces" },
  { href: "#receta", label: "Receta" },
  { href: "#cuaderno", label: "Cuaderno" },
  { href: "#contacto", label: "Contacto" },
]

/** `crop`: centro (cx, cy) y radio (r) del plato dentro de la foto, en fracción del ancho. */
export const hero = {
  lines: ["Cosas dulces,", "hechas en casa."],
  intro: "Soy Geri. Horneo galletitas, tortas y postres en Buenos Aires.",
  cta: "Ver los dulces",
  // la cookie va recortada (fondo transparente), apoyada directo sobre el papel
  cookie: { src: img("cookie"), alt: "Cookie con chips de chocolate, mordida, con migas alrededor" },
  cafe: { src: img("cafe"), alt: "Capuchino visto desde arriba", crop: { cx: 0.5, cy: 0.497, r: 0.485 } },
  ring: "cookies * manteca * chips de chocolate * una pizca de sal * ",
}

/** Lo que sale del horno: en escritorio se ve uno por pantalla, con la lista a la izquierda. */
export const platos = [
  {
    name: "Cheesecake",
    src: img("cheesecake"),
    story: "Base de galletitas, queso crema, crema y huevos. Una receta que nunca falla.",
    note: "frío, del día anterior",
    tiempo: "5 h",
    porciones: "10",
    molde: "desmontable de 22 cm",
  },
  {
    name: "Crème brûlée",
    src: img("brulee"),
    story: "Crema de vainilla y azúcar quemado. El ruido de la cuchara rompiendo la capa es la mitad del postre.",
    note: "el crac, SIEMPRE",
    tiempo: "4 h",
    porciones: "6",
    molde: "cuencos pequeños",
  },
  {
    name: "Torta de chocolate",
    src: img("torta"),
    story: "Harina, huevos, chocolate y mucho amor. Una receta heredada de mi abuela, la de cada cumpleaños.",
    note: "nunca es poco chocolate",
    tiempo: "2 h",
    porciones: "12",
    molde: "molde de 20 cm",
  },
  {
    name: "Lemon pie",
    src: img("lemon"),
    story: "Masa a base de galletitas, centro ácido y mucho, pero mucho merengue dorado con altos picos.",
    note: "sin limón no hay sabor",
    tiempo: "3 h",
    porciones: "8",
    molde: "tartera",
  },
  {
    name: "Macarons",
    src: img("macarons"),
    story: "Los que más me costaron: tres tandas a la basura antes de que salieran. Los favoritos de mi familia.",
    note: "¡un desastre aprender!",
    tiempo: "3 h",
    porciones: "24",
    molde: "placa con papel manteca",
  },
  {
    name: "Tiramisú",
    src: img("tiramisu"),
    story: "Vainillas, café fuerte y mascarpone. Lo armo de noche para que al otro día esté listo.",
    note: "cacao y café, combinación inolvidable",
    tiempo: "6 h",
    porciones: "8",
    molde: "fuente de 20 × 30",
  },
]

export const receta = {
  name: "Las galletas de la casa",
  intro: "Crocantes en el borde y blandas en el centro. Las hago cuando alguien viene a casa y no tengo qué ofrecer.",
  src: img("galletas"),
  alt: "Galletas con chips de chocolate apiladas en un plato",
  datos: [
    ["Tiempo", "40 min"],
    ["Rinde", "20"],
    ["Dificultad", "Fácil"],
  ],
  // lo que va escrito en el cuaderno (la polaroid es otra foto de la misma tanda)
  cuaderno: "galletitas de la casa",
  polaroid: img("galletitas"),
  ingredientes: [
    "60 g de manteca derretida",
    "120 g de azúcar común",
    "10 g de azúcar negra",
    "1 huevo",
    "1 cucharadita de esencia de vainilla",
    "150 g de harina leudante",
    "½ cucharadita de bicarbonato",
    "1 pizca de sal (y unas escamas para arriba)",
    "150 g de chocolate amargo picado",
  ],
  // `nota`: lo que Geri anotaría al margen del cuaderno
  pasos: [
    { texto: "Derretí la manteca en un tarro metálico.", nota: "que no se queme" },
    { texto: "En el bowl rompé el huevo, agregá azúcar y vainilla." },
    { texto: "Agregá la harina, el bicarbonato y la sal. Mezclá con espátula, lo justo." },
    { texto: "Incorporá la manteca y el chocolate picado y guardá un poco para arriba." },
    { texto: "Armá bollitos de 30 g y llevalos una hora a la heladera.", nota: "con apuro: 20 min de freezer" },
    { texto: "Horneá 10 a 12 min a 180 °C, hasta que los bordes estén dorados y el centro siga blando." },
    { texto: "Dejalas 5 min en la placa antes de moverlas: terminan de cocinarse ahí." },
  ],
  nota: "Si cuando las sacás parecen crudas, están perfectas.",
}

/** La etiqueta de regalo del footer: cada fila es un renglón escrito a mano. */
export const etiqueta = [
  ["Para", "vos, que llegaste hasta acá"],
  ["De", "Geri"],
  ["Contiene", "manteca, azúcar y mucho amor"],
  ["Conservar", "en un lugar fresco (o comer ya)"],
]

const wall = [
  "Trufas de cacao",
  "Chocolate picado",
  "Caja de bombones",
  "Galletitas en la lata",
  "Vidriera de facturas",
  "Café de la tarde",
  "Torta de frambuesas",
  "Tostadas francesas",
  "Copa de chocolate",
  "Chocolate con menta",
  "Tartas de frutos rojos",
  "Donas con fruta",
  "Rolls de canela",
  "Postres en frasco",
  "Macarons de colores",
  "La pastelería del barrio",
  "Cupcakes de frutilla",
  "Pie de manzana",
]
export const cuaderno = wall.map((title, i) => ({ title, image: img(`wall/${String(i + 1).padStart(2, "0")}`) }))

export const sobreMi = {
  lead: "Aprendí a cocinar mirando a mi abuela y a mi mamá.",
  body: "No soy pastelera profesional, cocino porque me gusta comer y porque el olor a manteca y vainilla me arregla cualquier día.",
  // la frase de la abuela va en negrita
  dicho: { antes: "Y como mi abuela dice, ", frase: "“para hacer una buena torta, primero hay que quemar unas cuantas”." },
  src: img("manga"),
  alt: "Manos decorando una torta de chocolate con manga pastelera",
  firma: "Geraldine Oriolo",
}

/** El cierre es un talonario de pedidos: lo que se marca y se escribe arma el mail. */
export const contacto = {
  title: "¿Qué te horneo?",
  body: "Marcá lo que se te antoja y contame para cuándo, y lo charlamos por mail. También sirve para pedirme una receta o contarme qué horneaste vos.",
  numero: "Nº 0167",
  opciones: ["Galletitas", "Cheesecake", "Torta de chocolate", "Crème brûlée", "Lemon pie", "Macarons", "Tiramisú", "Sorprendeme"],
  // [name del campo, rótulo impreso, ejemplo escrito a mano]
  campos: [
    ["para", "Para", "el cumple de mi hermana"],
    ["cuando", "Cuándo", "el sábado que viene"],
    ["mas", "Algo más", "sin nueces, porfa"],
  ],
}
