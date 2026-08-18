# Azure Local 2607 iSCSI SAN GA 조사 메모

상태: review 초안용. 2026-08-18 조사분이 2026-08-19에 착륙함.

확인일: 2026-08-19

대상 MDX: content/insights/ko/azure-local-2607-iscsi-san-ga.mdx

## Evidence

- what’s-new azloc-2607은 하이퍼컨버지드와 분리 배포에서 iSCSI SAN 통합이 일반 공급이라고 적는다. 2607 기능 빌드는 12.2607.1003.73이다.
- release-information은 12.2607.1003.73 제공일을 2026-08-07, OS build 26100.33158로 적는다.
- enable-external-storage는 FC 또는 iSCSI, 2604 이상, 하이브리드 iSCSI는 전용 물리 포트, 가상 NIC 미지원을 적는다. S2D+SAN과 SAN only를 나눈다.
- san-requirements는 updated_at 2026-06-03이며, 외부 SAN은 Fibre Channel 블록만 지원한다고 남아 있다. 2607 뷰에서도 FC only다.

## Buyer Decision

- 결정 대상: 기존 SAN 재사용, S2D 전용, SAN 전용 분리 배포
- 판단 질문: 2604 이상과 iSCSI 전용 물리 NIC가 있는가, 어느 Microsoft 문서를 운영 기준으로 삼을 것인가
- 비결정 대상: 벤더 순위, 성능, LinkedIn 등 소셜을 사실로 인용

## Conversion

- 단일 CTA: HCI 저장소 진단 범위 확인
- 전환 전 제공 범위: 버전, 저장소 모델, NIC, 문서 불일치
- 전환 후 기대 산출물: 세 모델 선택과 문서 기준 충돌 기록을 담은 판단표

## Quality panel verdicts

- 정확성: 통과. GA 안내와 FC only 잔존을 같은 본문에서 명시했다.
- 범위: 통과. HCI 저장소 결정만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- san-requirements가 이미 iSCSI GA를 반영했다는 주장
- 2604 미만에서 iSCSI GA를 쓸 수 있다는 주장
- 특정 SAN 벤더가 더 우수하다는 순위
- LinkedIn 또는 소셜 게시물을 일반 공급 근거로 사용
- 성능, 가격, 고객명, 호환성 확정

## Source ledger

- Microsoft Learn what’s-new azloc-2607. URL: https://learn.microsoft.com/en-us/azure/azure-local/whats-new?view=azloc-2607. 확인일: 2026-08-19. 한계: 페이지는 여러 릴리스 모노커를 포함한다. 2607 구간만 사용했다.
- Microsoft Learn release-information azloc-2607. URL: https://learn.microsoft.com/en-us/azure/azure-local/release-information-23h2?view=azloc-2607. 확인일: 2026-08-19. 한계: 페이지 상단에 이후 빌드(12.2608.1003.8)도 보인다. 2607 행의 12.2607.1003.73 / 2026-08-07만 인용했다.
- Microsoft Learn enable-external-storage. URL: https://learn.microsoft.com/en-us/azure/azure-local/deploy/enable-external-storage. 확인일: 2026-08-19. 한계: 절차와 예시 IP는 고객 구성이 아니다. 본문에 예시 주소를 넣지 않았다.
- Microsoft Learn san-requirements. URL: https://learn.microsoft.com/en-us/azure/azure-local/concepts/san-requirements. updated 2026-06-03. 확인일: 2026-08-19. 한계: stale FC only. 파트너 모델 목록을 우열로 쓰지 않았다.

## firstPass

- iSCSI GA, 12.2607.1003.73 / 2026-08-07, 2604+, 전용 물리 NIC, san-requirements FC only(2026-06-03)를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 벤더 순위, 성능, 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 문서 불일치를 숨기지 말라는 요구를 본문 한눈에 보기와 기준에 넣었다.

## Uncertainties

- san-requirements가 언제 iSCSI GA와 맞춰질지는 Microsoft 문서 갱신에 달려 있다.
- 분리 배포 iSCSI GA와 하이퍼컨버지드 iSCSI GA를 고객이 같은 클러스터에서 쓰는지 이 초안은 알지 못한다.
- 지원 벤더 표의 펌웨어 적격은 파트너 IMT에 위임되어 있다.
