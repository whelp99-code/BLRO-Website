# Nutanix NCI 7.6 외부 스토리지 조사 메모

상태: review 초안용. 2026-08-25 KST.

확인일: 2026-08-25

대상 MDX: content/insights/ko/nutanix-nci-76-external-storage.mdx

## Evidence

- 공식 제품 블로그는 NCI 7.6에서 Dell PowerStore 1·2·3세대 일반 지원과 Projects 2.0을 안내한다.
- 기술센터는 AHV 인프라 지표 30개 이상, 회수 가능 메모리 최소 25퍼센트, Prism Central V4 API를 적는다.
- 기술센터 GPU 글은 AHV 11.2와 AI 최적화 VM 프로필을 안내한다. 모든 다중 GPU가 NVSwitch를 필요로 하지는 않는다.
- 제품 업데이트는 Prism Central 외부 스토리지, PowerStore DR, RHEL 9 CVM을 적는다.
- 포털 릴리스 노트 URL은 로그인 벽이라 본문을 열지 못했다. 본문에 그 한계를 남겼다.

## Buyer Decision

- 결정 대상: PowerStore 연결, Prism 관리 평면, 오버커밋 한도, GPU 프로필
- 판단 질문: 로컬 HCI 업그레이드와 외부 스토리지를 한 창에 넣는가
- 비결정 대상: Azure Local, 평가 행렬 확장, 성능 수치

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 로 컨설팅 문의
- 전환 전 제공 범위: 스토리지 연결, 버전, 지표 사용
- 전환 후 기대 산출물: HCI 범위 판단표

## Quality panel verdicts

- 정확성: 통과. 포털 로그인 벽과 성능 수치 제외를 본문에 남겼다.
- 범위: 통과. Nutanix 7.6만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 15-30퍼센트 업그레이드 속도, 99퍼센트 베어메탈 대비
- Azure Local로 슬롯 채움
- vmware-nutanix-evaluation-matrix 확장
- 가격, Sangfor 사례

## Source ledger

- Nutanix 제품 블로그. URL: https://www.nutanix.com/blog/multi-tenant-ai-workloads-on-a-modern-enterprise-ready-virtualization-platform. 확인일: 2026-08-25. 직접 열람.
- Tech Center 메모리 지표. URL: https://www.nutanix.com/tech-center/blog/smart-insights-with-advanced-ahv-intrastructure-metrics. 확인일: 2026-08-25. 직접 열람.
- Tech Center AI 프로필. URL: https://www.nutanix.com/tech-center/blog/nci-76-combining-nutanix-simplicity-with-near-bare-metal-ai-performance. 확인일: 2026-08-25. 직접 열람.
- AOS 7.6 제품 업데이트. URL: https://next.nutanix.com/product-updates/aos-7-6-45767. 확인일: 2026-08-25. 직접 열람.

## firstPass

- PowerStore 일반 지원과 Prism Central 관리를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 성능 순위를 넣지 않았다.
- 평가 행렬을 열지 않았다.

## Uncertainties

- portal.nutanix.com AOS 7.6 릴리스 노트 본문은 로그인 없이 확인하지 못했다.
- 제품 업데이트와 포털 노트 사이 추가 불일치는 로그인 후 재확인이 필요하다.
