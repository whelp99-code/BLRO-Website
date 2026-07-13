# BLRO 홈페이지 PR 세부 구현 지시서

## 1. 공통 명령

패키지 관리자는 `pnpm`으로 통일한다.

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
pnpm exec playwright test
```

각 PR은 관련 targeted test를 먼저 실행하고, 완료 전 `pnpm check && pnpm build`를 실행한다. 명령 이름은 PR-00에서 package scripts와 함께 확정한다.

실행 순서는 [08_PR_PLAN.md](08_PR_PLAN.md)의 전달 파동을 따른다. 현재 이력이 PR-03까지 완료된 경우 다음 작업은 반드시 `PR-04A Basic homepage`이며, 해당 완료 게이트가 통과하기 전에는 PR-04B 이후 상세 route를 시작하지 않는다.

## 2. PR-00 Foundation

**Create/modify**

- `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `tsconfig.json`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `.env.example`, `.gitignore`, `README.md`
- `.github/workflows/ci.yml`

**Steps**

1. `pnpm create next-app@latest . --ts --eslint --tailwind --app --use-pnpm`로 생성한다.
2. `strict: true`, import alias, Node 버전과 package manager를 고정한다.
3. Vitest·Testing Library·Playwright를 설치하고 빈 smoke test를 추가한다.
4. `check`가 lint → typecheck → unit 순서로 실패를 전파하도록 구성한다.
5. `pnpm dev` 후 브라우저에서 `/` 200과 console error 0을 확인한다.

**Commit:** `chore(web): bootstrap Next.js foundation`

## 3. PR-01 Content core

**Create**

- `lib/content/schema.ts`, `lib/content/index.ts`, `lib/content/load.ts`
- `content/services/ko/*.mdx`, `content/projects/ko/*.mdx`, `content/insights/ko/*.mdx`
- `tests/unit/content-schema.test.ts`, `tests/integration/content-index.test.ts`

**RED scenarios**

- draft item이 public index에 포함되면 실패
- duplicate slug가 있으면 build-time error가 없을 때 실패
- approved claim에 `evidenceRefs`가 없으면 실패
- related slug가 존재하지 않으면 실패

**GREEN contract**

`getPublicContent(type, locale, now)`는 approved, 게시일 충족, schema-valid 항목만 정렬해 반환한다. 에러에는 파일 경로와 필드가 포함되며 본문 개인정보는 포함하지 않는다.

**Commit:** `feat(content): add validated MDX publishing pipeline`

## 4. PR-02 Design system

**Create**

- `components/ui/button.tsx`, `components/ui/link.tsx`
- `components/layout/container.tsx`, `components/layout/section.tsx`
- `components/content/prose.tsx`
- `tests/components/design-primitives.test.tsx`

**RED scenarios**

- icon-only button에 accessible name이 없으면 실패
- disabled link가 클릭 이벤트를 발생시키면 실패
- focus-visible style이 token과 연결되지 않으면 component QA 실패

**Manual proof**

`/design-preview` 임시 route에서 모든 variant를 320px와 1440px로 확인한 뒤 route를 제거하고 cleanup receipt를 남긴다.

**Commit:** `feat(design): establish BLRO visual primitives`

## 5. PR-03 Global shell

**Create**

- `lib/navigation.ts`
- `components/layout/site-header.tsx`, `desktop-nav.tsx`, `mobile-nav.tsx`
- `components/layout/site-footer.tsx`, `breadcrumb.tsx`, `locale-switch.tsx`
- `tests/components/navigation.test.tsx`, `tests/e2e/navigation.spec.ts`

**Behavior**

- 메뉴 열기/닫기, Escape, outside click, route change 모두 상태를 닫는다.
- 모바일 닫힘 후 trigger로 포커스를 돌린다.
- 현재 경로는 `aria-current="page"`로 표시한다.

**Commit:** `feat(navigation): add accessible global shell`

## 6. PR-04A Basic homepage

**Create**

