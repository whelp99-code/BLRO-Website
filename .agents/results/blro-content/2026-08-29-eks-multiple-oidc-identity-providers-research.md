# Amazon EKS 다중 OIDC 공급자 조사 메모

상태: review 초안용. 2026-08-29 KST.
대상 MDX: content/insights/ko/eks-multiple-oidc-identity-providers.mdx

## Evidence

- What's New 2026-08-24. Up to 10 external OIDC providers per cluster. IAM auth continues alongside. AssociateIdentityProviderConfig. No Kubernetes version gate in the one-liner. HTTP 200.
- User Guide is the operating source for the 1.32 / 10-provider limit. 1.32 or later: up to 10, combined config < 12 KB. Earlier than 1.32: one provider. Cannot disable IAM auth. Issuer URL publicly reachable. Association is a cluster update (UPDATING). username/groups prefixes. HTTP 200.
- AssociateIdentityProviderConfig API. Request shape and oidc object. No 10-provider or 1.32 text. HTTP 200.

## Buyer Decision

- 결정 대상: 직접 최대 10개 vs 중개 브로커, 1.32 전제, 접두어
- 비결정 대상: EKS CA 교체, IAM 인증 제거

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 클라우드 신원 진단 범위

## Quality panel verdicts

- 정확성: 통과. What's New 한 줄과 User Guide 1.32를 불일치로 남김.
- 공개 준비: 보류. status review.

## Rejected claims

- EKS CA rotation 재작성
- IAM 인증 비활성
- /contact send 정상
- 제품 우열·가격

## Source ledger

- What's New. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-eks-multiple-oidc-providers/. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- User Guide. URL: https://docs.aws.amazon.com/eks/latest/userguide/authenticate-oidc-identity-provider.html. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- API. URL: https://docs.aws.amazon.com/eks/latest/APIReference/API_AssociateIdentityProviderConfig.html. 확인일: 2026-08-29. HTTP 200. 직접 열람.

## firstPass

- 10 providers, IAM alongside, 1.32 gate, 12 KB, UPDATING, prefixes.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- CA 교체 글과 겹치지 않음.

## Uncertainties

- 리전별 예외 목록은 What's New가 "all AWS Regions where Amazon EKS is available"만 적는다. 리전 목록을 만들지 않았다.
