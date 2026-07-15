# HCI·프라이빗 클라우드 경쟁 프로필

## 고객의 구매 결정

고객은 HCI 기능을 구매하는 것이 아니라 다음 결정을 구매한다.

> 기존 VMware·3-Tier 환경을 유지할지, 다른 플랫폼으로 이전할지, 어떤 워크로드부터 이동하고 어떻게 복구·롤백할지를 결정한다.

## 직접 경쟁 구도

| 제품 | 공식 포지션과 강점 | 잘 맞는 고객 | BLRO가 마주칠 경쟁압력 |
| --- | --- | --- | --- |
| Sangfor HCI | 컴퓨트·스토리지·네트워크·보안 통합, x86 선택, SCMT, 내장 백업·CDP·DR | 운영인력이 제한적이고 VMware 대안을 실제 PoC로 검토하는 기업 | 한국 레퍼런스, 앱·하드웨어 HCL, 생태계와 장기 지원을 증명해야 한다. |
| Nutanix NCI·AHV | 성숙한 HCI, Prism, AHV, 데이터·DR·Kubernetes·하이브리드 클라우드 포트폴리오 | 대규모 HCI와 멀티클라우드 운영을 표준화하려는 기업 | 플랫폼 깊이, 브랜드, 파트너·기술인력 생태계가 강하다. |
| VMware Cloud Foundation·vSAN | 기존 vSphere 기반 프라이빗 클라우드, 운영자동화·Kubernetes·데이터 서비스 | VMware 기술·운영·앱 종속성이 크고 전환비용이 높은 기업 | 고객의 기존 기술, 프로세스, 파트너와 내부 신뢰가 강하다. |
| Microsoft Azure Local | Azure Arc, Hyper-V·S2D, VM·AKS·Azure 서비스와 OEM 하드웨어 카탈로그 | Microsoft 운영체계·Azure·M365 전략이 강한 기업과 Edge 환경 | Microsoft 계약과 기술역량을 활용하며 Azure 관리 일관성을 제시한다. |
| HPE SimpliVity | HPE 통합형 HCI, InfoSight, Edge·VDI·일반 가상화, VM Essentials 방향 | HPE 서버·지원 관계를 중시하고 어플라이언스를 선호하는 기업 | OEM 단일지원과 설치기반, 하드웨어 신뢰가 강하다. |

## BLRO의 유효한 차별화

다음은 기능 우위를 단정하지 않고도 고객에게 가치가 있는 차별화다.

- 제품을 먼저 정하지 않고 워크로드, 중단시간, 복구, 운영인수 기준으로 전환 여부를 결정한다.
- SCMT와 VMware 백업·복구 기능을 이용해 이전과 공존 경로를 PoC에서 확인한다.
- HCI와 aDesk, DR, 보안운영을 별도 프로젝트가 아니라 단계별 전환 구조로 설계한다.
- 제조사·하드웨어·BLRO·고객 운영팀의 장애·지원 책임을 계약 전에 구분한다.
- 플랫폼 도입 성공이 아니라 실제 워크로드 이전, 복구훈련과 운영자 인수를 완료조건으로 둔다.

## 피해야 할 경쟁 방식

- 제조사 주장인 TCO 절감률을 고객 데이터 없이 반복하지 않는다.
- CPU·IOPS 최대치나 기능 개수로 Nutanix·VMware와 정면 비교하지 않는다.
- 하이퍼바이저 교체만 하면 운영비가 자동으로 줄어든다고 설명하지 않는다.
- 고객의 앱·백업·모니터링·보안 생태계를 무시한 일괄 전환을 제안하지 않는다.

## 이길 가능성이 높은 고객 상황

| 신호 | 영업 질문 | 제안할 다음 행동 |
| --- | --- | --- |
| VMware 갱신·계약 변경 | 갱신 시점과 3년 비용, 대체가 어려운 워크로드는 무엇인가? | 3주 기술투자 의사결정 패키지 |
| 노후 3-Tier 교체 | 서버·SAN·네트워크 중 장애와 운영부담이 큰 계층은 어디인가? | HCI 적합성·용량 진단 |
| DR 사이트 부재 | 업무별 RPO·RTO와 마지막 복구시험 결과는 무엇인가? | 전환+복구 PoC |
| 지점·Edge 운영 증가 | 현장별 운영자와 장애지원이 가능한가? | 소형 클러스터·중앙운영 검증 |
| 운영인력 부족 | 월간 패치·증설·장애분석에 몇 시간이 드는가? | 운영업무 비교 시나리오 |

## PoC에서 비교할 항목

1. 실제 워크로드 3종 이상의 SCMT 이전 성공·실패·롤백
2. CPU·메모리·IOPS 평균이 아니라 피크와 p95 지연
3. 노드·디스크·네트워크 장애 시 VM·데이터·관리면 동작
4. VMware VM 백업, HCI 복구와 원래 환경으로의 복귀 가능성
5. 앱·OS·DB·GPU·NIC·스토리지 HCL과 지원 책임
6. 운영자 1명이 VM 생성, 정책, 증설, 장애원인 확인에 걸리는 시간
7. 패치·업그레이드·부품교체와 제조사 에스컬레이션 절차
8. 3년 소프트웨어·하드웨어·지원·전력·교육·이전 비용

## 함께 팔 때 가치가 커지는 솔루션

| 보완제품 | 상승효과 | 상태 |
| --- | --- | --- |
| HCI aHM·hDR·CDP·aDR·aSC | VMware 공존, 이전 안전망, 사이트 DR와 근접 복구 | 공식 모듈, 에디션 확인 |
| Veeam Data Platform | 혼합 환경과 불변 백업·깨끗한 복구·휴대성을 보완 | 공식 파트너십, 네이티브 HCI 지원 GA 확인 필요 |
| Sangfor aStor | HCI와 분리된 백업·데이터 저장과 불변성 후보 | 기술·라이선스 검증 필요 |
| SKE·DMP | VM 이후 컨테이너와 데이터베이스 운영 확장 | 공식 모듈, 실제 수요부터 확인 |
| Athena NGFW·XDR·MDR | 인프라 전환과 보안운영을 연결 | 역할중복과 로그 연동 확인 |

## 영업 메시지

> BLRO는 HCI 장비를 교체하는 것이 아니라, 실제 업무를 안전하게 옮기고 장애 후 복구하며 고객 운영팀이 인수할 수 있는지 먼저 증명합니다.

## 근거

- [Sangfor HCI](https://www.sangfor.com/cloud-and-infrastructure/products/hci-hyper-converged-infrastructure)
- [Nutanix Cloud Platform](https://www.nutanix.com/products/cloud-platform)
- [VMware Cloud Foundation](https://www.vmware.com/docs/vmw-cloud-foundation-faqs)
- [Azure Local HCI](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview)
- [HPE SimpliVity](https://www.hpe.com/us/en/storage/simplivity.html)

