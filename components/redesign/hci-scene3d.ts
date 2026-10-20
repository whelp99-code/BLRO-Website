import type { HciLayer } from "@/lib/hci-layers"

export type SceneHandle = {
  readonly setActive: (index: number) => void
  readonly dispose: () => void
}

const COLORS = [0x2563eb, 0x1f9d63, 0xc27a3e, 0x4b6a9b] as const

// three.js는 이 파일에서만 동적으로 불러옵니다. 초기 번들에 포함되지 않습니다.
export async function mountHciScene(canvas: HTMLCanvasElement, layers: readonly HciLayer[]): Promise<SceneHandle | null> {
  const THREE = await import("three")
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 3.4, 10.5)
  camera.lookAt(0, 0.1, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 1.1))
  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(4, 7, 6)
  scene.add(key)
  const rim = new THREE.PointLight(0x60a5fa, 40, 30)
  rim.position.set(-5, 2, -3)
  scene.add(rim)

  const group = new THREE.Group()
  scene.add(group)

  const slabs: {
    mesh: InstanceType<typeof THREE.Mesh>
    material: InstanceType<typeof THREE.MeshStandardMaterial>
    baseY: number
  }[] = []
  const gap = 1.0
  layers.forEach((_, index) => {
    const color = COLORS[index % COLORS.length] ?? 0x2563eb
    const geometry = new THREE.BoxGeometry(4.4, 0.4, 2.8)
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.35,
      roughness: 0.3,
      transparent: true,
      opacity: 0.92,
      emissive: color,
      emissiveIntensity: 0.12,
    })
    const mesh = new THREE.Mesh(geometry, material)
    const baseY = (1.5 - index) * gap
    mesh.position.y = baseY
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }))
    mesh.add(edges)
    for (let k = 0; k < 6; k += 1) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.12), new THREE.MeshBasicMaterial({ color: k % 3 === 0 ? 0x34d399 : 0xe2e8f0 }))
      led.position.set(-1.8 + k * 0.28, 0.23, 1.2)
      mesh.add(led)
    }
    group.add(mesh)
    slabs.push({ mesh, material, baseY })
  })

  const COUNT = 70
  const positions = new Float32Array(COUNT * 3)
  const speeds = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 3.6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4.2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.2
    speeds[i] = 0.4 + Math.random() * 0.8
  }
  const particleGeometry = new THREE.BufferGeometry()
  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  particleGeometry.setAttribute("position", positionAttribute)
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x86efac, size: 0.07, transparent: true, opacity: 0.9 }))
  group.add(particles)

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
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  function onPointer(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  }
  window.addEventListener("pointermove", onPointer, { passive: true })

  function render() {
    const t = clock.getElapsedTime()
    group.rotation.y += ((0.55 + pointerX * 0.45 + Math.sin(t * 0.25) * 0.12) - group.rotation.y) * 0.06
    group.rotation.x += ((pointerY * 0.12) - group.rotation.x) * 0.06
    slabs.forEach((slab, index) => {
      const isActive = index === active
      const targetY = slab.baseY + (isActive ? 0.45 : 0) + Math.sin(t * 0.9 + index) * 0.05
      slab.mesh.position.y += (targetY - slab.mesh.position.y) * 0.1
      slab.material.opacity += ((isActive ? 0.98 : 0.6) - slab.material.opacity) * 0.1
      slab.material.emissiveIntensity += ((isActive ? 0.55 : 0.1) - slab.material.emissiveIntensity) * 0.1
    })
    for (let i = 0; i < COUNT; i += 1) {
      let y = (positions[i * 3 + 1] ?? 0) - (speeds[i] ?? 0.5) * 0.012
      if (y < -2.4) y = 2.4
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
      for (const slab of slabs) {
        slab.mesh.geometry.dispose()
        slab.material.dispose()
      }
      renderer.dispose()
    },
  }
}
