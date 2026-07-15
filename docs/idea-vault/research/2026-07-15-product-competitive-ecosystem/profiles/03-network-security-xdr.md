# 네트워크 보안·XDR 경쟁 프로필

## 고객의 구매 결정

고객은 방화벽이나 XDR 콘솔을 구매하는 것이 아니라 다음 결과를 구매한다.

> 위협이 발생했을 때 네트워크·엔드포인트·사용자 증거를 빠르게 연결하고, 누가 조사·차단·복구할지 결정할 수 있게 한다.

## 직접 경쟁 구도

| 제품군 | 공식 포지션과 강점 | 잘 맞는 고객 | BLRO가 마주칠 경쟁압력 |
| --- | --- | --- | --- |
| Athena NGFW·XDR·MDR | NGFW, EPP, NDR, XDR, MDR, Security GPT를 통한 통합·경량 보안운영 | 전담 SOC 인력이 부족하고 제품·경보 사일로를 줄이려는 중견·분산 조직 | 구·신 명칭 혼재, 지역별 데이터·서비스, 서드파티 연동과 레퍼런스를 명확히 해야 한다. |
| FortiGate·FortiXDR | ASIC 기반 NGFW·SD-WAN, FortiGuard, Security Fabric과 광범위한 지점 포트폴리오 | 방화벽과 네트워크를 Fortinet으로 표준화한 기업 | 설치기반, 채널·엔지니어 생태계, 장비 선택폭과 통합 포트폴리오가 강하다. |
| Palo Alto PA-Series·Cortex XDR | App-ID, inline ML, Panorama·Strata, endpoint·network·cloud·identity 데이터의 XDR | 높은 보안성숙도와 정밀한 정책·SOC 운영이 필요한 대기업 | 브랜드 신뢰, 탐지·정책 깊이, SOC 포트폴리오와 대형 고객 레퍼런스가 강하다. |
| Cisco Secure Firewall·Cisco XDR | 네트워크 설치기반, 물리·가상·클라우드 형태, Cisco·서드파티 XDR 통합 | Cisco 네트워크와 보안운영을 이미 사용하는 기업 | 기존 네트워크 관계, 통합목록, 글로벌 지원과 운영도구가 강하다. |

## BLRO의 유효한 차별화

- NGFW 장비 교체가 아니라 탐지, 조사, 차단, 복구의 현재 흐름과 병목부터 측정한다.
- 전담 SOC가 없는 고객에게 Athena XDR·MDR와 BLRO 운영절차를 묶어 실제 대응 책임을 제공한다.
- HCI·VDI·SASE까지 아는 인프라 관점으로 네트워크 경보와 실제 업무영향을 함께 판단한다.
- 장비 성능수치보다 SSL 검사 활성화 상태의 업무 트래픽과 사고 시나리오로 PoC한다.
- 기존 제품을 전부 교체하지 않고 연동 가능한 증거부터 확인한다.

## 이길 가능성이 높은 고객 상황

| 고객 신호 | 고객혜택 | 제안 |
| --- | --- | --- |
| 방화벽·백신·로그는 있지만 사고 우선순위를 정하지 못함 | 경보를 하나의 사고로 묶고 조사시간을 줄임 | 보안운영 진단 + XDR 파일럿 |
| 전담 SOC 인력이 없거나 야간 대응이 불가능 | 24×7 모니터링과 에스컬레이션 책임 확보 | Athena MDR 범위 검증 |
| 지점 방화벽과 회선 운영이 분리됨 | 보안과 SD-WAN 장애책임을 통합 | NGFW + Secure SD-WAN |
| 랜섬웨어 이후 차단과 복구가 분리됨 | 네트워크·엔드포인트 차단과 백업복구 연결 | Anti-Ransomware + 복구훈련 |
| 기존 제품의 경보·라이선스가 과도하게 복잡함 | 필요한 탐지·운영 범위로 단순화 | 3년 운영비·경보흐름 비교 |

## 경쟁사에 유리한 상황

- 기존 Fortinet Security Fabric이 광범위하면 Fortinet 확장이 전환보다 단순할 수 있다.
- Palo Alto NGFW·Cortex SOC 프로세스가 성숙하면 교체 편익을 만들기 어렵다.
- Cisco 네트워크·ISE·Umbrella·XDR 통합이 깊으면 Cisco 유지가 운영상 유리할 수 있다.
- 특정 규제·인증·데이터 리전이 필수인데 Sangfor 지역 서비스가 충족하지 못하면 제안하지 않는다.

## PoC에서 비교할 항목

1. SSL 복호화와 보안기능 활성화 상태의 처리량·지연·세션 안정성
2. 동일 공격 시나리오의 탐지 근거, 오탐·미탐과 우선순위
3. NGFW·EPP·NDR·XDR가 하나의 사고로 연결하는 증거와 시간
4. 차단·격리·계정조치·복구의 사람 승인과 자동화 경계
5. 기존 SIEM·ITSM·아이덴티티·메일·클라우드와의 실제 연동
6. MDR의 24×7 범위, 에스컬레이션 시간, 언어, 보고와 고객 책임
7. SaaS 보안데이터의 저장 리전, 보존, 접근권한과 반출정책
8. 장애·오탐·업데이트 실패 시 롤백과 제조사 지원경로

## 함께 팔 때 가치가 커지는 솔루션

| 보완제품 | 상승효과 | 상태 |
| --- | --- | --- |
| Athena EPP·NDR·XDR | 네트워크와 엔드포인트 증거를 사고 단위로 연결 | 공식 포트폴리오, 버전·구독 확인 |
| Athena MDR·Security GPT | 인력부족을 보완하고 조사·보고를 단순화 | 공식 서비스, 지역·SLA 확인 |
| Athena SASE·ZTG | 원격·지점 사용자의 접근맥락과 위협정보 연결 | 역할중복·에이전트 확인 |
| HCI backup·Veeam 후보 | 차단 이후 깨끗한 복구와 증거 확보 | 기술연동과 책임분리 확인 |
| SIEM·ITSM | 사고 티켓, 승인, 감사와 장기분석 | 실제 지원 통합목록 확인 전 후보 |

## 명칭·제품 위험

공식 페이지에 `Network Secure`, `NGAF`, `Athena NGFW`, `Omni-Command`, `Athena XDR`가 혼재한다. 제안서에는 최신 명칭을 사용하되 기존 고객의 라이선스와 업그레이드 경로는 별도 제조사 확인사항으로 둔다.

## 영업 메시지

> BLRO는 보안경보를 더 늘리는 장비를 판매하지 않습니다. 실제 공격 시나리오에서 경보가 사고로 정리되고 담당자가 차단·복구를 결정하는 시간을 측정합니다.

## 근거

- [Sangfor Athena](https://www.sangfor.com/cybersecurity/sangfor-athena)
- [Sangfor Security Solutions](https://www.sangfor.com/cybersecurity/security-solutions)
- [FortiGate NGFW](https://www.fortinet.com/products/next-generation-firewall)
- [Palo Alto PA-Series](https://www.paloaltonetworks.com/network-security/next-generation-firewall/pa-7000-series)
- [Cortex XDR](https://www.paloaltonetworks.com/cortex/cortex-xdr)
- [Cisco Secure Firewall](https://secure.cisco.com/secure-firewall/docs/secure-firewall)
- [Cisco XDR integrations](https://www.cisco.com/site/uk/en/products/security/xdr/integrations.html)

