# Bedrock Web Search 외부 접근 경계 조사 메모

상태: review 초안용. 2026-08-22 KST.

확인일: 2026-08-22

대상 MDX: content/insights/ko/bedrock-web-search-external-access.mdx

## Evidence

- AWS What's New 2026-08-04는 Web Search 일반 공급, OpenAI GPT-5.4/5.5/5.6, 미국 3개 리전, 서버 측 도구, 데이터 외부 반출 없음으로 적는다.
- AWS What's New 2026-08-19는 external_web_access와 bedrock-websearch:ExternalWebAccess로 공개 웹 직접 조회를 연다. false면 인-AWS 인덱스만 사용한다.
- User Guide Web Search는 bedrock-mantle Responses API 전용, bedrock-runtime 불가, 파라미터 기본값 true, 리전 내부 처리, Codex는 false로 둔다고 적는다.
- IAM 문서는 InvokeSearch, InvokeFetch, ExternalWebAccess를 나눈다. AmazonBedrockFullAccess는 외부 접근을 주지 않는다.

## Buyer Decision

- 결정 대상: 인-AWS 인덱스와 실시간 외부 웹, 파라미터와 IAM, 호출 엔드포인트
- 판단 질문: 웹 그라운딩을 한 도구로 켤 것인가, 송신 경계를 과제별로 나눌 것인가
- 비결정 대상: Foundry 에이전트 신원, AI 거버넌스 프레임워크 재작성, 모델 우열

## Conversion

- 단일 CTA: AI 검색 경계 진단 범위 확인
- 전환 전 제공 범위: 엔드포인트, 모델, 리전, 파라미터, IAM
- 전환 후 기대 산출물: 과제별 송신 경계 판단표

## Quality panel verdicts

- 정확성: 통과. 8월 4일 무반출 안내와 8월 19일 외부 접근 안내 불일치를 본문에 남겼다.
- 범위: 통과. 웹 그라운딩 송신 경계만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 웹 검색이 최신성이나 정확성을 보장한다는 주장
- 8월 4일 공지 그대로 모든 구성에서 데이터 비반출이라는 주장
- Foundry 게시 신원 재작성
- Sangfor 한국 사례 수행 주장
- 가격, 성능 순위, 웹훅, 비밀값

## Source ledger

- AWS What's New 2026-08-04. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-bedrock-web/. 확인일: 2026-08-22. 직접 열람.
- AWS What's New 2026-08-19. URL: https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-bedrock-web-access-web-search/. 확인일: 2026-08-22. 직접 열람.
- Bedrock User Guide Web Search. URL: https://docs.aws.amazon.com/bedrock/latest/userguide/web-search.html. 확인일: 2026-08-22. 직접 열람.
- Bedrock User Guide IAM for Web Search. URL: https://docs.aws.amazon.com/bedrock/latest/userguide/security-web-search.html. 확인일: 2026-08-22. 직접 열람.

## firstPass

- GA 일자, 외부 접근 일자, mantle 전용, 기본값 true, FullAccess 미포함을 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 에이전트 신원 글과 거버넌스 글을 다시 쓰지 않았다.

## Uncertainties

- 한국 리전 미지원. 미국 3개 리전만 문서에 있다.
- 모델이 언제 Search와 Fetch를 고르는지는 요청마다 달라진다.
- 영어 What's New 제목 경로 `/amazon-bedrock-web/`은 잘린 슬러그로 보이며, 열람한 본문은 Web Search GA이다.
