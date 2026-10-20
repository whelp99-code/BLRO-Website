import type { HciLayer } from "@/lib/hci-layers"

const loadThree = () => import("three")
type ThreeModule = Awaited<ReturnType<typeof loadThree>>

export type SceneHandle = {
  readonly setActive: (index: number) => void
  readonly dispose: () => void
}

const GLOW = [0x3b82f6, 0x22c55e, 0xf59e0b, 0x818cf8] as const
const SLAB_WIDTH = 5.6
const SPACING = 1.22

function makeGlowTexture(THREE: ThreeModule) {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.35, "rgba(255,255,255,0.35)")
    g.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  return new THREE.CanvasTexture(canvas)
}

function makeBeamTexture(THREE: ThreeModule) {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const h = ctx.createLinearGradient(0, 0, 64, 0)
    h.addColorStop(0, "rgba(255,255,255,0)")
    h.addColorStop(0.5, "rgba(255,255,255,1)")
    h.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = h
    ctx.fillRect(0, 0, 64, 256)
    const v = ctx.createLinearGradient(0, 0, 0, 256)
    v.addColorStop(0, "rgba(0,0,0,0)")
    v.addColorStop(0.2, "rgba(0,0,0,1)")
    v.addColorStop(0.8, "rgba(0,0,0,1)")
    v.addColorStop(1, "rgba(0,0,0,0)")
    ctx.globalCompositeOperation = "destination-in"
    ctx.fillStyle = v
    ctx.fillRect(0, 0, 64, 256)
  }
  return new THREE.CanvasTexture(canvas)
}

function makeFloorTexture(THREE: ThreeModule) {
  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.clearRect(0, 0, size, size)
    ctx.strokeStyle = "rgba(96,140,255,0.22)"
    ctx.lineWidth = 2
    const step = size / 16
    for (let i = 0; i <= 16; i += 1) {
      ctx.beginPath()
      ctx.moveTo(i * step, 0)
      ctx.lineTo(i * step, size)
      ctx.moveTo(0, i * step)
      ctx.lineTo(size, i * step)
      ctx.stroke()
    }
    ctx.strokeStyle = "rgba(140,190,255,0.9)"
    ctx.lineWidth = 4
    for (let x = 0; x <= 16; x += 1) {
      for (let y = 0; y <= 16; y += 1) {
        const cx = x * step
        const cy = y * step
        ctx.beginPath()
        ctx.moveTo(cx - 7, cy)
        ctx.lineTo(cx + 7, cy)
        ctx.moveTo(cx, cy - 7)
        ctx.lineTo(cx, cy + 7)
        ctx.stroke()
      }
    }
    const fade = ctx.createRadialGradient(size / 2, size / 2, size * 0.08, size / 2, size / 2, size / 2)
    fade.addColorStop(0, "rgba(0,0,0,1)")
    fade.addColorStop(1, "rgba(0,0,0,0)")
    ctx.globalCompositeOperation = "destination-in"
    ctx.fillStyle = fade
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  return texture
}

