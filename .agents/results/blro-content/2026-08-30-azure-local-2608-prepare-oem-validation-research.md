# Azure Local 2608 준비·OEM Validation 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/azure-local-2608-prepare-oem-validation.mdx

## Evidence

- What’s new view=azloc-2608. HTTP 200, 144625 bytes. August 2026 version 12.2608.1003.8. OS 26100.33296. Driver compatible with that OS or Windows Server 2025. Prepare updates workflow. Feature updates new state Pending OEM Validation. Portal Shut down vs Turn off requires 2604+. Add node via portal preview. GPU Management from Azure preview. Arc Site Manager preview. Frontmatter tag is azloc-2608 because YAML 2608 is a number.
- Known issues view=azloc-2608. HTTP 200. Solution 12.2608.1003.8, OS 26100.33296. No fixed issues in this release. No known issues specific to this release. Previous-release issues remain listed.
- Release information view=azloc-2608. HTTP 200. 12.2608.1003.8 availability date 2026-08-18. New deployments use this build. SBE clusters get feature releases after hardware vendor validation, typically weeks, varies by vendor. Six-month update window to stay supported. Last cumulative before feature update. August OS security update attached to 12.2608.1003.8. Azure Stack HCI 23H2 OS 25398.xxxx EOS April 2026.
- Security updates view=azloc-2608. Optional 4th. HTTP 200. KB5120233 released August 11, 2026. OS build 26100.33296.
- add-server page also opened. Portal add-node path labeled preview. Used as corroboration, not a counted fifth.

## Buyer Decision

- 결정 대상: 준비 vs 설치, Pending OEM Validation 보류, 미리보기 세 항목
- 비결정 대상: 2606 준비 글 재작성, 2607 iSCSI GA 재작성

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr HCI 진단 범위

## Quality panel verdicts

- 정확성: 통과. 미리보기를 GA로 평탄화하지 않음.
- 범위: 통과. 2608 준비·OEM만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 미리보기 세 항목 GA
- OEM 검증 없이 설치 가능 단정
- 2606/2607 글 재작성
- service:network-security 기본값

## Source ledger

- What’s new. URL: https://learn.microsoft.com/en-us/azure/azure-local/whats-new?view=azloc-2608. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Known issues. URL: https://learn.microsoft.com/en-us/azure/azure-local/known-issues?view=azloc-2608. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Release information. URL: https://learn.microsoft.com/en-us/azure/azure-local/release-information-23h2?view=azloc-2608. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Security updates. URL: https://learn.microsoft.com/en-us/azure/azure-local/security-update/security-update?view=azloc-2608. 확인일: 2026-08-30. HTTP 200. 직접 열람. optional 4th.

## firstPass

- 12.2608.1003.8 / 26100.33296 / Pending OEM Validation / 미리보기 분리.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- 2606·2607 재작성 없음.

## Uncertainties

- 공급자별 SBE 검증 완료일은 공개 문서에 없다.
- 준비 상태 만료 시간은 2608 what’s-new에 숫자로 없었다.
