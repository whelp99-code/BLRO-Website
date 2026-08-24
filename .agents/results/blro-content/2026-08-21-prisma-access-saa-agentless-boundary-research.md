# Prisma Access SAA 에이전트 없는 경계 조사 메모

상태: review 초안용. 2026-08-21 KST.

확인일: 2026-08-21

대상 MDX: content/insights/ko/prisma-access-saa-agentless-boundary.mdx

## Evidence

- SAA 개요는 사설 앱, 사설 웹, 공개 SaaS, SaaS 격리 필수, 최소 Prisma Access 5.2.1과 데이터플레인 11.2.4를 적는다.
- 설정 문서는 CIE SAML 2.0만, Mobile User, 추가 라이선스 활성화 메일을 적는다.
- 사설 웹 구성은 최소 6.1 Preferred와 데이터플레인 11.2.7, 서비스 연결 또는 ZTNA Connector 또는 Colo-Connect, 와일드카드 미지원을 적는다.
- 6.1 addressed issues CYR-63001은 2026-05-29 PRA를 SAA로 바꾸고, 사설 웹은 기본 라이선스, RDP·SSH·VNC는 추가 라이선스라고 적는다.
- 포털 설정은 기본 도메인, 세션 3~24시간, 기본 3시간을 적는다.

## Buyer Decision

- 결정 대상: 앱 유형, 라이선스, 버전 최소, 격리
- 판단 질문: 사설 웹만 열 것인가, RDP 추가 라이선스까지 갈 것인가
- 비결정 대상: ION 6.8.1 PQC 재작성, SASE·SD-WAN 역할 글 재작성

## Conversion

- 단일 CTA: SASE 진단 범위 확인
- 전환 전 제공 범위: 앱 유형, 라이선스, 버전 불일치
- 전환 후 기대 산출물: 에이전트 없는 대상 판단표

## Quality panel verdicts

- 정확성: 통과. 5.2.1/11.2.4와 6.1/11.2.7 불일치를 본문에 남겼다.
- 범위: 통과. ION PQC와 다른 Prisma Access SAA만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 에이전트 없는 접근이 유출을 막는다는 주장
- 사설 웹과 RDP가 같은 라이선스라는 주장
- 제품 비교나 가격
- 마케팅 블로그를 라이선스 근거로 사용
- Sangfor 한국 사례 수행 주장

## Source ledger

- Palo Alto Networks SAA overview. URL: https://docs.paloaltonetworks.com/prisma-access/administration/secure-agentless-access. 확인일: 2026-08-21.
- Palo Alto Networks SAA settings. URL: https://docs.paloaltonetworks.com/prisma-access/administration/secure-agentless-access/configure-secure-agentless-access-settings. 확인일: 2026-08-21.
- Palo Alto Networks private web apps. URL: https://docs.paloaltonetworks.com/prisma-access/administration/secure-agentless-access/private-web-application-access-for-secure-agentless-access/configure-private-web-applications-for-secure-agentless-access. 확인일: 2026-08-21.
- Palo Alto Networks 6.1 addressed issues. URL: https://docs.paloaltonetworks.com/prisma-access/release-notes/6-1/prisma-access-about/prisma-access-addressed-issues. 확인일: 2026-08-21.
- Palo Alto Networks SAA portal. URL: https://docs.paloaltonetworks.com/prisma-access/administration/secure-agentless-access/set-up-the-secure-agentless-access-portal. 확인일: 2026-08-21.

## firstPass

- 2026-05-29 리브랜드, 라이선스 분기, 버전 불일치, SAML 전제를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 중괄호를 넣지 않았다.
- ION PQC와 sase-sdwan-roles 재작성을 넣지 않았다.

## Uncertainties

- 테넌트별 플러그인 핫픽스에 CYR-63001이 들어 있는지는 고객 콘솔을 보지 않아 모른다.
- 사설 웹 구성 페이지의 더 높은 최소 버전이 언제 개요와 맞춰질지 미정이다.
