# Architecture Recommendation: BLRO 리드 수집 경계

## Problem

현재 BLRO 사이트는 Next.js `output: "export"` 결과물 `out/`을 Cloudflare Pages에 배포하는 정적 사이트다. `/contact`은 내비게이션에만 존재하고 실제 route가 없으며, Next Route Handler를 추가해도 현재 Pages 정적 배포 경로의 서버 API가 되지 않는다. 동시에 상담 정보는 개인정보·스팸 방어·전달 재시도·권한 분리가 필요한 쓰기 작업이다.

## Constraints and Quality Attributes

- 공개 사이트는 빠르고 단순한 정적 Pages 배포를 유지한다.
- preview와 local에는 실제 고객 개인정보·Slack·CRM 데이터를 사용하지 않는다.
- 상담 정보는 공개 콘텐츠 검토 채널 `#blro-insights`와 완전히 분리한다.
- 전송 실패로 고객이 재제출하거나 성공으로 오인해서는 안 된다.
- 운영자는 검색·콘텐츠·상담 퍼널을 추적하되 email, 이름, 메시지, IP를 분석 도구에 보내지 않는다.

## Options

| 옵션 | 구성 | 장점 | 단점 |
| --- | --- | --- | --- |
| A | Pages Functions에 폼 API를 결합 | 한 프로젝트, 같은 origin | 정적 export 배포와 Functions 빌드가 결합되고 D1·Queue·권한·독립 배포 경계가 흐려짐 |
| B | 외부 Form SaaS/CRM 폼 삽입 | 가장 빠른 시작 | 개인정보·분석·전환 데이터 통제와 공급자 이동성이 낮음 |
| C | Pages 정적 사이트 + 별도 Lead Gateway Worker | 정적 공개면과 PII 쓰기면 분리, 재시도·권한·향후 CRM 어댑터 확장 가능 | Worker/D1/Queue/Access 운영이 추가됨 |

## Recommendation

**옵션 C를 채택한다.**

```text
Cloudflare Pages (정적 사이트, PII 없음)
  → POST api.<production-domain>/v1/inquiries
Lead Gateway Worker
  → D1 (암호화 payload + 최소 메타)
  → Queue / DLQ (leadId만 전달)
  → delivery consumer
  → private #blro-leads 알림 + Access 보호 상세 조회
  → 향후 CRM adapter
```

### Boundaries

- Pages: `/contact` UI, SEO, 콘텐츠, consent UI, PII 없는 이벤트 발행.
- Lead Gateway: 검증, Turnstile server validation, 암호화, idempotency, 저장, queue, 전달 상태.
- D1: `lead_id`, 상태, 동의 버전, 만료 시각, AES-GCM 암호문만 저장한다. 평문 PII는 저장하지 않는다.
- Queue: 평문 없이 `leadId`만 전달하고 retry/DLQ를 담당한다.
- Slack: `requestId`, topic, 회사명, 마스킹 email, Access URL만 전달한다. 메시지 본문·전화·secret을 보내지 않는다.

## API Contract

### `POST /v1/inquiries`

Headers: `Content-Type: application/json`, `Origin`, `Idempotency-Key`.

```json
{
  "company": "string 2..100",
  "name": "string 2..80",
  "workEmail": "valid email <=254",
  "phone": "optional string 7..30",
  "topic": "vmware-hci|vdi|security|sase|dr|general",
  "environment": "vmware|nutanix|hyperv|physical|mixed|unknown",
  "message": "optional string <=2000",
  "consent": { "privacyVersion": "YYYY-MM-DD", "marketing": false },
  "attribution": { "landingPath": "/solutions/hci-private-cloud", "ctaId": "solution-hci-consult", "utmSource": "optional" },
  "turnstileToken": "string",
  "website": "honeypot optional"
}
```

Responses: `201 { requestId, status: "accepted" }`, `400` validation, `403` origin/Turnstile, `409` idempotency replay, `429` with `Retry-After`, `503` retryable generic error. Error response never echoes PII.

### `POST /v1/lead-magnets/vmware-hci`

동일한 최소 동의·Turnstile·attribution 검증 후 `201 { requestId, downloadUrl, expiresAt }`을 반환한다. 파일은 private R2 object이며 URL은 짧은 유효기간의 서명 URL이다. 이메일 자동발송은 별도 동의·전달성 범위이므로 이번 계획에서 제외한다.

## Security Controls

- Turnstile token은 반드시 서버에서 Siteverify 한다.
- 정확한 Origin allowlist, JSON content type, body 최대 크기, honeypot, rate limit을 적용한다.
- IP 원문을 저장하지 않고 일일 salt HMAC만 rate-limit 키로 사용한다.
- `TURNSTILE_SECRET_KEY`, `SLACK_WEBHOOK_URL`, `PII_ENCRYPTION_KEY`, `LEAD_LINK_SIGNING_KEY`는 Worker secret binding만 사용한다.
- AES-GCM payload 암호화와 key version을 사용한다. Queue와 analytics에는 평문 PII를 넣지 않는다.
- Access로 보호된 담당자만 복호화된 상세 리드를 조회한다.
- 90일 보관은 권고 기본값이며, 법무·사업 승인 전에는 production PII 처리를 시작하지 않는다.

## Tradeoff Points and Risks

- Worker 분리는 초기 구현량이 늘지만, 정적 사이트 배포와 PII 처리의 blast radius를 줄인다.
- Slack은 통지 채널이지 시스템 기록의 원천이 아니다. CRM을 나중에 붙여도 adapter만 추가한다.
- D1 암호화는 운영 키 회전 절차를 요구한다. 이 절차가 없으면 production 배포를 막는다.
- preview는 synthetic sink만 사용한다. 실제 Slack, D1 production, Access 수신자와 연결하지 않는다.

## Validation Steps

- cross-origin, malformed, oversized, honeypot, invalid Turnstile, duplicate, rate-limit, provider failure, DLQ replay를 자동 검증한다.
- D1에 평문 테스트 marker가 없는지 확인하고, Slack 알림이 마스킹됐는지 확인한다.
- consent-off에서는 비필수 analytics 호출이 없음을 네트워크 수준에서 확인한다.
- Pages와 Worker preview를 분리 배포하고 synthetic lead 1건의 end-to-end 증거를 남긴다.

## Sources

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare Pages local development](https://developers.cloudflare.com/pages/functions/local-development/)
- [Cloudflare Pages to Workers migration](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)
