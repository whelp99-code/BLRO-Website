# Citrix Web sign-in preview 2607 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/citrix-web-signin-preview-2607.mdx

## Evidence

- DaaS Web sign-in. Page date August 18, 2026. Preview, no support, not recommended for production. VDA Windows single session 2607+. Workspace app Windows 2607+. Entra joined OR Entra hybrid joined. Win11 24H2 KB5065789+ build 26100.6725. Disabled by default. Not necessary to use Entra SSO. Registry AllowWebSignIn DWORD 1. HTTP 200, body present.
- 2607 LTSR Web sign-in. Page date August 18, 2026. Preview. Session host identity: Entra hybrid joined only in the requirement list. Same VDA/Workspace/OS build. HTTP 200, body present.
- DaaS What’s new. lastModified August 27, 2026. August 2026: Web sign-in (Preview). Log in or unlock Entra joined or Entra hybrid joined virtual desktop. HTTP 200, body present.

## Buyer Decision

- 결정 대상: 미리보기 Web sign-in vs Entra SSO, DaaS vs 2607 LTSR 조인 유형
- 비결정 대상: citrix-entra-sso-vda-2607 재작성

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 디지털 워크스페이스 진단 범위

## Quality panel verdicts

- 정확성: 통과. 조인 유형 불일치를 남김.
- 범위: 통과. Web sign-in만. Entra SSO 글과 분리.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- Entra SSO 글 재작성
- 미리보기 생산 권고
- DaaS와 LTSR 조인 유형 평탄화

## Source ledger

- DaaS Web sign-in. URL: https://docs.citrix.com/en-us/citrix-daas/install-configure/session-authentication/web-sign-in. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- 2607 LTSR Web sign-in. URL: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/2607-ltsr/install-configure/session-authentication/web-sign-in.html. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- DaaS What’s new. URL: https://docs.citrix.com/en-us/citrix-daas/whats-new.html. 확인일: 2026-08-30. HTTP 200. 직접 열람.

## firstPass

- Preview. Entra SSO 불필요. DaaS joined+hybrid vs LTSR hybrid-only.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- entra-sso 재작성 없음.

## Uncertainties

- 온프레미스 2607 LTSR What’s new에 Web sign-in 한 줄이 있는지는 이 글의 필수 3출처에 넣지 않았다. DaaS What’s new만 열었다.
