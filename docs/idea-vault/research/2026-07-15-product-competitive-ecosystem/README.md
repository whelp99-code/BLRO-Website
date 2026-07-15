# BLRO 판매제품 경쟁·상승효과 딥리서치

- 조사일: 2026-07-15
- 깊이: 제품 포트폴리오 기준 딥리서치
- 비교 기준: 공식 제조사 제품·기술자료
- 목적: 제품 기능 나열이 아니라, BLRO가 어떤 고객문제를 어떤 조합으로 판매할지 결정한다.

## 핵심 결론

1. BLRO의 가장 강한 진입점은 `저렴한 대체품`이 아니라 `기술전환 실패 위험을 줄이는 실행 패키지`다.
2. HCI는 Nutanix·VMware·Azure Local과 플랫폼 범위로 경쟁하기보다 마이그레이션, 복구, 운영 단순화와 책임구조를 입증해야 한다.
3. aDesk VDI는 범용 데스크톱보다 제조·CAD·콜센터·보안업무처럼 중앙 통제와 단말 표준화가 중요한 환경에서 가치가 명확하다.
4. NGFW·XDR 시장은 Fortinet·Palo Alto·Cisco의 생태계가 강하다. 장비 판매보다 `탐지-조사-차단-복구 운영시간을 줄이는 서비스`로 제안해야 한다.
5. Athena SASE의 가장 검증 가치가 높은 차별점은 해외지사·APAC·국경간 접속의 품질과 보안을 함께 다루는 것이다. PoP 숫자보다 고객의 실제 업무경로로 검증해야 한다.
6. 백업·DR은 “백업 성공”이 아니라 “공격·장애 후 정해진 시간 안에 깨끗하게 복구했다는 증거”를 판매해야 한다.
7. 가장 강한 보완 파트너는 Veeam과 NVIDIA다. 다만 Veeam의 Sangfor HCI 네이티브 지원은 공개자료상 로드맵이므로 GA 확인 전 확정 기능처럼 판매하지 않는다.

## 바로 검증할 조합

| 순위 | 조합 | 고객이 얻는 혜택 | 현재 판정 |
| ---: | --- | --- | --- |
| 1 | VMware 전환 안전 패키지 | 이전·복구·롤백을 먼저 검증해 플랫폼 교체 실패 위험을 줄인다. | P0 |
| 2 | 제조·CAD 보안 워크스페이스 | 설계데이터를 중앙 통제하면서 원격 GPU 업무환경을 제공한다. | P0 |
| 3 | 글로벌 지사 보안접속 패키지 | 지점·원격근무자의 접속 품질과 보안정책을 하나의 책임체계로 관리한다. | P0 |
| 4 | 경량 SOC 운영 패키지 | 보안경보를 줄이고 실제 사고의 조사·대응 책임과 시간을 명확히 한다. | P1 |
| 5 | 사이버 복구 증명 패키지 | 불변 백업과 복구훈련으로 랜섬웨어 이후 복구 가능성을 증명한다. | P1 |

세부 설계는 [상승효과 솔루션 지도](03-synergy-solution-map.md)에 저장했다.

## 문서 구성

| 문서 | 내용 |
| --- | --- |
| [제품 기준선](01-product-baseline.md) | 현재 판매·제안 제품명, 고객가치, 명칭과 증거상태 |
| [HCI 경쟁 프로필](profiles/01-hci-private-cloud.md) | Nutanix, VMware VCF, Azure Local, HPE SimpliVity 비교 |
| [VDI 경쟁 프로필](profiles/02-vdi-digital-workspace.md) | Citrix, Omnissa, AVD, Windows 365 비교 |
| [NGFW·XDR 경쟁 프로필](profiles/03-network-security-xdr.md) | Fortinet, Palo Alto, Cisco 비교 |
| [SASE 경쟁 프로필](profiles/04-sase-global-connectivity.md) | Zscaler, Prisma, FortiSASE, Netskope 비교 |
| [백업·DR 경쟁 프로필](profiles/05-backup-disaster-recovery.md) | Veeam, Rubrik, Commvault, Zerto와 역할 비교 |
| [상승효과 솔루션 지도](03-synergy-solution-map.md) | 함께 묶어 팔 제품, 파트너와 패키지 아이디어 |
| [영업 검증 행동](04-sales-validation-actions.md) | 30·60·90일 검증계획과 필수 증거 |
| [공식 출처 원장](sources/official-source-ledger.md) | 공식 링크, 사용한 사실, 확정·로드맵 구분 |

## 판매 가능한 주장과 금지할 주장

### 현재 제안에 사용할 수 있는 방향

- 고객 워크로드와 운영조건을 기준으로 HCI·VDI·보안·SASE 선택지를 검증한다.
- SCMT, 백업·DR, NVIDIA vGPU, Athena 보안제품의 적용 가능성을 PoC로 확인한다.
- 이전, 장애, 복구, 사용자 경험과 보안운영의 통과조건을 계약 전에 합의한다.
- Veeam과 Sangfor의 공식 파트너십이 존재한다고 설명할 수 있다.

### 별도 검증 없이 사용하지 않을 주장

- 특정 비율의 TCO 절감, 장애 감소, 성능 개선
- 무중단 이전이나 모든 애플리케이션·주변기기 호환
- Veeam v13의 Sangfor HCI 네이티브 지원이 현재 GA라는 주장
- 모든 국가에서 동일한 SASE 품질, PoP, 데이터 처리조건 또는 SLA 제공
- XDR·MDR 도입만으로 MTTD·MTTR이 특정 수치만큼 개선된다는 주장

## 이번 조사에서 남은 결정

- BLRO의 실제 리셀·딜리버리 권한이 있는 SKU와 파트너 등급
- 한국에서 제공 가능한 유지보수 시간, 부품·인력 SLA와 제조사 에스컬레이션 경로
- Veeam v13 Sangfor HCI 지원의 GA 버전과 한국 공급 가능 시점
- aDesk의 최신 NVIDIA GPU HCL, 라이선스와 지원 애플리케이션
- Athena SASE의 한국·중국·주요 진출국별 PoP, 데이터 경로, SLA와 규제조건
- Athena XDR의 서드파티 연동 목록, 지역별 SaaS 데이터 저장 위치와 MDR 운영범위

이 항목이 확인되기 전까지는 `판매제품 사실`과 `유망한 조합 가설`을 구분한다.

