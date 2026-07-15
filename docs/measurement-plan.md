# BLRO 비식별 측정 계획

## 목적

웹사이트의 CTA와 상담 접수 흐름을 개선한다. 웹 분석 이벤트에는 이름, 회사명, 이메일, 전화번호, 문의 내용, 원본 IP를 넣지 않는다.

## 이벤트 사전

| 이벤트 | 발생 시점 | 허용 속성 |
| --- | --- | --- |
| `cta_clicked` | CTA 선택 | `ctaId`, `placement`, `landingPath`, `topic` |
| `form_started` | 첫 번째 필드 입력 | `topic`, `landingPath` |
| `form_validation_failed` | 클라이언트 검증 실패 | `field`, `topic` |
| `turnstile_failed` | 검증 실패 | `topic` |
| `inquiry_accepted` | Worker가 접수 | `topic`, `landingPath` |
| `lead_magnet_delivered` | 다운로드 URL 발급 | `topic` |

## 동의와 보관

- 기본 상태는 측정 미동의이며, 동의 전에는 어떤 분석 provider 호출도 하지 않는다.
- 현재 구현은 브라우저 이벤트 계약과 동의 상태만 제공한다. 외부 분석 provider는 연결하지 않았다.
- 추후 provider, 보관 기간, 개인정보 처리방침이 사업·privacy owner에게 승인된 후에만 실제 전송을 추가한다.