- `components/marketing/hero.tsx`, `capability-index.tsx`, `audience-paths.tsx`, `process-timeline.tsx`, `evidence-list.tsx`, `conversion-panel.tsx`
- `app/page.tsx`
- `tests/e2e/home-journeys.spec.ts`

**Acceptance**

- Hero에 확정 headline, company definition, 3 CTA가 있다.
- 4축과 3개 방문자 경로를 상세 route 없이도 한 페이지에서 이해할 수 있다.
- CTA는 같은 페이지의 실제 section 또는 이미 구현된 공개 route로만 이동하고 404를 만들지 않는다.
- 공개 콘텐츠가 없으면 가짜 숫자 대신 수행 방식을 표시한다.
- 320px, 768px, 1440px에서 console error와 horizontal overflow가 0이다.
- inquiry API, 상세 route, 검색·필터, 영문 route, JSON-LD를 이 단계에 추가하지 않는다.

**Manual proof**

1. 새 브라우저 context에서 `/`을 연다.
2. 첫 viewport에서 BLRO 정의와 주요 CTA를 확인한다.
3. 4개 사업축과 3개 방문자 section을 키보드로 순회한다.
4. 모든 홈 CTA를 실행해 404, console error, focus loss가 없는지 확인한다.

**Commit:** `feat(home): publish basic BLRO homepage`

## 6A. PR-04B BLRO details

**Create**

- `app/blro/page.tsx`, `app/blro/how-we-work/page.tsx`, `app/blro/expertise/page.tsx`
- 상세 페이지에 필요한 marketing section components
- `tests/e2e/blro-journeys.spec.ts`

**Acceptance**

- 회사 정의, 수행 방식, 전문역량이 홈 요약과 모순되지 않는다.
- 공개 승인 없는 고객·벤더·파트너·정량 성과 claim을 렌더링하지 않는다.
- breadcrumb와 현재 경로가 정확하고 키보드로 홈에 복귀할 수 있다.
- 세 route가 production build에서 정적 생성된다.

**Commit:** `feat(blro): add company detail pages`

## 7. PR-05 Solutions

**Create**

- `app/solutions/page.tsx`, `app/solutions/[slug]/page.tsx`
- `components/marketing/solution-detail.tsx`
- `tests/integration/solution-routes.test.ts`, `tests/e2e/solutions.spec.ts`

**Route fixtures**

`hci-private-cloud`, `vdi-digital-workspace`, `backup-disaster-recovery`, `network-security`, `sase-global-connectivity`.

**Acceptance**

각 페이지는 문제, 판단 기준, BLRO 역할, 산출물, 절차, 증거, 관련 콘텐츠, `customer-project` CTA를 렌더링한다. unknown slug는 custom 404를 반환한다.

**Commit:** `feat(solutions): add enterprise technology pages`

## 8. PR-06 Partner and English

**Create**

- `app/partner-business/page.tsx`와 4개 하위 route
- `app/en/page.tsx`, `app/en/blro/page.tsx`, `app/en/korea-market-entry/page.tsx`, `app/en/contact/page.tsx`
- `lib/i18n/routes.ts`, `tests/e2e/vendor-journey.spec.ts`

**RED scenarios**

- 대응하지 않는 번역 URL을 locale switch가 생성하면 실패
- 영문 CTA가 vendor가 아닌 customer 유형으로 이동하면 실패

**Commit:** `feat(partners): add partner and Korea market-entry journeys`

## 9. PR-07 AI, projects, insights

**Create**

- `app/ai-automation/page.tsx`
- `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`
- `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`
- `components/content/content-card.tsx`, `filter-bar.tsx`, `mdx-components.tsx`
- 관련 integration/component/E2E tests

**Acceptance**

- AI는 current capability와 roadmap을 별도 섹션으로 표시한다.
- 프로젝트는 approval state와 익명화 규칙을 적용한다.
- 인사이트 필터는 URL에서 공유 가능하고 결과 없음 상태를 제공한다.

**Commit:** `feat(content): add AI projects and insights surfaces`

## 10. PR-08 Inquiry

**Create**

