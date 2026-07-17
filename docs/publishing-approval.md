# 공개 콘텐츠 승인 기준

공개 전에는 아래 항목이 모두 충족되어야 한다.

1. 원문 frontmatter가 `approved`, 공개일, evidence reference, claim ID, approval reference를 갖는다.
2. 모든 최신 사실·기능·지원·가격·성능 표현은 공식 출처 또는 검증 가능한 PoC/계약 근거가 있다.
3. 고객명, 계약 조건, 비공개 구성, 개인 정보, 내부 비교 결론을 제거했다.
4. CTA와 UTM이 정해진 전환 경로를 사용하며, 분석 이벤트에 PII가 없다.
5. 기술 검토자와 publication approver가 공개 범위·검토일·만료일을 승인 레지스트리에 기록했다.

`draft` 또는 `review` 상태 콘텐츠는 홈페이지, `/insights`, sitemap, 외부 채널 후보에서 제외한다.

공식 제조사 사이트에서 가져온 고객 사례도 같은 공개 경계를 적용한다. 공개 문구와 출처 URL은 `content/_registry/external-evidence-approvals.json`의 digest, 검토일, 만료일과 일치해야 하며, 누락·변경·만료 시 빌드를 중단한다.
