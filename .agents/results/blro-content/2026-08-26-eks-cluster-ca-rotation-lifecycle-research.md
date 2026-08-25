# EKS 클러스터 CA 순환 조사 메모

상태: review 초안용. 2026-08-26 KST.

확인일: 2026-08-26

대상 MDX: content/insights/ko/eks-cluster-ca-rotation-lifecycle.mdx

## Evidence

- What's New 2026-08-20는 2018년 이후 클러스터 CA가 10년이며 순환이 필요하다고 적는다. AWS는 관리 구성 요소를 갱신하고, 고객은 워커 노드 교체와 외부 클라이언트를 책임진다. Auto Mode와 Fargate 노드는 AWS가 갱신한다.
- User Guide는 원본 CA 10년, 후속 CA 5년, 이중 신뢰, 배포 완료 전 활성화 불가를 적는다. 관리형 노드 그룹, Karpenter, 자체 관리, 하이브리드와 외부 클라이언트를 고객 책임으로 나눈다. 자동 추가는 약 2년 전, 자동 활성화는 약 6개월 전, 최종은 45일 전이다.
- 공식 블로그도 공유 책임과 이중 신뢰, 후속 CA 5년을 반복한다. 예시 클러스터 이름은 가상 시나리오다.

## Buyer Decision

- 결정 대상: 지금 후속 CA 추가, 노드·클라이언트 갱신 범위, 활성화 일정
- 판단 질문: AWS 가용성 보호만으로 순환을 끝났다고 볼 것인가
- 비결정 대상: ACME TLS, Arc 워크로드 신원, BYOCA

## Conversion

- 단일 CTA: 인프라 인증서 수명 진단 범위 확인
- 전환 전 제공 범위: CA 만료, 노드 유형, 외부 클라이언트
- 전환 후 기대 산출물: 책임 분리 판단표

## Quality panel verdicts

- 정확성: 통과. What's New의 노드 교체 문장과 운영 문서의 노드 유형 차이를 본문에 남겼다.
- 범위: 통과. 클러스터 API 신뢰 번들만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 순환이 무중단과 보안을 보장한다는 주장
- 가격 수치. 공지의 추가 비용 없음 문구는 본문에서 빼 두었다.
- ACME 글 재작성, Sangfor 사례

## Source ledger

- AWS What's New 2026-08-20. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-eks-certificate-authority-ca-rotation-automated-lifecycle-management/. 확인일: 2026-08-26. 직접 열람.
- EKS User Guide CA rotation. URL: https://docs.aws.amazon.com/eks/latest/userguide/certificate-authority-rotation.html. 확인일: 2026-08-26. 직접 열람.
- AWS Containers Blog deep dive. URL: https://aws.amazon.com/blogs/containers/deep-dive-into-amazon-eks-certificate-authority-rotation/. 확인일: 2026-08-26. 직접 열람.

## firstPass

- 10년/5년, 자동 일정, Auto Mode·Fargate, 외부 클라이언트 책임을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 블로그의 가상 클러스터 이름을 본문에 쓰지 않았다.

## Uncertainties

- 2018-2019 클러스터 알림 일정은 문서가 다르다고만 적혀 있다. 클러스터별 API를 다시 열어야 한다.
- Karpenter drift 창과 자동 활성화 일정의 여유는 클러스터마다 다르다.
