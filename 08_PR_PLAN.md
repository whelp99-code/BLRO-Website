# BLRO Website MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** BLRO의 4개 사업축과 3개 방문자 여정을 전달하고, 고객·파트너·글로벌 벤더 문의를 안전하게 접수하는 한국어 중심 B2B 홈페이지 MVP를 출시한다.

**Architecture:** Next.js App Router의 서버 중심 공개 페이지와 Git 기반 MDX 콘텐츠를 사용한다. 문의만 동적 서버 경계로 분리하고, 한국어 전체 경로와 선택적 영문 경로를 한 저장소에서 관리한다.

**Tech Stack:** Next.js, React, TypeScript strict, Tailwind CSS, shadcn/ui, MDX, Zod, Vitest, Testing Library, Playwright, axe, Lighthouse CI.

**Delivery Strategy:** 완성된 기본 홈페이지를 가장 먼저 확보한다. `PR-04A`에서 `/`만으로 BLRO 정의와 핵심 사업을 이해할 수 있는 홈페이지를 독립 완료하고, 회사 상세 페이지·솔루션 상세·영문·콘텐츠 탐색·문의 자동화·SEO·운영 기능은 후속 파동으로 분리한다.

## Global Constraints

- 사업·브랜드 정의는 [01_BLUEPRINT.md](01_BLUEPRINT.md)를 변경하지 않는다.
- URL은 [04_INFORMATION_ARCHITECTURE.md](04_INFORMATION_ARCHITECTURE.md)의 route registry를 따른다.
- 고객·벤더·인증·성과 claim은 공개 승인 없이 운영에 포함하지 않는다.
- 한국어 전체 MVP와 영문 Home/BLRO/Korea Market Entry/Contact를 제공한다.
- 문의 유형은 `customer-project`, `partner-collaboration`, `vendor-korea-entry`로 고정한다.
- 회원, 결제, 고객 포털, 실시간 채팅, AI 챗봇, 복잡한 CMS는 구현하지 않는다.
- `as any`, TypeScript 오류 억제, 테스트 skip, 보안·접근성 규칙 비활성화를 금지한다.
- 각 PR은 독립적으로 build와 관련 테스트가 통과해야 한다.
- 기본 홈페이지의 CTA는 구현되지 않은 상세 route로 연결하지 않는다. 후속 route가 준비되기 전에는 같은 페이지의 실제 section 또는 이미 공개된 route만 사용한다.
- `PR-04A` 완료는 기본 홈페이지 완료를 의미하며 production release 완료를 의미하지 않는다. 운영 문의와 전체 route 출시는 `PR-12`에서 판정한다.

---

## PR 의존성

```text
PR-00 Foundation
├── PR-01 Content core
├── PR-02 Design system
└── PR-03 Global shell
    └── PR-04A Basic homepage
        ├── PR-04B BLRO detail pages
        ├── PR-05 Solutions
        ├── PR-06 Partner + Vendor EN
        └── PR-07 AI + Projects + Insights

PR-04B + PR-05 + PR-06 + PR-07
└── PR-08 Inquiry
    ├── PR-09 SEO + i18n
    ├── PR-10 Security + accessibility + performance
    └── PR-11 E2E + operations
        └── PR-12 Production release
```

PR-01과 PR-02는 PR-00 이후 병렬 가능하다. 동일 파일을 수정하는 PR은 병렬화하지 않는다.

## 전달 파동

| 파동 | 목표 | 포함 PR | 종료 기준 |
|---|---|---|---|
| Wave 1 | 가장 기본적인 홈페이지 완성 | `PR-04A` | `/`에서 30초 안에 BLRO 정의·4개 사업축·3개 방문자 경로를 이해하고, CTA 404·console error·가로 overflow가 없음 |
| Wave 2 | 정적 상세 정보 확장 | `PR-04B`, `PR-05`, `PR-06`, `PR-07` | 회사·솔루션·파트너·영문·콘텐츠 상세 route가 승인 범위 내에서 동작 |
| Wave 3 | 전환과 발견 기능 | `PR-08`, `PR-09` | 3종 문의와 SEO/locale surface가 실제 route·콘텐츠 index에 연결 |
| Wave 4 | 품질·운영·출시 | `PR-10`, `PR-11`, `PR-12` | 보안·접근성·성능·전체 회귀·운영 배포 게이트 통과 |

Wave 1이 끝나기 전에는 Wave 2의 상세 페이지를 시작하지 않는다. Wave 2 안에서는 파일 소유권이 겹치지 않는 PR만 병렬화할 수 있다.

## PR-00: Repository foundation

