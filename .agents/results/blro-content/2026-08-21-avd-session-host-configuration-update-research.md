# AVD 세션 호스트 구성 업데이트 조사 메모

상태: review 초안용. 2026-08-21 KST.

확인일: 2026-08-21

대상 MDX: content/insights/ko/avd-session-host-configuration-update.mdx

## Evidence

- what's-new 2026년 6월은 Automated Host Pools가 이제 제공되며 Session Host Configuration과 session host update를 가리킨다.
- host-pool-management-approaches는 생성 시 방식 고정, 풀링 전용, 외부 도구 불가, 등록 토큰 경로 없음을 적는다. ms.date 2026-07-02.
- session-host-update는 기존 VM 삭제 후 재생성, 이미지 밖 변경 소실, 업데이트 중 자동 스케일 금지, Insights 에이전트 미자동설치, 전역 Azure 한정이다. ms.date 2026-07-02.
- REST session-host-configurations는 API 버전 2026-01-01-preview이다. 업데이트 작업 문서는 2026-04-01-preview를 쓴다.

## Buyer Decision

- 결정 대상: 신규 풀링 풀의 관리 방식, 재생성 업데이트, 자동 스케일 중지
- 판단 질문: 기존 파이프라인을 버릴 수 있는가, 생성 후 전환이 불가함을 수용하는가
- 비결정 대상: 웹 SCP, RAW 인쇄, RDP Multipath 재작성

## Conversion

- 단일 CTA: VDI 진단 범위 확인
- 전환 전 제공 범위: 관리 방식, 재생성, API 미리보기
- 전환 후 기대 산출물: 신규 풀 방식 판단표

## Quality panel verdicts

- 정확성: 통과. 제품 페이지 사용 가능과 REST 미리보기 불일치를 본문에 남겼다.
- 범위: 통과. 호스트 수명주기만 다루며 Multipath 단어 없음.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- 기존 호스트 풀을 이 방식으로 전환할 수 있다는 주장
- 업데이트가 인플레이스 패치라는 주장
- 서드파티 블로그의 2026년 8월 GA를 사실로 인용
- 무중단 재생성
- Sangfor 한국 사례 수행 주장

## Source ledger

- Microsoft Learn AVD what's-new. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/whats-new. 확인일: 2026-08-21.
- Microsoft Learn host-pool-management-approaches. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/host-pool-management-approaches. 확인일: 2026-08-21.
- Microsoft Learn session-host-update. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/session-host-update. 확인일: 2026-08-21.
- Microsoft Learn REST session-host-configurations 2026-01-01-preview. URL: https://learn.microsoft.com/en-us/rest/api/desktopvirtualization/session-host-configurations?view=rest-desktopvirtualization-2026-01-01-preview. 확인일: 2026-08-21.

## firstPass

- 6월 사용 가능, 생성 시 고정, 재생성, REST 미리보기를 재확인했다.
- 개인 블로그 GA 주장은 질문 발견용으로만 보고 본문에 쓰지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조, 중괄호를 넣지 않았다.
- Multipath, 화면 캡처, RAW 인쇄를 본문에 넣지 않았다.

## Uncertainties

- REST 미리보기 버전이 언제 GA API로 바뀔지 미정이다.
- 고객 테넌트의 실제 롤아웃 범위는 이 초안이 알지 못한다.
