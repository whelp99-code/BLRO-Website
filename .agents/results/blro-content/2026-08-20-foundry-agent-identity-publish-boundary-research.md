# Foundry 에이전트 신원 게시 경계 조사 메모

상태: review 초안용. 2026-08-20 KST.

확인일: 2026-08-20

대상 MDX: content/insights/ko/foundry-agent-identity-publish-boundary.mdx

## Evidence

- Agent identity Learn은 미게시 에이전트가 프로젝트 공유 신원을 쓰고, 게시하면 고유 블루프린트와 고유 신원이 생기며 역할은 재할당된다고 적는다.
- 같은 문서는 참석(사용자 위임)과 비참석(에이전트 자신) 흐름을 나눈다. MCP와 A2A만 에이전트 신원 인증을 지원한다고 적는다.
- Authentication Learn은 Agents service와 Evaluations에 API 키를 허용하지 않고 Entra ID를 요구한다. ms.date 2026-05-12, updated 2026-06-19.
- Entra agent-id-governance는 Foundry가 첫 에이전트에서 프로젝트 기본 신원을 만들고 게시 시 고유 신원을 만든다고 반복한다. ms.date 2026-06-05.
- Foundry Blog GA 글과 March 2026 What's new는 Agent Service 일반 공급, 사설 네트워킹, MCP 인증 확장, 호스티드 에이전트와 Voice Live는 미리보기라고 적는다.

## Buyer Decision

- 결정 대상: 게시 전후 호출 주체, 사용자 위임 여부, MCP 인증 방식
- 판단 질문: 공유 신원 역할을 운영에 가져갈 것인가, 게시 후 재할당할 것인가
- 비결정 대상: 모델 순위, 거버넌스 운영모델 글의 재작성, 소셜을 사실로 인용

## Conversion

- 단일 CTA: AI 에이전트 신원 진단 범위 확인
- 전환 전 제공 범위: 미게시/게시 신원, 도구 주체, 문서 불일치
- 전환 후 기대 산출물: 과제별 신원 선택과 권한 재할당 목록

## Quality panel verdicts

- 정확성: 통과. API 키 금지와 MCP 키 기반 안내의 불일치를 본문에 남겼다.
- 범위: 통과. 기존 거버넌스 운영모델과 다른 게시 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 호스티드 에이전트가 일반 공급이라는 주장
- Agents service에 API 키를 쓸 수 있다는 주장
- 특정 모델이나 프레임워크 순위
- 소셜을 GA 근거로 사용
- Sangfor 한국 사례 수행 주장

## Source ledger

- Microsoft Learn agent-identity. URL: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity. 확인일: 2026-08-20. 한계: 호스티드 에이전트 미리보기 권한은 별도 문서.
- Microsoft Learn authentication-authorization-foundry. URL: https://learn.microsoft.com/en-us/azure/foundry/concepts/authentication-authorization-foundry. 확인일: 2026-08-20. 한계: 역할 이름이 변경 중이다. GUID를 쓰라고 안내한다. 본문에 가격 없음.
- Microsoft Learn agent-id-governance-overview. URL: https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview. 확인일: 2026-08-20. 한계: 거버넌스 기능에 별도 라이선스 안내가 있다. 본문에 가격을 넣지 않았다.
- Microsoft Foundry Blog GA. URL: https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/. 확인일: 2026-08-20. 한계: 페이지 상단 날짜가 약하다. March 2026 What's new로 GA 월을 교차 확인했다.
- Microsoft Foundry Blog March 2026. URL: https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-mar-2026/. 확인일: 2026-08-20.

## firstPass

- 미게시 공유 신원, 게시 후 고유 신원, Agents service 키 불가, MCP 키 기반 잔존, 호스티드 미리보기를 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 중괄호를 넣지 않았다.
- 기존 ai-governance 글과 다른 각도인지 확인했다.

## Uncertainties

- GA 블로그의 정확한 게시 시각은 페이지에서 확인하지 못했다. 월은 March 2026 What's new로 교차했다.
- 고객 테넌트에서 게시 동작이 새 개체 모델을 쓰는지 이 초안은 알지 못한다.