**산출물:** 실행 가능한 Next.js TypeScript 프로젝트, 단일 package manager, CI 기본 게이트.

- [ ] create-next-app으로 App Router·TypeScript·Tailwind·ESLint 프로젝트 생성
- [ ] `src/` 사용 여부와 import alias를 한 방식으로 고정
- [ ] `lint`, `typecheck`, `test`, `test:e2e`, `build`, `check` scripts 구성
- [ ] 환경변수 스키마와 `.env.example` 작성
- [ ] 빈 홈을 실제 브라우저에서 열고 200 응답 확인

완료 게이트: fresh install 후 `pnpm check && pnpm build` exit 0.

## PR-01: Content core

**산출물:** MDX schema, content index, draft/approval 필터, 샘플 콘텐츠.

- [ ] `ContentMeta` 스키마와 타입 작성
- [ ] locale/type별 loader와 slug 중복 검사
- [ ] 승인·게시일 필터를 failing-first 단위 테스트로 보호
- [ ] 서비스 5개, 프로젝트 3개, 인사이트 5개 이상의 승인 콘텐츠 준비
- [ ] 근거 없는 claim을 운영 build에서 차단

완료 게이트: malformed/draft/duplicate/invalid-related-link fixture가 의도대로 실패하고 정상 콘텐츠 index가 생성됨.

## PR-02: Design system

**산출물:** [06_DESIGN_SYSTEM.md](06_DESIGN_SYSTEM.md)의 토큰, typography, Button, Link, Container, Section, typography primitives.

- [ ] CSS token과 Tailwind theme 연결
- [ ] 로컬 폰트와 폴백 적용
- [ ] interactive state, focus, disabled, error variant 구현
- [ ] Story 또는 component test에서 모든 variant 검증
- [ ] 320px와 1440px 시각 QA

완료 게이트: 대비·포커스·터치 크기 통과, horizontal overflow 없음.

## PR-03: Global shell and navigation

**산출물:** root layout, header, megamenu, mobile navigation, footer, breadcrumb, locale switch.

- [ ] route registry 기반 내비게이션 데이터 작성
- [ ] 메뉴 키보드와 focus-return 동작 테스트
- [ ] footer의 3종 전환·정책 링크 연결
- [ ] skip link와 landmark 적용
- [ ] Playwright로 desktop/mobile navigation 검증

완료 게이트: 마우스 없이 모든 1차 route에 도달하고 Escape/포커스 복귀가 정상.

## PR-04A: Basic homepage first

**산출물:** 상세 기능 없이도 BLRO를 이해할 수 있는 완성된 기본 홈페이지 `/`.

- [ ] 승인된 headline, company definition, 핵심 설명이 있는 Hero
- [ ] 4개 사업축 요약과 3개 audience entry를 한 페이지 안에서 제공
- [ ] 수행 방식 요약과 승인된 프로젝트·인사이트만 노출
- [ ] 3개 주요 CTA는 같은 페이지의 실제 section 또는 이미 구현된 공개 route만 사용
- [ ] 기본 title/description과 320px·768px·1440px responsive QA
- [ ] 상세 페이지, 문의 API, 필터, 영문 route, JSON-LD는 이 PR에서 구현하지 않음

완료 게이트: 첫 viewport와 다음 섹션에서 30초 이해 테스트를 통과하고, 홈의 모든 CTA가 404 없이 동작하며 console error와 horizontal overflow가 0이다.

## PR-04B: BLRO detail pages

**산출물:** 회사소개, 수행방식, 전문역량 상세 페이지.

- [ ] `/blro`, `/blro/how-we-work`, `/blro/expertise` 구현
- [ ] 홈의 요약 정보와 상세 페이지의 메시지·용어 일치
- [ ] 공개 승인 없는 회사 사실·수치·파트너 claim 차단
- [ ] breadcrumb, 현재 경로, 관련 페이지 간 이동 검증
- [ ] route metadata와 responsive QA

완료 게이트: 세 BLRO route가 정적 생성되고 홈에서 상세 페이지로 이동한 뒤 홈으로 복귀하는 키보드 여정이 정상이다.

## PR-05: Solutions

**산출물:** Solutions hub와 5개 상세 페이지.

- [ ] 공통 solution template 구현
- [ ] 문제·판단기준·역할·산출물·절차·증거·CTA 렌더링
- [ ] 관련 프로젝트·인사이트 역링크
- [ ] 잘못된 slug 404 처리
- [ ] 각 route metadata/JSON-LD 생성

완료 게이트: 5개 route의 정적 생성과 내부 링크 검사 통과.

