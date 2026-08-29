# Zscaler GCP Zero Trust Gateway 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/zscaler-ztgw-gcp-limited-availability.mdx

## Evidence

- Product blog 2026-08-12. HTTP 200. NSI, Security Profiles, labels/network tags as policy metadata. Marketing $2.1M not copied.
- Adding page. HTTP 200, real body. Limited Availability, contact Support. Region immutable after create. Minimum two availability zones. IAM principals User, Group, Service Account. Intercept endpoint group association.
- Analyzing page. HTTP 200, real body. Limited Availability, contact Support. Intercept Deployment Group, Intercept Endpoint Group, status values.
- About page https://help.zscaler.com/cloud-branch-connector/about-google-cloud-platform-zero-trust-gateways. HTTP 200 but JS-only empty HTML (1890 bytes, noscript enable JS). Rejected as official-3. Did not write DNS intercept, 7 Gbps, regional firewall, GCVE, ZPA web-only from that empty body.

## Buyer Decision

- 결정 대상: LA 파일럿 vs 생산 표준, 리전·AZ 고정, NSI 연동 범위
- 비결정 대상: prisma-sdwan-ion-681-pqc 재작성, 절감액

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr SASE 진단 범위

## Quality panel verdicts

- 정확성: 통과. About 빈 본문의 한도를 발명하지 않음.
- 범위: 통과. GCP ZTGW만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- $2.1M 절감
- About 페이지 한도를 읽었다는 주장
- Prisma SD-WAN 재작성
- GA로 평탄화

## Source ledger

- Blog. URL: https://www.zscaler.com/blogs/product-insights/introducing-zscaler-zero-trust-gateway-google-cloud. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Adding. URL: https://help.zscaler.com/cloud-branch-connector/adding-google-cloud-platform-zero-trust-gateway. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Analyzing. URL: https://help.zscaler.com/cloud-branch-connector/analyzing-google-cloud-platform-zero-trust-gateway-details. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- About. URL: https://help.zscaler.com/cloud-branch-connector/about-google-cloud-platform-zero-trust-gateways. 확인일: 2026-08-30. JS-empty. 미사용.

## firstPass

- LA + Support. Region immutable. Min two AZ. NSI from blog only.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- 7 Gbps 등 About 전용 한도 없음.

## Uncertainties

- About 페이지를 JS 렌더하면 NSI 한도가 있다는 검색 스니펫이 있었으나 이 작업은 빈 HTML만 확인했다.
- 지원 리전 목록은 Analyzing이 Supported Regions 문서로 넘기며 그 페이지는 열지 않았다.