// three.js와 레이어 이미지는 이 파일이 실행될 때만 내려받습니다(초기 번들 제외).
export async function mountHciScene(canvas: HTMLCanvasElement, layers: readonly HciLayer[]): Promise<SceneHandle | null> {
  const THREE = await loadThree()
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const loader = new THREE.TextureLoader()
  const textures = await Promise.all(
    layers.map(
      (layer) =>
        new Promise<InstanceType<typeof THREE.Texture>>((resolve, reject) => {
          loader.load(
            `/images/hci/layer-${layer.key}.webp`,
            (texture) => {
              texture.colorSpace = THREE.SRGBColorSpace
              texture.anisotropy = 4
              resolve(texture)
            },
            undefined,
            reject,
          )
        }),
    ),
  ).catch(() => null)
  if (textures === null) {
    renderer.dispose()
    return null
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.set(0, 0.1, 16.5)
  camera.lookAt(0, -0.1, 0)

  const world = new THREE.Group()
  scene.add(world)

  // 바닥 그리드(기울어진 평면)와 네온 링
  const floorTexture = makeFloorTexture(THREE)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11),
    new THREE.MeshBasicMaterial({ map: floorTexture, transparent: true, depthWrite: false, toneMapped: false }),
  )
  floor.rotation.x = -Math.PI / 2 + 0.08
  floor.position.y = -3.35
  world.add(floor)

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.55, 2.62, 96),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
  )
  ring.rotation.x = -Math.PI / 2 + 0.08
  ring.position.y = -3.3
  world.add(ring)
  const ringGlowMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false, toneMapped: false })
  const ringGlow = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.9, 96), ringGlowMaterial)
  ringGlow.rotation.x = ring.rotation.x
  ringGlow.position.y = -3.31
  world.add(ringGlow)

  const glowTexture = makeGlowTexture(THREE)

  // 중앙 데이터 빔
  const beamTexture = makeBeamTexture(THREE)
  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 7.6),
    new THREE.MeshBasicMaterial({ map: beamTexture, color: 0x38bdf8, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  )
  beam.position.set(0, -0.1, -0.4)
  world.add(beam)

  const slabs: {
    group: InstanceType<typeof THREE.Group>
    material: InstanceType<typeof THREE.MeshBasicMaterial>
    glow: InstanceType<typeof THREE.Sprite>
    baseY: number
    depth: number
  }[] = []
  layers.forEach((_, index) => {
    const texture = textures[index]
    if (texture === undefined) return
    const image = texture.image
    const ratio = image instanceof HTMLImageElement && image.width > 0 ? image.height / image.width : 0.4
    const height = SLAB_WIDTH * ratio
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SLAB_WIDTH, height), material)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: GLOW[index % GLOW.length] ?? 0x3b82f6, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))
    glow.scale.set(SLAB_WIDTH * 1.25, height * 1.7, 1)
    const group = new THREE.Group()
    group.add(glow)
    group.add(mesh)
    const baseY = (1.5 - index) * SPACING
    group.position.y = baseY
    mesh.renderOrder = 10 - index
    glow.renderOrder = 9 - index
    world.add(group)
    slabs.push({ group, material, glow, baseY, depth: (index - 1.5) * 0.35 })
  })

  const COUNT = 90
  const positions = new Float32Array(COUNT * 3)
  const speeds = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 0.55
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7.2
    positions[i * 3 + 2] = -0.3 + Math.random() * 0.2
    speeds[i] = 0.6 + Math.random() * 1.2
  }
  const particleGeometry = new THREE.BufferGeometry()
  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  particleGeometry.setAttribute("position", positionAttribute)
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ map: glowTexture, color: 0x7dd3fc, size: 0.22, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  )
  particles.renderOrder = 0
  world.add(particles)

  let active = 0
  let pointerX = 0
  let pointerY = 0
  let running = false
  let frame = 0
  let visible = true
  const clock = new THREE.Clock()

  function resize() {
    const { clientWidth, clientHeight } = canvas
    if (clientWidth === 0 || clientHeight === 0) return
    renderer.setSize(clientWidth, clientHeight, false)
    camera.aspect = clientWidth / clientHeight
    camera.fov = clientWidth / clientHeight < 1.1 ? 40 : 30
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  function onPointer(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    pointerX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
    pointerY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
  }
  window.addEventListener("pointermove", onPointer, { passive: true })

  function render() {
    const t = clock.getElapsedTime()
    world.rotation.y += (pointerX * 0.22 - world.rotation.y) * 0.06
    world.rotation.x += (pointerY * 0.08 - world.rotation.x) * 0.06
    ring.scale.setScalar(1 + Math.sin(t * 1.6) * 0.015)
    ringGlowMaterial.opacity = 0.14 + Math.sin(t * 1.6) * 0.05
    slabs.forEach((slab, index) => {
      const isActive = index === active
      const targetY = slab.baseY + (isActive ? 0.32 : 0) + Math.sin(t * 0.9 + index * 0.9) * 0.04
      slab.group.position.y += (targetY - slab.group.position.y) * 0.1
      slab.group.position.x += (pointerX * slab.depth * 0.55 - slab.group.position.x) * 0.08
      slab.group.position.z += ((isActive ? 0.5 : 0) - slab.group.position.z) * 0.1
      slab.material.opacity += ((isActive ? 1 : 0.62) - slab.material.opacity) * 0.1
      const glowMaterial = slab.glow.material
      glowMaterial.opacity += ((isActive ? 0.5 : 0) - glowMaterial.opacity) * 0.1
    })
    for (let i = 0; i < COUNT; i += 1) {
      let y = (positions[i * 3 + 1] ?? 0) - (speeds[i] ?? 1) * 0.02
      if (y < -3.5) y = 3.5
      positions[i * 3 + 1] = y
    }
    positionAttribute.needsUpdate = true
    renderer.render(scene, camera)
    if (running) frame = requestAnimationFrame(render)
  }

  function start() {
    if (running || !visible || document.hidden) return
    running = true
    clock.start()
    frame = requestAnimationFrame(render)
  }
  function stop() {
    running = false
    cancelAnimationFrame(frame)
  }
  const io = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting)
    if (visible) start()
    else stop()
  })
  io.observe(canvas)
  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener("visibilitychange", onVisibility)
  start()

  return {
    setActive(index: number) {
      active = index
    },
    dispose() {
      stop()
      io.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      particleGeometry.dispose()
      floorTexture.dispose()
      glowTexture.dispose()
      beamTexture.dispose()
      for (const texture of textures) texture.dispose()
      for (const slab of slabs) slab.material.dispose()
      renderer.dispose()
    },
  }
}
