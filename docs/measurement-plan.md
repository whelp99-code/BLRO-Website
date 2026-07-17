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
- 동의 후 Cloudflare Web Analytics를 로드해 페이지 조회와 웹 성능을 집계한다.
- CTA와 상담 흐름 이벤트는 같은 동의 후 `https://api.blro.co.kr/v1/analytics`로 전송한다. Worker는 허용 목록의 속성만 D1에 저장하고 원본 IP, User-Agent, Referrer, UTM, 폼 값을 저장하지 않는다.
- BLRO 전환 이벤트는 90일 후 예약 작업으로 삭제한다. 이벤트 ID는 중복 삽입 방지에만 사용한다.
- 브라우저 전송은 비차단 방식이며 실패해도 사용자 탐색이나 문의 접수를 방해하지 않는다.

## 운영 확인

- Cloudflare Web Analytics 토큰은 공개 빌드 변수 `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`으로 주입한다.
- 이벤트 수신 상태는 D1에서 이벤트명·일자별 집계만 조회한다. 개별 방문자 프로필을 만들지 않는다.
- 새 이벤트나 속성을 추가하려면 브라우저 타입, Worker 허용 목록, 이 문서, 개인정보 처리 안내를 함께 변경한다.
