# 공식 출처 원장 — BLRO 판매제품 경쟁·상승효과 조사

- 조사일: 2026-07-15
- 원칙: 제조사 공식 제품 페이지와 공식 기술문서를 우선한다.
- 범위: Sangfor HCI, aDesk VDI, Athena NGFW·XDR·MDR, Athena SASE·Secure SD-WAN, HCI 백업·DR
- 주의: 아래 내용은 공개자료 스냅샷이다. 한국 공급조건, 가격, 라이선스, HCL, 기능의 GA 여부는 제안 직전에 재확인해야 한다.

## BLRO 판매제품 기준선

| 코드 | 공식 출처 | 조사에 사용한 사실 | 판정 |
| --- | --- | --- | --- |
| S-HCI-01 | [Sangfor HCI 제품](https://www.sangfor.com/cloud-and-infrastructure/products/hci-hyper-converged-infrastructure) | 컴퓨트·스토리지·네트워크·보안을 단일 스택으로 통합하며 SCMT 기반 마이그레이션을 제시한다. | 현재 공개 |
| S-HCI-02 | [Sangfor HCI 2025 브로슈어](https://www.sangfor.com/sites/default/files/2025-10/Sangfor_HCI_Brochure.pdf) | aSC, aHM, CDP, aDR, hDR, SKE, DMP 모듈과 라이선스 단위가 공개돼 있다. | 현재 공개, 계약별 확인 |
| S-HCI-03 | [HCI 호환성 차트](https://www.sangfor.com/cloud-and-infrastructure/products/hci-compatibility-chart) | 공식 HCL을 제공하며 하드웨어·소프트웨어 조합을 검증한다고 명시한다. | 구성마다 확인 필수 |
| S-HCI-04 | [VMware VM 백업 기술문서](https://support.sangfor.com/productDocument/read?category_id=2643777&product_id=10&version_id=1054) | VMware VM을 Sangfor HCI로 백업하고 HCI 또는 vCenter로 복구하는 흐름을 설명한다. | 현재 문서화 |
| S-HCI-05 | [Sangfor HCI–Veeam 협력 발표](https://www.sangfor.com/news-and-press-release/sangfor-and-veeam-forge-strategic-partnership-enhance-cloud-data-management-solutions) | 양사가 HCI와 백업·데이터 관리의 통합을 추진하는 공식 파트너십을 발표했다. | 파트너십 확정 |
| S-HCI-06 | [Sangfor–Veeam 회복탄력성 글](https://www.sangfor.com/blog/cloud-and-infrastructure/enhancing-data-sovereignty-sangfor-veeams-resilience-centric-framework) | Veeam v13의 Sangfor HCI 네이티브 지원을 2026년 예정으로 설명한다. | 로드맵, GA 확인 전 판매 금지 |
| S-VDI-01 | [Sangfor aDesk VDI](https://www.sangfor.com/cloud-and-infrastructure/products/vdi-virtual-desktop-infrastructure) | HCI 기반 원스톱 VDI, 자체 전송 프로토콜, GPU 협업, 중앙관리와 보안을 제시한다. | 현재 공개 |
| S-VDI-02 | [aDesk 기능·에디션표](https://www.sangfor.com/cloud-and-infrastructure/products/vdi-virtual-desktop-infrastructure/plans) | NVIDIA vPC·vDWS 라이선스와 aTrust 연계형 Zero-Trust VDI 기능을 명시한다. | 에디션·GPU HCL 확인 필수 |
| S-VDI-03 | [VDI 호환성 차트](https://www.sangfor.com/cloud-and-infrastructure/products/vdi-compatibility-chart) | GPU·주변기기·소프트웨어 호환 요청과 검증 경로를 제공한다. | 워크로드별 확인 필수 |
| S-SEC-01 | [Sangfor Athena 포트폴리오](https://www.sangfor.com/cybersecurity/sangfor-athena) | Athena NGFW, XDR, MDR, SASE와 Security GPT 중심의 통합 보안 방향을 제시한다. | 현재 공개 |
| S-SEC-02 | [Sangfor 보안제품 목록](https://www.sangfor.com/cybersecurity/products) | Network Secure·NGAF·Omni-Command 같은 기존 명칭과 Athena 명칭이 함께 노출된다. | 명칭 전환 중, 제안서 정규화 필요 |
| S-SEC-03 | [Sangfor 보안 솔루션](https://www.sangfor.com/cybersecurity/security-solutions) | NGFW+EPP 기반 랜섬웨어 대응, NGFW 기반 Secure SD-WAN, 서드파티 연계형 보안운영을 설명한다. | 현재 공개 |
| S-SEC-04 | [NGFW Platform-X 통합 안내](https://support.thailand.sangfor.com/hc/th/articles/57609284619801) | NGFW에서 SaaS XDR, MDR, TI, Access Secure, XDLP, Endpoint Secure, Security GPT 등을 연결하는 제품통합 경로를 설명한다. | 펌웨어·지역·구독 확인 필수 |
| S-SASE-01 | [Sangfor Athena SASE](https://www.sangfor.com/cybersecurity/sangfor-athena-cloud-security/secure-access-service-edge-sase) | ZTNA, SWG, FWaaS, CASB, DLP, EDR, 보안 브라우저, Secure SD-WAN과 글로벌 가속을 통합한다. | 현재 공개 |
| S-SASE-02 | [Zero Trust Guard](https://www.sangfor.com/cybersecurity/sangfor-athena-cloud-security/secure-access-service-edge-sase/zero-trust-guard-ztg) | 적응형 인증, 장치 상태, 애플리케이션 단위 접근, Sangfor IDaaS 기반 SSO를 제시한다. | 현재 공개, IdP별 확인 |
| S-SASE-03 | [Zero Trust Data Protection](https://www.sangfor.com/cybersecurity/sangfor-athena-cloud-security/secure-access-service-edge-sase/zero-trust-data-protection-ztdp) | 웹·SaaS·GenAI·이메일·엔드포인트의 데이터 통제와 SASE 에이전트 통합을 설명한다. | 현재 공개, 지역·라이선스 확인 |

## HCI·프라이빗 클라우드 경쟁 출처

| 코드 | 공식 출처 | 조사에 사용한 사실 |
| --- | --- | --- |
| C-HCI-01 | [Nutanix Cloud Platform](https://www.nutanix.com/products/cloud-platform) | HCI 코어에 하이브리드 클라우드, 자동화, 데이터 서비스를 결합한다. |
| C-HCI-02 | [Nutanix 소프트웨어 옵션](https://www.nutanix.com/products/cloud-platform/software-options) | NCI 에디션별 DR, 스토리지, 컨테이너와 Edge 라이선스 범위를 공개한다. |
| C-HCI-03 | [Nutanix AHV](https://www.nutanix.com/products/ahv) | 내장 하이퍼바이저, Prism 관리, 마이그레이션, DR와 보안을 강조한다. |
| C-HCI-04 | [VMware Cloud Foundation FAQ](https://www.vmware.com/docs/vmw-cloud-foundation-faqs) | VCF를 엔터프라이즈 프라이빗 클라우드 플랫폼으로 정의하고 vSAN 옵션을 설명한다. |
| C-HCI-05 | [VMware Cloud Foundation 9.1](https://blogs.vmware.com/cloud-foundation/2026/05/05/accelerate-streamline-and-control-your-self-service-private-cloud-with-vcf-9-1/) | 셀프서비스 프라이빗 클라우드, 데이터 서비스, Kubernetes와 운영 자동화를 제시한다. |
| C-HCI-06 | [Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/) | Azure Arc 기반 분산 인프라로 VM, 컨테이너, 일부 Azure 서비스를 로컬에서 운영한다. |
| C-HCI-07 | [Azure Local HCI 개요](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview) | Hyper-V·S2D·Failover Cluster, Azure 관리, 1~16노드, 하드웨어 카탈로그와 클라우드 연결조건을 설명한다. |
| C-HCI-08 | [HPE SimpliVity](https://www.hpe.com/us/en/storage/simplivity.html) | Edge·VDI·일반 가상화용 HCI, HPE InfoSight와 VM Essentials 연계를 제시한다. |

## VDI 경쟁·보완 출처

| 코드 | 공식 출처 | 조사에 사용한 사실 |
| --- | --- | --- |
| C-VDI-01 | [Citrix DaaS 개요](https://docs.citrix.com/en-us/citrix-daas/overview) | 온프레미스와 Azure·AWS·GCP를 함께 관리하고 가상 앱·데스크톱을 다양한 장치에 제공한다. |
| C-VDI-02 | [Omnissa Horizon 8](https://www.omnissa.com/products/horizon-8/) | 온프레미스·하이브리드에서 가상 데스크톱과 앱, 중앙정책과 보안을 제공한다. |
| C-VDI-03 | [Azure Virtual Desktop](https://learn.microsoft.com/en-us/azure/virtual-desktop/) | Azure 기반 가상 데스크톱·앱, Windows 멀티세션과 유연한 클라우드 자원 운영을 제공한다. |
| C-VDI-04 | [Windows 365 개요](https://learn.microsoft.com/en-us/windows-365/overview) | 사용자별 Cloud PC 형태의 관리형 Windows 데스크톱을 제공한다. |
| P-VDI-01 | [NVIDIA vGPU](https://www.nvidia.com/en-us/data-center/virtual-solutions/) | 한 GPU를 여러 VM이 공유하며 CAD·CAE·AI·업무용 VDI를 가속한다. |
| P-VDI-02 | [NVIDIA vGPU 20 문서](https://docs.nvidia.com/vgpu/latest/) | 최신 릴리스, 지원 GPU·하이퍼바이저·게스트 OS와 라이선스 확인 경로를 제공한다. |

## NGFW·XDR 경쟁 출처

| 코드 | 공식 출처 | 조사에 사용한 사실 |
| --- | --- | --- |
| C-SEC-01 | [FortiGate NGFW](https://www.fortinet.com/products/next-generation-firewall) | ASIC 기반 성능, FortiGuard 보안서비스, 지점·캠퍼스·데이터센터와 SD-WAN 통합을 강조한다. |
| C-SEC-02 | [FortiEDR·FortiXDR 개요](https://www.fortinet.com/content/dam/fortinet/assets/solution-guides/sb-fortiedr-fortixdr.pdf) | FortiGate와 엔드포인트 탐지·대응의 통합을 제시한다. |
| C-SEC-03 | [Palo Alto PA-Series](https://www.paloaltonetworks.com/network-security/next-generation-firewall/pa-7000-series) | App-ID, inline ML, 다양한 하드웨어 구간과 Panorama 관리 생태계를 제시한다. |
| C-SEC-04 | [Cortex XDR](https://www.paloaltonetworks.com/cortex/cortex-xdr) | 엔드포인트·네트워크·클라우드·아이덴티티·이메일 데이터를 연결해 탐지 우선순위를 정한다. |
| C-SEC-05 | [Cisco Secure Firewall](https://secure.cisco.com/secure-firewall/docs/secure-firewall) | 물리·가상·클라우드·Kubernetes 형태와 중앙관리 포트폴리오를 제공한다. |
| C-SEC-06 | [Cisco XDR 통합](https://www.cisco.com/site/uk/en/products/security/xdr/integrations.html) | Cisco와 서드파티 방화벽, ITSM, 클라우드, 데이터 보호 제품의 통합을 공개한다. |

## SASE 경쟁 출처

| 코드 | 공식 출처 | 조사에 사용한 사실 |
| --- | --- | --- |
| C-SASE-01 | [Zscaler Zero Trust Exchange](https://www.zscaler.com/products-and-solutions/zero-trust-exchange-zte) | 프록시 기반 사용자·워크로드·지점의 제로트러스트 연결과 대규모 보안 클라우드를 제시한다. |
| C-SASE-02 | [Prisma SASE](https://www.paloaltonetworks.com/sase/) | SASE, SD-WAN, 데이터 보호, 디지털 경험과 AI 기반 운영을 단일 포트폴리오로 제시한다. |
| C-SASE-03 | [FortiSASE](https://www.fortinet.com/products/sase) | FortiGate SD-WAN과 SSE, 단일 OS·에이전트·관리·데이터레이크 연계를 강조한다. |
| C-SASE-04 | [Netskope One SASE Branch](https://www.netskope.com/products/sase-branch) | 지점 연결과 제로트러스트 보안을 Netskope One SASE로 통합한다. |

## 백업·DR 경쟁·보완 출처

| 코드 | 공식 출처 | 조사에 사용한 사실 |
| --- | --- | --- |
| C-DR-01 | [Veeam Backup & Replication](https://www.veeam.com/products/veeam-data-platform/backup-recovery.html) | 가상·물리·클라우드 워크로드, 불변성, 격리 검증, 빠른 복구와 감사 보고를 제공한다. |
| C-DR-02 | [Rubrik Security Cloud](https://www.rubrik.com/products) | 불변 백업, 아이덴티티 회복탄력성, 신속한 사이버 복구를 통합한다. |
| C-DR-03 | [Rubrik Cyber Recovery](https://www.rubrik.com/products/cyber-recovery) | 복구 오케스트레이션, 격리 포렌식과 진행상태 보고를 제공한다. |
| C-DR-04 | [Commvault Cloud Unity](https://www.commvault.com/platform) | 데이터·아이덴티티 보안과 사이버 복구를 Resilience Operations로 통합한다. |
| C-DR-05 | [Commvault Cleanroom](https://documentation.commvault.com/v11/software/cleanroom_recovery_for_cyber_resilience.html) | 격리환경에서 지속 테스트, 포렌식과 깨끗한 복구를 수행한다. |
| C-DR-06 | [HPE Zerto](https://www.hpe.com/emea_europe/en/zerto-software.html) | CDP 기반 DR, 사이버 회복탄력성과 워크로드 이동성을 제공한다. |

## 조사 한계

- 한국 총판·파트너 가격과 할인, 공급 리드타임, 실제 SLA는 공개자료만으로 비교하지 않았다.
- 공식 HCL과 계약 문서가 필요한 호환성은 `검증 필요`로 남긴다.
- 공개되지 않은 고객 사례, 내부 경쟁 견적과 파트너 마진은 사용하지 않았다.
- 제조사 마케팅 수치와 순위는 고객 제안에서 독립적으로 검증하기 전까지 근거로 사용하지 않는다.
- SEO·백링크·리뷰 정량 데이터 도구가 현재 연결돼 있지 않아 이번 조사에서는 제품·기술·판매구조에 집중했다.

