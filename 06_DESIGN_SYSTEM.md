# BLRO 홈페이지 디자인 시스템

## 1. 콘셉트

**Enterprise Precision**: 큰 여백, 명확한 계층, 정교한 선과 데이터 흐름을 통해 기술 신뢰를 전달한다. 화려한 스타트업 장식이나 의미 없는 미래 이미지를 사용하지 않는다.

## 2. 디자인 원칙

| ID | 원칙 | 적용 |
|---|---|---|
| `DS-001` | Clarity before decoration | 한 화면에 하나의 핵심 주장과 CTA |
| `DS-002` | Evidence before claims | 수식어보다 구조·절차·근거 |
| `DS-003` | One system, three journeys | 공통 브랜드 안에서 고객·파트너·벤더 CTA를 구분 |
| `DS-004` | Accessible by default | 대비, 포커스, 키보드, 모션 감소를 토큰 단계에서 적용 |
| `DS-005` | Responsive information | 모바일에서 정보 순서를 바꾸되 내용을 삭제하지 않음 |

## 3. 색상 토큰

로고 원본이 확정될 때까지 다음을 구현 기준으로 사용하고, 변경은 토큰만 수정한다.

```css
:root {
  --color-canvas: #F7F9FC;
  --color-surface: #FFFFFF;
  --color-surface-alt: #EEF3F8;
  --color-ink: #102033;
  --color-ink-muted: #526579;
  --color-line: #D6E0EA;
  --color-brand: #0B5CFF;
  --color-accent: #00A8C6;
  --color-brand-strong: #073B9A;
  --color-success: #137A4B;
  --color-warning: #9A5B00;
  --color-danger: #B42318;
  --color-focus: #7C3AED;
}
```

- 본문 대비는 WCAG AA를 충족한다.
- cyan은 장식과 데이터 흐름에 제한하고 작은 본문 텍스트로 사용하지 않는다.
- 상태는 색상뿐 아니라 아이콘·제목·문장으로 구분한다.

## 4. 타이포그래피

- 한국어·UI: Pretendard Variable, 라이선스 확인 후 자체 호스팅
- 영문·숫자: Inter Variable
- 기술 코드·식별자: IBM Plex Mono
- 시스템 폴백: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

| 역할 | 크기/행간 | 무게 |
|---|---|---|
| Display | clamp(2.75rem, 6vw, 5.5rem) / 1.04 | 650 |
| H1 | clamp(2.25rem, 4.5vw, 4rem) / 1.1 | 650 |
| H2 | clamp(1.75rem, 3vw, 2.75rem) / 1.2 | 620 |
| H3 | 1.375rem / 1.35 | 620 |
| Lead | 1.25rem / 1.7 | 450 |
| Body | 1rem / 1.75 | 400 |
| Small | 0.875rem / 1.6 | 450 |

한국어 본문 한 줄은 데스크톱 42~68자, 모바일 24~38자를 목표로 한다.

## 5. 레이아웃

- 최대 콘텐츠 너비: `1200px`
- 본문 읽기 너비: `760px`
- 좌우 gutter: 모바일 20px, 태블릿 32px, 데스크톱 48px
- 12열 데스크톱, 8열 태블릿, 4열 모바일
- 섹션 간격: 72px 모바일, 120px 데스크톱
- breakpoint: 640, 768, 1024, 1280px

카드를 기본 레이아웃으로 남용하지 않는다. 관계를 보여주는 경우에는 리스트, 타임라인, 표, 다이어그램을 우선한다.

## 6. 형태와 표면

- radius: 작은 컨트롤 8px, 패널 16px, 강조 패널 24px
- border: 1px solid line token
- shadow: hover 장식이 아니라 계층 구분이 필요한 떠 있는 요소에만 사용
- gradient: 브랜드 흐름 배경에만 낮은 대비로 제한
- 아이콘: 1.75px stroke의 일관된 선형 세트