- `app/contact/page.tsx`, `app/api/inquiries/route.ts`
- `components/forms/inquiry-selector.tsx`, `inquiry-form.tsx`, `form-status.tsx`
- `lib/inquiries/schema.ts`, `service.ts`, `provider.ts`, `rate-limit.ts`, `redact.ts`
- `tests/integration/inquiry-route.test.ts`, `tests/e2e/inquiries.spec.ts`

**Exact test payload**

```json
{
  "type": "customer-project",
  "companyName": "Example Corp",
  "contactName": "Test User",
  "businessEmail": "qa@example.com",
  "message": "HCI 전환 검토 범위를 상담하고 싶습니다.",
  "consent": true,
  "website": ""
}
```

**Required cases**

- 정상 202 + `inquiryId`
- malformed 400 + field errors
- honeypot은 외부에 탐지 규칙을 공개하지 않고 차단
- 과다 요청 429 + `Retry-After`
- provider failure 502 + `DELIVERY_FAILED`
- double click은 단일 제출 UI 상태

**Commit:** `feat(inquiries): add secure three-path lead intake`

## 11. PR-09 SEO and i18n

**Create**

- `lib/seo/metadata.ts`, `lib/seo/structured-data.ts`
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- `tests/integration/seo.test.ts`, `scripts/check-links.mjs`

**Acceptance**

모든 공개 route는 unique title/canonical을 가진다. draft와 미번역 route는 sitemap/hreflang에서 제외한다. Organization JSON-LD는 승인된 회사 데이터가 없으면 공개 전 release gate를 실패시킨다.

**Commit:** `feat(seo): add metadata and indexation controls`

## 12. PR-10 Quality hardening

**Modify/create**

- `next.config.ts`, `middleware.ts` 또는 배포 플랫폼 header config
- `app/privacy/page.tsx`, `app/terms/page.tsx`
- `lighthouserc.*`, `tests/e2e/accessibility.spec.ts`, `tests/integration/headers.test.ts`

**Acceptance**

- QG-001~QG-006 자동·수동 증거
- keyboard/VoiceOver 시나리오 기록
- 실제 운영 도구와 일치하는 처리방침
- CSP violation과 client secret 0

**Commit:** `fix(quality): enforce security accessibility and performance gates`

## 13. PR-11 E2E and operations

**Create**

- `tests/e2e/customer-journey.spec.ts`, `partner-journey.spec.ts`, `vendor-journey.spec.ts`
- `docs/content-operations.md`, `docs/inquiry-operations.md`, `docs/release-runbook.md`, `docs/incident-runbook.md`
- `scripts/release-smoke.mjs`

**Manual surface**

- Chrome와 WebKit에서 세 여정을 직접 수행한다.
- 320/768/1440 screenshot과 action log를 증거 디렉터리에 저장한다.
- preview 문의 canary를 제출하고 provider message ID를 확인한 뒤 테스트 데이터를 삭제한다.

**Commit:** `test(release): add full journey and operations evidence`

## 14. PR-12 Production release

**Steps**

1. 회사·법무·연락처·claim 승인 기록을 release checklist에 연결한다.
2. production 환경변수 이름과 수신 대상만 이중 확인하고 값은 기록하지 않는다.
3. 배포 후 `curl -i`로 HTTPS·headers·robots·sitemap을 확인한다.
4. 세 문의 canary를 운영 합의된 테스트 수신자로 보내 전달을 확인한다.
5. sitemap 제출, 오류 추적 release, rollback SHA를 기록한다.
6. canary 데이터와 브라우저 context를 정리한다.

**Commit/tag:** `chore(release): launch BLRO website MVP`, `v1.0.0`.

## 15. PR 설명 템플릿

```markdown
## Goal
[연결된 BIZ/FR/NFR/AC]

## User-visible change
[방문자가 실제로 보거나 할 수 있는 것]

## RED → GREEN evidence
[실패 명령과 출력 / 통과 명령과 출력]

## Manual QA
[URL, viewport, action, binary observable, artifact]

## Risk and rollback
[변경 위험, 비밀·개인정보 확인, 되돌리는 방법]

## Approval
[콘텐츠·법무·외부 claim 승인]
```
