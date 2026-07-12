# BLRO 홈페이지 테스트·수락 기준

## 1. 완료 정의

테스트가 녹색인 것만으로 완료하지 않는다. 모든 Must 요구사항의 자동 검증, 실제 브라우저 여정, 운영 URL smoke, 외부 문의 전달 증거가 있어야 한다.

## 2. 요구사항 추적

| ID | 수락 기준 | 증거 |
|---|---|---|
| `AC-001` | 첫 화면에서 BLRO 정의·4축·3 CTA를 확인 | home E2E + screenshot |
| `AC-002` | 고객이 Solution에서 `customer-project` 문의 완료 | browser action log + 접수 ID |
| `AC-003` | 파트너가 Partner Business에서 `partner-collaboration` 문의 완료 | action log + 접수 ID |
| `AC-004` | 글로벌 벤더가 영문 경로에서 `vendor-korea-entry` 문의 완료 | English action log + 접수 ID |
| `AC-005` | 5개 solution route와 관련 링크 정상 | route test + link report |
| `AC-006` | draft/archived/unapproved 콘텐츠 비공개 | content integration test |
| `AC-007` | malformed/honeypot/rate-limit/provider-failure 처리 | API response captures |
| `AC-008` | keyboard와 screen reader 핵심 여정 완료 | manual ledger + axe report |
| `AC-009` | metadata/canonical/sitemap/JSON-LD 일관 | SEO report |
| `AC-010` | 보안 헤더와 secret/PII 로그 보호 | curl capture + log audit |
| `AC-011` | 핵심 페이지 성능 예산 충족 | Lighthouse report |
| `AC-012` | 콘텐츠·문의·배포·장애 운영 절차 실행 가능 | runbook rehearsal record |
| `AC-013` | 승인 없는 고객·벤더·인증·성과 claim 없음 | publication audit |

## 3. 자동 검증 명령

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
pnpm exec playwright test
pnpm exec lhci autorun
```

PASS는 모두 exit 0이고 skip/only가 새로 추가되지 않은 상태다. 브라우저와 외부 서비스 검증은 별도 수동 시나리오를 통과해야 한다.

## 4. API 시나리오

### Happy path

```bash
curl -i -X POST http://localhost:3000/api/inquiries \
  -H 'Content-Type: application/json' \
  --data '{"type":"customer-project","companyName":"Example Corp","contactName":"Test User","businessEmail":"qa@example.com","message":"HCI 전환 상담을 요청합니다.","consent":true,"website":""}'
```

PASS: HTTP 202, JSON `ok: true`, non-empty `inquiryId`, preview provider 1건 전달.

### Validation

같은 명령에서 `businessEmail`을 `invalid`로 전송한다. PASS: HTTP 400, `VALIDATION_ERROR`, email field error, provider 호출 0.

### Provider failure

preview provider를 실패 모드로 설정해 정상 payload를 보낸다. PASS: HTTP 502, `DELIVERY_FAILED`, UI가 접수 성공을 표시하지 않음.

### Rate limit

합의된 테스트 임계값까지 동일 유형을 반복한다. PASS: 초과 요청 HTTP 429와 `Retry-After`, 정상 임계값 전 요청은 성공.

## 5. 브라우저 수동 시나리오

### Customer

1. 390×844 viewport에서 홈을 연다.
2. Solutions → HCI & Private Cloud로 이동한다.
3. 관련 프로젝트와 인사이트를 각각 한 개 연다.
4. `기술 프로젝트 상담`을 누른다.
5. 유효 입력을 제출한다.

PASS: 메뉴·링크·뒤로가기 정상, 문의 유형 보존, 접수 ID 표시, console error 0.

### Partner

1. 키보드만 사용해 Partner Business를 연다.
2. Presales Support와 Joint Business를 확인한다.
3. 파트너 협업 문의를 제출한다.

PASS: focus visible, Escape 동작, 오류·성공이 screen reader에 전달, 접수 유형 정확.

### Global vendor

1. `/en`을 연다.
2. BLRO → Korea Market Entry → Contact로 이동한다.
3. country와 business email을 포함해 제출한다.

PASS: 한국어 잔여 UI 없음, 깨진 language switch 없음, vendor 유형으로 전달.

### Error recovery

1. 필수값 없이 제출한다.
2. 첫 오류를 수정한다.
3. provider failure를 발생시킨다.
4. provider 복구 후 다시 제출한다.

PASS: 첫 오류 포커스, 입력 보존, 실패를 성공으로 표시하지 않음, 복구 후 1건만 접수.

## 6. 반응형·브라우저 매트릭스

| 환경 | 필수 범위 |
|---|---|
| Chrome desktop latest | 전체 3여정 |
| Safari desktop latest | navigation, content, inquiry |
| Edge latest | smoke + inquiry |
| iOS Safari | home, mobile menu, form |
| Android Chrome | home, mobile menu, form |
| 320px | overflow, menu, forms, tables |
| 768px | grid transition and navigation |
| 1440px | max width and reading measure |

## 7. 접근성 수락

- axe serious/critical 0
- Tab 순서가 시각·의미 순서와 일치
- 메뉴·dialog·오류·성공 포커스 관리
- VoiceOver에서 제목·landmark·폼 레이블·오류·성공 이해 가능
- 텍스트 대비와 focus 대비 충족
- 200% 확대와 320px에서 기능·내용 손실 없음
- reduced motion에서 장식 모션 제거

## 8. SEO·성능·보안 수락

### SEO

- 공개 route 200, 고유 title/H1/canonical
- draft/preview noindex
- sitemap에 공개 canonical만 포함
- hreflang은 실제 대응 route만 포함
- JSON-LD 파싱·필수값·화면 일치

### 성능

- 홈, solution detail, partner, insight detail, contact를 모바일 profile로 측정
- LCP/INP/CLS와 JS·이미지 예산 기록
- 예산 초과는 근거 없이 waive하지 않음

### 보안

- HTTPS redirect와 필수 headers
- client JS/source map/log에 secret·문의 payload 없음
- body size, content type, origin, schema, rate limit 검증
- 의존성 취약점은 실제 exploitability와 사용 경로를 검토하고 차단 수준을 기록

## 9. 콘텐츠·법무 수락

- 법적 회사 정보가 승인 원본과 일치
- 문의 수집항목·보관기간·처리도구가 privacy와 일치
- 고객·벤더·로고·인증·정량 성과에 공개 승인 링크 존재
- 기술 문서에 검토일·검토자·조건·제한 존재
- 영문은 한국어 직역이 아니라 승인된 별도 원문

## 10. 증거 형식

```text
evidence/<release-id>/
├── commands/
├── api/
├── browser/
├── screenshots/
├── accessibility/
├── lighthouse/
├── seo/
├── security/
├── approvals/
└── cleanup.md
```

각 기록은 시각, commit SHA, 환경, 명령/행동, 예상값, 실제값, PASS/FAIL, artifact 경로를 포함한다. 테스트 문의·서버·브라우저 context는 QA 직후 정리한다.

## 11. 출시 판정

다음 중 하나라도 남으면 출시하지 않는다.

- AC-001~AC-013 Must 실패
- 세 문의 유형 중 실제 전달 미확인
- serious/critical 접근성 오류
- 핵심 route 500/404 또는 깨진 내부 링크
- 개인정보·secret 노출 위험
- 공개 승인 없는 claim
- 운영 수신자·도메인·privacy 정보 미승인
- rollback 절차 미검증
