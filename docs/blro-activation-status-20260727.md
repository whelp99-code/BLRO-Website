# BLRO 활성화 상태 — 2026-07-27

이 문서는 기존 로드맵의 정적 기준선을 실제 운영 증거로 갱신한 상태 기록이다.

## 결론

홈페이지·Worker·콘텐츠 승인 루프는 운영 중이다. 다음 병목은 검색도구 계정 작업과 첫 유료 파일럿의 사업 실행이다.

## 확인된 운영 증거

| 영역 | 결과 | 증거 |
| --- | --- | --- |
| 공개 웹 | PASS | `https://blro.co.kr/`, `/contact`, `/insights`, `/robots.txt`, `/sitemap.xml` HTTP 200 |
| canonical 도메인 | PASS | `https://www.blro.co.kr/` HTTP 301 → `https://blro.co.kr/` |
| Lead API | PASS | `https://api.blro.co.kr/v1/inquiries` CORS preflight HTTP 204 |
| 운영 D1 | PASS | `leads` 5건, `analytics_events` 6건. 읽기 검증은 집계·메타데이터만 수행 |
| Queue 전달 | PASS | 5건 모두 `accepted` + `delivered`, DLQ 0건 |
| PII 알림 경계 | PASS (배포) | Worker `003eed29-05b4-4863-85f2-15cec7f417df`부터 Slack 알림은 접수 ID·유형·주제·랜딩·CTA만 전송 |
| 의도 보존 | PASS (배포) | 고객·파트너·벤더 문의가 `topic`과 CTA로 분리되도록 Worker/폼 계약을 수정 |
| Pages 배포 | PASS | `5e568022-8f3c-4dd6-93a1-7077504539d5`, production `main` 배포 |
| 라이브 브라우저 계약 | PASS | partner URL에서 API 요청을 격리해 `topic=partner-collaboration`, `ctaId=contact-partner-collaboration`, 성공 상태 1건·폼 alert 0건 확인 |
| 콘텐츠 승인 루프 | PASS (운영 중) | 2026-07-27 후보 5건, 1·2차 검토 5/5, 검증 45/45, 보류 0 |

## 아직 외부 권한이 필요한 항목

1. Google Search Console·네이버 서치어드바이저 최신 소유권과 sitemap 처리 화면 캡처
2. 실제 고객·벤더·파트너 인터뷰 3건
3. `IDEA-001` 3주 패키지 첫 유료 파일럿 제안 및 구매 의사 증거

## 안전 경계

- 기존 7월 18일 이전 리드 5건은 당시 배포의 Slack 전달 결과가 이미 존재한다. 개인정보 재조회·삭제·재전송은 하지 않는다.
- 7월 27일 배포 이후 새 production canary는 사용자 승인 없이 추가 데이터를 만들지 않는다.
- 검색도구 로그인과 외부 인터뷰 연락은 계정·수신자·대상자 확인 뒤 실행한다.
