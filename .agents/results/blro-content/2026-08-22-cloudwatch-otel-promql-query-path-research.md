# CloudWatch OTel PromQL 질의 경로 조사 메모

상태: review 초안용. 2026-08-22 KST.

확인일: 2026-08-22

대상 MDX: content/insights/ko/cloudwatch-otel-promql-query-path.mdx

## Evidence

- What's New 2026-06-16는 네이티브 OTel 지표, PromQL, 상용 리전 중 UAE, Bahrain, Israel Tel Aviv 제외를 적는다.
- PromQL 문서는 @ 접두사 레이블, 벤디드 지표는 enrichment 후 질의, Grafana는 AMP 플러그인을 monitoring 엔드포인트에 둔다고 적는다. IAM은 GetMetricData와 ListMetrics.
- OTLP Endpoints 문서는 지표 HTTP 엔드포인트, gRPC 미지원, SigV4 또는 전달자 토큰을 적는다.
- OTel enrichment 문서는 리소스 태그를 먼저 켜고 start-otel-enrichment를 리전마다 실행해야 벤디드 지표가 PromQL 대상이 된다고 적는다. 원래 CloudWatch 지표는 그대로 남는다.

## Buyer Decision

- 결정 대상: OTLP 수집, 벤디드 지표 보강, Grafana 데이터 소스
- 판단 질문: What's New의 통합 질의만으로 벤디드 지표가 보이는가, enrichment를 켜야 하는가
- 비결정 대상: Azure Monitor Diagnostics OTLP 경로 재작성

## Conversion

- 단일 CTA: 관측 경로 진단 범위 확인
- 전환 전 제공 범위: 프로토콜, 리전, enrichment, Grafana, IAM
- 전환 후 기대 산출물: 수집과 질의 경로 판단표

## Quality panel verdicts

- 정확성: 통과. 통합 안내와 enrichment 선행 조건 불일치를 본문에 남겼다.
- 범위: 통과. CloudWatch 지표 PromQL만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- Azure Monitor Diagnostics OTLP 재작성
- 가격 수치, 15개월 보존을 품질 보장으로 해석
- 웹훅, 비밀값, 내부 대시보드 URL
- Sangfor 사례

## Source ledger

- What's New 2026-06-16. URL: https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-cloudwatch-otel-metrics/. 확인일: 2026-08-22. 직접 열람.
- PromQL querying. URL: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-PromQL-Querying.html. 확인일: 2026-08-22. 직접 열람.
- OTLP Endpoints. URL: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPEndpoint.html. 확인일: 2026-08-22. 직접 열람.
- OTel enrichment. URL: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTelEnrichment.html. 확인일: 2026-08-22. 직접 열람.

## firstPass

- HTTP 전용, enrichment 선행, AMP 플러그인 경로를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- Azure Monitor 초안을 다시 쓰지 않았다.

## Uncertainties

- Query Studio GA 공지(2026-06-15)는 검색으로 확인했으나 본문 초안에는 콘솔 경로만 언급하고 별도 출처로 쓰지 않았다.
- 레이블 150개, 요청 크기 제한은 엔드포인트 문서에 있으나 본문에서 수치 나열을 최소화했다.
- 제외 3개 리전의 이후 확대 여부는 확인일 기준 공지만 사용했다.
