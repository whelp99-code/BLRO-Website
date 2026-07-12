# BLRO 홈페이지 기술 설계서

## 1. 아키텍처 목표

- 공개 콘텐츠는 빠르고 검색 가능하게 서버 렌더링 또는 정적 생성한다.
- 상호작용이 필요한 메뉴·필터·문의 폼만 Client Component로 제한한다.
- 콘텐츠와 코드를 Git에서 함께 버전 관리한다.
- 문의 입력은 서버 경계에서 검증하고 외부 전달 실패를 성공으로 숨기지 않는다.
- MVP에 필요 없는 데이터베이스·CMS·인증 계층은 추가하지 않는다.

## 2. 기술 기준

| 영역 | 결정 |
|---|---|
| 프레임워크 | Next.js App Router + React + TypeScript strict |
| 스타일 | Tailwind CSS, shadcn/ui를 기초로 한 자체 토큰 |
| 콘텐츠 | 로컬 MDX + frontmatter 스키마 검증 |
| 검증 | Zod 또는 동등한 서버 스키마 검증 |
| 폼 | Server Action 또는 Route Handler 중 배포 환경에서 E2E 검증 가능한 한 가지 방식 |
| 테스트 | Vitest, Testing Library, Playwright, axe 기반 접근성 검사 |
| 배포 | Vercel 우선, 자체 Node 배포도 가능한 표준 Next.js 빌드 |
| DNS·경계 보안 | Cloudflare 사용 여부는 도메인 결정 시 확정 |

패키지 버전은 구현 시작 시 현재 지원되는 안정 버전을 선택하고 lockfile로 고정한다. 동시에 여러 패키지 관리자를 사용하지 않는다.

## 3. 기술 결정 기록

### `ADR-001` App Router

페이지별 metadata, 서버 중심 렌더링, 정적 콘텐츠, route handler를 한 구조에서 관리하기 위해 App Router를 사용한다.

### `ADR-002` Git 기반 MDX

초기 콘텐츠 수와 편집 빈도에는 별도 CMS보다 Git 검토가 단순하고 안전하다. 비개발자가 주 2회 이상 대량 수정하거나 다국어 승인 흐름이 복잡해질 때 headless CMS를 재평가한다.

### `ADR-003` 데이터베이스 없는 문의 MVP

문의는 검증 후 승인된 메일/CRM 서비스로 전달하고, 제공자의 message ID와 접수 상태를 구조화 로그로 남긴다. 법적 보관·감사 요구가 생길 때 암호화된 PostgreSQL 저장을 별도 ADR로 도입한다.

### `ADR-004` 점진적 영문화

한국어를 기본 locale로 유지하고 `/en` 아래에 승인된 핵심 페이지만 제공한다. 존재하지 않는 번역에 fallback 페이지를 가장하지 않는다.

## 4. 권장 프로젝트 구조

```text
blro-website/
├── app/
│   ├── (corporate)/
│   │   ├── blro/page.tsx
│   │   ├── solutions/[slug]/page.tsx
│   │   ├── ai-automation/page.tsx
│   │   ├── partner-business/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── insights/[slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── en/
│   │   ├── page.tsx
│   │   ├── blro/page.tsx
│   │   ├── korea-market-entry/page.tsx
│   │   └── contact/page.tsx
│   ├── api/inquiries/route.ts
│   ├── privacy/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── marketing/
│   ├── forms/
│   ├── content/
│   └── ui/
├── content/
│   ├── services/{ko,en}/
│   ├── projects/{ko,en}/
│   ├── insights/{ko,en}/
│   └── pages/{ko,en}/
├── lib/
│   ├── content/
│   ├── inquiries/
│   ├── analytics/
│   ├── seo/
│   └── security/
├── public/
│   ├── brand/
│   ├── images/
│   ├── diagrams/
│   └── documents/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
    ├── content-operations.md
    └── release-runbook.md
```

실제 구현에서 route group 이름은 URL에 노출되지 않는다. 폴더 추가 전에 [04_INFORMATION_ARCHITECTURE.md](04_INFORMATION_ARCHITECTURE.md)의 route registry와 일치하는지 확인한다.

## 5. 렌더링과 캐시

| 데이터 | 방식 | 갱신 |
|---|---|---|
| 회사·서비스 페이지 | 정적 생성 | 배포 시 |
| 프로젝트·인사이트 | 정적 생성 | Git 콘텐츠 배포 시 |
| sitemap·metadata | 콘텐츠 인덱스에서 생성 | 배포 시 |
| 문의 폼 | 동적 서버 처리 | 캐시 금지 |
| 분석 스크립트 | 동의 정책에 따라 지연 로딩 | 설정 변경 시 |

MDX 본문에서 임의의 클라이언트 코드를 실행하지 않는다. 허용된 컴포넌트 맵만 사용한다.

## 6. 콘텐츠 파이프라인

