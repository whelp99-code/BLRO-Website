# VCF 9.1 정방향 업그레이드 조사 메모

상태: review 초안용. 2026-08-25 KST.

확인일: 2026-08-25

대상 MDX: content/insights/ko/vcf-91-forward-only-upgrade.mdx

## Evidence

- VCF 9.1 릴리스 노트 날짜는 2026-05-12. 확인일 기준 페이지 날짜 2026-08-24.
- 업그레이드 문서는 플릿과 관리 도메인을 의무로 두고 워크로드는 Day-N으로 둔다.
- 5.2 미만은 먼저 5.2.x. 5.2.x와 9.0.x 순서가 다르다.
- 정방향 제한: 9.0.2.0100 2026-07-28은 9.1.0.0000 2026-05-11로 올리지 못한다. 5.2.4 2026-05-27도 같다.
- vSphere 9.1 색인은 릴리스 노트를 VCF 9.1에서 읽으라고 적는다.

## Buyer Decision

- 결정 대상: 관리 도메인만 올릴지, 워크로드까지, 대상 BOM
- 판단 질문: 이후 날짜 패치를 9.1.0.0000에 얹는가
- 비결정 대상: VMSA-2026-0006 재작성, 평가 행렬 확장

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 로 컨설팅 문의
- 전환 전 제공 범위: 출발 버전, 도메인 구분, 출시일
- 전환 후 기대 산출물: 수명주기 경로 판단표

## Quality panel verdicts

- 정확성: 통과. 정방향 제한 예시를 본문에 남겼다.
- 범위: 통과. 9.1 수명주기만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- VMSA-2026-0006 재작성
- 무중단 업그레이드 보장
- 가격, 라이선스 수치, Sangfor 사례

## Source ledger

- Upgrading to VCF 9.1. URL: https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-1/deployment/upgrading-cloud-foundation.html. 확인일: 2026-08-25. 직접 열람.
- Deployment, Convergence, and Upgrade. URL: https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-1/deployment.html. 확인일: 2026-08-25. 직접 열람.
- VCF 9.1 Release Notes. URL: https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-1/release-notes/vmware-cloud-foundation-9-1-0-0-release-notes.html. 확인일: 2026-08-25. 직접 열람.
- vSphere 9.1 Release Notes index. URL: https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/release-notes.html. 확인일: 2026-08-25. 직접 열람.

## firstPass

- 관리 도메인 의무와 정방향 제한을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- VMSA 초안을 다시 쓰지 않았다.

## Uncertainties

- VCF 9.1 릴리스 노트 본문 일부는 탐색 페이지만 열려 상세 What's new 목록을 이 작업에서 모두 읽지 못했다.
- 고객별 상호운용 행렬 결과는 공개 출처로 확인할 수 없다.
