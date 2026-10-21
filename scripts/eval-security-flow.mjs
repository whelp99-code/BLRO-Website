// 방화벽·IDS·IPS 장면 자동 평가. 같은 소스에서는 항상 같은 점수가 나온다.
// 사용: node scripts/eval-security-flow.mjs  (90점 미만이면 종료 코드 1)
import { readFile } from "node:fs/promises"
import { FLOW_PACKETS, FLOW_SCENARIOS, describe, simulate, summarize, timeline } from "../lib/security-flow.ts"

const PASS_SCORE = 90
const report = []

function section(name, max, earned, notes) {
  report.push({ name, max, earned: Math.round(earned * 10) / 10, notes })
}

// 1) 기대표 일치 (30): 구현과 따로 규칙 문장에서 손으로 도출한 표
const ORACLE = {
  firewall: { normal: [true, "allow"], "closed-port": [false, "block"], "hidden-attack": [true, "allow"], lookalike: [true, "allow"] },
  ids: { normal: [true, "pass"], "closed-port": [true, "pass"], "hidden-attack": [true, "alert"], lookalike: [true, "alert"] },
  ips: { normal: [true, "pass"], "closed-port": [true, "pass"], "hidden-attack": [false, "block"], lookalike: [false, "block"] },
}
{
  let total = 0
  let ok = 0
  const notes = []
  for (const [scenarioKey, table] of Object.entries(ORACLE)) {
    const scenario = FLOW_SCENARIOS.find((item) => item.key === scenarioKey)
    for (const [packetKey, [delivered, action]] of Object.entries(table)) {
      total += 1
      const packet = FLOW_PACKETS.find((item) => item.key === packetKey)
      const result = scenario && packet ? simulate(scenario.chain, packet) : null
      const match = result !== null && result.delivered === delivered && result.steps[0]?.action === action
      if (match) ok += 1
      else notes.push(`${scenarioKey}/${packetKey}`)
    }
  }
  section("기대표 일치", 30, (30 * ok) / total, notes.length ? `불일치: ${notes.join(", ")}` : `${ok}/${total}`)
}

// 2) 불변식 (20): 장치 0~3개의 모든 순열 x 모든 패킷
{
  const devices = [
    { device: "firewall", mode: "inline" },
    { device: "ips", mode: "inline" },
    { device: "ids", mode: "tap" },
  ]
  const chains = [[]]
  const walk = (prefix, rest) => {
    rest.forEach((element, i) => {
      const next = [...prefix, element]
      chains.push(next)
      walk(next, [...rest.slice(0, i), ...rest.slice(i + 1)])
    })
  }
  walk([], devices)
  let checks = 0
  let ok = 0
  for (const chain of chains) {
    for (const packet of FLOW_PACKETS) {
      const result = simulate(chain, packet)
      const withoutIds = simulate(chain.filter((e) => e.device !== "ids"), packet)
      const inlineBlock = result.steps.some((s) => s.mode === "inline" && s.action === "block")
      const last = result.steps[result.steps.length - 1]
      const frames = timeline(result)
      const slots = frames.map((f) => f.slot)
      const good =
        result.delivered === !inlineBlock &&
        result.delivered === withoutIds.delivered &&
        (result.stoppedAt === null ? result.steps.length === chain.length : last?.device === result.stoppedAt && last?.action === "block") &&
        slots.every((slot, i) => i === 0 || slot > slots[i - 1])
      checks += 1
      if (good) ok += 1
    }
  }
  section("불변식", 20, (20 * ok) / checks, `${ok}/${checks} 조합`)
}

// 3) 결정성 (10)
{
  const run = () => JSON.stringify(FLOW_SCENARIOS.flatMap((s) => FLOW_PACKETS.map((p) => [simulate(s.chain, p), describe(simulate(s.chain, p)), summarize(simulate(s.chain, p))])))
  section("결정성", 10, run() === run() ? 10 : 0, "같은 입력 두 번 실행 결과 비교")
}

