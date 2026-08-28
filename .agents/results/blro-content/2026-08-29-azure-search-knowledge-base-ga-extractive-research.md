# Azure AI Search 추출형 Knowledge Base 조사 메모

상태: review 초안용. 2026-08-29 KST.
대상 MDX: content/insights/ko/azure-search-knowledge-base-ga-extractive.mdx

## Evidence

- What's New April 2026. Knowledge bases GA. 2026-04-01 extractive retrieval from GA knowledge source types. Preview-only query planning, answer synthesis, configurable reasoning effort require 2025-11-01-preview. HTTP 200.
- What's New June 2026. 2026-05-01-preview banner and new preview knowledge source kinds. Do not flatten preview API versions.
- Knowledge source overview. Some agentic retrieval GA in 2026-04-01 via programmatic access. Azure portal and Microsoft Foundry portal continue preview-only access. HTTP 200.
- Migrate how-to. Recreate uniquely named objects. Remove outputMode, answerInstructions, retrievalInstructions on 2026-04-01. retrieve uses intents not messages. Stay on preview if answer synthesis, non-minimal reasoning, or multi-turn messages are required. HTTP 200.
- Search API migration. 2026-04-01 is the first stable REST for agentic retrieval. Extractive output. knowledgeRetrieval billing consent. HTTP 200.

## Buyer Decision

- 결정 대상: 추출형 안정판 vs 합성·질의 계획 미리보기, 포털 미리보기 잔존
- 비결정 대상: Model Router, Foundry 에이전트 신원, 포털 안정판 일정 단정

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr AI 검색 진단 범위

## Quality panel verdicts

- 정확성: 통과. 포털 미리보기와 프로그래밍 GA를 분리. 미리보기 API 버전을 평탄화하지 않음.
- 범위: 통과. Knowledge Base API 경계만.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- Model Router, Foundry agent identity 재작성
- 포털이 곧 GA라는 일정
- /contact send 정상
- 제품 우열·가격
- Sangfor

## Source ledger

- What's New. URL: https://learn.microsoft.com/en-us/azure/search/whats-new. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- Migrate. URL: https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-migrate. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- Knowledge source overview. URL: https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-overview. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- API migration. URL: https://learn.microsoft.com/en-us/azure/search/search-api-migration. 확인일: 2026-08-29. HTTP 200. 직접 열람.

## firstPass

- April GA extractive vs preview synthesis. Portal preview-only. Recreate objects. intents.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- Model Router와 Foundry 에이전트 신원 재작성 없음.

## Uncertainties

- Learn 페이지의 ms.date는 이 작업에서 HTML 메타로 확정하지 않았다. 본문은 섹션 제목 April 2026, June 2026만 사용했다.
- 포털이 언제 안정판 API를 쓸지는 문서에 없다.
