# BLRO 홈페이지·리드발굴 엔진 마스터 구축 계획

> 실행 기준일: 2026-07-15  
> 기존 `website-expansion-plan.md`, `measurement-plan.md`, 콘텐츠 승인 기준을 대체하지 않고 연결하는 상위 실행 계획

## 목표

BLRO 공개 웹을 인프라·보안 전환을 검토하는 기업 담당자의 의사결정과 상담 요청을 연결하는 리드 엔진으로 운영한다. 고객명·성과·비공개 비교 결과를 만들지 않고, 진단 산출물·체크리스트·승인된 실무 인사이트를 신뢰 근거로 사용한다.

## 고정 결정

- 주 독자: 가상화·HCI·보안·DR·VDI·SASE 전환을 검토하는 기업 IT 의사결정자와 실무 리더
- 보조 독자: 국내 파트너와 글로벌 벤더
- 주 행동: `전환 진단 범위 확인`
- 운영 도메인: `blro.co.kr`
- 첫 리드 자산: HCI·가상화 전환 사전진단 체크리스트
- 공개 원칙: VMware·Nutanix 내부 비교와 고객 식별 정보는 비공개

## 실행 순서

| 단계 | 범위 | 완료 기준 |
| --- | --- | --- |
| M0 | 기준선·계획·승인 인벤토리 | 기존 작업을 보존하고, 공개/검토/비공개 콘텐츠의 경계를 확인한다. |
| M1 | 정보 구조 | 헤더는 Solutions, AI & Automation, Projects, Insights, Partner Business, 주 CTA로 구성한다. |
| M2 | 전환·신뢰 페이지 | 홈·솔루션·Projects·Contact가 진단 산출물과 단일 다음 행동을 명확히 보여 준다. |
| M3 | 체크리스트·리드 경로 | `/v1/lead-magnets/hci-readiness`와 다운로드 흐름이 개인정보·보안 기준에 맞게 동작한다. |
| M4 | SEO·검색 준비 | canonical, sitemap, robots, JSON-LD, 내부 링크, Search Console·네이버 등록 준비를 완료한다. |
| M5 | 콘텐츠·Slack 운영 | 매일 두 개 리서치 후보를 Slack 승인 후 공개·채널 재활용한다. |
| M6 | 측정·리뷰 | 비식별 퍼널과 리드 상태를 주간 단위로 검토한다. |
| M7 | 출시 게이트 | 접근성·성능·보안·도메인·Turnstile·Worker·Slack 경계를 실제 환경에서 검증한다. |

## 공개 정보 구조

```text
/
├── /solutions
│   ├── /solutions/hci-private-cloud
│   ├── /solutions/vdi-digital-workspace
│   ├── /solutions/backup-disaster-recovery
│   ├── /solutions/network-security
│   └── /solutions/sase-global-connectivity
├── /ai-automation
├── /projects
├── /insights
│   └── /insights/[approved-slug]
├── /partner-business
├── /blro
└── /contact
```

모든 솔루션 상세 페이지는 `문제 상황 → 적용·제외 조건 → 진단 산출물 → 검증 절차 → 관련 인사이트 → 상담` 순서를 사용한다. 인사이트는 연결된 솔루션, 체크리스트 또는 상담 CTA를 반드시 제공한다.

## 리드 및 측정 계약

- `POST /v1/inquiries`: Turnstile·Origin·중복 검증, 암호화 D1 저장, Queue 전달 후에만 접수 성공을 반환한다.
- `POST /v1/lead-magnets/hci-readiness`: 업무용 이메일과 개인정보 처리 동의를 확인하고, 만료되는 R2 다운로드 URL을 반환한다. 마케팅 수신 동의는 선택 항목이다.
- 분석 이벤트: `cta_clicked`, `form_started`, `form_validation_failed`, `turnstile_failed`, `inquiry_accepted`, `lead_magnet_delivered`만 허용한다. PII와 원본 IP는 분석 경로에 넣지 않는다.
- Slack: `#blro-leads`는 마스킹된 리드 알림 전용, `#blro-content-review`는 공개 후보 승인 전용으로 분리한다.

## 검색·콘텐츠 운영

다섯 클러스터를 고정한다: 가상화·HCI, 보안·SASE, DR, VDI, 인프라 컨설팅·마이그레이션. 각 클러스터는 솔루션 허브, 6~10개 인사이트, 체크리스트, 상담 CTA를 갖는다.

매일 두 개의 리서치 후보를 만들고, 1차 출처·기술 검토·Slack 승인을 통과한 원문만 공개한다. 원문은 네이버 블로그, LinkedIn, YouTube, Threads·Instagram 형식으로 재활용하며 UTM과 원문 CTA를 통일한다.

## 출시 게이트

- 320/768/1024/1440px에서 가로 오버플로 없음
- 키보드, 포커스, 폼 오류, 동의, 스크린리더 라벨 검증
- 실제 도메인의 canonical·robots·sitemap·구조화 데이터 확인
- Turnstile 허용 도메인, Worker Origin allowlist, secrets, private Slack 채널 일치
- spam·중복·잘못된 Origin·Turnstile 실패·전달 실패·보관 만료 자동 테스트
- preview는 noindex·synthetic lead만 사용하며, production은 canary 접수와 롤백 경로를 확인한 뒤 공개
