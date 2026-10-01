import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { LifecycleFigure } from "@/components/redesign/lifecycle-figure"
import { TodoNote } from "@/components/redesign/todo-note"

export const HOME_HEADING = "기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다."

export const HOME_SUPPLY_LINE = "제품 공급과 전환 검증을 한 경로로 맡깁니다."

const LIFE_STEPS = [
  ["도입", "상황과 범위를 적습니다. 제품이 정해지지 않아도 됩니다."],
  ["전환", "제약과 데이터 보호를 먼저 적습니다. 일정이 정의를 대신하지 않습니다."],
  ["구축", "합의한 공급과 설치만 수행합니다."],
  ["운영", "담당과 인수 범위를 문서에 남깁니다. 확인되지 않은 응답 시간은 쓰지 않습니다."],
  ["기술지원", "자료와 문의 경로를 연결합니다. 없는 파일은 만들지 않습니다."],
] as const

export default function Home() {
  return (
    <div className="home-page rd">
      <section aria-labelledby="home-heading" className="rd-hero life-scroll home-hero">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker">주식회사 베를로</p>
            <h1 className="blro-heading blro-heading--display" id="home-heading">
              {HOME_HEADING}
            </h1>
            <p className="rd-lead">{HOME_SUPPLY_LINE}</p>
            <div className="rd-actions">
              <TrackableLink
                className="rd-btn rd-btn-primary home-action home-action--primary"
                data-testid="hero-primary-cta"
                href="/contact?type=customer-project&role=customer"
                properties={{ ctaId: "hero-customer-diagnostic", placement: "hero" }}
              >
                도입·운영 상담하기
              </TrackableLink>
              <TrackableLink
                className="rd-btn rd-btn-ghost home-action"
                href="/contact?type=partner-collaboration&role=partner"
                properties={{ ctaId: "hero-partner-path", placement: "hero" }}
              >
                협력 제안하기
              </TrackableLink>
              <Link className="rd-btn rd-btn-ghost home-action" href="/engineer">
                기술 자료 찾기
              </Link>
            </div>
            <p>
              BLRO는 제품 이름만 나열하는 카탈로그가 아닙니다. 기업 고객은 지금 상황부터, 국내 파트너는 누가 무엇을 맡는지부터, 기술 엔지니어는 설치·장애·호환 자료부터 들어옵니다. 세 경험은 한 상담 페이지로 합치지 않습니다.
            </p>
            <p>오른쪽 그림은 회사가 수행하는 일의 순서입니다. 좁은 화면에서는 글 바로 아래에 있습니다. 방문자의 다음 행동을 대신하지 않습니다. 고객 수, 응답 시간, 절감률은 확인된 공개 사실이 없어 적지 않습니다.</p>
            <TodoNote>홈 정본 문장은 아직 닫히지 않았습니다. 역할 연결 제목과 공급·전환 문장을 둘 다 두었고, 셋째 문장은 만들지 않았습니다.</TodoNote>
          </div>
          <LifecycleFigure />
        </div>
        <div className="rd-wrap">
          <ol className="rd-steps">
            {LIFE_STEPS.map(([name, detail], index) => (
              <li className="rd-step" data-reveal data-stagger={String(Math.min(index, 3))} key={name}>
                <span className="rd-idx">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="roles-heading" className="rd-band">
        <div className="rd-wrap">
          <h2 id="roles-heading">다섯 초 안에 역할을 고릅니다.</h2>
          <div className="rd-roles">
            <article className="rd-role customer" data-reveal>
              <p className="rd-who">기업 고객</p>
              <h3>도입·운영 상담하기</h3>
              <p>서버 교체, 저장, 업무 데스크톱, 경계 보안처럼 상황부터 적습니다. 제품이 정해지지 않아도 상담할 수 있습니다. 수행 범위가 확인되지 않은 일은 약속으로 쓰지 않습니다.</p>
              <Link className="rd-btn rd-btn-primary" href="/customer">고객 안내 보기</Link>
            </article>
            <article className="rd-role partner" data-reveal data-stagger="1">
              <p className="rd-who">국내 파트너</p>
              <h3>협력 제안하기</h3>
              <p>공동 영업, 공동 제안과 PoC, 구축·운영에서 누가 고객을 만나고 누가 기술 범위를 쓰는지가 먼저입니다. 파트너 프로그램 약관은 아직 공개 사실이 아닙니다.</p>
              <Link className="rd-btn rd-btn-ghost" href="/partner">역할 표 보기</Link>
            </article>
            <article className="rd-role engineer" data-reveal data-stagger="2">
              <p className="rd-who">기술 엔지니어</p>
              <h3>기술 자료 찾기</h3>
              <p>설치, 장애, 호환과 포트, 승인된 다운로드와 릴리스 노트 경로. 없는 파일은 만들지 않습니다. 버전과 포트는 공식 출처 확인이 필요합니다.</p>
              <Link className="rd-btn rd-btn-ghost" href="/engineer">자료 흐름 보기</Link>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="hci-door-heading" className="rd-chapter">
        <div className="rd-wrap rd-split">
          <figure className="rd-panel" data-reveal>
            <figcaption className="rd-kicker">설명 그림 · 통로 스케치</figcaption>
            <svg aria-hidden="true" className="rd-art" viewBox="0 0 480 220">
              <rect fill="#ebe6dc" height="220" width="480" />
              <g fill="#102033" opacity="0.85">
                <rect height="148" width="36" x="40" y="36" />
                <rect height="148" width="36" x="86" y="36" />
                <rect height="148" width="36" x="132" y="36" />
              </g>
              <g fill="#1f7a4d">
                <rect height="6" width="20" x="48" y="52" />
                <rect height="6" width="20" x="48" y="66" />
                <rect height="6" width="20" x="94" y="52" />
                <rect height="6" width="20" x="140" y="80" />
              </g>
              <rect fill="#fffcf7" height="90" stroke="#102033" width="200" x="220" y="70" />
              <text fill="#3d4d63" fontSize="12" textAnchor="middle" x="320" y="122">
                통로 스케치
              </text>
            </svg>
            <p className="rd-caption">그린 SVG입니다. 사진이 아니고, 실제 사례가 아닙니다.</p>
          </figure>
          <div data-reveal>
            <h2 id="hci-door-heading">그림은 일을 설명해야 합니다.</h2>
            <p>본문의 그림은 라이프사이클, 고객 여정, 파트너 역할, HCI 구성, 자료 흐름입니다. 제조사 제품 사진과 로고는 사용 허가가 확인되기 전에는 두지 않습니다.</p>
            <p>우선 살펴볼 제품 상세는 업무 시스템을 실행하는 통합 인프라인 HCI입니다. aSV, SCP, VDI, aStor와의 경계는 그 페이지에 적습니다.</p>
            <Link className="rd-btn rd-btn-primary" href="/solutions/hci">HCI 상세</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
