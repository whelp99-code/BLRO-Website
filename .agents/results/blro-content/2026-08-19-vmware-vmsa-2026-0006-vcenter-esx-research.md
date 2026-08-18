# VMSA-2026-0006 vCenter/ESX 조사 메모

상태: review 초안용. 2026-08-18 조사분이 2026-08-19에 착륙함.

확인일: 2026-08-19

대상 MDX: content/insights/ko/vmware-vmsa-2026-0006-vcenter-esx.mdx

## Evidence

- Broadcom VMSA-2026-0006.1은 2026-07-29 발행, 2026-08-03 개정이다. CVE-2026-59309는 vCenter Directory Service 인증 우회, CVSSv3 9.8, 우회책 없음이다. 8.0 고정 버전은 U3k와 U2f다. 개정 로그는 8월 3일에 ESX/vCenter 8.0 U2f express 패치 추가를 적는다.
- 같은 advisory의 CVE-2026-47876는 VMXNET3 가상 어댑터를 쓰는 VM의 로컬 관리 권한이 있어야 호스트 코드 실행으로 이어질 수 있다. 다른 가상 어댑터는 영향 대상이 아니다.
- NVD CVE-2026-59309는 2026-07-30 게시, CNA CVSS 9.8이다. 확인일 기준 CISA KEV 페이지에 이 CVE는 없다.
- vCenter 8.0 U3k 릴리스 노트는 8.0 Update 3k에서 9.1.0 또는 9.1.0 기반 패치로의 업그레이드가 지원되지 않는다고 적는다.

## Buyer Decision

- 결정 대상: vCenter를 먼저 패치할지, ESX VMXNET3 호스트 패치를 같은 창에 묶을지
- 판단 질문: 현재 8.0 열차가 U3k인가 U2f인가, 9.1.0 직접 업그레이드를 같은 창에 넣지 않았는가
- 비결정 대상: 실제 악용 단정, KEV 등재 주장, 하이퍼바이저 제품 비교

## Conversion

- 단일 CTA: 가상화 변경 진단 범위 확인
- 전환 전 제공 범위: vCenter·ESX 버전, 관리 접근, VMXNET3 사용 호스트
- 전환 후 기대 산출물: 패치 창 분리, 목표 고정 버전, 9.1.0 직접 업그레이드 제외 판단표

## Quality panel verdicts

- 정확성: 통과. U2f는 8월 3일 보강, U3k는 7월 29일부터 고정 버전으로 본문에 구분했다. 악용·KEV를 주장하지 않았다.
- 범위: 통과. 서버 가상화 패치 결정만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 실제 악용 또는 KEV 등재
- 우회책 존재
- 8.0 U3k에서 9.1.0 직접 업그레이드 가능
- VMXNET3 외 어댑터도 동일 호스트 이슈
- VMware와 다른 플랫폼의 우열·가격·성능
- 패치 소요 시간, 무중단, 침해 부재 보장

## Source ledger

- Broadcom VMSA-2026-0006.1. URL: https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017. issued 2026-07-29, updated 2026-08-03. 확인일: 2026-08-19. 한계: 제품군별 고정 버전은 표에 여러 줄이 있다. 본문은 8.0 U2f/U3k와 인증 우회·VMXNET3 구분에 한정했다.
- NVD CVE-2026-59309. URL: https://nvd.nist.gov/vuln/detail/CVE-2026-59309. published 2026-07-30. 확인일: 2026-08-19. 한계: NVD enrichment 대기. CISA-ADP SSVC는 exploitation none.
- vCenter 8.0 U3k release notes. URL: https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/vcenter-server-update-and-patch-release-notes/vsphere-vcenter-server-80u3k-release-notes.html. 확인일: 2026-08-19. 한계: 9.1.x 전방 경로 제공 시점은 적혀 있지 않다.

## firstPass

- advisory 일자·개정 로그, CVSS 9.8, workaround none, U2f 8월 3일 추가, KEV 부재, U3k→9.1.0 미지원을 원문과 대조했다.
- 2026-08-18 주장을 2026-08-19에 재확인했다.

## secondPass

- 악용 단정, 제품 비교, 표, 인라인 강조, 본문 링크를 넣지 않았다.
- 관리 평면과 호스트 이슈를 다른 전제로 유지했다.

## Uncertainties

- 9.1.x 전방 업그레이드가 어느 패치에서 열리는지는 릴리스 노트가 미래 릴리스로만 적는다.
- 고객별 vCenter 인터넷 노출과 라이선스 경로는 확인하지 않았다.
- VMSA FAQ(brcm.tech)는 보조 문서이며 본문 근거로 쓰지 않았다.
