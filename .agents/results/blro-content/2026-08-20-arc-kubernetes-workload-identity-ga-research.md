# Arc Kubernetes 워크로드 ID GA 조사 메모

상태: review 초안용. 2026-08-20 KST.

확인일: 2026-08-20

대상 MDX: content/insights/ko/arc-kubernetes-workload-identity-ga.mdx

## Evidence

- 릴리스 노트: 에이전트 1.32.7 (2026년 2월)에서 워크로드 ID 연합 GA. 페이지 ms.date 2026-08-10.
- 배포 문서: issuer와 워크로드 ID 플래그, 관리 ID, 서비스 계정, 페더레이션 자격 증명, OpenShift authentication issuer와 배포 재시작, K3s API 서버 인자. ms.date 2026-05-06.
- 개념 문서: 제목에 preview 잔존. 에이전트 1.21부터 지원. updated_at 2025-11-18로 보임. GA 릴리스 노트와 불일치.

## Buyer Decision

- 결정 대상: 시크릿 유지 대 OIDC 연합, 배포판별 issuer 작업
- 판단 질문: 어느 Microsoft 문서를 운영 기준으로 삼을 것인가
- 비결정 대상: ACME 중복, HCI/VMware/Nutanix, 배포판 순위

## Conversion

- 단일 CTA: 인프라 신원 진단
- 전환 전 제공 범위: 에이전트 버전, 배포판, 문서 불일치
- 전환 후 기대 산출물: 전환 여부와 배포판별 작업 목록

## Quality panel verdicts

- 정확성: 통과. preview 제목과 GA 릴리스 노트를 본문에 남겼다.
- 범위: 통과. ACME/HCI가 아님.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 개념 문서가 이미 GA로 갱신됐다는 주장
- Arc 연결만으로 연합이 끝난다는 주장
- 배포판 우열

## Source ledger

- Microsoft Learn release-notes. URL: https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/release-notes. 확인일: 2026-08-20.
- Microsoft Learn workload-identity. URL: https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/workload-identity. 확인일: 2026-08-20.
- Microsoft Learn conceptual-workload-identity. URL: https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/conceptual-workload-identity. 확인일: 2026-08-20. 한계: 제목 preview 잔존.

## firstPass

- 1.32.7 GA, 1.21 지원 시작, OpenShift/K3s 추가 절차, preview 제목을 재확인했다.

## secondPass

- 표, 본문 링크, 강조, 중괄호 없음. ACME 비중복.

## Uncertainties

- 개념 문서가 언제 GA 제목으로 바뀌는지는 Microsoft 문서 갱신에 달려 있다.
