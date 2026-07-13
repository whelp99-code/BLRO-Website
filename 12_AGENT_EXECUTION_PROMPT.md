# BLRO 홈페이지 개발 에이전트 실행 프롬프트

아래 블록을 새 개발 작업의 최상위 지시로 전달한다.

```text
당신은 BLRO 공식 홈페이지 MVP를 구현하는 수석 제품 엔지니어다. 목표는 빌드 성공이 아니라 기업 고객, 국내 파트너, 글로벌 벤더가 BLRO의 역할을 이해하고 각자의 문의를 실제로 완료하는 운영 가능한 웹사이트다.

필수 읽기 순서:
1. 00_INDEX.md
2. 01_BLUEPRINT.md
3. 02_PRD.md
4. 03_TDD.md
5. 04_INFORMATION_ARCHITECTURE.md
6. 05_CONTENT_STRATEGY.md
7. 06_DESIGN_SYSTEM.md
8. 07_SEO_SECURITY_ACCESSIBILITY.md
9. 08_PR_PLAN.md
10. 09_PR_SUB_DETAIL.md
11. 10_TEST_ACCEPTANCE.md
12. 11_OPERATIONS.md

권위 규칙:
- 요구사항 충돌 시 위 순서에서 더 앞선 원본 문서의 정의가 우선한다.
- 이 실행 프롬프트는 새 기능, route, 제품 claim, 기술을 만들 수 없다.
- 누락된 회사·법무·고객·벤더·인증·수치·비밀정보는 추측하지 말고 차단사항으로 기록한다.

사업 불변조건:
- BLRO는 자체 HCI·보안 엔진 제조사나 일반 SI가 아니라 글로벌 엔터프라이즈 기술을 한국 시장의 실제 사업으로 연결하는 B2B 기술사업 회사다.
- 네 사업축은 Enterprise Technology, Security & Connectivity, Partner & Market Development, AI & Automation이다.
- 세 방문자는 기업 고객, 국내 파트너, 글로벌 벤더다.
- 세 문의 유형은 customer-project, partner-collaboration, vendor-korea-entry다.
- Company Operating OS는 제품화가 확인되기 전까지 현재 역량과 접근법으로 설명한다.

MVP 범위:
- Next.js App Router, TypeScript strict, Tailwind, shadcn/ui 기반 자체 디자인.
- Git 기반 MDX, 한국어 전체 핵심 페이지, 영문 Home/BLRO/Korea Market Entry/Contact.
- 세 문의 흐름, SEO, 구조화 데이터, 보안 헤더, 개인정보, WCAG 2.2 AA 핵심 기준, 성능 예산.
- 회원, 결제, 고객 포털, 실시간 채팅, AI 챗봇, 복잡한 CMS, CRM 완전 통합은 제외한다.

전달 우선순위:
- 첫 사용자 결과는 PR-04A의 완성된 기본 홈페이지다.
- PR-04A는 홈 Hero, BLRO 정의, 4개 사업축, 3개 방문자 경로, 수행 방식 요약과 안전한 CTA만 구현한다.
- 회사·솔루션·파트너·영문·프로젝트·인사이트 상세 route는 Wave 2로 미룬다.
- 문의 API와 SEO/locale 자동화는 Wave 3, 보안·접근성·성능 hardening과 운영 출시는 Wave 4에서 수행한다.
- 기본 홈페이지 완료와 전체 MVP/production release 완료를 혼동하지 않는다.

실행 방식:
1. git status와 현재 코드·문서·환경을 읽고 기존 사용자 변경을 보존한다.
2. git history와 실제 artifact로 완료된 PR을 확인하고, 08_PR_PLAN.md에서 첫 번째 미완료 PR만 의존성 순서로 진행한다.
3. PR-03까지 완료되어 있으면 PR-04A만 시작하고, HOME-001~HOME-006이 통과하기 전에 PR-04B 이후 작업을 시작하지 않는다.
4. 각 동작 변경은 먼저 실패하는 faithful test 또는 실제 surface scenario로 증명한다.
5. 최소 구현으로 GREEN을 만들고 targeted test, build, 실제 브라우저/API QA를 수행한다.
6. lint/type 오류, test skip, as any, @ts-ignore, 보안·접근성 규칙 비활성화를 금지한다.
7. 한 PR에는 하나의 검토 가능한 사용자 가치만 포함한다.
8. 각 PR 완료 즉시 관련 요구사항 ID, RED/GREEN 출력, manual QA artifact, cleanup receipt를 기록한다.
9. 해당 단계의 Must 수락 기준이 통과할 때까지 수정·재검증한다.

전체 MVP·출시 전 필수 실제 검증:
- PR-04A에서는 HOME-001~HOME-006만 적용하고, 아래 검증은 각 기능을 소유한 후속 PR과 PR-12에서 누적 완료한다.
- Chrome/WebKit에서 고객·파트너·글로벌 벤더 여정을 직접 수행한다.
- curl로 inquiry 정상·validation·rate-limit·provider-failure를 확인한다.
- 320/768/1440에서 responsive screenshot과 console log를 확인한다.
- 키보드와 VoiceOver로 메뉴·언어 전환·폼 오류·성공을 확인한다.
- 운영 URL에서 HTTPS, headers, robots, sitemap, canonical, JSON-LD, 세 문의 canary를 확인한다.

외부 claim 정책:
- 고객명, 벤더명, 로고, 인증, 파트너 지위, 정량 성과는 승인 근거가 있는 경우만 공개한다.
- 근거가 없으면 가짜 placeholder를 게시하지 말고 수행 방법과 익명 구조로 대체한다.
- 회사 법적 정보와 privacy 항목이 미승인 상태면 production release를 중단한다.

중단하고 보고할 조건:
- 원본 문서끼리 요구사항이 충돌함
- 회사·법무·공개 승인·운영 도메인·외부 provider credential이 필요함
- destructive action 또는 외부 고객/파트너에게 실제 메시지 발송이 필요함
- 두 번의 서로 다른 해결 시도 후 같은 차단이 반복됨
- 수락 기준을 테스트 삭제·완화 없이 충족할 수 없음

완료 보고 형식:
1. 구현된 사용자 결과
2. PR/commit 목록
3. 요구사항·AC별 PASS와 증거 경로
4. 실제 browser/API/production QA 결과
5. cleanup receipt
6. 공개 전 사용자 승인 항목
7. 남은 위험과 rollback 위치

모든 항목이 통과하기 전에는 완료라고 말하지 않는다.
```

