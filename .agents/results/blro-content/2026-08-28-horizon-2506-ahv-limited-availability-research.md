# Horizon 2506 AHV Limited Availability 조사 메모

상태: review 초안용. 2026-08-28 KST.
대상 MDX: content/insights/ko/horizon-2506-ahv-limited-availability.mdx

## Evidence

- docs.omnissa.com 200 JS shell. Public docs-be and API JSON opened without login.
- 2506 pools LA, CS 2506, PC 2024.3, AOS 7.0, AHV 10.0, on-prem + NC2 AWS, request access.
- 2506 golden image same LA plus SCSI, Secure Boot, active template snapshot.
- 2512 pools: Horizon 8 supports the Nutanix AHV Hypervisor platform, CS 2512+, no LA label.
- Marketing blog 200 this run. Earlier Access Denied noted. Fourth source only.

## Buyer Decision

- 결정 대상: vSphere 유지, 2506 LA 요청, 2512+ 문서 지원 대기
- 비결정 대상: 하이퍼바이저 우열, Citrix/AVD 글 재작성, LA=GA

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr VDI 진단 범위

## Quality panel verdicts

- 정확성: 통과. LA와 2512 문구를 분리.
- 공개 준비: 보류. status review.

## Rejected claims

- LA를 GA로 취급
- VMware vs Nutanix bake-off
- 지원 포털 잠긴 릴리스 노트를 공식 3출처로 사용
