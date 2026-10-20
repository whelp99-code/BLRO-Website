import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { LifecycleFigure } from "@/components/redesign/lifecycle-figure"
import { SituationChooser } from "@/components/redesign/situation-chooser"

export const HOME_HEADING = "기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다."

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
              서버 교체, 저장 증설, 업무 데스크톱, 경계 보안처럼 지금 필요한 일에서 시작하세요. 제품이 정해지지 않아도 도입부터 운영 인수, 기술 지원까지 필요한 범위를 함께 정리합니다.
            </p>
          </div>
          <LifecycleFigure />
        </div>
      </section>

      <SituationChooser />

      <section aria-labelledby="roles-heading" className="rd-band">
        <div className="rd-wrap">
          <h2 id="roles-heading">역할을 고릅니다.</h2>
          <div className="rd-roles">
            <article className="rd-role customer" data-reveal>
              <p className="rd-who">기업 고객</p>
              <h3>도입·운영 상담하기</h3>
              <p>서버 교체, 저장, 업무 데스크톱, 경계 보안 등 현재 상황에서 시작합니다. 제품이 정해지지 않아도 필요한 도입·운영 범위를 상담할 수 있습니다.</p>
              <Link className="rd-btn rd-btn-primary" href="/customer">고객 안내 보기</Link>
            </article>
            <article className="rd-role partner" data-reveal data-stagger="1">
              <p className="rd-who">국내 파트너</p>
              <h3>협력 제안하기</h3>
              <p>공동 영업, 공동 제안과 PoC(개념 검증), 구축·운영에 필요한 고객 접점과 기술 수행 역할을 함께 정리합니다.</p>
              <Link className="rd-btn rd-btn-ghost" href="/partner">역할 표 보기</Link>
            </article>
            <article className="rd-role engineer" data-reveal data-stagger="2">
              <p className="rd-who">기술 엔지니어</p>
              <h3>기술 자료 찾기</h3>
              <p>설치, 장애, 호환과 포트에 필요한 기술 자료 및 제조사 공식 안내를 확인하고 기술 지원을 문의할 수 있습니다.</p>
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
          </figure>
          <div data-reveal>
            <h2 id="hci-door-heading">HCI 도입과 운영을 살펴보세요.</h2>
            <p>HCI 구성과 도입 전 확인할 항목을 현재 업무 환경에 맞춰 검토합니다.</p>
            <p>우선 살펴볼 제품 상세는 업무 시스템을 실행하는 통합 인프라인 HCI입니다. aSV, SCP, VDI, aStor와의 경계는 그 페이지에 적습니다.</p>
            <Link className="rd-btn rd-btn-primary" href="/solutions/hci">HCI 상세</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
