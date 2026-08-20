# Azure Local GPU DDA·분할 경계 조사 메모

상태: review 초안용. 2026-08-21 KST.

확인일: 2026-08-21

대상 MDX: content/insights/ko/azure-local-gpu-dda-partition-boundary.mdx

## Evidence

- Azure Local 2604 what's new는 GPU 가속이 일반 공급이며 DDA와 GPU-P를 생성 시 또는 Day-2로 붙이거나 뗄 수 있다고 적는다.
- gpu-preparation은 DDA 1:1, GPU-P 분할, 균질 호스트, 모델표, AKS Arc 분할 미지원을 적는다.
- gpu-manage-via-device 제목은 미리보기이며 포털 탈부착 시 가상 머신을 재시작한다. ms.date 2025-08-27, updated 2026-04-22.
- gpu-manage-via-partitioning은 같은 물리 GPU를 DDA와 GPU-P로 동시에 쓰지 말라고 적는다.
- Windows Server Hyper-V DDA 문서는 호스트 장치 할당 전제를 설명한다.

## Buyer Decision

- 결정 대상: DDA 전용 대 GPU-P 분할, 호스트 드라이버 준비, 재시작 창
- 판단 질문: 같은 카드에 두 방식을 올릴 것인가, 미리보기 제목을 운영 근거로 남길 것인가
- 비결정 대상: VMSA-2026-0006 재작성, VMware-Nutanix 비교

## Conversion

- 단일 CTA: 서버 가상화 진단 범위 확인
- 전환 전 제공 범위: GPU 모델, 할당 방식, 문서 불일치
- 전환 후 기대 산출물: 장치별 할당 판단표

## Quality panel verdicts

- 정확성: 통과. 일반 공급과 미리보기 제목 불일치를 본문에 남겼다.
- 범위: 통과. 호스트 GPU 할당만 다루며 Nutanix 비교가 없다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- DDA 관리 문서가 일반 공급 제목이라는 주장
- 특정 GPU 성능 순위
- 무중단 탈부착
- VMware 대 Nutanix 평가 확장
- Sangfor 한국 사례 수행 주장

## Source ledger

- Microsoft Learn what's-new azloc-2604. URL: https://learn.microsoft.com/en-us/azure/azure-local/whats-new?view=azloc-2604. 확인일: 2026-08-21.
- Microsoft Learn gpu-preparation. URL: https://learn.microsoft.com/en-us/azure/azure-local/manage/gpu-preparation?view=azloc-2604. 확인일: 2026-08-21.
- Microsoft Learn gpu-manage-via-device. URL: https://learn.microsoft.com/en-us/azure/azure-local/manage/gpu-manage-via-device?view=azloc-2604. 확인일: 2026-08-21.
- Microsoft Learn gpu-manage-via-partitioning. URL: https://learn.microsoft.com/en-us/azure/azure-local/manage/gpu-manage-via-partitioning?view=azloc-2604. 확인일: 2026-08-21.
- Microsoft Learn Hyper-V DDA. URL: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/deploying-graphics-devices-using-dda. 확인일: 2026-08-21.

## firstPass

- 2604 GA 문구, 미리보기 제목, 동시 할당 금지, 재시작을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 중괄호를 넣지 않았다.
- VMware-Nutanix 비교 문장을 넣지 않았다.

## Uncertainties

- 관리 문서 제목의 미리보기가 언제 빠질지 미정이다.
- 고객 OEM 카탈로그 적합성은 이 초안이 확인하지 않는다.
- GPU-P 라이브 마이그레이션 OS 빌드와 NVIDIA 버전은 고객 환경마다 다르다.
