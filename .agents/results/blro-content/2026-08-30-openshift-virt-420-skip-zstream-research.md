# OpenShift Virtualization 4.20 z-stream 조사 메모

상태: review 초안용. 2026-08-30 KST.
대상 MDX: content/insights/ko/openshift-virt-420-skip-zstream.mdx

## Evidence

- Release notes HTML 200. OCP 4.20 only. Latest stable OV 4.20.24. Can skip intermediate z-stream. Must update to latest z-stream of current minor before next minor. 4.19→4.20 remove wasp-agent first. OCI install GA, ARM64 bare-metal GA, vNUMA GA, descheduler KubeVirtRelieveAndMigrate GA, DPDK checkup removed, virtctl ssh syntax deprecated. Used as operator path, not changelog dump.
- Updating chapter HTML 200. Distinct chapter. OV 4.20 only on OCP 4.20. Cannot take next OV minor without first updating OCP. Direct latest z-stream of current minor without each intermediate z-stream. stable + Automatic recommended. Manual out of sync is unsupported.
- Postinstallation configuration HTML 200. Distinct chapter. wasp-agent for memory overcommit. Remove higherWorkloadDensity, MachineConfig 90-worker-swap, KubeletConfig custom-config.
- html/virtualization/updating first probe 403. Used the chapter URL that returned a real body.
- access.redhat.com RHSA pages not used as official-3. Login-wall risk.

## Buyer Decision

- 결정 대상: 4.20 z-stream vs 4.19→4.20, wasp-agent 제거, 채널·승인 전략
- 비결정 대상: VCF 9.1, Hyper-V GPU-P, VMSA-2026-0006

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 서버 가상화 진단 범위

## Quality panel verdicts

- 정확성: 통과. 4.20.24와 wasp-agent 전제를 문서에서 확인.
- 범위: 통과. OpenShift Virtualization 경로만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 15분 완료 보장
- 네트워크 무중단 보장
- RHSA 4.20.24를 OV 전용 advisory로 단정
- VCF/Hyper-V 재작성

## Source ledger

- Release notes. URL: https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/virtualization/release-notes. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Updating. URL: https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/virtualization/updating. 확인일: 2026-08-30. HTTP 200. 직접 열람.
- Postinstallation. URL: https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/virtualization/postinstallation-configuration. 확인일: 2026-08-30. HTTP 200. 직접 열람.

## firstPass

- z-stream skip + latest z-stream before next minor + wasp-agent before 4.19→4.20.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- GA 기능 나열을 본문 중심으로 쓰지 않음.

## Uncertainties

- 4.20.24 날짜가 적힌 공개 errata 본문은 이 작업에서 OV 전용으로 확정하지 않았다.
- 고객 클러스터의 wasp-agent 실태는 문서에 없다.
