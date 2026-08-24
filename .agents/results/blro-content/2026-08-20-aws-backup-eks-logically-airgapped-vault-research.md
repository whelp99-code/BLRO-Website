# AWS Backup EKS 논리 에어갭 볼트 조사 메모

상태: review 초안용. 2026-08-20 KST.

확인일: 2026-08-20

대상 MDX: content/insights/ko/aws-backup-eks-logically-airgapped-vault.mdx

## Evidence

- What's New 2026-03-12: EKS를 논리 에어갭 볼트 기본 대상 또는 복사 대상으로 지원. RAM 또는 다자 승인 후 직접 복원. 24개 리전.
- logicallyairgappedvault 가이드: 규정 모드 잠금 기본, 서비스 소유 계정 저장, RAM/MPA 공유, 최소 보존 7일. 확인일 기준 미지원 리전 목록에 말레이시아, 캘거리, 멕시코, 태국, 타이베이, 뉴질랜드가 남아 있다.
- lag-vault-primary-backup: 복원 시험·인덱싱·스캔이 DELETE_AFTER_COPY 임시 지점을 무시. 인덱싱은 에어갭 복구 지점 미지원.
- restoring-eks: 전체 또는 최대 5 네임스페이스, 원본/기존/신규 클러스터.
- What's New 2026-07-16: 위 여섯 리전에 논리 에어갭 볼트 추가. 기능 가이드와 불일치.

## Buyer Decision

- 결정 대상: 표준 볼트 대 에어갭, 복구 계정 공유 방식, 시험 대상 볼트
- 판단 질문: 어느 리전 문서를 운영 기준으로 삼을 것인가
- 비결정 대상: 백업 체크리스트/RPO 가이드 재작성, 가격, 제품 순위

## Conversion

- 단일 CTA: 백업·복구 진단
- 전환 전 제공 범위: 볼트 유형, 공유, 시험 경로, 리전 불일치
- 전환 후 기대 산출물: 대상 모델과 복구 계정 판단표

## Quality panel verdicts

- 정확성: 통과. 7월 리전 추가와 가이드 미지원 목록을 본문에 남겼다.
- 범위: 통과. 일반 DR 체크리스트 재작성이 아님.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 자동 복원 시험이 에어갭 사본을 항상 고른다는 주장
- 가이드가 이미 7월 리전을 반영했다는 주장
- 가격·성능 순위

## Source ledger

- AWS What's New EKS. URL: https://aws.amazon.com/about-aws/whats-new/2026/03/aws-backup-logically-air-gapped-vault-amazon-eks/. 확인일: 2026-08-20.
- AWS Backup logically air-gapped vault. URL: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html. 확인일: 2026-08-20. 한계: 리전 표가 What's New보다 늦다.
- AWS Backup primary LAG. URL: https://docs.aws.amazon.com/aws-backup/latest/devguide/lag-vault-primary-backup.html. 확인일: 2026-08-20.
- AWS Backup restoring EKS. URL: https://docs.aws.amazon.com/aws-backup/latest/devguide/restoring-eks.html. 확인일: 2026-08-20.
- AWS What's New regions. URL: https://aws.amazon.com/about-aws/whats-new/2026/07/aws-backup-logically-air-gapped-vault-regions/. 확인일: 2026-08-20.

## firstPass

- EKS 지원일, 잠금, RAM/MPA, 시험 제한, 리전 불일치를 재확인했다.

## secondPass

- 표, 본문 링크, 강조, 중괄호, 가격 없음.

## Uncertainties

- restore-testing.html 본문은 에어갭을 명시적으로 포함하거나 제외하지 않는다. primary-backup 제한만 인용했다.
