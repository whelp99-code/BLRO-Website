# BLRO 홈페이지 SEO·보안·개인정보·접근성 기준

## 1. 품질 게이트

| ID | 영역 | 출시 조건 |
|---|---|---|
| `QG-001` | SEO | index/canonical/metadata/sitemap/structured data 오류 없음 |
| `QG-002` | 성능 | 핵심 페이지 모바일 Lighthouse 90 목표, CWV 권장 범위 |
| `QG-003` | 접근성 | axe serious/critical 0, 키보드 핵심 여정 완료, WCAG 2.2 AA 핵심 기준 |
| `QG-004` | 보안 | 보안 헤더, 입력 검증, 속도 제한, 비밀정보 노출 검사 통과 |
| `QG-005` | 개인정보 | 실제 수집·처리·보관·위탁과 처리방침 일치 |
| `QG-006` | 신뢰 | 공개 승인 없는 고객·벤더·인증·성과 claim 0건 |

## 2. 페이지별 SEO

각 indexable route는 다음을 가진다.

- 고유한 title: 핵심 주제 + `| BLRO`
- 70~160자 범위의 사람 중심 description
- 절대 canonical URL
- Open Graph와 X 카드
- 의미 있는 단일 H1과 논리적 H2/H3
- 관련 서비스·사례·인사이트 내부 링크
- 이미지 width/height와 대체텍스트
- 실제 콘텐츠와 같은 locale/hreflang

문의 성공·오류, preview, draft, 내부 검색 결과는 `noindex` 처리한다.

## 3. 구조화 데이터

- 홈: `Organization`, `WebSite`
- 서비스: `Service`, `BreadcrumbList`
- 인사이트: `Article`, `BreadcrumbList`
- 공개 인물 페이지가 실제로 있을 때만 `Person` 또는 `ProfilePage`

JSON-LD의 법인명, 주소, 연락처, 로고, URL은 화면에 표시된 승인 정보와 일치해야 한다. 리뷰·평점·FAQ schema는 실제 표시와 정책 적합성이 확인되지 않으면 사용하지 않는다.

## 4. 검색 콘텐츠 전략

주제 클러스터:

- VMware 대체, HCI, Private Cloud
- VDI, 디지털 워크스페이스
- Backup, DR, RPO/RTO
- Network Security, ZTNA, SASE, SD-WAN
- 글로벌 벤더 한국 시장 진출, 파트너 프리세일즈
- AI 업무자동화, 멀티에이전트, 승인 기반 자동화

키워드를 반복 삽입하지 않는다. 서비스 페이지를 중심 허브로 하고 인사이트와 프로젝트가 판단 기준과 증거를 제공한다.

## 5. 성능 예산

| 항목 | 목표 |
|---|---|
| LCP | p75 ≤ 2.5s |
| INP | p75 ≤ 200ms |
| CLS | p75 ≤ 0.1 |
| Lighthouse Performance | 핵심 모바일 페이지 90 이상 목표 |
| 초기 JS | 공통 클라이언트 코드 170KB gzip 이하 목표 |
| Hero 이미지 | 250KB 이하, AVIF/WebP, 적절한 srcset |
| 폰트 | 필요한 subset과 weight만 preload |

- Client Component는 상호작용 섬으로 제한한다.
- third-party 스크립트는 필수성·동의·성능 영향을 검토한다.
- 이미지와 폰트 크기로 기준을 통과시키기 어려우면 장식 자산을 제거한다.

## 6. 보안 헤더 기준

운영 응답에서 다음을 검증한다.

```text
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

실제 CSP는 분석·폰트·이미지 제공자 확정 후 최소 allowlist로 조정한다. `unsafe-eval`은 허용하지 않는다.

## 7. 문의 API 보호

- POST와 `application/json`만 허용
- request body ≤ 32KB
- 모든 문자열 trim, 길이 제한, 서버 스키마 검증
- honeypot 값이 있으면 사용자 정보 노출 없이 차단
- Origin/Host 검증과 CSRF 방어
- IP 단기 해시 기반 rate limit, 정상 사용자 오류 안내
- provider timeout과 전달 실패를 분리
- 메일 헤더 인젝션 방지를 위해 제목·수신자는 서버 상수에서 생성
- 로그와 오류 추적에서 이름, 이메일, 전화, 문의 본문 마스킹

보안 임계값은 운영 환경에서 부하·오탐을 측정해 확정하되 보호 기능 자체를 비활성화하지 않는다.

## 8. 개인정보 최소수집

### 수집

- 필수: 회사명, 담당자명, 업무 이메일, 문의유형, 문의내용, 동의
- 선택: 전화, 국가, 일정, 현재 환경
- 금지 안내: 주민등록번호, 계정 비밀번호, 보안키, 환자·금융정보, 내부 기밀

### 처리방침 필수 항목

- 처리 목적과 법적 근거
- 수집 항목, 수집 방법
- 보관기간과 파기 방법
- 외부 메일/CRM/호스팅/분석 처리자
- 국외 이전이 있다면 대상·국가·시점·방법
- 이용자 권리와 행사 방법
- 개인정보 책임자와 연락처
- 쿠키·분석 정책과 동의 철회

정책은 실제 설정을 기준으로 작성한다. 사용하지 않는 광고·제3자 제공 문구를 복사하지 않는다.

## 9. 접근성 기준

### 구조

- `html lang`, skip link, header/nav/main/footer landmark
- 페이지마다 하나의 명확한 H1
- DOM 순서와 시각 순서 일치
- 반복 블록을 건너뛸 수 있는 탐색

### 키보드·포커스

- Tab/Shift+Tab/Enter/Space/Escape로 모든 기능 사용
- 보이는 포커스, 메뉴·dialog 포커스 관리
- route 전환 후 페이지 제목 또는 main으로 합리적 포커스 이동
- sticky header가 포커스 요소를 가리지 않음

### 폼

- 영구 label, autocomplete, inputmode
- 필수 여부와 형식을 제출 전에 설명
- 오류 요약과 필드 `aria-describedby` 연결
- 성공 메시지를 live region으로 전달
- 시간 제한 없음

### 시각·미디어

- 일반 텍스트 4.5:1, 큰 텍스트 3:1 이상
- 200% 확대, 320 CSS px에서 양방향 스크롤 최소화
- 장식 이미지는 빈 alt, 정보 이미지는 동등한 텍스트
- 모션 감소 설정 준수

## 10. 검증 명령과 수동 점검

자동 검증은 [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)의 명령을 사용한다. 수동으로 다음을 반드시 수행한다.

1. 키보드만으로 모바일·데스크톱 메뉴, 언어 전환, 세 문의 유형 완료
2. VoiceOver로 홈 제목, 사업축, 폼 오류·성공 확인
3. 320px, 768px, 1440px에서 표·다이어그램·긴 한국어 확인
4. JavaScript 오류와 외부 서비스 실패 시 대체 경로 확인
5. 실제 운영 URL에서 header, canonical, robots, sitemap, JSON-LD 확인

## 11. 출시 차단 취약점

- secret 또는 개인정보가 클라이언트 번들·로그에 포함
- 폼 검증 우회로 HTML/헤더 인젝션 가능
- CSP/HSTS 등 필수 헤더 누락
- 문의 rate limit·스팸 방어 미검증
- serious/critical 접근성 오류
- 개인정보 처리방침과 실제 수집·도구 불일치
- 승인 없는 대외 claim
