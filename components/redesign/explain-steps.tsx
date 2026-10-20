type ExplainStep = {
  readonly name: string
  readonly summary: string
  readonly points: readonly string[]
}

type ExplainStepsProps = {
  readonly group: string
  readonly steps: readonly ExplainStep[]
}

// 서버 컴포넌트, JS 없이 동작하는 아코디언입니다.
// details[name]은 같은 그룹에서 하나만 열립니다. JS가 꺼져 있어도 내용을 읽을 수 있습니다.
export function ExplainSteps({ group, steps }: ExplainStepsProps) {
  return (
    <div className="rd-explain">
      {steps.map((step, index) => (
        <details className="rd-explain-item" key={step.name} name={group} open={index === 0}>
          <summary>
            <span className="rd-explain-idx">{String(index + 1).padStart(2, "0")}</span>
            <span className="rd-explain-head">
              <strong>{step.name}</strong>
              <span>{step.summary}</span>
            </span>
          </summary>
          <ul>
            {step.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}
