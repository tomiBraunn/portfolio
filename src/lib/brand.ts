// Tira de calibración del loader, sobre tinta: de casi blanco a gris oscuro.
// La usa el loader: el logo queda un instante en estos 7 pasos antes de volar al nav.
export const INK_STEPS = ["#f2f0eb", "#dcdcdc", "#b8b8b8", "#929292", "#6e6e6e", "#484848", "#363636"]

// Tira del logo (debajo del nombre): de blanco a negro en 7 pasos.
export const STRIP_STEPS = ["#f2f0eb", "#cfcfcf", "#a8a8a8", "#808080", "#595959", "#333333", "#0b0b0b"]

// El texto del logo ocupa esta fracción del ancho de la tira (loader) y de la placa (hero).
export const SPAN = 0.96

// Tono del nombre en cada franja: todas claras, para que se lea sobre el gradient.
export const OPPOSITE = Array(7).fill("#f2f0eb")