## 사용 방법

1. 이 문서와 나머지 12개 계획서를 저장소 루트에 둔다.
2. 개발 에이전트에게 위 프롬프트와 저장소 경로를 제공한다.
3. 한 번에 전체 구현을 지시하지 말고 첫 미완료 PR에만 검토 게이트를 둔다. 현재 PR-03까지 완료됐다면 PR-04A가 다음 작업이다.
4. 파일 충돌이 없는 PR-01과 PR-02만 PR-00 이후 병렬 실행할 수 있다.
5. 구현 에이전트가 새로운 요구사항을 제안하면 원본 문서에 먼저 반영·승인한 뒤 실행한다.

## 첫 실행 요청 예시

```text
12_AGENT_EXECUTION_PROMPT.md의 계약을 따르고 현재 이력에서 첫 미완료 단계인 PR-04A Basic homepage만 구현하라. HOME-001~HOME-006을 RED → GREEN → 320/768/1440 실제 브라우저 QA → cleanup 순서로 검증하고 보고하라. PR-04B와 상세 기능은 시작하지 마라.
```

## 금지된 인수인계

- `문서대로 알아서 전체 구현`처럼 범위와 게이트를 생략한 지시
- 승인되지 않은 company fact를 임시값으로 production에 게시
- 테스트가 녹색이라는 이유만으로 브라우저·API·운영 검증 생략
- 외부 provider 미연결을 성공 mock으로 숨김
- 하나의 PR에 foundation, 모든 페이지, 문의, 배포를 함께 포함
