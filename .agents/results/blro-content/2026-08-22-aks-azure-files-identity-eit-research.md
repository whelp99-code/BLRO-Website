# AKS Azure Files 신원과 전송 암호화 조사 메모

상태: review 초안용. 2026-08-22 KST.

확인일: 2026-08-22

대상 MDX: content/insights/ko/aks-azure-files-identity-eit.mdx

## Evidence

- Azure/AKS release 2026-08-07(게시 2026-08-11)는 Azure File CSI에서 Encryption in Transit과 워크로드 신원 일반 공급을 적는다.
- Learn create-volume-azure-files(페이지 날짜 2026-08-20) 상단은 SMB가 키 기반 NTLM v2만 허용된다고 적는다. 후반은 SMB 워크로드 신원, AKS 1.35.0 이상 Linux, Storage File Data SMB MI Admin, encryptInTransit 기본 false를 적는다.
- Learn encryption-in-transit-for-nfs-shares(페이지 날짜 2026-07-20)는 NFS 전송 암호화 일반 공급, 계정 설정, AZNFS, 신규 포털 계정 기본 켜짐을 적는다.

## Buyer Decision

- 결정 대상: SMB 키와 워크로드 신원, NFS 전송 암호화, 계정 강제와 AKS 파라미터
- 판단 질문: 같은 문서의 상단 제한과 후반 GA 중 어떤 클러스터에 적용되는가
- 비결정 대상: Arc 워크로드 신원 GA, ACME TLS, Azure Local/HCI

## Conversion

- 단일 CTA: 인프라 스토리지 신원 진단 범위 확인
- 전환 전 제공 범위: 프로토콜, 버전, 인증, 계정 설정
- 전환 후 기대 산출물: 전환 대상과 키 회수 판단표

## Quality panel verdicts

- 정확성: 통과. 상단 키 전용과 후반 워크로드 신원 불일치를 본문에 남겼다.
- 범위: 통과. AKS Azure Files 마운트만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- Arc Kubernetes 워크로드 신원 재작성
- ACME TLS 재작성
- Azure Local/HCI로 슬롯 채움
- 성능, 암호화 적합성 보장
- Sangfor 사례

## Source ledger

- AKS release 2026-08-07. URL: https://github.com/Azure/AKS/releases/tag/2026-08-07. 확인일: 2026-08-22. 직접 열람.
- Microsoft Learn Azure Files on AKS. URL: https://learn.microsoft.com/en-us/azure/aks/create-volume-azure-files. 확인일: 2026-08-22. 직접 열람.
- Microsoft Learn NFS encryption in transit. URL: https://learn.microsoft.com/en-us/azure/storage/files/encryption-in-transit-for-nfs-shares. 확인일: 2026-08-22. 직접 열람.

## firstPass

- GA 발표, SMB/NFS 분리, 1.35 Linux 전제를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- Arc 신원 글과 ACME 글을 다시 쓰지 않았다.

## Uncertainties

- 상단 키 전용 안내가 구형 제한을 남긴 것인지, 최대 보안 프로필만 가리키는지는 문서가 분명히 가르지 않는다.
- Windows 노드와 AKS 1.34 이하에서 워크로드 신원은 문서상 대상이 아니다.
- 저장소 계정 NFS 강제와 CSI encryptInTransit 실패 조합은 이 작업에서 클러스터로 재현하지 않았다.
