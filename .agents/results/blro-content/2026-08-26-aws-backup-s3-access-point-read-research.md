# AWS Backup S3 읽기 접근점 조사 메모

상태: review 초안용. 2026-08-26 KST.

확인일: 2026-08-26

대상 MDX: content/insights/ko/aws-backup-s3-access-point-read.mdx

## Evidence

- What's New 2026-08-06는 S3 복구 지점 접근점으로 복원 없이 읽기를 연다. GetObject, HeadObject, ListObjectsV2. 표준 볼트와 논리 에어갭, RAM과 다자 승인. 활성 시 삭제 보호. 선택 리전.
- Developer Guide Access points는 수명 주기 중지, DeleteRecoveryPoint 차단, 보존일 변경은 가능하나 집행은 접근점 삭제 후, S3 직접 삭제 시 EXPIRED 잔존, 복구 지점당 5개, 쓰기 미지원, 연속 복구 AccessPointInTime을 적는다.
- S3 User Guide는 같은 읽기 경로와 Versioning 전제를 적는다.

## Buyer Decision

- 결정 대상: 부분 읽기 대 복원, 접근점 수명, 에어갭 공유 계정 허용
- 판단 질문: 읽기를 켜면 복구 지점 보존이 길어진다는 점을 수용할 것인가
- 비결정 대상: EKS 에어갭 볼트 재작성, 일반 DR 체크리스트 재작성

## Conversion

- 단일 CTA: 백업과 재해복구 진단 범위 확인
- 전환 전 제공 범위: 복구 지점 유형, 볼트, 리전, 삭제 책임
- 전환 후 기대 산출물: 읽기 경로와 수명 주기 판단표

## Quality panel verdicts

- 정확성: 통과. 삭제 보호 한 줄 안내와 수명 주기 절의 세부 차이를 본문에 남겼다.
- 범위: 통과. S3 읽기 경로만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 접근점이 랜섬웨어 복구나 규정 준수를 보장한다는 주장
- 가격, 성능 순위
- EKS 에어갭 글 재작성

## Source ledger

- AWS What's New 2026-08-06. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/aws-backup-amazon-s3-direct-access/. 확인일: 2026-08-26. 직접 열람.
- AWS Backup Developer Guide Access points. URL: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-access-points.html. 확인일: 2026-08-26. 직접 열람.
- Amazon S3 User Guide backup-for-s3. URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/backup-for-s3.html. 확인일: 2026-08-26. 직접 열람.

## firstPass

- 읽기 전용, 수명 주기 중지, EXPIRED, 5개 한도, 선택 리전을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- EKS 에어갭과 일반 체크리스트를 다시 쓰지 않았다.

## Uncertainties

- What's New는 선택 리전이라고만 적는다. 리전 목록은 콘솔·문서 갱신 시 다시 열어야 한다.
- 연속 복구 접근점이 보존 창 밖 데이터를 얼마나 오래 유지하는지는 삭제 시점 외 별도 SLA가 없다.
