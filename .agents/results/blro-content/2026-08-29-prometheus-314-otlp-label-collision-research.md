# Prometheus 3.14 OTLP 라벨 충돌 조사 메모

상태: review 초안용. 2026-08-29 KST.
대상 MDX: content/insights/ko/prometheus-314-otlp-label-collision.mdx

## Evidence

- GitHub release v3.14.0 HTTP 200. Dated 2026-08-17. Published 2026-08-18. Real release text, not empty JS.
- OTLP enhancement #18957. Warn on attribute name collisions after sanitization. Example k8s.pod.name and k8s_pod_name both become k8s_pod_name. Counter prometheus_api_otlp_translation_warnings_total labelled by category.
- Same release CHANGE: first_over_time promoted to stable. Separate decision. Not this article.
- CHANGELOG.md raw HTTP 200. 3.14.0 / 2026-08-17 section text matches the GitHub release. Counted as the same changelog family, not a second independent source.
- prometheus.io OTLP guide HTTP 200 with real body. Receiver default off, --web.enable-otlp-receiver. Default translation_strategy UnderscoreEscapingWithSuffixes. promote_resource_attributes includes k8s.pod.name.

## Buyer Decision

- 결정 대상: 3.14 OTLP 승격 전 살균 충돌 수용, 경고 카운터 관측
- 비결정 대상: first_over_time, GCP Telemetry API OTLP GA, CloudWatch PromQL

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 관찰 진단 범위

## Quality panel verdicts

- 정확성: 통과. 충돌 경고와 first_over_time을 분리. changelog 복제를 두 출처로 세지 않음.
- 공개 준비: 보류. status review.

## Rejected claims

- first_over_time을 같은 결정으로 취급
- GCP Telemetry API OTLP GA, CloudWatch PromQL 재작성
- /contact send 정상
- 제품 우열·가격

## Source ledger

- Release. URL: https://github.com/prometheus/prometheus/releases/tag/v3.14.0. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- CHANGELOG raw. URL: https://raw.githubusercontent.com/prometheus/prometheus/main/CHANGELOG.md. 확인일: 2026-08-29. HTTP 200. Same 3.14.0 text as the release page.
- OTLP guide. URL: https://prometheus.io/docs/guides/opentelemetry/. 확인일: 2026-08-29. HTTP 200. 본문 있음. 직접 열람.

Official-3 kinds used: GitHub release (dated), OTLP guide (how-to), plus CHANGELOG raw only to confirm the same 3.14.0 section. Not counted as a second changelog copy.

## firstPass

- 3.14.0 2026-08-17 / published 2026-08-18, #18957 collision warning, counter, OTLP guide sanitization default.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- first_over_time과 클라우드 OTLP 글을 섞지 않음.

## Uncertainties

- GitHub blob of CHANGELOG.md was not relied on. Raw was readable.
- The guide does not name prometheus_api_otlp_translation_warnings_total. That name is only from the release/CHANGELOG text.
