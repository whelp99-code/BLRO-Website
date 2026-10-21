// 방화벽·IDS·IPS 설명 장면의 판정 코어.
// 화면(2D SVG, 3D 장면)은 이 파일의 출력만 그린다. 판정은 여기서만 결정한다.
// 일반 정의만 담는다: 규칙 기반 방화벽은 주소·포트 조건만 보고, IDS는 사본을 감시해 경보만 내며,
// IPS는 경로 중간에서 검사해 차단한다. 탐지·차단 성능 수치는 다루지 않는다.

export type DeviceKey = "firewall" | "ids" | "ips"
export type Action = "allow" | "block" | "alert" | "pass"
export type Signature = "clean" | "attack" | "lookalike"
export type PacketKey = "normal" | "closed-port" | "hidden-attack" | "lookalike"

export type Packet = {
  readonly key: PacketKey
  readonly label: string
  readonly detail: string
  readonly portAllowed: boolean
  readonly signature: Signature
}

// 잘못된 조합(IDS가 경로 중간에서 차단)은 타입으로 표현할 수 없게 한다.
export type ChainElement =
  | { readonly device: "firewall"; readonly mode: "inline" }
  | { readonly device: "ips"; readonly mode: "inline" }
  | { readonly device: "ids"; readonly mode: "tap" }

export type ScenarioKey = "firewall" | "ids" | "ips" | "combined"

export type Scenario = {
  readonly key: ScenarioKey
  readonly name: string
  readonly role: string
  readonly summary: string
  readonly caveat: string
  readonly chain: readonly ChainElement[]
}

export type Step = {
  readonly device: DeviceKey
  readonly mode: ChainElement["mode"]
  readonly action: Action
}

export type Result = {
  readonly packetKey: PacketKey
  readonly steps: readonly Step[]
  readonly delivered: boolean
  readonly stoppedAt: DeviceKey | null
  readonly alertedBy: readonly DeviceKey[]
  readonly falsePositive: boolean
}

export type Frame = {
  // 0은 출발지, 1..n은 장치 자리, n+1은 서버
  readonly slot: number
  readonly action: Action | "start" | "delivered"
  // 사본을 감시하는 장치(IDS)는 경로 밖 가지에 놓인다
  readonly branch: boolean
}

export const FLOW_PACKETS: readonly Packet[] = [
  {
    key: "normal",
    label: "정상 업무 접속",
    detail: "허용된 포트로 들어오는 일반 업무 요청입니다.",
    portAllowed: true,
    signature: "clean",
  },
  {
    key: "closed-port",
    label: "허용하지 않은 포트 접속",
    detail: "업무에 열어 두지 않은 포트로 들어오는 접속 시도입니다.",
    portAllowed: false,
    signature: "clean",
  },
  {
    key: "hidden-attack",
    label: "허용된 포트 안의 공격 패턴",
    detail: "열어 둔 포트로 들어오지만 내용에 공격 패턴이 섞여 있습니다.",
    portAllowed: true,
    signature: "attack",
  },
  {
    key: "lookalike",
    label: "공격과 비슷해 보이는 정상 요청",
    detail: "정상 요청이지만 탐지 규칙에는 의심 패턴처럼 보입니다.",
    portAllowed: true,
    signature: "lookalike",
  },
] as const

export const FLOW_SCENARIOS: readonly Scenario[] = [
  {
    key: "firewall",
    name: "방화벽",
    role: "정해 둔 규칙에 따라 통신을 허용하거나 차단합니다.",
    summary: "출발지, 목적지, 포트 같은 조건을 규칙표와 대조해 규칙에 맞는 통신만 통과시킵니다.",
    caveat: "규칙 조건만 보는 방화벽은 허용된 포트에 실린 내용까지 검사하지 않습니다. 제품에 따라 한 장비가 IPS 기능을 함께 수행하기도 합니다.",
    chain: [{ device: "firewall", mode: "inline" }],
  },
  {
    key: "ids",
    name: "IDS",
    role: "통신 사본을 감시하다가 의심되면 경보를 냅니다.",
    summary: "경로 밖에서 복제한 트래픽을 분석해 침입 징후를 담당자에게 알립니다.",
    caveat: "통신을 막지 않으므로 경보가 울린 시점에는 이미 통신이 지나갔을 수 있습니다.",
    chain: [{ device: "ids", mode: "tap" }],
  },
  {
    key: "ips",
    name: "IPS",
    role: "경로 중간에서 검사하고 위협이면 바로 차단합니다.",
    summary: "모든 패킷이 장비를 지나가므로 위협으로 판단한 통신을 서버에 닿기 전에 막을 수 있습니다.",
    caveat: "정상 통신을 위협으로 잘못 판단하면 업무 통신도 막힙니다. 도입 전에 시험 트래픽으로 규칙을 맞춥니다.",
    chain: [{ device: "ips", mode: "inline" }],
  },
  {
    key: "combined",
    name: "함께 구성",
    role: "규칙 밖 통신은 방화벽이, 허용된 통신 안의 위협은 IPS가 막고, IDS 경보는 담당자가 확인합니다.",
    summary: "방화벽 뒤에 IPS를 두고 IDS가 사본을 감시하는 일반적인 배치 예시입니다.",
    caveat: "실제 배치와 규칙은 현재 네트워크 구성과 운영 담당을 확인한 뒤 정합니다.",
    chain: [
      { device: "firewall", mode: "inline" },
      { device: "ids", mode: "tap" },
      { device: "ips", mode: "inline" },
    ],
  },
] as const

