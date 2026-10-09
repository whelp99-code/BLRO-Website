# GCP Telemetry API OTLP 일반 공급 조사 메모

상태: review 초안용. 2026-08-26 KST.

확인일: 2026-08-26

대상 MDX: content/insights/ko/gcp-telemetry-api-otlp-ga.mdx

## Evidence

- Cloud Monitoring release notes 2026-08-05는 Telemetry API 지표 수집을 일반 공급이라고 적는다.
- 통합 Observability release notes 2026-08-14는 로그 수집을 일반 공급이라고 적는다. 2026-08-17은 Cloud Trace API 한도를 Telemetry API와 맞춘다.
- OTLP ingestion overview는 telemetry.googleapis.com, telemetry.writer, 로그 otel 복사, 지표 이름 거절, Prometheus 접두사, Collector 0.140.0 이상을 적는다.
- Deploy collector는 otlphttp 엔드포인트와 googleclientauth를 적는다.
- Monitoring 노트는 Ops Agent 2.66.0의 Telemetry API 경로를 미리보기 선택 가입으로 남긴다.

## Buyer Decision

- 결정 대상: 신호별 이전, Collector 대 Managed OTel, Ops Agent 미리보기
- 판단 질문: 지표 GA를 로그·에이전트까지 같은 전환으로 볼 것인가
- 비결정 대상: Azure Diagnostics OTLP, CloudWatch PromQL 재작성

## Conversion

- 단일 CTA: 관측 수집 경계 진단 범위 확인
- 전환 전 제공 범위: 신호, API, 역할, Collector 버전
- 전환 후 기대 산출물: 신호별 이전 판단표

## Quality panel verdicts

- 정확성: 통과. 지표 GA, 로그 GA, Ops Agent 미리보기 날짜 차이를 본문에 남겼다.
- 범위: 통과. GCP 수집 API 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- Telemetry API가 품질이나 비용을 보장한다는 주장
- 검색 스니펫의 로그 GA 8월 17일. 직접 연 통합 노트는 8월 14일이다.
- 가격 금액, Sangfor 사례

## Source ledger

- Cloud Monitoring release notes. URL: https://cloud.google.com/monitoring/docs/release-notes. 확인일: 2026-08-26. 직접 열람.
- Observability release notes. URL: https://docs.cloud.google.com/stackdriver/docs/release-notes. 확인일: 2026-08-26. 직접 열람.
- OTLP ingestion overview. URL: https://cloud.google.com/stackdriver/docs/otlp-metrics/overview. 확인일: 2026-08-26. 직접 열람.
- Deploy and use the collector. URL: https://docs.cloud.google.com/stackdriver/docs/otlp-metrics/deploy-collector. 확인일: 2026-08-26. 직접 열람.

## firstPass

- 8월 5일 지표 GA, 8월 14일 로그 GA, Ops Agent 미리보기, otel 복사를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- Azure Monitor와 CloudWatch 글을 다시 쓰지 않았다.

## Uncertainties

- 검색 스니펫은 로그 GA를 8월 17일로 보여 주었으나, 직접 연 통합 노트는 8월 14일이다. 본문은 연 페이지를 따른다.
- 과금 SKU 이름은 개요에 있으나 금액은 쓰지 않았다.
