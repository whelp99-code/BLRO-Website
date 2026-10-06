# 모션 트렌드 조사 — BLRO 리디자인 참고

조사일: 2026-09-30 (KST). 라이브 사이트는 headless Chrome 1440×900, 상단·약 0.92뷰포트·약 1.85뷰포트, 모바일 390 상단을 캡처했다. 기법 열은 DOM에서 센 canvas/video/Web Animations 개수와 화면을 보고 한 **추정**이다. Lighthouse·INP는 측정하지 않았다. `prefers-reduced-motion`은 이번 세션에서 미디어 에뮬레이션을 돌리지 않아 **미측정**이다.

정본 제약: `AGENTS.md`의 절제된 한국 엔터프라이즈 에디토리얼, 비주얼은 실제 업무를 설명할 것, 현재 모션 규칙(13px 세로 / 17px 가로, 약 0.5초, 작은 스태거, 바운스·무한 모션 금지, JS 실패 시 내용 유지). 이 문서는 규칙을 바꾸지 않는다. 아래 제안문은 소유자 승인용이다.

## 1. 2025–2026 트렌드

지금 웹 모션의 중심은 “더 많은 효과”가 아니라 **스크롤이 타임라인이 되는 이야기**와 **성능을 해치지 않는 절제**다.

| 패턴 | 상태 | 근거 |
| --- | --- | --- |
| CSS scroll-driven (`animation-timeline: scroll()` / `view()`) | 주류로 올라옴. 진행 바, 시차, 등장, 스티키 헤더를 JS 없이 합성기 스레드에서 처리 | Chrome 문서, Bramus, 2023-05-05 게시, 초기 구현 Chrome 115 (2023-07). [developer.chrome.com/docs/css-ui/scroll-driven-animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations). 2026-07-21 가이드는 주요 브라우저 안정 지원을 전제. [cssawwwards.com 가이드](https://cssawwwards.com/blog/css-scroll-driven-animations-guide-2026) |
| 스크롤리텔링 / 핀 스토리 | 마케팅·제품 설명의 기본 문법. 정적인 쇼케이스보다 서사 점수가 높다는 주장이 반복됨 | MotionKit, 2026-07-18. [motionkit.io/blog/web-animation-trends-2026](https://motionkit.io/blog/web-animation-trends-2026) |
| 키네틱 타이포 / 스플릿 텍스트 | 에이전시·어워드 사이트에서 여전. B2B 본문에는 과함 | 같은 MotionKit 글. InspireFusion, 약 2026-06. [inspirefusion.com](https://www.inspirefusion.com/web-design-inspiration-trends-2026/) |
| 벤토 그리드 + 짧은 리빌 | 제품 기능 나열의 기본 레이아웃 (Apple, Linear, Vercel가 예로 거론) | InspireFusion 2026 트렌드 글 |
| 제품 UI 목업이 스스로 움직임 | IT/핀테크 히어로의 실무 표준. 장식 3D보다 이해에 유리 | 이번 방문: Linear, Stripe, Vercel, Framer, Datadog |
| 3D / WebGL 히어로 | Awwwards 창작 부문에서는 우세. 기업 IT 홈에는 비용 대비 이해가 나쁨 | Digital Strategy Force, 2026-03-12, “2026 Q1 SOTD의 61%가 몰입형 3D” — **에이전시 주장이지 Awwwards 공식 통계가 아님**. [글](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/). MotionKit은 WebGL을 “가장 남용하기 쉬운 트렌드”로 경고 |
| 커서 추종·마그네틱 버튼 | 에이전시 사이트에 남음. 터치에서 죽음. 엔터프라이즈에 과함 | MotionKit §7 |
| 스무스 스크롤 / 스크롤 하이재킹 | 잘하면 고급, 못하면 가장 미움받는 패턴 | MotionKit §8. BLRO에는 금지에 가깝다 |
| GSAP (ScrollTrigger, SplitText) | 2025-04부터 전 플러그인 무료라는 2차 보고. 복잡한 20%용. 단순 80%는 CSS | MotionKit이 [webflow.com/blog/gsap-becomes-free](https://webflow.com/blog/gsap-becomes-free)를 인용. 해당 블로그 본문은 JS 렌더라 이번 fetch에서 날짜 문장을 직접 확인하지 못함 |
| Lottie / Rive | 아이콘·상태 일러스트에는 유효. 히어로 마스코트는 엔터프라이즈에서 설명력이 약함 | 방문 사이트 DOM에서 lottie 플레이어는 거의 안 잡힘 |
| View Transitions API | 같은 출처 페이지 전환의 표준 후보. 역할 홈 사이 크로스페이드에 적합 | Chrome 문서 제목만 확인: [developer.chrome.com/docs/web-platform/view-transitions](https://developer.chrome.com/docs/web-platform/view-transitions). 게시일은 이번 추출에서 미확인 |
| 숫자 카운트업·무한 마키 | 아직 흔함. 근거 없는 숫자·끝없는 움직임은 BLRO 금지 사항과 충돌 | 이번 방문: Stripe GDP 카운터, Cloudflare 로고 마키(일시정지 버튼 있음) |

**시들고 있거나 과용으로 보는 것:** 풀페이지 WebGL, 커서 이펙트, Lenis/ScrollSmoother류 관성 스크롤, 바운스 등장, 의미 없는 구체·네온, 균등 카드 벽 위의 장식 호버, 무한 마키를 “살아 있음”의 증거로 쓰는 습관. 2026년 글들이 공통으로 말하는 필터는 INP와 `prefers-reduced-motion`이다. MotionKit은 “사이트의 43%가 INP 200ms에 실패하고, 무거운 JS 애니메이션이 원인으로 지목된다”고 Digital Applied를 인용한다. 그 43%는 이번 조사에서 재측정하지 않았다.

Really Good Designs의 2026 목록(VR 웹, 시네마틱 히어로, 혼합 스크롤 방향)은 어워드·브랜드 캠페인 쪽이다. BLRO 세 역할 허브에 그대로 가져오면 5초 안 역할 인지 규칙을 깬다. [reallygooddesigns.com/web-design-trends-2026](https://reallygooddesigns.com/web-design-trends-2026/)

## 2. 방문 기록

캡처: `captures/{id}-d-top.png`, `-d-mid.png`, `-d-low.png`, `-m-top.png`. 도구: omowright `connectPipe` + `/usr/bin/google-chrome --headless=new`, 1440×900, 대기 약 2.8초. 쿠키 배너는 거절 버튼이 텍스트로 잡힐 때만 닫았다. 한국 IP로 보여 Datadog·NVIDIA는 한국어/한국 리전이 섞였다.

| ID | URL | 무엇이 움직이나 (관찰+추정) | 이해에 도움? | 성능 체감 | 인프라를 어떻게 보여 주나 |
| --- | --- | --- | --- | --- | --- |
| cloudflare | https://www.cloudflare.com/ | 히어로는 거의 정지한 오렌지 면. 중단에 점묘 지구(canvas 1, video 1, Web Animations 230). 하단에 로고 마키와 일시정지 | 지구는 “가까운 네트워크”를 그림으로 말함. 230개 애니메이션은 과할 수 있음 | 히어로는 가벼워 보임. 중단 canvas는 무거울 가능성. 미측정 | 지역=지구 한 장 + 세 문장. 다이어그램이 카피보다 앞 |
| vercel | https://vercel.com/ | 히어로 삼각형(canvas 1, 애니메이션 1). 스크롤하면 제품 채팅 목업이 정적으로 등장 | 목업이 “에이전트가 인프라 위에서 일한다”를 보여 줌. 삼각형 자체는 장식 | 상단 PNG가 매우 작음. 체감 빠름 | 인프라를 제품 UI로 치환. 토폴로지 없음 |
| linear | https://linear.app/ | 히어로가 앱 크롬 그 자체. 이슈·활동이 방금 일어난 것처럼 갱신(애니메이션 85, canvas 0). 스크롤 시 다른 화면으로 교체 | 이해가 가장 좋음. 모션이 제품 상태 변화 | 다크 UI, 영상 없음. 체감 좋음 | 인프라가 아니라 업무 화면. BLRO가 빌려야 할 것은 “화면이 설명”이라는 점 |
| stripe | https://stripe.com/ | 그라디언트 리본, GDP 소수 카운터, canvas 2. 아래는 결제·청구 목업이 크게 고정 | 목업은 도움. GDP 카운터는 신뢰 연출이지 구조 설명이 아님. BLRO는 미검증 숫자를 이렇게 쓰면 안 됨 | 히어로가 무거워 보이지는 않음. 미측정 | 금융 인프라를 UI 조각으로 분해 |
| datadog | https://www.datadoghq.com/ | 한국어 홈. 기울어진 대시보드 정물. video 11, 애니메이션 0. 중단은 로고 벽과 이벤트 | 대시보드는 “무엇을 보나”를 보여 주지만 숫자가 가짜 데모. 11개 영상은 비용 | 히어로 이미지가 큼 | 관측 가능성을 가짜 차트 한 장으로 |
| supabase | https://supabase.com/ | 벤토 3열. 코끼리·인증 폼·지구 격자. 애니메이션 15. 호버 마이크로 추정 | 기능=카드=작은 그림. 엔터프라이즈에 가장 가까운 밀도 | 가벼워 보임 | 플랫폼을 아이콘 카드로. 깊은 다이어그램은 히어로에 없음 |
| raycast | https://www.raycast.com/ | 풀블리드 레드 모션 배경(canvas 1, 애니메이션 44). 카피는 중앙 | 아름다우나 제품 설명이 아님. BLRO 히어로로 가져오면 규칙 위반 | 배경이 계속 사는 종류. 배터리·reduced motion 위험 | 없음 |
| framer | https://www.framer.com/ | 히어로가 디자인 에이전트 채팅. video 4, 애니메이션 25. 쿠키 배너가 하단을 가림 | 제품이 히어로. 영상 자동재생은 BLRO에 과함 | 영상 다수. 미측정 | 없음 |
| nvidia-dc | https://www.nvidia.com/en-us/data-center/ | 데이터센터 사진 + 쿠키 모달. 애니메이션 22. 거절 후에도 모달이 캡처에 남음 | 사진이 실물을 보여 줌. 모달이 본문을 가려 실패 | 사진 히어로. 체감 보통 | 랙 사진. 구조도는 모달 아래라 이번 샷에서 미확인 |
| crowdstrike | https://www.crowdstrike.com/en-us/ | Fal.Con 2026 이벤트 히어로, 캐러셀 점. 애니메이션 0. 쿠키 바가 하단을 덮음 | 행사 홍보가 제품 설명을 밀어냄. BLRO가 피해야 할 홈 | 사진 큼 | 보안 제품을 구조로 보여 주지 않음 |
| nutanix | https://www.nutanix.com/ | HCI 경쟁사. 매직 쿼드런트 3열 + 쿠키 모달. 애니메이션 0 | 수상 카드가 본문. 아키텍처 설명은 첫 두 스크롤에 없음 | 정적으로 보임 | 다이어그램 대신 애널리스트 로고 |
| sangfor | https://www.sangfor.com/ | **라이브 실패.** Cloudflare “Sorry, you have been blocked”. Wayback 2026-07-24 스냅샷 헤더는 있었으나 본문 압축이 깨져 카피를 확인하지 못함 | 비교 불가 | — | — |
| samsungsds | https://www.samsungsds.com/kr/index.html | 대형 한글 히어로가 이메일 수집 거부 모달에 가려짐. 애니메이션 8 | 모달이 첫 화면을 망침. 뒤 히어로는 슬로건 중심 | 미측정 | 이번 샷에서는 카드형 홍보 |
| lgcns | https://www.lgcns.com/ | 뉴스 히어로 + 사진. 스크롤이 문서 스크롤이 아니거나, 거절 클릭이 법적 고지 페이지로 이동. mid/low는 고지문 | 기업 뉴스 포털. 모션으로 일을 설명하지 않음 | 정적인 편 | 없음 |
| nhncloud | https://www.nhncloud.com/kr | 다크 블루 곡선 배경 + 공지 모달. 애니메이션 0 | 모달이 히어로를 가림. 배경 곡선은 장식 | 가벼워 보임 | 가려져 미확인 |
| navercloud | https://www.ncloud.com/ | 파티클 히어로(video 2) + 뉴스 캐러셀. 아래는 서비스 아이콘 레일 | 파티클은 “AI/보안” 분위기만. 서비스 레일이 실제 목록 | 영상 2. 체감 보통 | 아이콘 카테고리. 토폴로지 없음 |
| ktcloud | https://cloud.kt.com/ | 보라 그라디언트 캠페인 배너, 공지 목록이 히어로 아래. 애니메이션 5 | 이벤트 날짜가 먼저. 제품 구조는 안 보임 | 가벼워 보임 | 없음. 운영 공지가 홈의 일 |

공통: 한국 엔터프라이즈 클라우드는 **캠페인 배너 + 공지 + 모달**이고, 글로벌 제품 회사는 **움직이는 제품 화면**이다. BLRO는 후자의 설명 방식만 가져오고, 전자의 공지 밀도(엔지니어 홈)와 상담 CTA(고객·파트너)를 유지하는 쪽이 맞다.

## 3. BLRO에 쓸 패턴 (순위)

세 청중: 기업 고객(도입·운영 상담), 국내 파트너(협력 제안), 기술 엔지니어(기술 자료).

### 1. 스크롤에 묶인 업무 경로 (CSS view timeline)

- 참고: Cloudflare “Region: Earth” — 한 그림이 한 문장을 증명. 장식 지구를 베끼지 말고, BLRO 라이프사이클(도입 → 전환 → 구축 → 운영 → 기술지원) 노드를 같은 방식으로.
- 누구: 고객은 순서를, 파트너는 자기 구간을, 엔지니어는 산출물 이름을 본다.
- 구현: `animation-timeline: view()`, transform/opacity/stroke-dashoffset만. GSAP 불필요.
- 비용: 합성기 친화. reduced motion이면 완성된 경로를 즉시 표시.
- 현재 규칙: 이동 거리 13/17px는 **시간 기반 등장**에만 남기고, 스크롤 연동 경로 드로잉은 타이머 이동이 아니므로 예외로 적는다.

### 2. 스티키 한 장면 + 단계 카피

- 참고: Linear 히어로가 화면을 갈아 끼우는 방식. BLRO는 앱 위조가 아니라 R&R 표·역할 맵·체크리스트를 스티키 스테이지에 둔다. 스크롤 소유자는 문서.
- 누구: 고객 여정, 파트너 역할 분담, 엔지니어 설치 순서. 한 섹션에 청중 하나만.
- 구현: `position: sticky` + view timeline으로 활성 노드만 신호색. JS는 진행 단계를 `aria-current`로 미러링하는 정도.
- 비용: 낮음. 핀이 모바일에서 뷰포트를 삼키지 않게 스테이지 높이를 제한.
- 규칙: 무한 루프 없음. 스크롤을 멈추면 장면도 멈춘다.

### 3. 설명하는 제품 계기판 (정적 SVG + 한 단계 하이라이트)

- 참고: Stripe 결제 목업, Vercel 에이전트 채팅, Supabase 벤토의 작은 그림. Datadog 기울어진 가짜 대시보드는 **피한다** (검증 안 된 숫자).
- 누구: 고객은 “무엇이 연결되나”, 엔지니어는 포트·구성 요소 이름, 파트너는 제안서에 넣을 범위.
- 구현: SVG. 스크롤 또는 호버로 한 노드만 `--signal`. 영상·Lottie·WebGL 없음.
- 비용: 매우 낮음.
- 규칙: 호버는 링크·버튼·노드에만, opacity와 1px translate.

### 4. 짧은 등장 (기존 13/17px 규칙 유지)

- 참고: Linear의 절제. Raycast·Framer의 상시 배경 모션은 반례.
- 구현: 섹션 진입 시 opacity + 12px, 420–500ms, 스태거 70ms, `cubic-bezier(0.22, 1, 0.36, 1)`. IntersectionObserver 실패 시 최종 상태.
- 비용: 무시할 수준.
- 규칙: 이 항이 현행 규칙의 본체다. 바꾸지 않는다.

### 5. 역할 홈 사이 짧은 페이지 전환

- 참고: View Transitions API (Chrome 문서). 어워드 사이트의 전환 남용은 참고하지 않음.
- 누구: 고객/파트너/엔지니어 전환이 “다른 사이트”가 아니라 “같은 책의 다른 장”임을 보여 줌.
- 구현: 같은 출처 `document.startViewTransition` 또는 CSS cross-document. 크로스페이드 200–300ms. 미지원 브라우저는 즉시 전환.
- 비용: 낮음. reduced motion이면 전환 없음.
- 규칙: 새 허용 항목으로 명시해야 한다. 기본 규칙은 페이지 전환을 말하지 않는다.

### 6. 근거 있는 숫자만, 카운트업 없이

- 참고: Stripe GDP 카운터는 그들 숫자다. BLRO는 고객 수·절감률·SLA를 만들지 않는다.
- 구현: 승인된 사실만 정적 표기. 카운트업은 승인 사실이 있어도 기본 끄기. 넣더라도 reduced motion에서 최종값.
- 이것이 “패턴”이라기보다 금지의 예외 조건이다.

### 7. 마키는 쓰지 않거나, 정지 로고 줄

- 참고: Cloudflare는 일시정지가 있다. 그래도 무한 모션이다.
- BLRO: 고객 로고를 발명하지 않는다. 승인된 제조사 워드마크만, 정지 그리드.

**피할 것:** WebGL/Three/Spline 히어로, 커서 추종, 스크롤 스무딩, 바운스, 무한 마키, 자동재생 영상, Lottie 마스코트, 키네틱 슬로건, 균등 카드 벽, 의미 없는 구체·네온, 검증 안 된 카운트업, CrowdStrike형 행사 히어로, 한국 클라우드형 “배너가 홈을 대체”.

GSAP/Lottie/Rive/WebGL을 기본 스택에 넣지 않는다. CSS scroll-driven으로 안 되는 경로 모핑이 실제로 생기면 그때 한 섹션에만 GSAP를 검토한다. 지금은 그 필요가 없다.

## 4. 승인용 모션 규칙 문장

현행 문장 유지 + 아래를 치환 제안한다. 승인 전에는 `AGENTS.md`를 고치지 않는다.

> 모션은 실제 업무의 한 단계를 보여 줄 때만 쓴다. 시간 기반 등장은 세로 12px·가로 16px 이내, 420–500ms, 스태거 70ms, 바운스 없음. 스크롤 연동은 CSS `animation-timeline: view()` 또는 `scroll()`로, transform·opacity·stroke만, 문서 스크롤을 빼앗지 않는다. 이야기 섹션당 스티키 스테이지는 하나. 호버는 링크·버튼·다이어그램 노드에만 opacity 또는 1px 이동. 페이지 전환은 역할 홈 사이 300ms 이내 크로스페이드만 허용하고, 미지원·reduced motion에서는 즉시 전환한다. 무한 반복, 커서 추종, 스크롤 하이재킹, WebGL, 자동재생 영상, 카운트업, 모션만으로 전달되는 의미는 금지한다. JavaScript 실패, IntersectionObserver 실패, `prefers-reduced-motion: reduce`에서는 완성된 내용이 즉시 보인다. 숫자는 승인된 사실만 정적 표기한다.

## 5. 하지 않은 것

- Lighthouse, INP, reduced-motion 에뮬레이션, 데스크톱 비헤드리스에서의 60fps 확인.
- Sangfor 라이브 본문. VMware/Broadcom은 이번 목록에서 빠졌다.
- NVIDIA·Nutanix·CrowdStrike·삼성SDS·NHN Cloud는 쿠키/공지 모달이 첫 화면을 가린 채 캡처됐다. 모달 뒤 모션은 미확인.
- LG CNS 중단 캡처는 법적 고지 페이지다. 홈의 스크롤 모션으로 쓰지 말 것.
