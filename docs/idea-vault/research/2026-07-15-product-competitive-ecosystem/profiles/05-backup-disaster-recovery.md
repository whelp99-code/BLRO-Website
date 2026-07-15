# 백업·DR 경쟁 프로필

## 고객의 구매 결정

고객은 백업 소프트웨어를 구매하는 것이 아니라 다음 결과를 구매한다.

> 장애·운영실수·랜섬웨어 이후 합의된 RPO·RTO 안에 필요한 업무를 깨끗하게 복구할 수 있다는 증거를 확보한다.

## 경쟁과 보완이 겹치는 시장

백업·DR 제품은 단순한 직접 경쟁관계가 아니다. Sangfor 내장기능과 외부 플랫폼은 고객 환경에 따라 대체재이면서 보완재가 된다.

| 제품군 | 강한 영역 | Sangfor와의 관계 | 적합한 상황 |
| --- | --- | --- | --- |
| HCI backup·aHM·CDP·aDR·hDR·aSC | HCI VM 보호, VMware 공존 백업, 근접복구, Sangfor 간 DR | 기본 제품 | Sangfor HCI 중심이며 단순한 운영과 빠른 VM 복구가 우선 |
| Veeam Data Platform | 혼합 하이퍼바이저·물리·클라우드, 불변성, 복구검증·오케스트레이션 | 경쟁 + 공식 보완 파트너 | VMware 포함 혼합환경, 휴대성, 깨끗한 복구와 장기 백업 필요 |
| Rubrik Security Cloud | 불변 백업, 아이덴티티 회복탄력성, 위협·사이버 복구 | 주로 경쟁·상위 보완 후보 | 보안팀과 IT팀의 사이버 복구, 아이덴티티 보호가 핵심 |
| Commvault Cloud | 광범위한 워크로드·아이덴티티·사이버 복구, Cleanroom | 주로 경쟁·상위 보완 후보 | 대규모 혼합환경과 격리 복구·포렌식이 필요 |
| HPE Zerto | CDP 기반 낮은 RPO, DR 오케스트레이션, 워크로드 이동 | DR 전문 경쟁 | 복구시점과 전환시간 요구가 매우 공격적인 환경 |
| Nutanix·VMware 내장 DR | 각 플랫폼에 통합된 복제·복구·오케스트레이션 | 플랫폼 직접 경쟁 | 기존 플랫폼 표준이 강하고 동일 생태계 내 운영을 선호 |

## 선택 기준

| 고객 요구 | 우선 검토 |
| --- | --- |
| Sangfor HCI VM의 기본 백업과 사이트 DR | HCI backup, CDP, aDR, aSC |
| VMware와 Sangfor 공존·이전 중 보호 | aHM·hDR와 Veeam 가능성 비교 |
| 물리·VM·클라우드·SaaS를 한 정책으로 보호 | Veeam·Commvault·Rubrik 별도 비교 |
| 랜섬웨어 후 깨끗한 복구와 불변성 | 외부 불변 저장소, 격리검증, 권한분리 포함 |
| 초단위 RPO와 세밀한 DR 오케스트레이션 | Sangfor CDP·aDR과 Zerto 비교 PoC |
| AD·IdP 복구가 핵심 | 아이덴티티 보호 범위가 있는 전문 플랫폼 검토 |

## BLRO의 유효한 차별화

- 백업제품 선정 전에 업무영향, RPO·RTO, 복구순서와 의사결정자를 합의한다.
- 백업 성공률이 아니라 실제 애플리케이션 기동, 데이터 정합성과 사용자 인수를 테스트한다.
- HCI·보안·SASE 운영을 함께 이해해 사고 격리부터 깨끗한 복구까지 책임 경계를 설계한다.
- 외부 백업제품을 무조건 추가하지 않고 HCI 내장기능으로 충분한 범위와 부족한 범위를 구분한다.
- 분기별 복구훈련과 증거보고서를 반복 서비스로 제공한다.

## 반드시 분리할 개념

- 스냅샷은 백업과 같지 않다.
- 동일 관리자·동일 플랫폼의 복제본은 공격 격리본과 같지 않다.
- RPO가 짧다고 애플리케이션 RTO가 자동으로 짧아지지 않는다.
- 백업 작업 성공이 파일·DB·업무의 복구 성공을 의미하지 않는다.
- 재해복구와 랜섬웨어 후 깨끗한 복구는 서로 다른 시나리오다.

## 복구 PoC에서 비교할 항목

1. 업무별 RPO·RTO와 복구 우선순위
2. 계정탈취, 랜섬웨어, 데이터 손상, 사이트 장애별 복구지점 선택
3. 백업 저장소의 불변성, 오프사이트, 네트워크·계정 분리
4. VM, 파일, DB, AD·IdP, SaaS의 보호범위
5. 복구 전 악성코드·정합성 검증과 격리환경
6. 애플리케이션 의존순서, DNS·네트워크·아이덴티티 복원
7. 장애선언, 전환, 원복과 고객·BLRO·제조사 승인권자
8. 반복훈련 시간, 실패항목과 개선조치의 증거

## Veeam 상승효과의 현재 판정

- Sangfor와 Veeam의 공식 파트너십은 확인됐다.
- 공개자료는 Veeam v13이 2026년에 Sangfor HCI를 네이티브 지원할 예정이라고 설명한다.
- `예정`은 현재 GA와 다르다. 버전, API, 지원 매트릭스, 라이선스와 한국 공급조건을 확인하기 전에는 네이티브 통합을 계약조건으로 쓰지 않는다.
- 그 전에도 게스트 에이전트, 표준 프로토콜, 별도 백업 경로가 가능한지는 고객 구성별로 검증한다.

## 영업 메시지

> BLRO는 백업이 성공했다는 화면을 판매하지 않습니다. 랜섬웨어와 사이트 장애 시나리오에서 업무가 정해진 순서와 시간 안에 복구되는지 직접 시험하고 증거를 남깁니다.

## 근거

- [Sangfor HCI–Veeam 파트너십](https://www.sangfor.com/news-and-press-release/sangfor-and-veeam-forge-strategic-partnership-enhance-cloud-data-management-solutions)
- [Veeam Backup & Replication](https://www.veeam.com/products/veeam-data-platform/backup-recovery.html)
- [Rubrik Security Cloud](https://www.rubrik.com/products)
- [Commvault Cloud Unity](https://www.commvault.com/platform)
- [HPE Zerto](https://www.hpe.com/emea_europe/en/zerto-software.html)

