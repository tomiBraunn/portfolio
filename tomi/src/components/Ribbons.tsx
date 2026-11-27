import { useEffect, useRef } from "react"
import * as THREE from "three"
import { reducedMotion } from "@/lib/smooth-scroll"

// Cintas apiladas con brillo en el borde (inspirado en fungui.resn.co.nz),
// en la paleta del gradient. Un solo quad a pantalla completa + shader.
const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC[5];

float curve(float x, float i, float t) {
  return -1.0 + i * 0.27
    + 0.17 * sin(x * 1.25 + t * 0.32 + i * 1.7)
    + 0.06 * sin(x * 3.1 - t * 0.24 + i * 2.3);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y * 2.0;
  vec2 dm = uv - uMouse;
  float bump = 0.22 * exp(-dot(dm, dm) * 2.5);
  vec3 col = vec3(0.051, 0.047, 0.043);

  for (int k = 4; k >= 0; k--) {
    float i = float(k);
    float y = curve(uv.x, i, uTime) + bump * (1.0 - i * 0.15);
    if (uv.y < y) {
      float d = y - uv.y;
      vec3 c = uC[k] * (0.45 + 0.55 * exp(-d * 5.0)); // volumen: claro en el pliegue
      c += vec3(1.0, 0.92, 0.8) * exp(-d * 70.0) * 0.45; // brillo del borde
      c *= 1.0 - 0.45 * smoothstep(0.0, 0.7, d);
      col = c;
    }
  }

  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
  col += (n - 0.5) * 0.05; // grano, como el gradient del Figma
  gl_FragColor = vec4(col, 1.0);
}
`

const COLORS = ["#b8401a", "#c47a1c", "#b88a1e", "#9a3f17", "#3a2414"].map((c) => new THREE.Color(c))

export function Ribbons({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
    el.appendChild(renderer.domElement)

    const uniforms = {
      uRes: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.6, -0.2) },
      uC: { value: COLORS },
    }
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: "void main(){ gl_Position = vec4(position, 1.0); }",
        fragmentShader: FRAG,
      }),
    )
    scene.add(mesh)

    const target = new THREE.Vector2(0.6, -0.2)
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      renderer.setSize(w, h, false)
      renderer.getDrawingBufferSize(uniforms.uRes.value)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.set(((e.clientX - r.left - r.width / 2) / r.height) * 2, ((r.height / 2 - (e.clientY - r.top)) / r.height) * 2)
    }

    let raf = 0
    let visible = false
    const clock = new THREE.Clock()
    const frame = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      uniforms.uMouse.value.lerp(target, 0.06)
      renderer.render(scene, camera)
      if (visible && !reducedMotion) raf = requestAnimationFrame(frame)
    }
    // solo anima mientras está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) frame()
    })

    resize()
    frame()
    io.observe(el)
    const ro = new ResizeObserver(() => {
      resize()
      if (!visible || reducedMotion) frame()
    })
    ro.observe(el)
    el.addEventListener("pointermove", onMove)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      el.removeEventListener("pointermove", onMove)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className={className} />
}
