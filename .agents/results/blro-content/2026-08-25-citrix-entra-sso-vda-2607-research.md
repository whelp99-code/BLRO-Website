# Citrix Entra SSO VDA 2607 조사 메모

상태: review 초안용. 2026-08-25 KST.

확인일: 2026-08-25

대상 MDX: content/insights/ko/citrix-entra-sso-vda-2607.mdx

## Evidence

- DaaS What's new 2026-08-21 페이지의 8월 항목은 VDA 2607 머신 정책으로 Entra SSO를 켜거나 끈다고 적는다.
- DaaS Entra SSO 문서는 2026-06-25. 기능 본문은 미리보기 표시가 없고 StoreFront Entra ID만 미리보기다. 최소 VDA 2507.
- 2607 LTSR Entra SSO 문서는 2026-08-18. 제목과 본문이 Preview이며 생산에 권하지 않는다. VDA에서 기본 사용, 일부 호스트는 정책으로 끈다.
- 지원 표가 갈린다. DaaS는 온프레미스와 StoreFront 하이브리드를 No, 2607 LTSR은 Yes.

## Buyer Decision

- 결정 대상: DaaS 정책 적용과 온프레미스 미리보기 승인
- 판단 질문: 온프레미스를 DaaS와 같은 일반 공급으로 보는가
- 비결정 대상: AVD 기존 초안 재작성

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 로 컨설팅 문의
- 전환 전 제공 범위: 제어면, 조인 유형, VDA
- 전환 후 기대 산출물: 인증 경계 판단표

## Quality panel verdicts

- 정확성: 통과. 미리보기와 지원 표 불일치를 본문에 남겼다.
- 범위: 통과. Citrix Entra SSO만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 온프레미스 2607 LTSR을 생산 일반 공급으로 단정
- AVD 기존 글 재작성
- 가격, 성능, Sangfor 사례

## Source ledger

- Citrix DaaS What's new. URL: https://docs.citrix.com/en-us/citrix-daas/whats-new.html. 확인일: 2026-08-25. 직접 열람.
- Citrix DaaS Entra SSO. URL: https://docs.citrix.com/en-us/citrix-daas/install-configure/session-authentication/entra-sso.html. 확인일: 2026-08-25. 직접 열람.
- CVAD 2607 LTSR Entra SSO Preview. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/2607-ltsr/install-configure/session-authentication/entra-sso.html. 확인일: 2026-08-25. 직접 열람.
- CVAD 2607 LTSR What's new. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/2607-ltsr/whats-new/whats-new. 확인일: 2026-08-25. 직접 열람.

## firstPass

- DaaS 8월 정책과 LTSR 미리보기를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- AVD 초안을 다시 쓰지 않았다.

## Uncertainties

- DaaS Entra SSO 페이지 날짜가 2026-06-25라 8월 머신 정책 문장이 본문에 아직 없을 수 있다. What's new를 운영 기준으로 적었다.
- 고객별 Entra 앱 등록 상태는 공개 출처로 확인할 수 없다.