```text
MDX 파일
→ frontmatter 파싱
→ 스키마 검증
→ 공개 상태·게시일 필터
→ slug 중복 검사
→ 정적 경로·metadata 생성
→ 허용 컴포넌트로 렌더링
```

빌드 차단 오류:

- 필수 필드 누락 또는 잘못된 locale/status
- 같은 콘텐츠 타입·locale 안의 slug 중복
- 승인되지 않은 claim이 운영 대상 콘텐츠에 포함
- 존재하지 않는 관련 콘텐츠 링크
- 미래 게시일이면서 공개 상태인 항목

## 7. 문의 처리 흐름

```text
브라우저 입력
→ 클라이언트 기본 UX 검증
→ POST /api/inquiries
→ origin/content-type/body-size 검사
→ Zod 서버 검증
→ honeypot·rate limit 검사
→ 접수 ID 생성
→ 메일/CRM 전달
→ 전달 message ID 구조화 로그
→ 성공 또는 재시도 가능한 오류 응답
```

### 응답 계약

```ts
type InquiryResponse =
  | { ok: true; inquiryId: string }
  | {
      ok: false;
      code: "VALIDATION_ERROR" | "RATE_LIMITED" | "DELIVERY_FAILED";
      fieldErrors?: Record<string, string[]>;
    };
```

`DELIVERY_FAILED`일 때 사용자의 문의가 접수됐다고 표시하지 않는다. 서버 로그에는 문의 본문과 이메일 전체를 남기지 않는다.

## 8. 보안 경계

- 환경변수는 서버 모듈에서만 읽는다.
- 문의 body 크기와 문자열 길이를 제한한다.
- HTML을 허용하지 않고 일반 텍스트로 처리한다.
- rate limit key는 단기 IP 해시와 문의 유형을 조합한다.
- 첨부파일 업로드는 MVP에서 제외하고 안전한 공유 링크만 선택적으로 받는다.
- CSP nonce가 필요한 외부 스크립트만 허용한다.
- `frame-ancestors 'none'`, HSTS, nosniff, strict referrer policy를 적용한다.

세부 정책은 [07_SEO_SECURITY_ACCESSIBILITY.md](07_SEO_SECURITY_ACCESSIBILITY.md)를 따른다.

## 9. SEO 구현

- 각 route는 고유 title, description, canonical, Open Graph를 가진다.
- Organization과 WebSite JSON-LD는 실제 화면의 승인된 회사 정보와 일치해야 한다.
- Service, Article, BreadcrumbList는 해당 페이지 데이터에서 생성한다.
- `sitemap.ts`는 승인된 공개 콘텐츠만 포함한다.
- 미번역 영어 URL은 sitemap과 hreflang에서 제외한다.

## 10. 관측성과 오류 처리

- 배포 빌드 ID와 커밋 SHA를 release 정보로 기록한다.
- 문의는 `received`, `validated`, `blocked`, `delivered`, `failed` 단계만 기록한다.
- 로그 필드는 `timestamp`, `requestId`, `inquiryType`, `sourcePath`, `stage`, `errorCategory`, `durationMs`로 제한한다.
- 예외 추적 도구에는 form payload를 보내지 않는다.
- 문의 전달 실패율과 웹 핵심지표를 운영 알림 대상으로 사용한다.

## 11. 테스트 전략

| 계층 | 검증 |
|---|---|
| Unit | content schema, URL builder, inquiry schema, metadata helpers |
| Integration | content index, route handler 정상/오류/속도제한, provider failure |
| Component | navigation, language switch, form errors, dialog/focus |
| E2E | 세 방문자 여정과 세 문의 제출, 모바일 메뉴, 404 |
| Static | TypeScript, ESLint, Markdown link, duplicate slug, claim approval |
| Quality | axe, Lighthouse, headers, structured data |

정확한 출시 명령과 증거는 [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)에 정의한다.

## 12. 배포 구조

```text
feature branch
→ PR preview
→ lint/type/unit/integration/build/E2E
→ 콘텐츠·법무 승인
→ main merge
→ production deploy
→ live smoke + inquiry canary
→ sitemap 제출 및 관측
```

운영 비밀정보는 Git과 preview 공개 로그에 저장하지 않는다. production과 preview의 문의 수신자를 분리한다.

## 13. 미확정 결정과 차단 기준

다음 항목은 구현자가 추측하지 않고 프로젝트 책임자에게 확인한다.

- 운영 도메인과 배포 계정
- 메일/CRM 제공자와 수신자
- rate limit 저장소와 실제 임계값
- 분석·오류 추적 도구
- 로고·폰트 라이선스와 회사 법적 정보
- 개인정보 보관기간과 처리 위탁 정보

확정 전에는 인터페이스와 환경변수 계약까지만 구현하고 실제 외부 서비스 연결을 완료됐다고 표시하지 않는다.
