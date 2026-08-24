# Prisma SD-WAN ION 6.8.1 PQC 조사 메모

상태: review 초안용. 2026-08-18 조사분이 2026-08-19에 착륙함.

확인일: 2026-08-19

대상 MDX: content/insights/ko/prisma-sdwan-ion-681-pqc.mdx

## Evidence

- Prisma SD-WAN 랜딩 페이지는 Release 6.8.1 일자를 July 21, 2026으로 적는다. 하이라이트에 Support for Post-Quantum Cryptography가 있다.
- July 2026 기능 페이지는 ION 6.8.1 이상 Standard VPN에서 PQC, RFC 8784 PPK, RFC 9370/9242 추가 키 교환, ML-KEM-512/768/1024를 적는다.
- PQC overview는 ION 6.8.1+, Standard VPN IPsec 프로필, FIPS 모드가 6.8.1에서 제공되지 않음, 암호 라이브러리 미검증, 다운그레이드 전 PQC 구성 제거를 적는다.
- Troubleshoot 문서는 FIPS 모드와 PQC 동시 사용 불가, IKEv2 전제, Preferred/Mandatory를 적는다.
- NIST FIPS 203 final은 2024-08-13 공개된 ML-KEM 알고리즘 표준이다. 제품 인증서가 아니다.

## Buyer Decision

- 결정 대상: Standard VPN에 ML-KEM/PPK를 켤지, FIPS·인증 경로를 유지해 6.8.1을 쓰지 않을지
- 판단 질문: Standard VPN만 대상인가, FIPS 203을 제품 인증으로 오해하지 않는가
- 비결정 대상: 양자컴퓨터 도래 시점, 처리량, 타 SD-WAN 비교

## Conversion

- 단일 CTA: SASE 연결 진단 범위 확인
- 전환 전 제공 범위: Standard VPN 사용, ION 버전, FIPS 요구
- 전환 후 기대 산출물: 적용 사이트와 인증 유지 사이트를 나눈 판단표

## Quality panel verdicts

- 정확성: 통과. Standard VPN 한정, FIPS 동시 불가, FIPS 203≠제품 인증, 6.8.1 일자 2026-07-21을 공식 페이지로 확인했다.
- 범위: 통과. SASE/SD-WAN 결정만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 모든 Prisma VPN 또는 패브릭에 PQC가 적용된다는 주장
- FIPS 모드와 PQC를 동시에 켤 수 있다는 주장
- NIST FIPS 203이 제품 FIPS 140 또는 CC 인증이라는 주장
- 양자 내성 또는 해독 불가 보장
- 성능 수치, 가격, 고객명
- PQC 구성을 남긴 채 이전 버전으로 내릴 수 있다는 주장

## Source ledger

- Palo Alto July 2026 features. URL: https://docs.paloaltonetworks.com/prisma-sd-wan/release-notes/new-features/prisma-sd-wan-release-information/prisma-sd-wan-features-introduced-in-2026/features-introduced-in-july-2026. 확인일: 2026-08-19. 한계: 같은 달 Coffeeshop·Indonesia controller는 이 초안 주제가 아니므로 쓰지 않았다.
- PQC overview. URL: https://docs.paloaltonetworks.com/prisma-sd-wan/administration/prisma-sd-wan-sites-and-devices/prisma-sd-wan-ports-and-interfaces/post-quantum-cryptography-overview. 확인일: 2026-08-19. 한계: ML-KEM-768 권고는 제품 문서 표현이다. 본문에서 성능 우위로 쓰지 않았다.
- NIST FIPS 203. URL: https://csrc.nist.gov/pubs/fips/203/final. final 2024-08-13. 확인일: 2026-08-19. 한계: 알고리즘 표준. 제품 구현 적격을 보증하지 않는다. 2025-11-17 정오표 계획이 있다.
- Troubleshoot PQC VPN. URL: https://docs.paloaltonetworks.com/prisma-sd-wan/administration/prisma-sd-wan-sites-and-devices/prisma-sd-wan-ports-and-interfaces/troubleshoot-pqc-vpn. 확인일: 2026-08-19. 한계: CLI 출력 예시는 본문에 넣지 않았다.
- Prisma SD-WAN landing. URL: https://docs.paloaltonetworks.com/prisma-sd-wan. Release 6.8.1 July 21, 2026. 확인일: 2026-08-19. 한계: 일자 확인용. 기능 세부는 July 2026 페이지를 우선했다.

## firstPass

- 6.8.1 일자, Standard VPN, ML-KEM, FIPS 동시 불가, FIPS 203 성격을 재확인했다.
- 2026-08-18 주장을 2026-08-19에 재확인했다.

## secondPass

- 성능, 인증 보장, 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 비밀·웹훅·터널 주소를 넣지 않았다.

## Uncertainties

- FIPS 검증 라이브러리가 이후 릴리스에서 제공되는 시점은 문서에 없다.
- 제3자 피어의 RFC 8784/9370 지원은 피어별로 다르다.
- FIPS 203 정오표가 제품 구현에 미치는 영향은 이 초안이 평가하지 않는다.
