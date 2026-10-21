import { describe, expect, it } from "vitest"
import {
  ACTION_TAG,
  FLOW_PACKETS,
  FLOW_SCENARIOS,
  describe as describeResult,
  simulate,
  slotPosition,
  summarize,
  timeline,
  type ChainElement,
  type PacketKey,
  type ScenarioKey,
} from "@/lib/security-flow"

// 코드와 따로 손으로 적은 기대표: [장치 판정 요약, 서버 도착 여부]
const EXPECTED: Readonly<Record<ScenarioKey, Readonly<Record<PacketKey, readonly [string, boolean]>>>> = {
  firewall: {
    normal: ["방화벽 허용", true],
    "closed-port": ["방화벽 차단", false],
    "hidden-attack": ["방화벽 허용", true],
    lookalike: ["방화벽 허용", true],
  },
  ids: {
    normal: ["IDS 이상 없음", true],
    "closed-port": ["IDS 이상 없음", true],
    "hidden-attack": ["IDS 경보", true],
    lookalike: ["IDS 경보", true],
  },
  ips: {
    normal: ["IPS 이상 없음", true],
    "closed-port": ["IPS 이상 없음", true],
    "hidden-attack": ["IPS 차단", false],
    lookalike: ["IPS 차단", false],
  },
  combined: {
    normal: ["방화벽 허용 · IDS 이상 없음 · IPS 이상 없음", true],
    "closed-port": ["방화벽 차단", false],
    "hidden-attack": ["방화벽 허용 · IDS 경보 · IPS 차단", false],
    lookalike: ["방화벽 허용 · IDS 경보 · IPS 차단", false],
  },
}

function packetOf(key: PacketKey) {
  const found = FLOW_PACKETS.find((packet) => packet.key === key)
  if (found === undefined) throw new Error(`unknown packet ${key}`)
  return found
}

describe("security flow 판정표", () => {
  for (const scenario of FLOW_SCENARIOS) {
    for (const packet of FLOW_PACKETS) {
      it(`${scenario.key} · ${packet.key}`, () => {
        const result = simulate(scenario.chain, packet)
        const expected = EXPECTED[scenario.key][packet.key]
        const verdicts = result.steps.map((step) => `${step.device === "firewall" ? "방화벽" : step.device === "ids" ? "IDS" : "IPS"} ${ACTION_TAG[step.action].ko}`).join(" · ")
        expect(verdicts).toBe(expected[0])
        expect(result.delivered).toBe(expected[1])
      })
    }
  }

  it("오탐은 IPS가 정상 요청을 차단할 때만 표시한다", () => {
    for (const scenario of FLOW_SCENARIOS) {
      for (const packet of FLOW_PACKETS) {
        const result = simulate(scenario.chain, packet)
        const expected = packet.key === "lookalike" && result.stoppedAt === "ips"
        expect(result.falsePositive).toBe(expected)
      }
    }
  })
})

describe("security flow 불변식", () => {
  const devices: readonly ChainElement[] = [
    { device: "firewall", mode: "inline" },
    { device: "ips", mode: "inline" },
    { device: "ids", mode: "tap" },
  ]
  // 장치 0~3개의 모든 순열(중복 없음)
  function chains(): ChainElement[][] {
    const out: ChainElement[][] = [[]]
    function walk(prefix: ChainElement[], rest: readonly ChainElement[]) {
      rest.forEach((element, i) => {
        const next = [...prefix, element]
        out.push(next)
        walk(next, [...rest.slice(0, i), ...rest.slice(i + 1)])
      })
    }
    walk([], devices)
    return out
  }

  it("도착 여부는 경로 중간 차단이 없을 때와 같다", () => {
    for (const chain of chains()) {
      for (const packet of FLOW_PACKETS) {
        const result = simulate(chain, packet)
        const inlineBlock = result.steps.some((step) => step.mode === "inline" && step.action === "block")
        expect(result.delivered).toBe(!inlineBlock)
        expect(result.stoppedAt === null).toBe(result.delivered)
      }
    }
  })

  it("IDS는 도착 여부를 바꾸지 않는다", () => {
    for (const chain of chains()) {
      const withoutIds = chain.filter((element) => element.device !== "ids")
      for (const packet of FLOW_PACKETS) {
        expect(simulate(chain, packet).delivered).toBe(simulate(withoutIds, packet).delivered)
      }
    }
  })

  it("차단된 뒤의 장치는 패킷을 보지 못한다", () => {
    for (const chain of chains()) {
      for (const packet of FLOW_PACKETS) {
        const result = simulate(chain, packet)
        if (result.stoppedAt === null) {
          expect(result.steps).toHaveLength(chain.length)
        } else {
          const last = result.steps[result.steps.length - 1]
          expect(last?.device).toBe(result.stoppedAt)
          expect(last?.action).toBe("block")
        }
      }
    }
  })

  it("정상 요청은 어떤 구성에서도 규칙 위반이 없으면 도착한다", () => {
    const normal = packetOf("normal")
    for (const chain of chains()) {
      expect(simulate(chain, normal).delivered).toBe(true)
    }
  })

  it("같은 입력은 항상 같은 출력을 낸다", () => {
    for (const scenario of FLOW_SCENARIOS) {
      for (const packet of FLOW_PACKETS) {
        expect(JSON.stringify(simulate(scenario.chain, packet))).toBe(JSON.stringify(simulate(scenario.chain, packet)))
      }
    }
  })
})

describe("security flow 타임라인과 문장", () => {
  it("타임라인은 출발지에서 시작해 도착하거나 멈춘 자리에서 끝난다", () => {
    for (const scenario of FLOW_SCENARIOS) {
      for (const packet of FLOW_PACKETS) {
        const result = simulate(scenario.chain, packet)
        const frames = timeline(result)
        expect(frames[0]).toEqual({ slot: 0, action: "start", branch: false })
        const last = frames[frames.length - 1]
        if (result.delivered) {
          expect(last?.action).toBe("delivered")
          expect(last?.slot).toBe(scenario.chain.length + 1)
        } else {
          expect(last?.action).toBe("block")
        }
        const slots = frames.map((frame) => frame.slot)
        expect(slots).toEqual([...slots].sort((a, b) => a - b))
      }
    }
  })

  it("가로 위치는 0과 1 사이에서 증가한다", () => {
    for (let n = 1; n <= 3; n += 1) {
      const positions = Array.from({ length: n + 2 }, (_, slot) => slotPosition(slot, n))
      expect(positions[0]).toBe(0)
      expect(positions[n + 1]).toBe(1)
      expect(positions).toEqual([...positions].sort((a, b) => a - b))
    }
  })

  it("모든 판정에 결과 문장이 있고 수치 약속이 없다", () => {
    const banned = /\d+\s*%|100|보장|항상 막|완벽|차단율/u
    for (const scenario of FLOW_SCENARIOS) {
      for (const packet of FLOW_PACKETS) {
        const result = simulate(scenario.chain, packet)
        const lines = describeResult(result)
        expect(lines.length).toBe(result.steps.length + 1 + (result.falsePositive ? 1 : 0))
        for (const line of [...lines, summarize(result)]) expect(line).not.toMatch(banned)
      }
      for (const copy of [scenario.name, scenario.role, scenario.summary, scenario.caveat]) expect(copy).not.toMatch(banned)
    }
  })
})
