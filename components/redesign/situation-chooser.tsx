import Link from "next/link"

const SITUATIONS = [
  { title: "서버를 새로 구성하거나 교체", note: "Sangfor HCI, aSV, GIGABYTE·KAYTUS 서버", href: "/customer#situation-server" },
  { title: "저장과 증설 검토", note: "aStor 등 응답, 용량, 보호 요구", href: "/customer#situation-storage" },
  { title: "업무 화면, 경계, 관리자 접근", note: "데스크톱, 방화벽, 서버 접근 제어", href: "/customer#situation-workspace" },
] as const

export function SituationChooser() {
  return (
    <section aria-labelledby="situation-heading" className="rd-chapter">
      <div className="rd-wrap">
        <h2 id="situation-heading">지금 필요한 일은 무엇인가요?</h2>
        <p>제품이 정해지지 않아도 됩니다. 가까운 상황을 고르면 해당 안내로 이동합니다.</p>
        <ul className="rd-chooser">
          {SITUATIONS.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <strong>{item.title}</strong>
                <span>{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
