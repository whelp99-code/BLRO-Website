import { slotPosition, type Action, type ChainElement } from "@/lib/security-flow"
import { deviceName } from "@/lib/security-flow"

const loadThree = () => import("three")

// 장면은 판정을 하지 않는다. React가 lib/security-flow의 출력으로 만든 상태를 그리기만 한다.
export type SceneState = {
  readonly chain: readonly ChainElement[]
  readonly slot: number
  readonly branch: boolean
  readonly action: Action | "start" | "delivered"
  // 장치 자리별로 지금까지 나온 판정 표시(없으면 null)
  readonly tags: readonly (string | null)[]
}

export type SceneHandle = {
  readonly update: (state: SceneState) => void
  readonly dispose: () => void
}

type SceneOptions = {
  readonly canvas: HTMLCanvasElement
  readonly labelHost: HTMLElement
}

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

const HALF = 9

function actionColor(action: SceneState["action"]): number {
  switch (action) {
    case "block":
      return COLORS.red
    case "alert":
      return COLORS.copper
    case "delivered":
      return COLORS.green
    default:
      return COLORS.blue
  }
}

export async function mountFlowScene(options: SceneOptions): Promise<SceneHandle | null> {
  const { canvas, labelHost } = options
  const THREE = await loadThree()
  let renderer: InstanceType<typeof THREE.WebGLRenderer>
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(COLORS.paper)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(COLORS.paper)
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  camera.position.set(0, 11.5, 26)
  camera.lookAt(0, 0.6, 0.8)
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0c0, 1.4))
  const sun = new THREE.DirectionalLight(0xffffff, 1.4)
  sun.position.set(6, 12, 9)
  scene.add(sun)

  const fixed: { dispose: () => void }[] = []
  const matCache = new Map<number, InstanceType<typeof THREE.MeshStandardMaterial>>()
  function mat(color: number) {
    const cached = matCache.get(color)
    if (cached) return cached
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 })
    matCache.set(color, material)
    fixed.push(material)
    return material
  }
  const edgeMaterial = new THREE.LineBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0.3 })
  fixed.push(edgeMaterial)

  function box(parent: InstanceType<typeof THREE.Object3D>, bucket: { dispose: () => void }[], w: number, h: number, d: number, color: number, x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(w, h, d)
    bucket.push(geometry)
    const mesh = new THREE.Mesh(geometry, mat(color))
    mesh.position.set(x, y, z)
    const edges = new THREE.EdgesGeometry(geometry)
    bucket.push(edges)
    mesh.add(new THREE.LineSegments(edges, edgeMaterial))
    parent.add(mesh)
    return mesh
  }

  // 고정 요소: 바닥, 출발지, 서버, 주 경로
  box(scene, fixed, 22, 0.3, 11, COLORS.card, 0, -0.15, 1.2)
  const grid = new THREE.GridHelper(22, 22, COLORS.line, COLORS.line)
  grid.position.y = 0.02
  const gridMaterial = grid.material
  if (!Array.isArray(gridMaterial)) {
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.3
  }
  scene.add(grid)
  box(scene, fixed, 18, 0.12, 0.3, COLORS.line, 0, 0.5, 0)
  box(scene, fixed, 1.8, 0.9, 1.3, COLORS.floor, -HALF - 0.4, 0.45, 0)
  box(scene, fixed, 1.6, 0.1, 1.1, COLORS.ink, -HALF - 0.4, 1.0, 0)
  const serverRack = box(scene, fixed, 1.8, 3.4, 1.4, COLORS.ink, HALF + 0.4, 1.7, 0)
  for (let i = 0; i < 6; i += 1) box(serverRack, fixed, 1.5, 0.35, 0.05, COLORS.steel, 0, -1.3 + i * 0.5, 0.72)

  // 장치 묶음은 구성이 바뀔 때마다 다시 만든다
  let deviceGroup: InstanceType<typeof THREE.Group> | null = null
  let deviceDisposables: { dispose: () => void }[] = []
  let devicePositions: InstanceType<typeof THREE.Vector3>[] = []
  let deviceEls: { name: HTMLElement; tag: HTMLElement }[] = []
  let chainKey = ""

  function span(className: string, content: string) {
    const el = document.createElement("span")
    el.className = className
    el.textContent = content
    labelHost.appendChild(el)
    return el
  }
  const fixedLabels = [
    { el: span("sf__label", "출발지"), pos: new THREE.Vector3(-HALF - 0.4, 1.9, 0) },
    { el: span("sf__label", "서버"), pos: new THREE.Vector3(HALF + 0.4, 4.0, 0) },
  ]

  function clearDevices() {
    if (deviceGroup) scene.remove(deviceGroup)
    for (const item of deviceDisposables) item.dispose()
    for (const pair of deviceEls) {
      pair.name.remove()
      pair.tag.remove()
    }
    deviceGroup = null
    deviceDisposables = []
    devicePositions = []
    deviceEls = []
  }

  function buildDevices(chain: readonly ChainElement[]) {
    clearDevices()
    const group = new THREE.Group()
    scene.add(group)
    deviceGroup = group
    chain.forEach((element, index) => {
      const x = -HALF + 2 * HALF * slotPosition(index + 1, chain.length)
      const tap = element.mode === "tap"
      const z = tap ? 3.4 : -1.6
      box(group, deviceDisposables, 2.2, 2.4, 1.5, tap ? COLORS.steel : COLORS.ink, x, 1.2, z)
      // 경로 위의 관문: 인라인 장치는 통신이 반드시 지나가는 자리에 선다
      if (!tap) box(group, deviceDisposables, 0.25, 1.5, 1.3, element.device === "firewall" ? COLORS.copper : COLORS.green, x, 0.75, 0)
      const light = new THREE.SphereGeometry(0.14, 12, 8)
      deviceDisposables.push(light)
      const bulb = new THREE.Mesh(light, mat(element.device === "ips" || element.device === "firewall" ? COLORS.green : COLORS.copper))
      bulb.position.set(x + 0.8, 2.1, z + 0.8)
      group.add(bulb)
      if (tap) {
        // 경로에서 장치로 가는 사본 선
        box(group, deviceDisposables, 0.08, 0.08, 2.1, COLORS.line, x, 0.5, 1.5)
      }
      devicePositions.push(new THREE.Vector3(x, 2.9, z))
      deviceEls.push({ name: span("sf__label sf__label--device", tap ? `${deviceName(element.device)} (사본 감시)` : deviceName(element.device)), tag: span("sf__tag", "") })
    })
  }

  // 패킷과 사본
  const packetGeometry = new THREE.BoxGeometry(0.55, 0.55, 0.55)
  fixed.push(packetGeometry)
  const packetMaterial = new THREE.MeshStandardMaterial({ color: COLORS.blue, emissive: COLORS.blue, emissiveIntensity: 0.7, roughness: 0.4 })
  fixed.push(packetMaterial)
  const packetMesh = new THREE.Mesh(packetGeometry, packetMaterial)
  scene.add(packetMesh)
  const copyMaterial = new THREE.MeshStandardMaterial({ color: COLORS.copper, emissive: COLORS.copper, emissiveIntensity: 0.6, roughness: 0.4, transparent: true, opacity: 0.8 })
  fixed.push(copyMaterial)
  const copyMesh = new THREE.Mesh(packetGeometry, copyMaterial)
  copyMesh.scale.setScalar(0.7)
  copyMesh.visible = false
  scene.add(copyMesh)

  const target = new THREE.Vector3(-HALF - 0.4, 0.9, 0)
  const copyTarget = new THREE.Vector3()
  let targetScale = 1
  let snap = true
  let state: SceneState | null = null
  let running = false
  let visible = true
  let frameId = 0
  const projected = new THREE.Vector3()

  function worldX(slot: number, length: number) {
    if (slot === 0) return -HALF - 0.4
    if (slot === length + 1) return HALF + 0.4
    return -HALF + 2 * HALF * slotPosition(slot, length)
  }

  function place(el: HTMLElement, pos: InstanceType<typeof THREE.Vector3>, width: number, height: number) {
    projected.copy(pos).project(camera)
    const px = ((projected.x + 1) / 2) * width
    const py = ((1 - projected.y) / 2) * height
    const ok = projected.z < 1 && px > 12 && px < width - 12 && py > 12 && py < height - 12
    el.style.visibility = ok ? "visible" : "hidden"
    el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`
  }

  function render() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (snap) {
      packetMesh.position.copy(target)
      snap = false
    } else {
      packetMesh.position.lerp(target, 0.12)
    }
    packetMesh.rotation.y += 0.02
    const s = packetMesh.scale.x + (targetScale - packetMesh.scale.x) * 0.15
    packetMesh.scale.setScalar(s)
    copyMesh.position.lerp(copyTarget, 0.15)
    fixedLabels.forEach((label) => place(label.el, label.pos, width, height))
    devicePositions.forEach((pos, index) => {
      const pair = deviceEls[index]
      if (!pair) return
      place(pair.name, pos, width, height)
      place(pair.tag, new THREE.Vector3(pos.x, pos.y + 1.3, pos.z), width, height)
    })
    renderer.render(scene, camera)
    if (running) frameId = requestAnimationFrame(render)
  }
  function start() {
    if (running || !visible || document.hidden) return
    running = true
    frameId = requestAnimationFrame(render)
  }
  function stop() {
    running = false
    cancelAnimationFrame(frameId)
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
    update(next) {
      const key = next.chain.map((element) => `${element.device}:${element.mode}`).join("|")
      if (key !== chainKey) {
        chainKey = key
        buildDevices(next.chain)
        snap = true
      }
      if (state !== null && next.action === "start") snap = true
      state = next
      const length = next.chain.length
      // 차단된 패킷은 관문 앞에서 멈춘다
      target.set(worldX(next.slot, length) - (next.action === "block" ? 0.9 : 0), 0.9, 0)
      packetMaterial.color.setHex(actionColor(next.action))
      packetMaterial.emissive.setHex(actionColor(next.action))
      targetScale = next.action === "block" ? 0.55 : 1
      copyMesh.visible = next.branch
      if (next.branch) {
        const element = next.chain[next.slot - 1]
        const z = element?.mode === "tap" ? 3.4 : 0
        copyTarget.set(worldX(next.slot, length), 1.2, z - 1.1)
        if (!copyMesh.visible || copyMesh.position.z === 0) copyMesh.position.set(worldX(next.slot, length), 0.9, 0)
      }
      next.tags.forEach((tag, index) => {
        const pair = deviceEls[index]
        if (!pair) return
        pair.tag.textContent = tag ?? ""
        pair.tag.dataset["on"] = tag === null ? "false" : "true"
      })
    },
    dispose() {
      stop()
      io.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      clearDevices()
      for (const label of fixedLabels) label.el.remove()
      for (const item of fixed) item.dispose()
      renderer.dispose()
    },
  }
}
