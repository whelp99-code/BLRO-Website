# Prototype v2.2 — motion patterns

Scope: `v2/prototype/*` and `v2/captures/`. No deploy, no commit, no DNS, preview service untouched, `AGENTS.md` not edited.

## What changed

1. Scroll-linked lifecycle (`index.html`). The service path uses `stroke-dashoffset` and dot opacity on `animation-timeline: --life` (`view()`). Step labels stay full contrast. Progress is the green stroke, not a fake metric.
2. Partner sticky stage (`#partner`). Left steps (공동 영업 → 공동 제안·PoC → 구축 → 운영 인수 → 자료) scroll; the right R&R row highlights with a copper wash, not a side stripe. `aria-live` names the active row. Below 800px, sticky is off and rows stack at full contrast.
3. HCI instrument (`product-hci.html`). Four layers (컴퓨트, 스토리지, 네트워크, 관리) assemble with opacity and `translateY(12px)` on a view timeline. Labeled 검토용 분해도. No node counts, performance, or license figures.
4. Time-based reveal. 12px / 500ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 70ms, cap 5. No bounce, no loop.
5. Cross-page view transitions. `@view-transition { navigation: auto; }`, root cross-fade 300ms, `header.site` named `site-header`. Reduced motion sets `navigation: none`.
6. Photos, each with caption `생성 이미지(분위기 연출용, 실제 사례 아님)`, `loading="lazy"`, width 1280 height 720: home `01-aisle.jpg` (existing band), engineer `04-abstract.jpg`, customer `02-ops.jpg` and `05-migration.jpg`, HCI `03-bench.jpg`.

## Feature detection and fallbacks

- `CSS.supports('animation-timeline: view()')` adds `html.js-timeline`. Otherwise IntersectionObserver adds `is-in` and, for the lifecycle, writes `stroke-dashoffset` once per intersection (not on a scroll loop).
- If both timeline and IntersectionObserver are missing, or `prefers-reduced-motion: reduce`, nothing is dimmed. Default CSS is the finished diagram.
- `?y=NNNN` is a capture aid: scroll after load and mark in-view blocks `is-in`.
- View Transitions API unsupported: the browser navigates instantly.

## Captures

Headless Chrome 151 via puppeteer-core, 1440×900 and 390×844, top plus three scroll fractions (0.33 / 0.62 / 0.88), plus reduced-motion (`--force-prefers-reduced-motion`) at top and 0.62. Files in `v2/captures/` named `{page}-{width}-[rm-]y{scroll}.png`.

Reviewed: path draws (dashoffset 100 → 0 while scrolling), photo captions sit on paper not on the image, partner highlight tracks the step, mobile drops sticky, reduced motion shows the full lifecycle and instrument. Mid-reveal frames can look faint for up to 500ms; settled text is full opacity.

## Remaining

Closed this pass. The exit fade (`is-clear`) is removed. The last partner step has no extra min-height and `#partner` has no trailing padding, so the sticky track ends with the last row and the card stays visible until the engineer section (`index-1440-partner-end-y5531.png`). As that block scrolls off, the top of the card still passes under the sticky header (`index-1440-partner-end-y5951.png`); that is ordinary scroll-off, not an empty right column. Reveals start at opacity 0.65 and 12px, so copy is readable before the 500ms settle. Reduced motion and no-JS still show the finished state. Mobile partner table stays static (`index-390-partner-y3675.png`).

## Exceeds current AGENTS.md motion rule (proposal only)

Owner approval would unlock, and this prototype already does, the following beyond “13px vertical or 17px horizontal, around 0.5 seconds”:

- The lifecycle stroke travels the full diagram height, not 17px, and its duration is scroll-linked rather than a 0.5s timer.
- Sticky stage swaps are scroll-positioned, not a 0.5s nudge.
- View transition is 300ms (within “around 0.5s”) but is a cross-document fade, which the current sentence does not name.

Still inside the rule: reveal distance 12px, 500ms, 70ms stagger, no bounce, no infinite motion, no WebGL, no cursor-follow, no count-up, no scroll hijack, no autoplay video. Reduced motion, no-JS, and unsupported timeline keep every label and layer visible.
