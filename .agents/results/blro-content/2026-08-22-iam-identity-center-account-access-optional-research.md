# IAM Identity Center 계정 접근 선택 조사 메모

상태: review 초안용. 2026-08-22 KST.

확인일: 2026-08-22

대상 MDX: content/insights/ko/iam-identity-center-account-access-optional.mdx

## Evidence

- What's New 2026-08-05는 신규 조직 인스턴스에서 AWS 계정 접근 관리를 선택 사항으로 둔다. 끄면 멤버 계정에 서비스 연결 역할을 만들지 않는다. 기존 인스턴스 비적용. 이후 설정 또는 UpdateInstance로 켤 수 있다.
- What's New 2026-08-07는 단일 리전, 다중 리전, 사용자 지정 구성을 안내한다. 기본 활성 상용 리전 17곳.
- Enable 문서는 같은 스위치를 다중 계정 권한이라고 부른다. Settings Management 탭에서 나중에 켤 수 있다.
- Organization instances 문서는 단일·다중 리전에서 권한 세트가 기본 켜짐이고 한 번 켜면 끌 수 없다고 적는다. 사용자 지정만 선택 가능하다.
- Permission sets 문서는 다중 계정 권한이 있어야 권한 세트가 동작한다고 적는다.

## Buyer Decision

- 결정 대상: 애플리케이션 전용과 계정 권한 포함, 리전 구성, 권한 세트 고정
- 판단 질문: 원클릭 다중 리전을 고르면 계정 권한을 빼기 어려운가
- 비결정 대상: Organizations 출발 SCP 재작성, 기존 인스턴스 재구성

## Conversion

- 단일 CTA: 클라우드 제어면 진단 범위 확인
- 전환 전 제공 범위: 인스턴스 유형, 스위치, 리전, 키
- 전환 후 기대 산출물: 구성 옵션 판단표

## Quality panel verdicts

- 정확성: 통과. 계정 접근 관리, 다중 계정 권한, 권한 세트 용어 차이를 본문에 남겼다.
- 범위: 통과. 신규 조직 인스턴스 제어면만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 기존 인스턴스에 이 선택이 적용된다는 주장
- 다중 리전이 중단 없음을 보장한다는 주장
- Organizations 출발 SCP 재작성
- 가격 수치, Sangfor 사례

## Source ledger

- What's New 2026-08-05. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/aws-identity-center-accounts-optional/. 확인일: 2026-08-22. 직접 열람.
- What's New 2026-08-07. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/aws-iam-identity-center-supports-one-click-multi-region-option-new-organization-instances/. 확인일: 2026-08-22. 직접 열람.
- Enable IAM Identity Center. URL: https://docs.aws.amazon.com/singlesignon/latest/userguide/enable-identity-center.html. 확인일: 2026-08-22. 직접 열람.
- Organization instances. URL: https://docs.aws.amazon.com/singlesignon/latest/userguide/organization-instances-identity-center.html. 확인일: 2026-08-22. 직접 열람.
- Permission sets. URL: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html. 확인일: 2026-08-22. 직접 열람.

## firstPass

- 신규 인스턴스 한정, 나중에 켜기, 한 번 켜면 끄기 불가를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 출발 SCP 초안을 다시 쓰지 않았다.

## Uncertainties

- 사용자 지정 구성에서 권한 세트를 끈 채 다중 리전을 조합하는 정확한 UI 경로는 콘솔을 직접 조작하지 않아 확인하지 못했다.
- 17개 리전 목록은 공지에만 있고 이 작업에서 표를 열지 않았다.
