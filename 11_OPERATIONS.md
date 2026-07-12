# BLRO 홈페이지 배포·운영 계획

## 1. 운영 목표

- 유효 문의를 잃지 않고 적절한 담당자에게 전달한다.
- 기술·시장 콘텐츠가 오래된 사실을 계속 노출하지 않게 한다.
- 배포 실패와 콘텐츠 오류를 빠르게 되돌릴 수 있다.
- 개인정보와 외부 파트너 정보를 최소 권한으로 보호한다.

## 2. 운영 역할

| 역할 | 책임 |
|---|---|
| Product owner | 사업 메시지, 범위, 우선순위, 출시 승인 |
| Content owner | 콘텐츠 캘린더, metadata, 게시·보관 |
| Technical reviewer | 기술 정확성, 조건, 제한, 업데이트 주기 |
| Publication approver | 고객·벤더·로고·수치 공개 승인 |
| Web operator | 배포, 도메인, 환경변수, 모니터링, rollback |
| Inquiry owner | 유형별 배정, 응답, 상태와 SLA 관리 |
| Privacy owner | 처리방침, 보관·파기, 권리 요청, 위탁사 검토 |

한 사람이 여러 역할을 맡아도 production 환경변수 변경과 공개 claim 승인은 자체 재확인 체크를 남긴다.

## 3. 환경

| 환경 | 목적 | 문의 처리 |
|---|---|---|
| Local | 개발·단위검증 | fake provider |
| Preview | PR QA·콘텐츠 승인 | test mailbox/CRM sandbox |
| Production | 공개 운영 | approved recipient/provider |

Preview는 검색 색인을 차단하고 운영 고객 데이터를 사용하지 않는다.

## 4. 배포 절차

1. [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)의 release gate 확인
2. 콘텐츠·법무·privacy 승인 확인
3. production 환경변수 이름·대상·회전일 확인
4. main의 immutable SHA로 배포
5. HTTPS, headers, robots, sitemap, 핵심 route smoke
6. 세 문의 canary와 전달 message ID 확인
7. 오류율·CWV·provider failure 모니터링 확인
8. release 기록, 승인 링크, rollback SHA 저장

## 5. Rollback

다음이면 즉시 이전 정상 release로 되돌린다.

- 핵심 route 5xx 또는 스타일·내비게이션 사용 불가
- 문의 성공 표시 후 실제 전달 실패
- 개인정보·secret·미승인 claim 노출
- 검색 색인 전체 차단 또는 잘못된 canonical 대량 노출

rollback 후 원인·영향·탐지·복구·재발방지 기록을 남긴다. 데이터 보정이 필요하면 먼저 privacy owner와 문의 owner가 범위를 확인한다.

## 6. 문의 운영

### 라우팅

- `customer-project` → 기술사업/프리세일즈 책임자
- `partner-collaboration` → 파트너 사업 책임자
- `vendor-korea-entry` → 시장개발 책임자

### 목표 응답

- 자동 접수: 즉시, 접수 ID 제공
- 영업일 1일 안: 사람이 확인했음을 회신
- 영업일 3일 안: 다음 미팅 또는 추가 정보 요청

이는 내부 운영 목표이며 계약 SLA로 표현하지 않는다.

### 실패 처리

- provider delivery failure: 15분 내 알림
- 1시간 이상 지속: 대체 수신 채널 활성화와 사이트 안내
- 중복 문의: 같은 접수 ID/이메일/시간대를 검토하되 자동 삭제하지 않음
- 잘못 라우팅: 담당자를 변경하고 사용자에게 재제출을 요구하지 않음

## 7. 개인정보 보관·파기

보관기간은 회사 승인 후 확정한다. 확정 전 운영 배포를 차단한다.

- 문의 목적 달성 또는 보관기간 종료 시 안전하게 파기
- 백업과 외부 provider의 파기 주기 포함
- 권리 요청의 접수·본인 확인·처리 기록 유지
- 테스트 문의는 QA 종료 직후 삭제
- 접근권한을 분기마다 검토

## 8. 콘텐츠 운영

### 주간

- 새 문의·전달 실패·404·5xx 확인
- 게시 예정 콘텐츠 기술·공개 승인 확인
- 깨진 링크와 draft 노출 점검

### 월간

- 콘텐츠 2건 이상 발행 목표
- 유입 → 관련 콘텐츠 → 문의 흐름 분석
- Core Web Vitals, 검색 색인, 오류 추적 검토
- 의존성·플랫폼 변경 검토
- 문의 유형별 품질과 응답시간 점검

### 분기

- 서비스·기술 문서 사실과 검토일 갱신
- 프로젝트·파트너·인증 공개 승인 재확인
- privacy와 실제 도구·수집항목 비교
- 사용자·환경변수·provider 접근권한 검토
- rollback과 문의 장애 훈련

## 9. 모니터링과 알림

| 신호 | 경고 | 긴급 |
|---|---|---|
| Availability | 핵심 route 2회 연속 실패 | 5분 이상 5xx |
| Inquiry | delivery failure 1건 | 15분 동안 모든 유형 실패 |
| Client errors | 기준선 대비 급증 | 문의·내비게이션 차단 |
| CWV | p75 권장범위 이탈 | 주요 release 직후 심각 악화 |
| Security | CSP violation 급증 | secret/PII 또는 공격 성공 징후 |
| SEO | 색인·sitemap 경고 | robots/noindex로 전체 차단 |

로그와 알림 payload에 문의 본문·이메일·전화번호를 포함하지 않는다.

## 10. 백업과 복구

- 코드·콘텐츠: Git 원격 저장소와 release tag
- 브랜드 원본: 접근제어된 문서 저장소
- 환경변수: 배포 플랫폼의 암호화 저장소와 회전 절차
- 문의: 승인된 provider의 보관·export·파기 정책
- 도메인·DNS: 설정 export와 계정 복구 수단

분기마다 새 환경에서 lockfile install → build → preview deploy → content restore를 연습한다.

## 11. 변경 관리

- 사업축·대상·CTA 변경: Blueprint → PRD → IA → downstream 전부 검토
- route 변경: redirect, canonical, sitemap, 내부 링크, 분석 이벤트 동시 변경
- 문의 필드·provider 변경: PRD, privacy, API, E2E, operations 동시 변경
- 고객·벤더 claim 변경: 공개 승인 갱신 후 콘텐츠 merge
- 토큰 변경: contrast와 핵심 responsive screenshot 재검증

## 12. 운영 인수인계 완료 조건

- 담당자와 escalation contact가 실제 이름/채널로 등록
- 문의 3유형 수신·응답·실패·파기 절차 실행
- 콘텐츠 초안부터 게시·보관까지 시연
- production 배포와 rollback 시연
- 모니터링 알림 수신 확인
- 도메인·배포·provider 계정 복구 수단 확인
