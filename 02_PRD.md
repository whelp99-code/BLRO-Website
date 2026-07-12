# BLRO 홈페이지 제품 요구사항 정의서

## 1. 제품 목표

BLRO 홈페이지 MVP는 세 방문자가 자신의 문제와 BLRO의 역할을 이해하고, 적합한 문의 흐름을 완료하도록 만드는 공개형 B2B 웹 제품이다. 사업 기준은 [01_BLUEPRINT.md](01_BLUEPRINT.md)를 따른다.

## 2. 핵심 사용자 시나리오

### 기업 고객

> IT 책임자로서 VMware 대체·DR·보안·SASE·AI 자동화 중 내 과제와 관련된 BLRO 역량, 수행 절차, 근거를 확인하고 프로젝트 상담을 제출하고 싶다.

### 국내 파트너

> 영업 또는 기술 파트너로서 공동사업 범위와 BLRO가 제공하는 프리세일즈·PoC·구축 지원을 확인하고 협업 논의를 시작하고 싶다.

### 글로벌 벤더

> 한국 진출 책임자로서 BLRO의 시장개발·파트너 발굴·현지 기술지원 역량을 영문으로 이해하고 한국 시장 진출 문의를 보내고 싶다.

## 3. 기능 요구사항

### 탐색과 이해

| ID | 요구사항 | 우선순위 | 수락 기준 |
|---|---|---|---|
| `FR-001` | 글로벌 헤더는 BLRO, Solutions, AI & Automation, Partner Business, Projects, Insights, Contact를 제공한다. | Must | 데스크톱·모바일에서 모든 1차 경로 접근 가능 |
| `FR-002` | 홈은 4개 사업축과 3개 대상별 진입점을 제공한다. | Must | 각 카드가 관련 랜딩으로 연결 |
| `FR-003` | 모든 상세 페이지는 대상, 문제, BLRO 역할, 수행 범위, 근거, CTA를 명시한다. | Must | 정의된 페이지 템플릿 필드를 모두 렌더링 |
| `FR-004` | 현재 위치를 알 수 있는 제목, 활성 메뉴, breadcrumb를 제공한다. | Should | 키보드·스크린리더에서도 위치 정보 전달 |
| `FR-005` | 한국어 MVP와 선택적 영문 페이지는 서로 대응되는 언어 전환 링크를 가진다. | Should | 번역이 없는 경우 존재하지 않는 페이지로 보내지 않음 |

### 사업 페이지

| ID | 요구사항 | 우선순위 | 수락 기준 |
|---|---|---|---|
| `FR-010` | Solutions는 HCI/Private Cloud, VDI, Backup/DR, Network/Security, SASE/Global Connectivity를 설명한다. | Must | 각 서비스에 독립 URL과 상담 CTA 존재 |
| `FR-011` | Partner Business는 파트너 프로그램, 프리세일즈, 공동사업, 글로벌 벤더 한국 진출을 설명한다. | Must | 국내 파트너와 글로벌 벤더 여정이 구분됨 |
| `FR-012` | AI & Automation은 Company Operating OS, workflow, multi-agent, approval automation을 역량 중심으로 설명한다. | Must | 제품화되지 않은 기능을 출시 제품으로 표현하지 않음 |
| `FR-013` | Projects는 익명 또는 승인된 사례를 문제·역할·적용·결과 구조로 제공한다. | Must | 공개상태가 승인된 사례만 운영 빌드에 포함 |
| `FR-014` | Insights는 기술자료, 비교분석, 구축가이드, 시장 인사이트를 분류한다. | Must | 목록·상세·태그·관련 콘텐츠가 동작 |

### 문의 전환

| ID | 요구사항 | 우선순위 | 수락 기준 |
|---|---|---|---|
| `FR-020` | 문의 목적을 `customer-project`, `partner-collaboration`, `vendor-korea-entry`로 구분한다. | Must | 목적별 설명·추가 질문·수신자가 구분됨 |
| `FR-021` | 필수 입력은 회사명, 담당자명, 업무 이메일, 문의 내용, 개인정보 동의로 제한한다. | Must | 필수값 누락 시 필드별 오류와 요약 제공 |
| `FR-022` | 선택 입력은 연락처, 일정, 현재 환경, 국가, 첨부 링크로 구성한다. | Should | 민감정보 입력 금지 안내 표시 |
| `FR-023` | 서버는 스키마 검증, honeypot, rate limit, 허용 도메인·파일 정책을 적용한다. | Must | 정상·오류·스팸·과다 요청 응답이 구분됨 |
| `FR-024` | 성공 제출 시 접수 ID와 예상 응답 범위를 제공하고 담당자에게 전달한다. | Must | 중복 클릭으로 복수 접수되지 않음 |
| `FR-025` | 외부 메일/CRM 장애 시 사용자에게 확정 성공을 표시하지 않고 재시도 가능한 오류를 제공한다. | Must | 장애 시 접수 유실 없음 또는 명시적 실패 |

### 콘텐츠 운영

