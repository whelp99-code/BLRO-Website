# BLRO 판매제품 기준선

## 조사에서 확인된 제품군

| 판매축 | 현재 사용할 제품명 | 고객이 구매하는 결과 | 제품 단독판매의 위험 |
| --- | --- | --- | --- |
| HCI·프라이빗 클라우드 | Sangfor HCI, aSV, SCP, SCMT | 기존 가상화 환경을 운영 가능한 프라이빗 클라우드로 전환 | 가격·기능 비교로만 가면 대형 플랫폼과 차별화가 어렵다. |
| VDI | Sangfor aDesk VDI, VDC, VDS | 데스크톱·앱·데이터를 중앙 통제하고 사용자 환경을 표준화 | 사용자 수만으로 산정하면 앱·GPU·주변기기·네트워크 문제가 남는다. |
| 네트워크 보안 | Sangfor Athena NGFW | 네트워크 경계의 가시성, 정책, 위협차단을 통합 | Fortinet·Palo Alto·Cisco와 장비 기능표 경쟁이 된다. |
| 보안운영 | Athena XDR, Athena MDR, Athena EPP·NDR, Security GPT | 흩어진 경보를 사고 단위로 조사하고 대응책임을 명확화 | 데이터 품질과 연동이 나쁘면 또 하나의 콘솔이 된다. |
| SASE·글로벌 연결 | Athena SASE, ZTG, SGA, ZTDP, Secure SD-WAN | 지점·원격사용자·SaaS·사내앱의 접속 품질과 보안을 통합 | 국가별 PoP·경로·규제·기존 회선 조건을 검증하지 않으면 성과를 보장할 수 없다. |
| 백업·DR | HCI backup, aHM, CDP, aDR, hDR, aSC | 플랫폼 장애·사이트 장애·랜섬웨어 후 복구 가능한 구조와 절차 확보 | 스냅샷·백업·복제·불변보관을 같은 것으로 취급하기 쉽다. |

## 제품명 정규화

제조사 사이트와 기존 자료에 구·신규 명칭이 혼재한다. 영업문서에서는 아래 원칙을 사용한다.

| 영역 | 권장 표기 | 과거·혼재 표기 | 처리 원칙 |
| --- | --- | --- | --- |
| 방화벽 | `Sangfor Athena NGFW` | NGAF, Network Secure | 최초 한 번만 구 명칭을 괄호에 표시한다. |
| XDR | `Sangfor Athena XDR` | Omni-Command | 동일제품·승계관계와 고객 라이선스 전환은 제조사 확인 후 적는다. |
| MDR | `Sangfor Athena MDR` | Cyber Guardian MDR | 서비스 범위와 데이터 저장 위치를 지역별로 확인한다. |
| SASE | `Sangfor Athena SASE` | Access Secure | 구 고객과 검색을 위해 최초 한 번만 과거 명칭을 병기한다. |
| VDI | `Sangfor aDesk VDI` | aDesk, VDS, VDC | 제품, 서버·컨트롤러, 단말 역할을 분리해 적는다. |
| HCI | `Sangfor HCI` | aSV, aSAN, aNET, aSEC, SCP | 플랫폼과 구성요소를 구분하고 실제 견적 SKU로 확정한다. |

## 고객 문제와 제품의 연결

| 고객의 실제 문제 | 먼저 제안할 결과 | 제품 후보 | 반드시 확인할 것 |
| --- | --- | --- | --- |
| VMware 계약·비용 변화로 전환안을 결정해야 함 | 비교 가능한 전환안과 복구·롤백 증거 | HCI, SCMT, aHM, hDR, Veeam 후보 | 앱 호환, HCL, 전환시간, 복구, 운영인수 |
| 생산·설계 데이터를 외부로 내보내지 않고 원격근무 필요 | GPU·주변기기·보안정책이 검증된 데스크톱 | aDesk, NVIDIA vGPU, ZTG, HCI backup | GPU 모델·라이선스, CAD 인증, 지연, 주변기기 |
| 보안경보가 많지만 조사와 대응이 느림 | 경보에서 사고·책임·조치까지 이어지는 운영 | NGFW, EPP, NDR, XDR, MDR | 연동범위, 오탐, 데이터 위치, 에스컬레이션 SLA |
| 해외지사와 원격 사용자의 SaaS·사내앱 품질이 불안정 | 경로·정책·장애책임이 합의된 접속 서비스 | Athena SASE, Secure SD-WAN, ZTG, CBTA | 국가별 PoP, 회선, 규제, 실제 앱 품질 |
| 백업은 있지만 복구 가능성을 증명하지 못함 | 업무별 RPO·RTO와 실제 복구훈련 결과 | HCI backup/CDP/aDR, aStor, Veeam 후보 | 불변성, 권한분리, 오프사이트, 복구 테스트 |

## 내부 교차판매 구조

```text
HCI 전환
├── SCMT 마이그레이션
├── aHM / hDR로 VMware 공존·전환 안전성
├── CDP / aDR / aSC로 연속성
├── aDesk로 데스크톱 통합
├── SKE / DMP로 컨테이너·DB 운영 확장
└── Athena NGFW / XDR / MDR로 보안운영 연결

Athena NGFW
├── Secure SD-WAN
├── Athena SASE / ZTG
├── Athena EPP / NDR
├── Athena XDR / MDR
└── Security GPT
```

교차판매는 제품 수를 늘리는 것이 목적이 아니다. 고객의 다음 위험을 해결할 때만 제안한다.

## 증거 상태

| 상태 | 의미 | 영업 사용법 |
| --- | --- | --- |
| 확정 | 현재 공식 제품 페이지·기술문서에 존재 | 기능 존재를 설명하되 고객 구성 적용은 별도 확인 |
| 조건부 | 에디션·펌웨어·지역·HCL에 따라 달라짐 | 조건을 명시하고 PoC·BOM에서 확인 |
| 로드맵 | 공식 문서에 예정으로 표현 | 현재 기능처럼 판매하지 않고 제조사 GA 확인 |
| 가설 | BLRO가 만들 수 있는 조합이나 서비스 | 고객 인터뷰와 유료 파일럿으로 검증 |

공식 근거는 [출처 원장](sources/official-source-ledger.md)에 보존한다.

