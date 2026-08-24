# AWS Organizations 기본 이탈 SCP 조사 메모

상태: review 초안용. 2026-08-20 KST.

확인일: 2026-08-20

대상 MDX: content/insights/ko/aws-organizations-default-departure-scp.mdx

## Evidence

- What's New 2026-07-10: 콘솔로 새 조직을 만들면 멤버 이탈과 자체 해지를 막는 제어가 기본 적용된다.
- Default security controls 사용 설명서: 2026-07-10 이후 콘솔 생성에만 적용. CLI, SDK, CloudFormation, 기존 조직은 수동. 루트 SCP는 LeaveOrganization과 CloseAccount Deny.
- 관리 계정 모범 사례: 같은 SCP를 루트에 붙이라고 하고, 자동 적용 조건을 반복한다. SCP는 관리 계정에 적용되지 않는다.
- Protecting member accounts from closure: 관리 계정 주체가 멤버를 닫지 못하게 하는 IAM 예시. 기본 SCP와 층이 다르다.

## Buyer Decision

- 결정 대상: 신규 콘솔 조직 기본값 수용, 기존 랜딩존 수동 부착, 루트 유지 또는 수정
- 판단 질문: 생성 경로가 콘솔인가 IaC인가, 멤버 이탈과 관리 계정 해지를 같이 볼 것인가
- 비결정 대상: Control Tower 제품 순위, 가격, 소셜

## Conversion

- 단일 CTA: 클라우드 계정 구조 진단
- 전환 전 제공 범위: 생성 경로, 루트 SCP, 문서 리전 불일치
- 전환 후 기대 산출물: 신규/기존 가드레일 표

## Quality panel verdicts

- 정확성: 통과. What's New 리전 목록과 사용 설명서 침묵을 본문에 남겼다.
- 범위: 통과. 랜딩존 계정 결정만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 기존 조직에도 자동 적용된다는 주장
- API로 만든 조직에 콘솔 기본값이 붙는다는 주장
- SCP가 관리 계정에도 적용된다는 주장
- 랜딩존 제품 순위

## Source ledger

- AWS What's New. URL: https://aws.amazon.com/about-aws/whats-new/2026/07/aws-organizations-security-controls-new-orgs-console/. 확인일: 2026-08-20. 한계: 리전 목록이 사용 설명서와 다르다.
- AWS Organizations default controls. URL: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_security_default_controls.html. 확인일: 2026-08-20.
- AWS Organizations management account best practices. URL: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices_mgmt-acct.html. 확인일: 2026-08-20.
- AWS Organizations close policy. URL: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_close_policy.html. 확인일: 2026-08-20. 한계: 기본 SCP와 다른 IAM 층.

## firstPass

- 자동 적용 조건, SCP 액션, 관리 계정 제외, 해지 보호 문서의 층 차이를 재확인했다.

## secondPass

- 표, 본문 링크, 강조, 중괄호 없음.

## Uncertainties

- What's New 리전 목록이 콘솔 엔드포인트 제한인지 정책 평가 리전인지는 문서가 설명하지 않는다.