## 7. 핵심 컴포넌트

### Header

- 스크롤 전후에도 높이 변화로 레이아웃이 이동하지 않는다.
- 현재 경로, 펼침 상태, 키보드 roving, Escape 닫기를 지원한다.
- 모바일 메뉴 열림 시 배경 스크롤을 잠그고 닫을 때 포커스를 복귀한다.

### Hero

- eyebrow, H1, 보조문구, 1~3 CTA, 선택적 증거 또는 다이어그램
- CTA 3개가 있으면 한 개만 primary, 나머지는 secondary/text
- 배경 영상과 자동 재생을 사용하지 않는다.

### Capability index

- 4개 사업축을 같은 비중으로 보여주되 각 대상과 관련 경로를 명시한다.
- hover 없이도 모든 정보를 읽을 수 있다.

### Process timeline

- 분석 → 설계 → 검증 → 사업화 → 구축 → 안정화
- 모바일에서는 세로 흐름으로 바뀐다.

### Evidence block

- 승인된 프로젝트, 기술 문서, 자격 정보만 사용한다.
- 증거가 없으면 숫자 placeholder 대신 수행 방법을 보여준다.

### Inquiry selector/form

- 문의 유형 선택을 첫 단계로 제공한다.
- 필수/선택, 오류, 도움말, 개인정보 동의를 명시한다.
- 성공 상태에 접수 ID와 다음 절차를 제공한다.

## 8. 버튼과 링크

- Primary: 중요한 다음 행동 1개
- Secondary: 대체 행동
- Text link: 정보 탐색
- Destructive 스타일은 공개 사이트 문의 취소 외 사용하지 않는다.
- 버튼 레이블은 `문의하기`보다 `기술 프로젝트 상담`, `파트너 공동사업`, `한국 시장 진출`처럼 목적을 쓴다.
- 최소 터치 영역은 44×44px, 권장 48×48px다.

## 9. 상태와 피드백

| 상태 | 요구사항 |
|---|---|
| Loading | 레이아웃 크기를 유지하며 aria-busy 사용 |
| Empty | 원인·다음 행동·초기화 제공 |
| Validation | 필드와 오류 요약을 연결, 첫 오류로 포커스 이동 |
| System error | 접수 여부를 명확히 말하고 재시도 또는 다른 연락수단 제공 |
| Success | 완료 제목, 접수 ID, 예상 다음 단계 제공 |

## 10. 이미지와 다이어그램

우선순위:

1. BLRO가 직접 제작한 아키텍처·업무흐름 다이어그램
2. 공개 승인된 실제 프로젝트 이미지
3. 추상적이지만 사업 의미가 있는 데이터·연결 그래픽
4. 필요한 경우에만 라이선스가 확인된 스톡 이미지

금지: AI 로봇, 뇌, 악수, 이유 없는 서버랙, 읽을 수 없는 가짜 대시보드.

## 11. 모션

- 150~240ms의 짧은 상태 전환
- 화면 진입 애니메이션은 opacity와 작은 translate만 사용
- 스크롤 패럴랙스와 자동 재생 3D는 사용하지 않는다.
- `prefers-reduced-motion: reduce`에서 장식 모션을 제거한다.

## 12. 접근성 기본값

- skip link, landmark, 논리적인 heading 순서
- `:focus-visible`에 3px focus token
- dialog/menu focus trap과 Escape 종료
- 모든 폼에 영구 label과 오류 설명 연결
- 표는 caption과 header scope 제공
- 다이어그램은 텍스트 요약과 확대 기능 제공
- 200% 확대와 320px 폭에서 정보 손실 없음

검증 기준은 [07_SEO_SECURITY_ACCESSIBILITY.md](07_SEO_SECURITY_ACCESSIBILITY.md)와 [10_TEST_ACCEPTANCE.md](10_TEST_ACCEPTANCE.md)를 따른다.
