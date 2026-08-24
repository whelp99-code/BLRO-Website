# Azure Monitor Diagnostics 폐기 후 OTLP 경로 조사 메모

상태: review 초안용. 2026-08-20 KST. 5번째 슬롯(관찰 가능성). 2026-08-19 영역(보안, 서버가상화, HCI, VDI, SASE)이 아님.

확인일: 2026-08-20

대상 MDX: content/insights/ko/azure-monitor-diagnostics-otlp-path.mdx

## Evidence

- Diagnostics extension overview: 2026-03-31 retired/no longer supported. 상단은 retired, 한계 절은 deprecated. 목적지별 AMA / Logs data export / AMW OpenTelemetry 안내. updated 2026-07-31.
- OpenTelemetry options: Distro와 Collector GA, AMA와 AKS preview. 생산 워크로드에 preview 비권장. ms.date 2026-05-29.
- OTLP Collector ingestion: Collector 경로 상세. 전제 0.132.0+, 인증 예시 0.148.0+. ms.date 2026-05-27.
- Azure Monitor what's-new: 2026년 6월 Collector GA, 2026년 7월 Diagnostics 폐기 안내 반영.

## Buyer Decision

- 결정 대상: 남은 WAD/LAD 제거 전 대체 경로, Distro 대 Collector, preview 경로 제외
- 판단 질문: 목적지가 저장소인가 Event Hubs인가 메트릭인가
- 비결정 대상: APM 제품 순위, 어제 영역, 가격

## Conversion

- 단일 CTA: 관찰 가능성 진단
- 전환 전 제공 범위: 확장 잔존, 경로 선택, 버전 불일치
- 전환 후 기대 산출물: 목적지별 대체와 생산 경로 판단표

## Quality panel verdicts

- 정확성: 통과. retired/deprecated와 Collector 버전 차이를 본문에 남겼다.
- 범위: 통과. 관찰 가능성만. 어제 다섯 영역 아님.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- AMA/AKS 경로가 일반 공급이라는 주장
- 폐기 후에도 확장이 지원된다는 주장
- 관찰 제품 순위

## Source ledger

- Microsoft Learn diagnostics-extension-overview. URL: https://learn.microsoft.com/en-us/azure/azure-monitor/agents/diagnostics-extension-overview. 확인일: 2026-08-20.
- Microsoft Learn opentelemetry-options. URL: https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-options. 확인일: 2026-08-20.
- Microsoft Learn opentelemetry-protocol-ingestion. URL: https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion. 확인일: 2026-08-20. 한계: 버전 전제가 절마다 다르다.
- Microsoft Learn Azure Monitor what's-new. URL: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/whats-new. 확인일: 2026-08-20.

## firstPass

- 폐기일, GA/preview 분기, Collector 버전 불일치를 재확인했다.

## secondPass

- 표, 본문 링크, 강조, 중괄호, 가격 없음. 5번째 슬롯이 어제 영역이 아님을 확인했다.

## Uncertainties

- 개별 구독에서 확장이 폐기일 이후에도 데이터를 보내는지 이 초안은 알지 못한다.
