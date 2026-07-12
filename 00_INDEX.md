# BLRO 홈페이지 구축계획 패키지

버전: 1.0
기준일: 2026-07-12
상태: 구현 착수 가능
대상 프로젝트: `blro-website`

## 1. 패키지 목적

이 문서 세트는 BLRO 공식 홈페이지를 단순 회사소개 페이지가 아니라 다음 세 종류의 매출 기회를 만드는 B2B 사업 플랫폼으로 구축하기 위한 단일 기준이다.

1. 기업 고객의 기술 프로젝트 상담
2. 국내 파트너의 공동사업 문의
3. 글로벌 벤더의 한국 시장 진출 문의

BLRO는 자체 HCI·보안 엔진 제조사나 일반 SI로 설명하지 않는다. 글로벌 엔터프라이즈 기술을 한국 시장에서 판매·도입·운영 가능한 사업으로 만들고, 고객·파트너·벤더를 연결하는 기술사업 회사로 정의한다.

## 2. 문서 읽기 순서

| 순서 | 문서 | 단일 책임 | 권위 |
|---:|---|---|---|
| 1 | [01_BLUEPRINT.md](01_BLUEPRINT.md) | 사업·브랜드·대상·범위 | 최상위 사업 기준 |
| 2 | [02_PRD.md](02_PRD.md) | 제품 요구사항과 사용자 가치 | 기능·비기능 기준 |
| 3 | [03_TDD.md](03_TDD.md) | 기술 아키텍처와 데이터 흐름 | 기술 기준 |
| 4 | [04_INFORMATION_ARCHITECTURE.md](04_INFORMATION_ARCHITECTURE.md) | 사이트맵·경로·사용자 여정 | 정보구조 기준 |
| 5 | [05_CONTENT_STRATEGY.md](05_CONTENT_STRATEGY.md) | 메시지·페이지 문구·콘텐츠 운영 | 콘텐츠 기준 |
| 6 | [06_DESIGN_SYSTEM.md](06_DESIGN_SYSTEM.md) | 시각 언어·토큰·컴포넌트 | 디자인 기준 |
| 7 | [07_SEO_SECURITY_ACCESSIBILITY.md](07_SEO_SECURITY_ACCESSIBILITY.md) | 검색·보안·개인정보·접근성 | 품질 정책 기준 |
| 8 | [08_PR_PLAN.md](08_PR_PLAN.md) | PR 단위 개발 순서와 의존성 | 구현 순서 기준 |
| 9 | [09_PR_SUB_DETAIL.md](09_PR_SUB_DETAIL.md) | PR별 파일·검증·커밋 세부사항 | 작업 지시 기준 |
| 10 | [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md) | 테스트와 출시 판정 | 완료 기준 |
| 11 | [11_OPERATIONS.md](11_OPERATIONS.md) | 배포 이후 운영 체계 | 운영 기준 |
| 12 | [12_AGENT_EXECUTION_PROMPT.md](12_AGENT_EXECUTION_PROMPT.md) | 개발 에이전트 실행 계약 | 파생 지시서 |

`12_AGENT_EXECUTION_PROMPT.md`는 새로운 요구사항을 만들 수 없다. 충돌 시 위 표에서 더 앞선 원본 문서가 우선한다.

## 3. 핵심 불변 조건

- 사업 4축: `Enterprise Technology`, `Security & Connectivity`, `Partner & Market Development`, `AI & Automation`.
- 방문자 3그룹: 기업 고객, 국내 파트너, 글로벌 벤더.
- 전환 3종: `customer-project`, `partner-collaboration`, `vendor-korea-entry`.
- 한국어 MVP를 먼저 출시하고, 글로벌 벤더 여정부터 선택적으로 영문화한다.
- 특정 벤더명, 고객명, 로고, 인증, 성과 수치는 공개 승인이 확인된 경우에만 사용한다.
- Company Operating OS는 제품화가 확정되기 전까지 BLRO의 AI 업무자동화 역량과 접근법으로 표현한다.
- 실제 법인명, 대표자, 주소, 연락처, 개인정보 보관기간은 공개 전 회사 책임자가 승인한다.

## 4. 요구사항 식별자

| 접두어 | 소유 문서 | 의미 |
|---|---|---|
| `BIZ-` | Blueprint | 사업 목표·범위·원칙 |
| `FR-`, `NFR-` | PRD | 기능·비기능 요구사항 |
| `ADR-` | TDD | 기술 결정 |
| `ROUTE-` | IA | URL과 탐색 구조 |
| `CNT-` | Content | 콘텐츠·메시지 규칙 |
| `DS-` | Design | 디자인 토큰·UI 규칙 |
| `QG-` | SEO/Security/Accessibility | 품질 게이트 |
| `PR-` | PR Plan | 구현 단위 |
| `AC-` | Test Acceptance | 완료 판정 |

요구사항은 소유 문서에서 한 번만 정의한다. 다른 문서는 식별자를 참조하며 의미를 바꾸지 않는다.

## 5. 구현 웨이브

```text
Wave 0  사실·브랜드·콘텐츠 승인
Wave 1  프로젝트 기반과 디자인 토큰
Wave 2  공통 레이아웃·정보구조·핵심 페이지
Wave 3  솔루션·파트너·AI·프로젝트·인사이트
Wave 4  문의 전환·SEO·보안·접근성
Wave 5  E2E 검증·배포·운영 인수인계
```

상세 의존성은 [08_PR_PLAN.md](08_PR_PLAN.md), 실행 명령은 [09_PR_SUB_DETAIL.md](09_PR_SUB_DETAIL.md)를 따른다.

## 6. 확정 정보와 승인 대기 정보

### 확정

- BLRO의 포지셔닝, 사업 4축, 방문자 3그룹, 전환 3종
- 극미니멀·정밀·신뢰 중심의 디자인 방향
- Next.js App Router와 Git 기반 MDX 중심의 MVP
- 회원·결제·고객 포털·AI 챗봇은 MVP 제외

### 공개 전 승인 필요

- 회사 법적 정보와 대표 연락처
- 로고 원본과 상표 사용 범위
- 파트너·벤더 관계와 인증
- 고객 사례, 고객명, 정량 성과
- 문의 수신자, 보관기간, 개인정보 처리 책임자
- 운영 도메인, 호스팅 계정, 분석 도구

승인되지 않은 항목은 화면에 사실처럼 작성하지 않고, 콘텐츠 데이터에서 `status: draft`로 유지한다.

## 7. 패키지 완료 조건

- 13개 문서가 모두 존재하고 내부 링크가 유효하다.
- 네 사업축, 세 방문자, 세 전환이 PRD부터 테스트까지 추적된다.
- 모든 MVP 기능은 PR과 수락 기준에 연결된다.
- 모든 비공개·미확정 사실은 승인 게이트를 가진다.
- 개발 에이전트가 추가 해석 없이 PR-00부터 실행할 수 있다.
