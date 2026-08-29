# Prisma Access 6.2 Preferred vs Innovation 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/prisma-access-62-preferred-innovation.mdx

Independent source pass 2026-08-30. Replaces the first-pass SASE slot zscaler-ztgw-gcp-limited-availability (workload gateway, weaker SASE fit). Does not rewrite prisma-access-saa-agentless-boundary.

## Evidence

- New Features Prisma Access 6.2 Preferred and Innovation. August 2026. HTTP 200, body present. App Security/WAF consolidate. SASE Resilience CIE/Enterprise DLP US initial rollout. Native IPv6 for Service Connections and Remote Networks in Panorama and SCM. Web Application Isolation for Secure Agentless Access; RBI mandatory/default for public web apps. SAA/RBI used only as a 6.2 August feature pointer, not as this article’s decision.
- Software and Feature Prerequisites / dependencies. HTTP 200, body present. 6.2 Preferred dataplane 11.2.7-h17. 6.2 Innovation PAN-OS 12.1.8 (coming soon). Innovation dataplane upgrade optional, only if you want features that require it. Same page later sentence: 6.2 Preferred runs PAN-OS xx.x.x-xx and 6.1 Innovation runs PAN-OS 12.2. Left as a discrepancy; not flattened with the table.
- Prisma Access Release Information. HTTP 200, body present. Panorama operators decide when to upgrade the Cloud Services plugin. Infrastructure updates managed by Palo Alto Networks with advance notice. Any non-EoL GlobalProtect supported, with recommended/required versions for 6.2.
- Do not treat coming soon 12.1.8 as GA.

## Buyer Decision

- 결정 대상: Preferred 11.2.7-h17 유지 vs Innovation 12.1.8 보류, plugin 시점, 인프라 사전 안내
- 비결정 대상: prisma-access-saa-agentless-boundary 재작성, 12.1.8 GA 단정, SAA/RBI 앱 범위 결정

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr SASE 진단 범위

## Quality panel verdicts

- 정확성: 통과. coming soon을 GA로 보지 않음. xx.x.x-xx 불일치 남김.
- 범위: 통과. 6.2 Preferred vs Innovation 경로만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 12.1.8 coming soon = 일반 공급
- SAA 경계 글 재작성 또는 insight:prisma-access-saa-agentless-boundary 확장
- Zscaler ZTGW GCP 글의 이 브랜치 재사용
- service:network-security 기본값
- 가격, 성능, 제품 우열

## Source ledger

- New features 6.2. URL: https://docs.paloaltonetworks.com/content/techdocs/en_US/prisma-access/new-features/by-version/prisma-access/6-2-preferred-innovation. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Software and feature dependencies. URL: https://docs.paloaltonetworks.com/prisma-access/release-notes/6-2/prisma-access-about/software-and-feature-dependencies. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Release information. URL: https://docs.paloaltonetworks.com/prisma-access/release-notes/6-2/prisma-access-about. 확인일: 2026-08-30. HTTP 200. 직접 열람.

## firstPass

- Preferred 11.2.7-h17 / Innovation 12.1.8 coming soon / optional dataplane / plugin vs infra / SAA pointer only.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- SAA 글 재작성 없음. relatedContent는 service:sase-global-connectivity, insight:sase-sdwan-roles.

## Uncertainties

- 12.1.8 일반 공급일은 coming soon 이상으로 공개되어 있지 않다.
- 표의 11.2.7-h17·12.1.8과 본문 xx.x.x-xx / 6.1 Innovation 12.2 불일치는 벤더 페이지에 그대로 있다.
