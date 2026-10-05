const STEPS = [
  { name: "도입", detail: "상황과 범위", cy: 48, tone: "signal" },
  { name: "전환", detail: "제약과 데이터 보호", cy: 98, tone: "idle" },
  { name: "구축", detail: "합의한 공급과 설치", cy: 148, tone: "idle" },
  { name: "운영", detail: "담당과 인수 범위", cy: 198, tone: "idle" },
  { name: "기술지원", detail: "자료와 문의 경로", cy: 248, tone: "engineer" },
] as const

export function LifecycleFigure() {
  return (
    <figure className="rd-panel life-pin">
      <figcaption className="rd-kicker">설명 그림 · 서비스 라이프사이클</figcaption>
      <svg aria-labelledby="lifeTitle" className="life-svg" role="img" viewBox="0 0 420 280">
        <title id="lifeTitle">도입, 전환, 구축, 운영, 기술지원 다섯 단계. 스크롤에 따라 진행선이 그려집니다.</title>
        <path className="life-rail" d="M36 48 V248" />
        <path className="life-progress" d="M36 48 V248" pathLength={100} />
        {STEPS.map((step, index) => (
          <g className="life-step" data-i={index} data-step key={step.name}>
            <circle
              cx="36"
              cy={step.cy}
              fill={step.tone === "signal" ? "var(--signal)" : step.tone === "engineer" ? "var(--engineer)" : "var(--line)"}
              r="7"
            />
            <text fill="currentColor" fontSize="14" x="56" y={step.cy - 4}>
              {step.name}
            </text>
            <text className="sub" fill="currentColor" fontSize="12" x="56" y={step.cy + 14}>
              {step.detail}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
