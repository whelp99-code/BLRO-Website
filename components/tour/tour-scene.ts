import { ZONES } from "@/lib/zones"

const loadThree = () => import("three")

export type TourHandle = {
  readonly setProgress: (progress: number) => void
  readonly setFocus: (setting: number) => void
  readonly dispose: () => void
}

type TourOptions = {
  readonly canvas: HTMLCanvasElement
  readonly labelHost: HTMLElement
  readonly hotspotEls: readonly HTMLElement[]
  readonly onZone: (index: number) => void
}

const SPACING = 26
const COLORS = {
  paper: 0xf4f1ea,
  floor: 0xebe6dc,
  card: 0xfffcf7,
  ink: 0x102033,
  steel: 0x8794a8,
  line: 0xb9b0a0,
  blue: 0x1d4ed8,
  green: 0x1f7a4d,
  copper: 0x8a5a32,
  red: 0xb4412f,
} as const

// 구역별 핫스팟(설정 항목) 위치: 구역 원점 기준
// 구역별 3D 라벨: [텍스트, x, y, z]
const LABELS: readonly (readonly [string, number, number, number][])[] = [
  [["클라우드", 0, 8, -2.5], ["지점", -6.4, 3.6, -3.2], ["원격 사용자", 6.4, 2.5, -3.4], ["업무망 장비", -2.4, 5.2, 0], ["관리망 장비", 2.4, 5.2, 0]],
  [["서버 1", -4.2, 5.2, 0], ["서버 2", 0, 5.2, 0], ["서버 3", 4.2, 5.2, 0], ["전원·냉각", 4.2, 2.1, 2.6]],
  [["스토리지 어레이", -3.4, 4.4, 0], ["스토리지 어레이", 3.2, 3.2, 0], ["데이터 복제", 0, 5.4, 0.6], ["디스크", 0, 4.3, -4.4]],
  [["운영 서버", -4.4, 5.4, 0], ["격리 보관", 4.4, 4.2, 0], ["복구 일정", -0.4, 5.6, 0], ["원격 복구 사이트", 0, 3, -6.5]],
  [["방화벽", -6.2, 3.8, 0], ["접근 정책 관문", 0, 7.2, 0], ["로그·탐지", -5.6, 4.6, -2.4], ["시험 트래픽: 허용·차단", 0, 1.6, 5]],
]

const HOTSPOTS: readonly (readonly [number, number, number][])[] = [
  [[0, 3.4, 1], [0, 6.2, -2.5], [-5.2, 2.4, -3]],
  [[-4, 3, 1.2], [0, 5.2, 1.2], [5.6, 0.9, 2.2]],
  [[-3, 3.2, 0.5], [3, 1.6, 0.5], [0, 2.6, -4.4]],
  [[-3.5, 4.2, 0], [4.2, 2.2, 0], [0, 1.6, -6.5]],
  [[0, 4.2, 0], [-5.4, 3.4, -2.4], [3.2, 2.2, 2.4]],
]

