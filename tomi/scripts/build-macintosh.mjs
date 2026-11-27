// Genera public/macintosh.glb: una Macintosh 128K (1984) en 3D, para el ASCII
// render del Stack. Se arma con primitivas de three.js y se exporta como GLB.
//   node scripts/build-macintosh.mjs
import { writeFileSync } from "node:fs"
import * as THREE from "three"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

// GLTFExporter usa FileReader (API del navegador); en Node alcanza con esto.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf
      this.onloadend?.()
    })
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type || "application/octet-stream"};base64,${Buffer.from(buf).toString("base64")}`
      this.onloadend?.()
    })
  }
}

const mat = (color, roughness = 0.6) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 })
const BEIGE = mat("#e2ddd0")
const BEIGE_DARK = mat("#bdb7a9")
const BEZEL = mat("#8f897d")
const CRT = mat("#151a17", 0.25)
const PIXEL = mat("#c9d3c2", 0.4)
const SLOT = mat("#2b2925")

const mac = new THREE.Group()
const add = (geometry, material, x, y, z, parent = mac) => {
  const m = new THREE.Mesh(geometry, material)
  m.position.set(x, y, z)
  parent.add(m)
  return m
}

// medidas en cm (Macintosh 128K: 24.6 × 34.5 × 27.5)
const W = 24.6
const H = 32.5
const D = 27.5
const FRONT = D / 2

// cuerpo y pie
add(new RoundedBoxGeometry(W, H, D, 4, 1.4), BEIGE, 0, 1, 0)
add(new RoundedBoxGeometry(W - 3, 2.6, D - 4, 2, 0.6), BEIGE_DARK, 0, -H / 2 - 0.3, 0)

// manija hundida arriba atrás
add(new THREE.BoxGeometry(11, 0.6, 2.4), SLOT, 0, H / 2 + 1.05, -D / 2 + 3.2)

// marco de pantalla (sobresale), CRT hundido
const screenY = 7.4
add(new RoundedBoxGeometry(18, 14.6, 1.2, 3, 0.8), BEZEL, 0, screenY, FRONT + 0.1)
add(new RoundedBoxGeometry(15.2, 11.8, 0.6, 3, 0.6), CRT, 0, screenY, FRONT + 0.55)

// happy mac en pantalla: "píxeles" que sobresalen apenas del CRT
const px = (w, h, x, y) => add(new THREE.BoxGeometry(w, h, 0.25), PIXEL, x, screenY + y, FRONT + 0.95)
// carcasa
px(4.8, 0.4, 0, 3.5); px(4.8, 0.4, 0, -3.5); px(0.4, 7.4, -2.2, 0); px(0.4, 7.4, 2.2, 0)
// pantallita
px(3, 0.3, 0, 2.6); px(3, 0.3, 0, -0.4); px(0.3, 3.3, -1.35, 1.1); px(0.3, 3.3, 1.35, 1.1)
// ojos, nariz, sonrisa
px(0.3, 0.6, -0.6, 2); px(0.3, 0.6, 0.6, 2); px(0.3, 0.9, 0.05, 1.4)
px(1.1, 0.25, 0, 0.25); px(0.3, 0.3, -0.7, 0.45); px(0.3, 0.3, 0.7, 0.45)
// disquetera chiquita
px(1.4, 0.3, 0.5, -2.4)

// disquetera
add(new THREE.BoxGeometry(8.6, 1, 0.5), BEIGE_DARK, 4.6, -7.6, FRONT + 0.1)
add(new THREE.BoxGeometry(7.8, 0.32, 0.4), SLOT, 4.6, -7.6, FRONT + 0.3)

// logo de Apple (disco chico) y ranura inferior
const apple = add(new THREE.CylinderGeometry(0.9, 0.9, 0.3, 24), BEZEL, -8.6, -7.6, FRONT + 0.05)
apple.rotation.x = Math.PI / 2
add(new THREE.BoxGeometry(W - 3, 0.2, 0.2), BEIGE_DARK, 0, -H / 2 + 3.2, FRONT + 0.05)

// pose: 3/4 y un poco inclinada hacia la cámara (que en AsciiObject mira desde abajo)
mac.rotation.set(THREE.MathUtils.degToRad(14), THREE.MathUtils.degToRad(-30), 0)
const scene = new THREE.Scene()
scene.add(mac)

new GLTFExporter().parse(
  scene,
  (glb) => {
    writeFileSync(new URL("../public/macintosh.glb", import.meta.url), Buffer.from(glb))
    console.log("public/macintosh.glb", glb.byteLength, "bytes")
  },
  (err) => {
    console.error(err)
    process.exit(1)
  },
  { binary: true },
)
