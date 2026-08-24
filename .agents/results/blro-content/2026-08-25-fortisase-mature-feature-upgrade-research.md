# FortiSASE Mature Feature 업그레이드 조사 메모

상태: review 초안용. 2026-08-25 KST.

확인일: 2026-08-25

대상 MDX: content/insights/ko/fortisase-mature-feature-upgrade.mdx

## Evidence

- Mature 가이드는 New major features available 모범 사례가 유지보수 창과 트래픽 영향을 동반한다고 적는다.
- 적용 시간은 월요일 00:00부터 금요일 23:59 UTC, 주요 공휴일 제외. PoP 수에 따라 1시간에서 3시간.
- Standard이고 전용 IP가 없으면 에지 장치 해제, 전용 IP 활성화, SWG 포트 9443, 기본 원격 IP 100.65.0.0/16.
- SSL VPN 일부는 DNS가 DOT와 DOH로 바뀌고 암시적 규칙이 VPN DNS로 덮인다.
- Feature 가이드 26.1.73은 25.2.c 이후 신규가 Feature 기본, 업그레이드 후 툴팁을 Feature로 적는다. Mature 가이드는 업그레이드 후 7.4를 적는다.
- 릴리스 노트 소개는 26.2.2.b를 7.4로 부른다.

## Buyer Decision

- 결정 대상: Mature 유지와 Feature 전환, DNS와 PAC 후속
- 판단 질문: 알림만으로 창을 여는가
- 비결정 대상: Prisma Access, Prisma SD-WAN 재작성

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 로 컨설팅 문의
- 전환 전 제공 범위: 인스턴스 유형, PoP, DNS
- 전환 후 기대 산출물: 업그레이드 창 판단표

## Quality panel verdicts

- 정확성: 통과. 툴팁 표기 불일치를 본문에 남겼다.
- 범위: 통과. FortiSASE 인스턴스 유형만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 업그레이드 무중단 보장
- Prisma 기존 초안 재작성
- 가격, 성능, Sangfor 사례

## Source ledger

- Mature Administration Guide, New major features available. URL: https://docs.fortinet.com/document/fortisase/latest/mature-administration-guide/846113/new-major-features-available. 확인일: 2026-08-25. 직접 열람.
- Feature Administration Guide 26.1.73 New features. URL: https://docs.fortinet.com/document/fortisase/26.1.73/feature-administration-guide/13465. 확인일: 2026-08-25. 직접 열람.
- FortiSASE Release Notes Introduction 26.2.2.b (7.4). URL: https://docs.fortinet.com/document/fortisase/latest/release-notes/216859/resolved-issues. 확인일: 2026-08-25. 직접 열람.

## firstPass

- 창 제약과 DNS 덮어쓰기를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- Prisma 초안을 다시 쓰지 않았다.

## Uncertainties

- 릴리스 노트 What's new 하위 경로 하나는 404였다. 소개 페이지와 Feature 가이드로 보완했다.
- 테넌트별 모범 사례 노출 시점은 공개 출처로 확인할 수 없다.
