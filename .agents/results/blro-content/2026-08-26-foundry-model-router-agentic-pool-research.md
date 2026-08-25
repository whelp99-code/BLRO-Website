# Foundry Model Router 에이전트 라우팅 풀 조사 메모

상태: review 초안용. 2026-08-26 KST.

확인일: 2026-08-26

대상 MDX: content/insights/ko/foundry-model-router-agentic-pool.mdx

## Evidence

- What's New 페이지 날짜 2026-08-12는 28개 리전 모두 Global Standard와 Data Zone Standard를 지원한다고 적는다. 버전 2025-11-18은 27개 모델이며 GPT-5.6 계열과 claude-opus-4-8을 넣고 채팅·DeepSeek-V3.1·claude-opus-4.1을 뺀다.
- 개념 문서 페이지 날짜 2026-08-12, 갱신 2026-08-20의 리전 표는 브라질 남부, 캐나다 동부, 남아프리카 북부, 스위스 서부, 영국 남부·서부, 미국 중서부를 Data Zone 없음으로 표시한다. 한국 중부는 둘 다 있다.
- 개념 문서와 에이전트 안내는 Claude를 먼저 배포해야 라우터가 호출한다고 적는다. 컨텍스트 창은 가장 작은 하위 모델로 제한된다.
- 에이전트 안내는 요청 단위 라우팅과 도구 적격 OpenAI·OSS·Anthropic 선택을 적는다.

## Buyer Decision

- 결정 대상: 기본 풀과 부분 집합, 라우팅 모드, Claude 선배포, Global과 Data Zone
- 판단 질문: 에이전트 라우팅을 기본 풀 하나에 둘 것인가, 과제별 풀과 리전을 가를 것인가
- 비결정 대상: 에이전트 게시 신원, AI 거버넌스 프레임워크 재작성, 모델 우열

## Conversion

- 단일 CTA: AI 라우팅 경계 진단 범위 확인
- 전환 전 제공 범위: 배포 유형, 리전, 풀, 모드, Claude 배포
- 전환 후 기대 산출물: 과제별 풀과 문서 불일치 판단표

## Quality panel verdicts

- 정확성: 통과. 28개 리전 Data Zone 전원 지원 문장과 개념 표 불일치를 본문에 남겼다.
- 범위: 통과. 라우팅 풀과 리전 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 라우터가 품질, 지연, 비용 절감을 보장한다는 주장
- 에이전트 게시 신원 재작성
- 가격, 성능 순위, Sangfor 한국 사례

## Source ledger

- What's new in model router. URL: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/whats-new-model-router. 확인일: 2026-08-26. 직접 열람.
- Model router concepts. URL: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router. 확인일: 2026-08-26. 직접 열람.
- Use model router with Foundry agents. URL: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/model-router-agents. 확인일: 2026-08-26. 직접 열람.

## firstPass

- 28개 리전 문장, 개념 표 Data Zone 칸, Claude 선배포, 27개 모델 갱신을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 게시 신원 글과 거버넌스 글을 다시 쓰지 않았다.

## Uncertainties

- 개념 표와 What's New의 Data Zone 불일치는 문서 갱신 시차로 보인다. 운영은 개념 표를 연다.
- 도구·리전 호환 행렬은 별도 limits 페이지이며 이 초안은 제목만 가리키고 본문 수치를 쓰지 않았다.
