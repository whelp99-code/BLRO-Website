# GCP 백업 볼트 프로젝트 선 조사 메모

상태: review 초안용. 2026-08-22 KST.

확인일: 2026-08-22

대상 MDX: content/insights/ko/gcp-backup-vault-project-lien.mdx

## Evidence

- Backup and DR release notes 2026-08-17은 2026-11-01부터 강제 보존 백업이 있는 볼트 프로젝트에 프로젝트 선을 자동으로 건다고 적는다. PAM 다자 승인을 안내한다.
- Cyber resilience 문서는 허브 프로젝트와 스포크 분리를 권하고, 볼트 프로젝트에 선을 강하게 권한다.
- 볼트 생성 문서도 같은 선 권고와 PAM 안내를 반복한다.
- Resource Manager 프로젝트 선 문서는 삭제 차단, 일부 자동 선, resourcemanager.projects.updateLiens를 적는다. 예시 자동 선은 서비스 계정 교차 프로젝트 사용이다.

## Buyer Decision

- 결정 대상: 볼트 위치, 자동 선 수용, 허브 이전, 선 제거 승인
- 판단 질문: 11월 1일 전에 허브로 옮길 것인가, 업무 프로젝트에 자동 선이 걸리는가
- 비결정 대상: AWS EKS 논리 격리 볼트, 백업 체크리스트 재작성

## Conversion

- 단일 CTA: 백업과 재해복구 진단 범위 확인
- 전환 전 제공 범위: 볼트 프로젝트, 강제 보존, 삭제 권한
- 전환 후 기대 산출물: 허브 이전과 PAM 판단표

## Quality panel verdicts

- 정확성: 통과. 권고 선과 자동 선 일정 차이를 본문에 남겼다.
- 범위: 통과. GCP 프로젝트 삭제 방지 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- AWS Backup EKS air-gapped vault 재작성
- 선이 랜섬웨어를 제거한다는 보장
- 백업 체크리스트, RPO 가이드 재작성
- PAM 전용 페이지를 이 작업에서 직접 열었다는 주장. 릴리스 노트와 모범 사례가 가리키는 제목만 기록했다.
- Sangfor 사례, 가격

## Source ledger

- Release notes. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/release-notes. 확인일: 2026-08-22. 직접 열람.
- Cyber resilience. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/best-practices-cyber-resilience. 확인일: 2026-08-22. 직접 열람.
- Backup vault create. URL: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create. 확인일: 2026-08-22. 직접 열람.
- Project liens. URL: https://docs.cloud.google.com/resource-manager/docs/project-liens. 확인일: 2026-08-22. 직접 열람.

## firstPass

- 11월 1일 자동 선, 허브 권고, 선 변경 권한을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- EKS 논리 격리 볼트와 일반 DR 체크리스트를 다시 쓰지 않았다.

## Uncertainties

- Protect project liens by using Privileged Access Manager 페이지는 검색으로 제목이 보였으나 이 작업에서 본문 열람이 실패했다. 본문은 릴리스 노트와 모범 사례의 안내만 사용했다.
- 자동 선 이름, 원인 문자열, 제거 API는 11월 1일 이후 문서를 다시 열어야 한다.
- 강제 보존이 없는 볼트에는 자동 선이 적용되지 않는다고 읽었다.