| ID | 요구사항 | 우선순위 | 수락 기준 |
|---|---|---|---|
| `FR-030` | 서비스·사례·인사이트는 Git 기반 MDX로 관리한다. | Must | 스키마가 유효한 콘텐츠만 빌드에 포함 |
| `FR-031` | 콘텐츠는 `draft`, `review`, `approved`, `archived` 상태를 가진다. | Must | 운영 빌드는 `approved`와 게시일 충족 항목만 노출 |
| `FR-032` | 고객·벤더·인증·수치 주장은 근거와 공개 승인 정보를 가진다. | Must | 근거 없는 공개용 claim이 검증 단계에서 실패 |
| `FR-033` | 운영자는 문서 템플릿과 검토 체크리스트로 신규 콘텐츠를 추가할 수 있다. | Should | 운영 매뉴얼의 절차로 미리보기 가능 |

## 4. 데이터 모델 요약

### Inquiry

```ts
type InquiryType =
  | "customer-project"
  | "partner-collaboration"
  | "vendor-korea-entry";

interface InquiryInput {
  type: InquiryType;
  companyName: string;
  contactName: string;
  businessEmail: string;
  phone?: string;
  country?: string;
  timeframe?: string;
  currentEnvironment?: string;
  message: string;
  consent: true;
  website?: string; // honeypot; must remain empty
}
```

운영 저장 형식에는 `id`, `receivedAt`, `locale`, `sourcePath`, `utm`, `deliveryStatus`를 추가한다. IP 원문은 기본 저장하지 않으며 rate limit에 필요한 단기 해시만 사용한다.

### Content metadata

```ts
interface ContentMeta {
  title: string;
  summary: string;
  slug: string;
  locale: "ko" | "en";
  status: "draft" | "review" | "approved" | "archived";
  publishedAt?: string;
  updatedAt: string;
  audience: Array<"customer" | "partner" | "vendor">;
  tags: string[];
  evidenceRefs?: string[];
  approvedBy?: string;
}
```

## 5. 비기능 요구사항

| ID | 요구사항 | 출시 기준 |
|---|---|---|
| `NFR-001` | 성능 | 모바일 Lighthouse 성능 90 목표, LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 |
| `NFR-002` | 접근성 | WCAG 2.2 AA 핵심 기준, 키보드 전 경로, 명확한 포커스와 오류 연결 |
| `NFR-003` | 검색 | 색인 가능한 HTML, 페이지별 metadata, sitemap, robots, canonical, JSON-LD |
| `NFR-004` | 보안 | HTTPS, CSP, HSTS, 입력 서버 검증, rate limit, 비밀정보 서버 전용 |
| `NFR-005` | 개인정보 | 최소수집, 명시적 동의, 보관·파기 정책, 실제 처리자와 도구만 공개 |
| `NFR-006` | 호환성 | 최신 2개 주요 버전의 Chrome·Safari·Edge, iOS Safari와 Android Chrome |
| `NFR-007` | 운영성 | 콘텐츠 미리보기, 배포 롤백, 오류 추적, 문의 전달 모니터링 |
| `NFR-008` | 신뢰성 | 빌드·링크·스키마·E2E·접근성 검증 실패 시 운영 배포 차단 |

세부 품질 기준은 [07_SEO_SECURITY_ACCESSIBILITY.md](07_SEO_SECURITY_ACCESSIBILITY.md)와 [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)를 따른다.

## 6. 분석 이벤트

개인정보를 이벤트 속성으로 보내지 않는다.

- `nav_select`: `destination`, `locale`
- `audience_entry_select`: `audience`
- `service_view`: `service_slug`
- `case_study_view`: `case_slug`
- `insight_view`: `content_slug`, `content_type`
- `cta_select`: `cta_type`, `source_path`
- `inquiry_start`: `inquiry_type`
- `inquiry_submit_success`: `inquiry_type`
- `inquiry_submit_error`: `inquiry_type`, `error_category`
- `language_switch`: `from_locale`, `to_locale`

## 7. 화면 상태

모든 비동기 화면은 기본, 로딩, 빈 결과, 필드 오류, 시스템 오류, 성공 상태를 정의한다. 자바스크립트가 느리거나 실패해도 핵심 회사 정보와 연락 경로는 읽을 수 있어야 한다.

## 8. 출시 범위와 후속 버전

### MVP

- `FR-001`~`FR-005`, `FR-010`~`FR-014`, `FR-020`~`FR-025`, `FR-030`~`FR-032`
- 한국어 전체 핵심 페이지
- 영문 Home, BLRO, Korea Market Entry, Contact

### v1.1

- 프로젝트와 인사이트 필터 개선
- 뉴스레터 또는 자료 다운로드 동의 흐름
- 문의 CRM 연계와 운영 대시보드

### v1.2

- 요구사항 사전진단, VDI/DR 계산기, AI 상담 분류

### v2.0

- 고객·파트너 포털, 프로젝트 진행현황, 산출물·승인·지원 요청

후속 버전은 MVP 코드에 빈 화면이나 추상 계층으로 미리 구현하지 않는다.

## 9. 출시 보류 조건

- 법적 회사 정보와 개인정보 문구 미승인
- 문의 전달 대상과 장애 처리 미검증
- 고객·벤더·인증 claim의 공개 승인 미확인
- 필수 E2E, 접근성, 보안, 링크 검사 실패
- 세 문의 유형 중 하나라도 정상 접수되지 않음
