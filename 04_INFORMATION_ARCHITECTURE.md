# BLRO 홈페이지 정보구조

## 1. 구조 원칙

- 메뉴는 제품명이 아니라 방문자의 목적과 BLRO의 사업역량을 기준으로 한다.
- 기업 고객, 국내 파트너, 글로벌 벤더가 홈에서 한 번의 선택으로 관련 경로에 진입한다.
- 모든 상세 페이지는 관련 사례·인사이트·문의로 이어진다.
- 한국어 전체 구조를 기준으로 하되, 영문은 글로벌 벤더가 필요한 핵심 경로만 제공한다.
- 메뉴 깊이는 데스크톱 2단계, 모바일 3단계 이내로 제한한다.

## 2. 사이트맵

```text
/
├── /blro
│   ├── /blro/what-we-do
│   ├── /blro/how-we-work
│   └── /blro/expertise
├── /solutions
│   ├── /solutions/hci-private-cloud
│   ├── /solutions/vdi-digital-workspace
│   ├── /solutions/backup-disaster-recovery
│   ├── /solutions/network-security
│   └── /solutions/sase-global-connectivity
├── /ai-automation
├── /partner-business
│   ├── /partner-business/partner-program
│   ├── /partner-business/presales-support
│   ├── /partner-business/joint-business
│   └── /partner-business/korea-market-entry
├── /projects
│   └── /projects/[slug]
├── /insights
│   └── /insights/[slug]
├── /contact?type=customer-project
├── /contact?type=partner-collaboration
├── /contact?type=vendor-korea-entry
├── /privacy
├── /terms
└── /en
    ├── /en/blro
    ├── /en/korea-market-entry
    ├── /en/contact
    └── /en/privacy
```

`/solutions`, `/projects`, `/insights`는 목록과 개요를 제공하는 실제 페이지다. 메뉴 클릭을 막는 가상 항목으로 만들지 않는다.

## 3. 주요 경로 레지스트리

| ID | URL | 페이지 목적 | 주요 대상 | 기본 CTA |
|---|---|---|---|---|
| `ROUTE-001` | `/` | 회사 정의와 대상별 진입 | 전체 | 3종 CTA |
| `ROUTE-010` | `/blro` | 정체성·수행방식·전문역량 | 전체 | 목적별 문의 |
| `ROUTE-020` | `/solutions` | 엔터프라이즈·보안 역량 탐색 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-021` | `/solutions/hci-private-cloud` | HCI·가상화 전환 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-022` | `/solutions/vdi-digital-workspace` | VDI 업무환경 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-023` | `/solutions/backup-disaster-recovery` | 백업·DR | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-024` | `/solutions/network-security` | 보안·접근제어 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-025` | `/solutions/sase-global-connectivity` | 글로벌 지사 연결 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-030` | `/ai-automation` | AI 업무자동화 역량 | 고객·파트너 | 프로젝트 상담 |
| `ROUTE-040` | `/partner-business` | 파트너와 시장개발 | 파트너·벤더 | 2종 CTA |
| `ROUTE-044` | `/partner-business/korea-market-entry` | 한국 진출 서비스 | 글로벌 벤더 | 시장 진출 문의 |
| `ROUTE-050` | `/projects` | 수행 근거와 사례 | 전체 | 관련 문의 |
| `ROUTE-060` | `/insights` | 기술·시장 전문성 | 전체 | 구독 제외, 관련 문의 |
| `ROUTE-070` | `/contact` | 문의 유형 선택·접수 | 전체 | 제출 |
| `ROUTE-080` | `/en` | 영문 핵심 진입 | 글로벌 벤더 | Korea entry inquiry |

## 4. 상단 내비게이션

```text
BLRO | Solutions | AI & Automation | Partner Business | Projects | Insights | Contact
```

- 로고는 홈으로 이동한다.
- `Solutions`와 `Partner Business`만 메가메뉴를 사용한다.
- `Contact`는 시각적 주 CTA이지만 다른 메뉴와 동일한 키보드 순서를 가진다.
- 언어 전환은 대응 페이지가 있을 때만 표시한다.
- 모바일 메뉴를 닫으면 포커스를 열기 버튼으로 돌려보낸다.

## 5. 홈 정보 순서

1. 헤드라인, 회사 정의, 3종 CTA
2. Enterprise Technology · Security & Connectivity · Partner & Market Development · AI & Automation 4축
3. 방문자별 문제와 BLRO의 약속
4. `분석 → 설계 → 검증 → 사업화 → 구축 → 안정화` 수행 방식
5. 공개 승인된 프로젝트/역량 증거
6. 최신 인사이트 3건
7. 3종 문의 선택

## 6. 방문자 여정

### 기업 고객

```text
Home audience entry
→ 관련 Solution 또는 AI & Automation
→ 수행 범위·사례·인사이트
→ Contact(customer-project)
→ 접수 ID
```

### 국내 파트너

```text
Home audience entry
→ Partner Business
→ Presales / PoC / Joint Business
→ 관련 Solution과 역량 증거
→ Contact(partner-collaboration)
→ 접수 ID
```

### 글로벌 벤더

```text
/en
→ Korea Market Entry
→ market validation·partner·presales·local support
→ Contact(vendor-korea-entry)
→ 접수 ID
```

## 7. 페이지 공통 구조

```text
Breadcrumb
→ 대상과 문제를 명시한 Hero
→ 핵심 문제/기회
→ BLRO의 역할과 수행 범위
→ 적용 시나리오
→ 수행 절차
→ 공개 가능한 증거
→ 관련 프로젝트·인사이트
→ 맥락에 맞는 CTA
```

## 8. Footer

- BLRO 한 문장 정의
- 사업축과 주요 경로
- 고객 상담, 파트너 협업, 한국 시장 진출 문의
- 대표 이메일·전화·주소는 승인 정보만 표시
- 개인정보 처리방침, 이용안내
- 언어 전환
- 저작권과 법적 회사명

## 9. URL·언어 정책

- 소문자 kebab-case와 영문 slug를 사용한다.
- 한국어 기본 페이지는 locale prefix를 사용하지 않는다.
- 영문은 `/en` prefix를 사용한다.
- slug 변경은 영구 redirect와 canonical 갱신을 함께 적용한다.
- query parameter는 문의 유형과 캠페인 추적에만 사용하며 canonical에서 제거한다.
- 번역되지 않은 영문 페이지를 한국어로 자동 대체하지 않는다.

## 10. 내부 링크 정책

- 모든 Solution은 최소 1개 프로젝트, 1개 인사이트, 고객 문의에 연결한다.
- Partner Business는 관련 Solution과 파트너 문의에 연결한다.
- Korea Market Entry는 영문 BLRO와 영문 문의에 연결한다.
- 프로젝트는 사용 기술과 관련 서비스로 역링크한다.
- 인사이트는 관련 서비스 또는 AI/파트너 페이지로 연결한다.
- 링크 텍스트는 `자세히 보기`가 아니라 목적을 설명한다.

## 11. 404와 빈 상태

- 404는 홈, Solutions, Contact로 복귀 경로를 제공한다.
- 공개 사례가 3개 미만이면 빈 카드로 수를 채우지 않고 승인된 항목만 노출한다.
- 검색·필터 결과가 없으면 필터 초기화와 전체 목록을 제공한다.
- 영문 대응 페이지가 없으면 언어 전환을 숨기고 영문 홈 링크를 별도로 제공한다.
