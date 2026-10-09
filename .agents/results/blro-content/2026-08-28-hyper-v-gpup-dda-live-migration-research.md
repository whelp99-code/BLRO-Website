# Hyper-V GPU-P vs DDA 조사 메모

상태: review 초안용. 2026-08-28 KST.
대상 MDX: content/insights/ko/hyper-v-gpup-dda-live-migration.mdx

## Evidence

- GPU partitioning 2026-05-05. WS2025 live migration, unplanned cluster needs Datacenter, homogeneous cluster, same GPU cannot be DDA and partitionable, partitions autoassigned.
- Plan for GPU 200. DDA whole GPU vs GPU-P share. Did not 404.
- WS2025 what's new: GPU-P HA and live migration.
- DDA deploy 200.

## Buyer Decision

- 결정 대상: DDA 전용 vs GPU-P 분할, 균질 클러스터, Datacenter HA
- 비결정 대상: Azure Local GPU 글 재작성, 벤더 GPU 순위

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 서버 가상화 진단 범위

## Quality panel verdicts

- 정확성: 통과. Azure Local 슬롯과 분리.
- 공개 준비: 보류. status review.

## Rejected claims

- Azure Local을 이 슬롯의 본문으로 사용
- 같은 물리 GPU 동시 DDA+GPU-P
- 성능·밀도 보장