function isFlagged(packet: Packet): boolean {
  return packet.signature !== "clean"
}

function judge(device: DeviceKey, packet: Packet): Action {
  switch (device) {
    case "firewall":
      return packet.portAllowed ? "allow" : "block"
    case "ids":
      return isFlagged(packet) ? "alert" : "pass"
    case "ips":
      return isFlagged(packet) ? "block" : "pass"
  }
}

export function simulate(chain: readonly ChainElement[], packet: Packet): Result {
  const steps: Step[] = []
  const alertedBy: DeviceKey[] = []
  let stoppedAt: DeviceKey | null = null

  for (const element of chain) {
    if (stoppedAt !== null) break
    const action = judge(element.device, packet)
    steps.push({ device: element.device, mode: element.mode, action })
    if (action === "alert") alertedBy.push(element.device)
    if (element.mode === "inline" && action === "block") stoppedAt = element.device
  }

  return {
    packetKey: packet.key,
    steps,
    delivered: stoppedAt === null,
    stoppedAt,
    alertedBy,
    falsePositive: stoppedAt === "ips" && packet.signature === "lookalike",
  }
}

// 장치 자리(1..n)와 서버(n+1)를 0..1 가로 위치로 바꾼다. 2D와 3D가 같은 값을 쓴다.
export function slotPosition(slot: number, chainLength: number): number {
  return slot / (chainLength + 1)
}

export function timeline(result: Result): readonly Frame[] {
  const frames: Frame[] = [{ slot: 0, action: "start", branch: false }]
  result.steps.forEach((step, index) => {
    frames.push({ slot: index + 1, action: step.action, branch: step.mode === "tap" })
  })
  if (result.delivered) frames.push({ slot: result.steps.length + 1, action: "delivered", branch: false })
  return frames
}

const DEVICE_NAME: Readonly<Record<DeviceKey, string>> = { firewall: "방화벽", ids: "IDS", ips: "IPS" }

export function deviceName(device: DeviceKey): string {
  return DEVICE_NAME[device]
}

export const ACTION_TAG: Readonly<Record<Action, { readonly en: string; readonly ko: string }>> = {
  allow: { en: "ALLOW", ko: "허용" },
  block: { en: "BLOCK", ko: "차단" },
  alert: { en: "ALERT", ko: "경보" },
  pass: { en: "PASS", ko: "이상 없음" },
}

function stepSentence(step: Step): string {
  const name = deviceName(step.device)
  switch (step.action) {
    case "allow":
      return `${name}: 허용된 포트라 통과시킵니다.`
    case "pass":
      return step.mode === "tap" ? `${name}: 사본을 살펴봤지만 이상이 없습니다.` : `${name}: 검사에서 이상이 없어 통과시킵니다.`
    case "alert":
      return `${name}: 의심 패턴을 발견해 경보를 냅니다. 통신은 그대로 진행됩니다.`
    case "block":
      return step.device === "firewall" ? `${name}: 허용하지 않은 포트라 차단합니다.` : `${name}: 위협으로 판단해 서버에 닿기 전에 차단합니다.`
  }
}

// 화면의 결과 표와 스크린리더용 설명에 쓰는 문장. 같은 판정에서 항상 같은 문장이 나온다.
export function describe(result: Result): readonly string[] {
  const lines = result.steps.map(stepSentence)
  lines.push(result.delivered ? "결과: 서버에 도착합니다." : "결과: 서버에 도착하지 못합니다.")
  if (result.falsePositive) lines.push("정상 요청이어도 위협으로 잘못 판단되면 차단됩니다. 이를 오탐이라고 합니다.")
  return lines
}

export function summarize(result: Result): string {
  const verdicts = result.steps.map((step) => `${deviceName(step.device)} ${ACTION_TAG[step.action].ko}`).join(" · ")
  return `${verdicts} → ${result.delivered ? "도착" : "차단됨"}`
}