// 4) 문구 점검 (15): 수치 약속, 작성 지침식 표현, 제품명
const files = {
  lib: await readFile("lib/security-flow.ts", "utf8"),
  tsx: await readFile("components/redesign/security-flow.tsx", "utf8"),
  scene: await readFile("components/redesign/security-flow-scene.ts", "utf8"),
  css: await readFile("app/redesign.css", "utf8"),
  page: await readFile("app/page.tsx", "utf8"),
}
{
  const copy = [
    ...FLOW_SCENARIOS.flatMap((s) => [s.name, s.role, s.summary, s.caveat]),
    ...FLOW_PACKETS.flatMap((p) => [p.label, p.detail]),
    ...FLOW_SCENARIOS.flatMap((s) => FLOW_PACKETS.flatMap((p) => describe(simulate(s.chain, p)))),
  ].join("\n")
  const rules = [
    [/\d+\s*%/u, "퍼센트 수치"],
    [/보장|완벽|항상 막|100\s*%|차단율|탐지율/u, "성능 약속"],
    [/지우지 않습니다|한 선으로 그리지 않습니다/u, "작성 지침식 표현"],
    [/Sangfor|Palo Alto|시큐아이|Fortinet|Cisco/iu, "제품·제조사명"],
  ]
  const hits = rules.filter(([pattern]) => pattern.test(copy)).map(([, label]) => label)
  section("문구 점검", 15, hits.length === 0 ? 15 : Math.max(0, 15 - 5 * hits.length), hits.length ? `위반: ${hits.join(", ")}` : "위반 없음")
}

// 5) 접근성·모션 (15)
{
  const checks = [
    [/aria-pressed/u.test(files.tsx), "토글 버튼 상태(aria-pressed)"],
    [/aria-live="polite"/u.test(files.tsx), "결과 영역 aria-live"],
    [/role="img"/u.test(files.tsx) && /aria-label=\{diagramLabel\}/u.test(files.tsx), "도식 대체 텍스트"],
    [/aria-hidden="true"[^>]*sf__canvas|sf__canvas[^>]*aria-hidden="true"/u.test(files.tsx), "3D 캔버스 aria-hidden"],
    [/prefers-reduced-motion/u.test(files.tsx) && /prefers-reduced-motion/u.test(files.css), "모션 감소 대응(로직+CSS)"],
    [/summarize\(/u.test(files.tsx) && /describe\(/u.test(files.tsx), "모든 판정의 텍스트 표"],
    [/min-height:\s*44px/u.test(files.css.slice(files.css.indexOf(".sf {"))), "터치 크기 44px"],
  ]
  const ok = checks.filter(([pass]) => pass).length
  section("접근성·모션", 15, (15 * ok) / checks.length, checks.filter(([pass]) => !pass).map(([, label]) => `미충족: ${label}`).join("; ") || `${ok}/${checks.length}`)
}

// 6) 번들 가드 (10): three는 동적 import로만, 3D는 데스크톱에서만
{
  const checks = [
    [!/from\s+["']three["']/u.test(files.tsx) && !/from\s+["']three["']/u.test(files.page), "컴포넌트·페이지가 three를 정적 import하지 않음"],
    [/import\(["']three["']\)/u.test(files.scene) && !/^import .* from ["']three["']/mu.test(files.scene), "장면 파일은 three를 동적 import"],
    [/min-width: 900px/u.test(files.tsx), "3D는 데스크톱 폭에서만"],
    [/IntersectionObserver/u.test(files.tsx) && /IntersectionObserver/u.test(files.scene), "화면 근처에서만 로드·재생"],
  ]
  const ok = checks.filter(([pass]) => pass).length
  section("번들 가드", 10, (10 * ok) / checks.length, checks.filter(([pass]) => !pass).map(([, label]) => `미충족: ${label}`).join("; ") || `${ok}/${checks.length}`)
}

const score = report.reduce((sum, item) => sum + item.earned, 0)
for (const item of report) console.log(`${item.name.padEnd(10)} ${String(item.earned).padStart(5)} / ${item.max}  ${item.notes}`)
console.log(`SCORE ${Math.round(score * 10) / 10} / 100 (통과 ${PASS_SCORE})`)
// 판정·불변식·결정성·문구는 한 건이라도 어긋나면 점수와 무관하게 실패한다.
const HARD = new Set(["기대표 일치", "불변식", "결정성", "문구 점검"])
const hardFailures = report.filter((item) => HARD.has(item.name) && item.earned < item.max).map((item) => item.name)
if (hardFailures.length > 0) console.log(`HARD FAIL: ${hardFailures.join(", ")}`)
process.exit(score >= PASS_SCORE && hardFailures.length === 0 ? 0 : 1)
