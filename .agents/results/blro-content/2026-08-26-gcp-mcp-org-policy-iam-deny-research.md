# GCP MCP 조직 정책 종료와 IAM 거부 조사 메모

상태: review 초안용. 2026-08-26 KST.

확인일: 2026-08-26

대상 MDX: content/insights/ko/gcp-mcp-org-policy-iam-deny.mdx

## Evidence

- 폐기 페이지는 gcp.managed.allowedMCPServices와 조직 정책 통제가 2026-02-17 폐기, 2026-03-17 종료라고 적는다. 대체는 IAM 거부와 mcp.tools.call이다.
- 폐기 표도 같은 두 날짜를 적는다.
- MCP 릴리스 노트 2026-02-17은 기존 정책이 3월 17일 이후 동작하지 않고, 제약을 안 쓰던 조직은 2월 17일부터 쓸 수 없다고 적는다. 2026-03-17은 제약 무효와 원격 MCP 기본 활성화를 적는다.
- IAM 문서는 mcp.tools.call과 리소스 권한이 둘 다 필요하고, 콘솔에서 resource.service와 tool.name을 쓸 수 없으며 Resource Manager MCP는 이 속성으로 통제할 수 없다고 적는다.
- 조직 정책 릴리스 노트는 2026-02-15 항목에서 3월 17일 이후 같은 제약이 동작하지 않는다고 적는다.

## Buyer Decision

- 결정 대상: 잔여 조직 정책 제거, IAM 거부·허용, 읽기 전용, 부착 지점
- 판단 질문: 제품 기본 개방을 호출 권한과 같은 승인으로 둘 것인가
- 비결정 대상: 에이전트 설계, 보안·SASE 주제, AI 거버넌스 재작성

## Conversion

- 단일 CTA: 클라우드 제어면 진단 범위 확인
- 전환 전 제공 범위: 잔여 제약, 기본 개방, mcp.tools.call, 거부 조건
- 전환 후 기대 산출물: 조직·폴더·프로젝트 판단표

## Quality panel verdicts

- 정확성: 통과. 2월 15일과 2월 17일 폐기 안내 날짜 차이를 본문에 남겼다.
- 범위: 통과. 클라우드 IAM·조직 정책 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- IAM 거부가 모든 MCP 오용을 막는다는 보장
- 로그인 벽 자료
- 가격, Sangfor 사례

## Source ledger

- Organization policy control of MCP servers deprecation. URL: https://docs.cloud.google.com/mcp/organization-control-mcp-servers-deprecation. 확인일: 2026-08-26. 직접 열람.
- Deprecations. URL: https://docs.cloud.google.com/mcp/deprecations. 확인일: 2026-08-26. 직접 열람.
- MCP release notes. URL: https://docs.cloud.google.com/mcp/release-notes. 확인일: 2026-08-26. 직접 열람.
- Control MCP use with IAM. URL: https://docs.cloud.google.com/mcp/control-mcp-use-iam. 확인일: 2026-08-26. 직접 열람.
- Organization Policy Service release notes. URL: https://docs.cloud.google.com/organization-policy/release-notes. 확인일: 2026-08-26. 직접 열람.

## firstPass

- 종료일, 기본 활성화, 이중 권한, 콘솔 제한, Resource Manager 예외를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 보안·SASE 주제로 채우지 않았다.

## Uncertainties

- 조직 정책 노트의 2월 15일과 MCP 폐기 페이지의 2월 17일은 시차로 보인다. 운영은 폐기 페이지를 연다.
- 개별 MCP 서버 GA/미리보기는 Supported products를 다시 열어야 한다. 이 초안은 통제 경계만 적었다.
