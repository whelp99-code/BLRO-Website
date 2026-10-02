import type { Metadata } from "next"
import Link from "next/link"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "기술 엔지니어",
  description: "설치, 운영·장애, 호환과 포트, 승인된 자료 경로입니다. 없는 파일은 만들지 않습니다.",
  ...canonicalMetadata("/engineer"),
}

const FLOWS = [
  ["작업 선택", "설치·구축, 운영·장애, 호환·포트, 기술 지원 중 하나를 고릅니다."],
  ["자료 검색", "이 저장소에서 확인되는 공개 글은 인사이트입니다."],
  ["공식 확인", "버전, 포트, 호환은 제조사 공식 문서의 현재본으로 확인합니다. 포트 번호는 여기 적지 않습니다."],
  ["파일 있음", "승인된 파일만 연결합니다. 지금은 연결된 공개 파일이 없습니다."],
  ["없으면 문의", "제품, 버전, 증상, 이미 확인한 단계를 적습니다."],
] as const

export default function EngineerPage() {
  return (
    <article className="rd">
      <section className="rd-hero" style={{ background: "var(--engineer-wash)" }}>
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker" style={{ color: "var(--engineer)" }}>기술 엔지니어</p>
            <h1 className="blro-heading blro-heading--h1">작업 종류로 자료를 찾고, 없는 파일은 빈칸으로 남깁니다.</h1>
            <p className="rd-lead">설치·구축 자료는 준비물, 순서, 확인 지점을 다룹니다. 운영·장애 대응은 증상, 수집할 로그, 에스컬레이션 대상을 다룹니다.</p>
            <p>승인된 다운로드와 릴리스 노트는 제조사 공식 경로 또는 BLRO가 배포를 승인한 파일만 연결합니다. 새 제품에 가짜 검색 결과를 만들지 않습니다.</p>
            <p>
              공개된 기술 글은 <Link href="/insights">인사이트</Link>에 있습니다. 대표 제품 예시는 <Link href="/solutions/hci">Sangfor HCI</Link>입니다. 제품 상세를 이 미리보기에서 모두 다시 쓴 것은 아닙니다.
            </p>
          </div>
          <figure className="rd-panel" data-reveal>
            <figcaption className="rd-kicker">설명 그림 · 엔지니어 자료 흐름</figcaption>
            <ol className="rd-layers">
              {FLOWS.map(([title, detail], index) => (
                <li data-step data-stagger={String(Math.min(index, 3))} key={title}>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </li>
              ))}
            </ol>
            <p className="rd-caption">다운로드 버튼은 실제 파일이 승인되기 전에는 두지 않습니다.</p>
            <Link className="rd-btn rd-btn-ghost" href="/contact?type=general&role=engineer">기술 지원 문의</Link>
          </figure>
        </div>
      </section>
    </article>
  )
}
