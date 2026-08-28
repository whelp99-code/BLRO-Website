# GCP Filestore CMEK 백업 볼트 조사 메모

상태: review 초안용. 2026-08-29 KST.
대상 MDX: content/insights/ko/gcp-filestore-cmek-backup-vault.mdx

## Evidence

- Release notes August 24, 2026. Filestore backups to a CMEK-enabled vault are GA. Backups encrypted with the vault CMEK key. HTTP 200.
- Same page August 17, 2026. Automatic project lien from 2026-11-01. Distinct from this decision. Existing insight:gcp-backup-vault-project-lien.
- Concepts CMEK. Filestore instance uses Backup vault CMEK. CMEK only at vault creation. Cannot enable, disable, or change on an existing vault. Key must be same location as vault. Default vault is Google-managed. HTTP 200.
- Filestore backup how-to. Grant roles/cloudkms.cryptoKeyEncrypterDecrypter on the vault key to the Backup and DR service agent. HTTP 200.
- Set-up CMEK. Same creation-time-only rule. Key revocation can fail new backups and restores. HTTP 200.
- Did not open filestore/docs/backups-limitations. Native backup-chain CMEK is a different product path.

## Buyer Decision

- 결정 대상: CMEK 볼트 vs Google 관리 볼트, 생성 시 고정, 서비스 에이전트 역할
- 비결정 대상: 프로젝트 선 일정 재작성, Filestore 네이티브 백업 체인

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 백업과 재해복구 진단 범위

## Quality panel verdicts

- 정확성: 통과. 생성 시 CMEK 고정과 프로젝트 선 글을 분리.
- 공개 준비: 보류. status review.

## Rejected claims

- gcp-backup-vault-project-lien 재작성
- Filestore native backup-chain CMEK 한도를 볼트 사실로 혼용
- /contact send 정상
- 제품 우열·가격

## Source ledger

- Release notes. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/release-notes. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- CMEK concepts. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/cmek. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- Filestore backup. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/filestore/filestore-instance-backup. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- Set-up CMEK. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/configuration/set-up-cmek. 확인일: 2026-08-29. HTTP 200. 직접 열람.

## firstPass

- 2026-08-24 GA, vault CMEK, creation-time only, service agent role.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- 프로젝트 선 글과 네이티브 백업 체인을 섞지 않음.

## Uncertainties

- Restore-from-CMEK-vault 전용 페이지는 릴리스 노트가 가리키나 이 작업에서 본문을 열지 않았다. 복원 절차를 단정하지 않았다.