export async function mountTour(options: TourOptions): Promise<TourHandle | null> {
  const { canvas, hotspotEls, labelHost, onZone } = options
  const THREE = await loadThree()
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = false
  renderer.setClearColor(COLORS.paper)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(COLORS.paper)
  scene.fog = new THREE.Fog(COLORS.paper, 34, 90)
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 160)

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0c0, 1.35))
  const sun = new THREE.DirectionalLight(0xffffff, 1.5)
  sun.position.set(8, 14, 10)
  scene.add(sun)

  const disposables: { dispose: () => void }[] = []
  const matCache = new Map<number, InstanceType<typeof THREE.MeshStandardMaterial>>()
  function mat(color: number) {
    const cached = matCache.get(color)
    if (cached) return cached
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 })
    matCache.set(color, material)
    disposables.push(material)
    return material
  }
  const edgeMaterial = new THREE.LineBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0.28 })
  disposables.push(edgeMaterial)

  function box(parent: InstanceType<typeof THREE.Object3D>, w: number, h: number, d: number, color: number, x: number, y: number, z: number, edges = true) {
    const geometry = new THREE.BoxGeometry(w, h, d)
    disposables.push(geometry)
    const mesh = new THREE.Mesh(geometry, mat(color))
    mesh.position.set(x, y, z)
    if (edges) {
      const eg = new THREE.EdgesGeometry(geometry)
      disposables.push(eg)
      mesh.add(new THREE.LineSegments(eg, edgeMaterial))
    }
    parent.add(mesh)
    return mesh
  }

  function emissive(color: number) {
    const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9, roughness: 0.4 })
    disposables.push(material)
    return material
  }

  function tube(parent: InstanceType<typeof THREE.Object3D>, points: InstanceType<typeof THREE.Vector3>[], color: number, radius = 0.06) {
    const curve = new THREE.CatmullRomCurve3(points)
    const geometry = new THREE.TubeGeometry(curve, 48, radius, 6, false)
    disposables.push(geometry)
    parent.add(new THREE.Mesh(geometry, mat(color)))
    return curve
  }

  const packets: { mesh: InstanceType<typeof THREE.Mesh>; curve: InstanceType<typeof THREE.CatmullRomCurve3>; speed: number; offset: number }[] = []
  function packet(parent: InstanceType<typeof THREE.Object3D>, curve: InstanceType<typeof THREE.CatmullRomCurve3>, color: number, count: number, speed: number) {
    const geometry = new THREE.BoxGeometry(0.22, 0.22, 0.22)
    disposables.push(geometry)
    const material = emissive(color)
    for (let i = 0; i < count; i += 1) {
      const mesh = new THREE.Mesh(geometry, material)
      parent.add(mesh)
      packets.push({ mesh, curve, speed, offset: i / count })
    }
  }

  const blinkers: { material: InstanceType<typeof THREE.MeshStandardMaterial>; phase: number }[] = []
  function led(parent: InstanceType<typeof THREE.Object3D>, x: number, y: number, z: number, color: number, phase: number) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.05)
    disposables.push(geometry)
    const material = emissive(color)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    parent.add(mesh)
    blinkers.push({ material, phase })
  }

  function rack(parent: InstanceType<typeof THREE.Object3D>, x: number, z: number, units: number, accent: number) {
    box(parent, 2, 4.4, 1.4, COLORS.ink, x, 2.35, z)
    for (let i = 0; i < units; i += 1) {
      const y = 0.7 + i * (3.5 / units)
      box(parent, 1.8, 3.1 / units, 0.05, COLORS.steel, x, y + 0.3, z + 0.72, false)
      led(parent, x + 0.75, y + 0.3, z + 0.76, i % 3 === 0 ? accent : COLORS.green, i * 0.7 + x)
    }
  }

  const zones: InstanceType<typeof THREE.Group>[] = []
  const gates: { arm: InstanceType<typeof THREE.Mesh> }[] = []
  const swayers: InstanceType<typeof THREE.Mesh>[] = []
  const rotors: { mesh: InstanceType<typeof THREE.Object3D>; speed: number }[] = []
  const movers: { mesh: InstanceType<typeof THREE.Mesh>; from: InstanceType<typeof THREE.Vector3>; to: InstanceType<typeof THREE.Vector3>; speed: number; offset: number; blocked: boolean }[] = []

  ZONES.forEach((zone, index) => {
    const group = new THREE.Group()
    group.position.set(0, 0, -index * SPACING)
    scene.add(group)
    zones.push(group)

    box(group, 20, 0.3, 17, COLORS.card, 0, -0.15, 0)
    const grid = new THREE.GridHelper(20, 20, COLORS.line, COLORS.line)
    grid.position.y = 0.02
    const gridMaterial = grid.material
    if (!Array.isArray(gridMaterial)) {
      gridMaterial.transparent = true
      gridMaterial.opacity = 0.35
    }
    group.add(grid)

    if (zone.key === "network") {
      rack(group, -2.4, 0, 6, COLORS.blue)
      rack(group, 2.4, 0, 6, COLORS.blue)
      // 클라우드
      const cloudParts: [number, number, number][] = [[-0.9, 6.2, 1], [0, 6.6, 1.3], [1, 6.2, 1]]
      for (const [cx, cy, s] of cloudParts) {
        const sg = new THREE.SphereGeometry(0.8 * s, 20, 14)
        disposables.push(sg)
        const m = new THREE.Mesh(sg, mat(COLORS.card))
        m.position.set(cx, cy, -2.5)
        group.add(m)
      }
      // 지점(건물), 원격 사용자(노트북)
      box(group, 2.6, 1.8, 2, COLORS.floor, -6.4, 0.9, -3.2)
      box(group, 2.8, 0.25, 2.2, COLORS.copper, -6.4, 1.9, -3.2)
      box(group, 1.4, 0.1, 1, COLORS.ink, 6.4, 0.55, -3.4)
      box(group, 1.4, 0.9, 0.08, COLORS.steel, 6.4, 1.05, -3.85)
      const c1 = tube(group, [new THREE.Vector3(-2.4, 4.6, 0), new THREE.Vector3(-1, 5.6, -1.4), new THREE.Vector3(0, 5.9, -2.5)], COLORS.blue)
      const c2 = tube(group, [new THREE.Vector3(2.4, 4.6, 0), new THREE.Vector3(1.2, 5.6, -1.4), new THREE.Vector3(0.6, 5.9, -2.5)], COLORS.green)
      const c3 = tube(group, [new THREE.Vector3(-2.4, 0.5, 0.6), new THREE.Vector3(-4.6, 0.4, -1.6), new THREE.Vector3(-6.4, 0.3, -3)], COLORS.blue)
      const c4 = tube(group, [new THREE.Vector3(2.4, 0.5, 0.6), new THREE.Vector3(4.6, 0.4, -1.6), new THREE.Vector3(6.4, 0.3, -3.2)], COLORS.green)
      packet(group, c1, COLORS.blue, 3, 0.25)
      packet(group, c2, COLORS.green, 3, 0.25)
      packet(group, c3, COLORS.blue, 3, 0.25)
      packet(group, c4, COLORS.green, 3, 0.25)
    }

    if (zone.key === "server") {
      for (const x of [-4.2, 0, 4.2]) rack(group, x, 0, 10, COLORS.blue)
      box(group, 3, 0.12, 1.4, COLORS.copper, 4.2, 0.08, 2.2, false)
    }

    if (zone.key === "storage") {
      const arrays: [number, number][] = [[-3.4, 4], [3.2, 3]]
      for (const [x, tiers] of arrays) {
        for (let t = 0; t < tiers; t += 1) {
          box(group, 4.2, 0.62, 2.6, COLORS.steel, x, 0.4 + t * 0.72, 0)
          for (let b = 0; b < 8; b += 1) box(group, 0.38, 0.4, 0.05, COLORS.ink, x - 1.5 + b * 0.43, 0.4 + t * 0.72, 1.33, false)
          led(group, x + 1.8, 0.4 + t * 0.72, 1.34, COLORS.green, t + x)
        }
      }
      for (let d = 0; d < 3; d += 1) {
        const cg = new THREE.CylinderGeometry(0.9, 0.9, 0.4, 28)
        disposables.push(cg)
        const disk = new THREE.Mesh(cg, mat(COLORS.ink))
        disk.position.set(-2.4 + d * 2.4, 0.5 + d * 0.6, -4.4)
        group.add(disk)
        rotors.push({ mesh: disk, speed: 0.6 + d * 0.2 })
      }
      const sync = tube(group, [new THREE.Vector3(-1.2, 3.2, 0), new THREE.Vector3(0, 4.4, 0.6), new THREE.Vector3(1.4, 2.4, 0)], COLORS.green)
      packet(group, sync, COLORS.green, 4, 0.3)
    }

    if (zone.key === "backup") {
      rack(group, -4.4, 0, 6, COLORS.blue)
      const vault = box(group, 3.2, 3.4, 2.6, COLORS.steel, 4.4, 1.7, 0)
      const dg = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 32)
      disposables.push(dg)
      const door = new THREE.Mesh(dg, mat(COLORS.card))
      door.rotation.x = Math.PI / 2
      door.position.set(0, 0, 1.35)
      vault.add(door)
      const tg = new THREE.TorusGeometry(1.4, 0.07, 10, 48)
      disposables.push(tg)
      const clock = new THREE.Mesh(tg, mat(COLORS.copper))
      clock.position.set(-0.4, 3.9, 0)
      group.add(clock)
      rotors.push({ mesh: clock, speed: 0.8 })
      const hand = box(group, 0.08, 1.1, 0.08, COLORS.copper, -0.4, 3.9, 0, false)
      rotors.push({ mesh: hand, speed: 1.6 })
      // 원격(격리) 사이트
      box(group, 6, 0.25, 4, COLORS.floor, 0, 0.1, -6.5)
      box(group, 2.4, 1.6, 1.6, COLORS.steel, 0, 1, -6.5)
      const copy = tube(group, [new THREE.Vector3(-4.4, 4.7, 0), new THREE.Vector3(-1, 6.3, -2), new THREE.Vector3(4.4, 4.2, 0)], COLORS.blue)
      packet(group, copy, COLORS.blue, 4, 0.2)
      const remote = tube(group, [new THREE.Vector3(4.4, 0.4, 0.8), new THREE.Vector3(2, 0.4, -3.6), new THREE.Vector3(0, 0.6, -6)], COLORS.green)
      packet(group, remote, COLORS.green, 3, 0.18)
    }

    if (zone.key === "security") {
      for (let i = -3; i <= 3; i += 1) {
        if (i === 0) continue
        box(group, 1.5, 3.2, 0.3, COLORS.steel, i * 1.7 + Math.sign(i) * 0.6, 1.6, 0)
      }
      box(group, 0.3, 3.4, 0.5, COLORS.ink, -1.2, 1.7, 0)
      box(group, 0.3, 3.4, 0.5, COLORS.ink, 1.2, 1.7, 0)
      const arm = box(group, 2.2, 0.18, 0.18, COLORS.copper, 0, 1.2, 0.3, false)
      gates.push({ arm })
      const shape = new THREE.Shape()
      shape.moveTo(0, 1.2)
      shape.lineTo(1, 0.8)
      shape.lineTo(1, -0.2)
      shape.quadraticCurveTo(1, -1, 0, -1.4)
      shape.quadraticCurveTo(-1, -1, -1, -0.2)
      shape.lineTo(-1, 0.8)
      shape.closePath()
      const sg = new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: false })
      disposables.push(sg)
      const shield = new THREE.Mesh(sg, mat(COLORS.green))
      shield.position.set(0, 4.9, -0.25)
      shield.scale.setScalar(1.25)
      group.add(shield)
      swayers.push(shield)
      // 로그 타워(탐지)
      box(group, 1.2, 4, 1.2, COLORS.ink, -5.6, 2, -2.4)
      for (let i = 0; i < 5; i += 1) led(group, -5.6, 0.8 + i * 0.7, -1.78, i % 2 ? COLORS.green : COLORS.blue, i)
      // 접근 시도: 허용(파랑)은 통과, 차단(빨강)은 반사
      for (let i = 0; i < 5; i += 1) {
        const blocked = i % 2 === 1
        const geometry = new THREE.BoxGeometry(0.35, 0.35, 0.35)
        disposables.push(geometry)
        const mesh = new THREE.Mesh(geometry, emissive(blocked ? COLORS.red : COLORS.blue))
        group.add(mesh)
        movers.push({ mesh, from: new THREE.Vector3(-0.6 + (i % 3) * 0.6, 0.9, 7), to: new THREE.Vector3(-0.6 + (i % 3) * 0.6, 0.9, -7), speed: 0.12, offset: i / 5, blocked })
      }
    }
  })

  // 핫스팟 3D 포커스 링
  const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 8, 40)
  disposables.push(ringGeometry)
  const ring = new THREE.Mesh(ringGeometry, emissive(COLORS.blue))
  ring.visible = false
  scene.add(ring)

  const labelEls: { el: HTMLElement; zone: number; pos: InstanceType<typeof THREE.Vector3> }[] = []
  LABELS.forEach((items, zi) => {
    for (const [text, x, y, z] of items) {
      const el = document.createElement("span")
      el.className = "tour__label"
      el.textContent = text
      labelHost.appendChild(el)
      labelEls.push({ el, zone: zi, pos: new THREE.Vector3(x, y, z - zi * SPACING) })
    }
  })

  let progress = 0
  let smooth = 0
  let zoneIndex = 0
  let focus = 0
  let running = false
  let frame = 0
  let visible = true
  let pointerX = 0
  let pointerY = 0
  const clock = new THREE.Clock()

  const anchors = ZONES.map((_, index) => ({
    pos: new THREE.Vector3(index % 2 === 0 ? 8.5 : -8.5, 7.2, -index * SPACING + 15),
    target: new THREE.Vector3(0, 2.4, -index * SPACING),
  }))

  function ease(x: number) {
    return x * x * (3 - 2 * x)
  }

  const tmpPos = new THREE.Vector3()
  const tmpTarget = new THREE.Vector3()

  function placeCamera() {
    const last = anchors.length - 1
    const u = Math.min(Math.max(smooth, 0), 1) * last
    const i = Math.min(Math.floor(u), last - 1)
    const s = u - i
    const k = ease(Math.min(Math.max((s - 0.22) / 0.56, 0), 1))
    const a = anchors[i]
    const b = anchors[i + 1]
    if (a === undefined || b === undefined) return
    tmpPos.lerpVectors(a.pos, b.pos, k)
    tmpPos.y += Math.sin(Math.PI * k) * 5
    tmpTarget.lerpVectors(a.target, b.target, k)
    camera.position.set(tmpPos.x + pointerX * 1.4, tmpPos.y - pointerY * 0.8, tmpPos.z)
    camera.lookAt(tmpTarget)
    const nextZone = Math.round(u)
    if (nextZone !== zoneIndex) {
      zoneIndex = nextZone
      onZone(zoneIndex)
    }
  }

  const projected = new THREE.Vector3()
  function placeHotspots() {
    const spots = HOTSPOTS[zoneIndex] ?? []
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    hotspotEls.forEach((el, i) => {
      const spot = spots[i]
      if (spot === undefined) {
        el.style.visibility = "hidden"
        return
      }
      projected.set(spot[0], spot[1], spot[2] - zoneIndex * SPACING)
      projected.project(camera)
      const onScreen = projected.z < 1 && Math.abs(projected.x) < 1.05 && Math.abs(projected.y) < 1.05
      el.style.visibility = onScreen ? "visible" : "hidden"
      el.style.transform = `translate(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px) translate(-50%, -50%)`
    })
    for (const label of labelEls) {
      if (label.zone !== zoneIndex) {
        label.el.style.visibility = "hidden"
        continue
      }
      projected.copy(label.pos).project(camera)
      const ok = projected.z < 1 && Math.abs(projected.x) < 1.05 && Math.abs(projected.y) < 1.05
      label.el.style.visibility = ok ? "visible" : "hidden"
      label.el.style.transform = `translate(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px) translate(-50%, -50%)`
    }
    const target = spots[focus]
    if (target) {
      ring.visible = true
      ring.position.set(target[0], target[1], target[2] - zoneIndex * SPACING)
      ring.lookAt(camera.position)
    }
  }

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
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener("pointermove", onPointer, { passive: true })

  const curvePoint = new THREE.Vector3()
  function render() {
    const t = clock.getElapsedTime()
    smooth += (progress - smooth) * 0.08
    placeCamera()
    packets.forEach((p) => {
      const u = (t * p.speed + p.offset) % 1
      p.curve.getPoint(u, curvePoint)
      p.mesh.position.copy(curvePoint)
    })
    blinkers.forEach((b) => {
      b.material.emissiveIntensity = 0.35 + 0.65 * Math.max(0, Math.sin(t * 2.2 + b.phase))
    })
    rotors.forEach((r) => {
      r.mesh.rotation.y += r.speed * 0.01
    })
    swayers.forEach((m) => {
      m.rotation.y = Math.sin(t * 0.7) * 0.45
    })
    gates.forEach((g) => {
      g.arm.rotation.z = Math.sin(t * 1.4) > 0.2 ? Math.PI / 2.4 : 0
    })
    movers.forEach((m) => {
      const u = (t * m.speed + m.offset) % 1
      if (m.blocked) {
        const reach = Math.min(u / 0.6, 1)
        m.mesh.position.lerpVectors(m.from, m.to, reach * 0.5)
        m.mesh.scale.setScalar(u < 0.6 ? 1 : Math.max(0, (0.7 - u) / 0.1))
        m.mesh.visible = u < 0.7
      } else {
        m.mesh.position.lerpVectors(m.from, m.to, u)
      }
    })
    ring.scale.setScalar(1 + Math.sin(t * 3) * 0.12)
    placeHotspots()
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
  placeCamera()
  start()

  return {
    setProgress(value: number) {
      progress = Math.min(Math.max(value, 0), 1)
    },
    setFocus(value: number) {
      focus = value
    },
    dispose() {
      stop()
      io.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      for (const label of labelEls) label.el.remove()
      for (const item of disposables) item.dispose()
      renderer.dispose()
    },
  }
}
