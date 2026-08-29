# Citrix WorkSpaces Core Monthly/Hourly billing 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/citrix-workspaces-core-monthly-hourly-billing.mdx

Independent source pass 2026-08-30. Replaces the first-pass VDI slot citrix-web-signin-preview-2607, which was too close to open PR #8 citrix-entra-sso-vda-2607.

## Evidence

- CVAD 7 2607 LTSR What’s new. Page date August 24, 2026. HTTP 200, body present. Flexible billing for Amazon WorkSpaces Core Managed Instances via Citrix MCS: Monthly (flat-rate) vs Hourly (pay-as-you-go). Monthly for persistent desktops, Hourly for on-demand. Requires the AWS account configured for Amazon WorkSpaces billing service. Same page also lists Entra SSO GA and Web sign-in Preview. Those are not this article.
- Current Release What’s new. Page date August 21, 2026. HTTP 200, body present. Same Monthly/Hourly paragraph. Also lists cross-account provisioning PowerShell and MCSIO-enabled MCS catalogs for WorkSpaces Core. Do not flatten CR extras onto a 2607 LTSR billing approval.
- Create a catalog of Amazon WorkSpaces Core Managed Instances, 2607 LTSR. Page date May 13, 2026; body readable on 2026-08-30. HTTP 200. Hourly is the AWS default if billing mode is omitted. PowerShell BillingMode omitted also yields Hourly. Legacy EC2 billing account: Monthly option not available. Spot instances not supported with WorkSpaces billing. Mix of WorkSpaces billing and EC2 billing in one account not supported. Flexible billing does not apply to standard AWS EC2 host connections. Existing VMs need a service window or power cycle to apply a billing change. Billing via PowerShell CustomProperties currently.
- Did not invent prices, discounts, or savings.

## Buyer Decision

- 결정 대상: AWS 계정 빌링(WorkSpaces vs legacy EC2), Monthly vs Hourly, 기존 VM 전원 창
- 비결정 대상: citrix-entra-sso-vda-2607 재작성, Web sign-in 미리보기 글, Current Release 교차 계정·MCSIO를 빌링 승인으로 평탄화

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 디지털 워크스페이스 진단 범위

## Quality panel verdicts

- 정확성: 통과. 단가 없음. Hourly 기본과 Monthly 전제를 분리.
- 범위: 통과. WorkSpaces Core MCS 빌링만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- AWS/Citrix 단가, 할인, 절감액
- 카탈로그 페이지 날짜 2026-05-13을 기능 철회일로 보는 해석
- Current Release 교차 계정·MCSIO를 2607 LTSR 빌링 GA로 합침
- Entra SSO / Web sign-in 글 재작성
- service:network-security 기본값

## Source ledger

- 2607 LTSR What’s new. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/2607-ltsr/whats-new/whats-new.html. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Current Release What’s new. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/whats-new.html. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Create catalog Amazon WSC. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/2607-ltsr/install-configure/create-catalog-amazon-wsc.html. 확인일: 2026-08-30. HTTP 200. 직접 열람.

## firstPass

- Monthly persistent / Hourly on-demand / WorkSpaces billing 전제 / Hourly 기본 / legacy Monthly 없음 / 혼용·Spot 불가 / service window.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- 단가 없음. PR #8 Entra SSO 글과 겹치지 않음.

## Uncertainties

- 고객별 AWS 계정 빌링 전환 일정은 공개 문서에 없다.
- CustomProperties 외 GUI 경로의 이후 변경은 이 확인일에 단정하지 않았다.
