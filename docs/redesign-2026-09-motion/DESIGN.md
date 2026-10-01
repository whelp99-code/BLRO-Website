# BLRO motion redesign — design contract

Scope: prototype and proposal only. Does not change the live site, preview service, or `publishingEnabled`.

## 0. Research log

- Embedded references: shortlist `stripe.md` (proof-led B2B), `linear.app.md` (quiet product chrome), Cloudflare live marketing (owner motion reference, not in the brand index). Pick: Cloudflare motion mechanics + BLRO's own public/local brand, not a Stripe clone. Cloudflare orange, wordmark, and copy are not reused.
- Lazyweb: skipped. Network recipe not required; the owner named two concrete references (cloudflare.com and the BLRO projects) and those were viewed in a real browser.
- StyleGallery: skipped as a fetch. Spatial pattern used: split hero (copy left, instrument right) with a sticky scroll-story for "how it works". Scroll owner is the document; the diagram stage is sticky inside one section.
- Imagen drafts: skipped. No image-generation lane was run; the contract is the existing BLRO screens plus the prototype itself.

Direction, one sentence: a paper-and-ink operations desk where a single infrastructure path lights up as the visitor scrolls, so the offer is a sequence of decisions, not a product grid.

## 1. Tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#102033` | Headlines, diagram strokes |
| `--ink-soft` | `#3d4d63` | Body |
| `--paper` | `#f4f1ea` | Page |
| `--paper-2` | `#ebe6dc` | Bands |
| `--card` | `#fffcf7` | Instrument panel |
| `--line` | `#d7d0c4` | Hairlines |
| `--signal` | `#1f7a4d` | Verified / active node (local brand green) |
| `--action` | `#1d4ed8` | One primary action (live site blue) |
| `--copper` | `#8a5a32` | Partner accent, text only, never a side stripe |
| `--space-1` | `4px` | |
| `--space-2` | `8px` | |
| `--space-3` | `12px` | |
| `--space-4` | `16px` | |
| `--space-5` | `24px` | |
| `--space-6` | `32px` | |
| `--space-7` | `48px` | |
| `--space-8` | `72px` | |
| `--space-9` | `112px` | |
| `--radius-s` | `8px` | |
| `--radius-m` | `16px` | |
| `--radius-l` | `28px` | |
| `--font-display` | Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif | |
| `--font-mono` | "IBM Plex Mono", ui-monospace, monospace | Eyebrows, step indexes |
| `--step-display` | `clamp(40px, 6vw, 68px)` | |
| `--step-title` | `clamp(28px, 3vw, 40px)` | |
| `--step-body` | `17px` | |
| `--step-meta` | `12px` | |

No accent border on rounded cards. Selection is a filled signal node plus a check, not a colored side stripe.

## 2. Motion tokens

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur-fast` | `180ms` |
| `--dur-mid` | `420ms` |
| `--dur-story` | scroll-linked, not a timer |
| `--stagger` | `70ms` |

Scroll-linked path draw uses `animation-timeline: view()`. Hover only on links and buttons: opacity and 1px translate, never layout. `prefers-reduced-motion: reduce` shows the completed path and skips counters.

## 3. Primitives

- Wordmark: BLRO plus a 6px signal bar. No third-party logo.
- Primary button: `--action` fill, white label, radius pill.
- Secondary button: paper fill, ink hairline.
- Step index: mono `01` in `--ink-soft`.
- Path node: 12px circle, inactive `--line`, active `--signal`.
- Instrument panel: `--card` on `--paper`, radius `--radius-l`, no drop shadow heavier than `0 12px 40px rgb(16 32 51 / 0.06)`.

## 4. Accessibility

- Contrast of ink on paper stays above 7:1 for body.
- Motion is not the only carrier of meaning; each step has visible text.
- Focus rings use `--action` outline, 2px, offset 3px. That is the only colored edge.
- Reduced motion is mandatory, not optional polish.

## 5. Accepted debt

- Prototype is one static page, not the production Next app.
- Live site and local 2.1.0 are not visually unified yet. This file records the proposed merge, not the current production CSS.