## PR-06: Partner business and selective English

**산출물:** 국내 파트너 hub/subpages, 한국 시장 진출, 영문 Home/BLRO/Korea Market Entry/Contact.

- [ ] 파트너 프리세일즈·PoC·공동사업 범위
- [ ] 글로벌 벤더 시장검증·파트너·고객개발 흐름
- [ ] 한국어와 영문의 대응 링크 매트릭스
- [ ] 존재하지 않는 번역 fallback 방지
- [ ] 영문 벤더 문의 경로 E2E

완료 게이트: `/en` 여정이 번역 누락 404 없이 vendor 문의까지 도달.

## PR-07: AI, projects, and insights

**산출물:** AI & Automation, 프로젝트 목록/상세, 인사이트 목록/상세.

- [ ] AI 현재 역량과 향후 비전 구분
- [ ] 프로젝트 공개 승인 필터와 익명 표시
- [ ] 인사이트 타입·태그 필터와 빈 상태
- [ ] MDX 허용 component map
- [ ] 관련 콘텐츠·서비스 교차 링크

완료 게이트: draft/archived 항목은 노출되지 않고 approved 콘텐츠만 정적 생성.

## PR-08: Inquiry conversion

**산출물:** 3종 문의 UX, 서버 검증, 스팸·rate limit, provider adapter, 성공·오류 상태.

- [ ] 정상 payload failing-first integration test
- [ ] field validation, honeypot, oversized body, rate limit, provider failure 테스트
- [ ] form UX와 오류 요약·포커스 구현
- [ ] 접수 ID와 전달 상태 구조화 로그
- [ ] preview provider와 production provider 분리

완료 게이트: 세 유형 happy path, malformed, duplicate click, provider failure를 실제 HTTP와 브라우저에서 확인.

## PR-09: SEO and locale surfaces

**산출물:** metadata, canonical, hreflang, sitemap, robots, JSON-LD, OG asset.

- [ ] route/content index 기반 metadata 생성
- [ ] 승인된 공개 route만 sitemap 포함
- [ ] locale 대응이 있는 페이지만 hreflang 제공
- [ ] Organization 데이터와 화면 사실 일치
- [ ] structured data validator와 link checker 실행

완료 게이트: 핵심 route에서 metadata 중복·canonical 불일치·structured data 오류 0.

## PR-10: Quality hardening

**산출물:** 보안 헤더, CSP, 개인정보, 접근성, 성능 최적화.

- [ ] 운영 header integration test
- [ ] axe automated scan과 keyboard manual script
- [ ] 이미지·폰트·client boundary 최적화
- [ ] Lighthouse CI budget
- [ ] 실제 처리도구와 일치하는 privacy page

완료 게이트: [07_SEO_SECURITY_ACCESSIBILITY.md](07_SEO_SECURITY_ACCESSIBILITY.md)의 QG-001~QG-006 통과.

## PR-11: Full regression and operations

**산출물:** 전체 E2E, release runbook, content operation, inquiry operation, rollback.

- [ ] 고객·파트너·벤더 end-to-end journey
- [ ] Chrome·Safari(WebKit)·Edge(Chromium) 핵심 smoke
- [ ] 320/768/1440 responsive screenshots
- [ ] 문의 canary와 장애 복구 훈련
- [ ] 운영자 문서와 증거 ledger

완료 게이트: [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)의 모든 Must AC 통과.

## PR-12: Production release

**산출물:** 운영 도메인 배포, SSL·DNS, live smoke, 검색 등록, 관측 확인.

- [ ] 승인된 회사·법무·연락처 콘텐츠 동결
- [ ] production 환경변수와 수신자 이중 확인
- [ ] 배포 후 curl/header/robots/sitemap/문의 canary
- [ ] 검색엔진 sitemap 제출
- [ ] release tag와 rollback point 기록

완료 게이트: 운영 URL에서 세 문의 여정과 모니터링을 실제로 확인하고 비밀정보·테스트 데이터 정리.

## 공통 PR 규칙

- 각 PR은 하나의 사용자 가치와 검증 증거를 가진다.
- 변경 전 실패 증거를 캡처하고 최소 구현으로 통과시킨다.
- commit 형식은 `type(scope): imperative summary`를 사용한다.
- 코드 리뷰에서 요구사항 ID와 AC를 연결한다.
- 모든 외부 claim과 개인정보 변경은 코드 리뷰와 별개로 공개 승인을 받는다.
- 구현 상세는 [09_PR_SUB_DETAIL.md](09_PR_SUB_DETAIL.md)를 따른다.
