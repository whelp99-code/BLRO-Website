# BLRO Lead Gateway

이 Worker는 정적 Pages 사이트와 개인정보 처리 경계를 분리한다.

## 현재 상태

- `POST /v1/inquiries`의 Origin, JSON, 최대 본문 크기, 스키마, honeypot 경계를 검증한다.
- `POST /v1/lead-magnets/hci-readiness`는 개인정보 처리 동의와 선택 마케팅 동의를 분리해 보관하고, 15분 만료 다운로드 링크만 반환한다.
- `POST /v1/analytics`는 측정 동의 후 전송된 허용 목록 이벤트만 받으며, 이름·이메일·문의 내용·IP·User-Agent·Referrer는 저장하지 않는다.
- 체크리스트 파일은 R2의 `hci-readiness-checklist.pdf`로 비공개 보관하며, `GET /v1/lead-magnets/hci-readiness/download`는 서명과 만료 시각을 검증한다.
- preview 설정은 `INQUIRY_INTAKE_ENABLED=false`이므로 어떤 문의도 저장·전달하지 않는다.
- 로그에는 문의 본문, 이메일, 전화번호, 이름, 회사명을 기록하지 않는다.

## 운영 연결 전 필수 승인

1. 운영 도메인과 정확한 Origin allowlist
2. 개인정보 처리 목적, 보관 기간, 수신자와 정보주체 권리 절차
3. Turnstile secret, 암호화 키, private `#blro-leads` 수신자
4. D1, Queue/DLQ, R2, Access 리소스 생성 권한 및 `LEAD_MAGNET_DOWNLOAD_SECRET`

`migrations/0001_leads.sql`은 암호화된 payload만 보관한다. 평문 이름·회사·이메일·전화번호·문의 내용 컬럼은 만들지 않는다. `migrations/0002_analytics_events.sql`은 허용된 전환 차원만 90일 보관한다.
