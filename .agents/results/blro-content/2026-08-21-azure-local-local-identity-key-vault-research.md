# Azure Local 로컬 신원 Key Vault 조사 메모

상태: review 초안용. 2026-08-21 KST.

확인일: 2026-08-21

대상 MDX: content/insights/ko/azure-local-local-identity-key-vault.mdx

## Evidence

- 2604 what's new는 로컬 신원과 Key Vault가 이 릴리스부터 일반 공급이라고 적는다.
- 개요는 Azure 클라우드 Key Vault에 BitLocker와 구성 비밀을 백업하고, Windows Admin Center 미지원, MMC 혼합, PowerShell·포털·Monitor 지원을 적는다.
- 배포 문서는 내장 Administrator 금지, 전 노드 동일 로컬 관리 계정, DNS, RecoveryAdmin, ADAware 값 2를 적는다.
- 포털 배포 문서는 프라이빗 엔드포인트가 켜진 기존 Key Vault를 이 경로에 쓰지 말라고 적는다.

## Buyer Decision

- 결정 대상: AD 유지 대 로컬 신원, Key Vault 경계, 제외 도구
- 판단 질문: AD를 빼도 Azure Key Vault에 닿을 수 있는가
- 비결정 대상: 2606 업데이트 준비 재작성, 2607 iSCSI SAN, HCI 체크리스트 재작성

## Conversion

- 단일 CTA: HCI 진단 범위 확인
- 전환 전 제공 범위: 신원 모델, 비밀 위치, 도구 호환
- 전환 후 기대 산출물: 신원 선택과 비밀 책임 판단표

## Quality panel verdicts

- 정확성: 통과. AD 없음과 Azure 단절을 같은 말로 쓰지 않았다.
- 범위: 통과. SAN·업데이트 준비와 다른 신원 각도만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 이 모델이 에어갭·완전 단절이라는 주장
- Windows Admin Center가 지원된다는 주장
- 기존 AD 클러스터를 이 모델로 바꿀 수 있다는 확정
- 가격, Key Vault 과금 비교
- Sangfor 한국 사례 수행 주장

## Source ledger

- Microsoft Learn what's-new azloc-2604. URL: https://learn.microsoft.com/en-us/azure/azure-local/whats-new?view=azloc-2604. 확인일: 2026-08-21.
- Microsoft Learn local-identity overview. URL: https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-local-identity-with-key-vault-overview. 확인일: 2026-08-21. ms.date 2026-07-21.
- Microsoft Learn local-identity deploy. URL: https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-local-identity-with-key-vault?view=azloc-2604. 확인일: 2026-08-21. ms.date 2026-07-22.
- Microsoft Learn deploy-via-portal azloc-2604. URL: https://learn.microsoft.com/en-us/azure/azure-local/deploy/deploy-via-portal?view=azloc-2604. 확인일: 2026-08-21.

## firstPass

- GA, Azure 클라우드 Key Vault, WAC 미지원, 프라이빗 엔드포인트 제한을 재확인했다.
- Tech Community의 단절망 표현은 사실로 쓰지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 중괄호를 넣지 않았다.
- 2606·2607 초안과 각도를 분리했다.

## Uncertainties

- 기존 AD 클러스터를 로컬 신원으로 전환하는 공식 절차는 이 문서 묶음에서 확인하지 못했다.
- Key Vault 확장 실패 시 고객 복구 시간은 환경마다 다르다.
