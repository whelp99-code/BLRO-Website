# BLRO redesign v2 — design contract

Scope: `docs/redesign-2026-09-motion/v2/` only. Does not change the live site, preview service, `publishingEnabled`, or `AGENTS.md`.

Extends `../DESIGN.md`. Corrects v1: the three audiences are separate experiences, not one path story. v1's sparse hero and 68px display size are rejected (owner: 그림도 없고 내용도 풍부하지 않음).

## 0. Research log

- Embedded references: inherited from v1 (`stripe.md` proof-led B2B shortlist, Cloudflare motion as mechanic only). v2 does not restyle toward Stripe or Cloudflare. Token source is AGENTS.md: warm paper, deep navy-green, customer teal, partner copper, engineer blue.
- Lazyweb / StyleGallery / Imagen: not re-run this turn. Atmospheric photos were not generated here (no image tool in this child). Slots and prompts are in `images/PROMPTS.md`. Drawn SVGs fill the space so the prototype is not empty.
- Owner motion research is running separately into `../research/`. Motion is isolated in `prototype/motion.css` and `prototype/motion.js` so that research can replace the module without rewriting copy.

## 1. Tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#12261c` | Headlines, diagram strokes. Deep navy-green. |
| `--ink-soft` | `#3c4a43` | Body |
| `--muted` | `#5c6b63` | Meta. Still ≥4.5:1 on paper. |
| `--paper` | `#f3efe6` | Page |
| `--paper-2` | `#e7e1d4` | Bands |
| `--card` | `#fffcf7` | Panels |
| `--line` | `#d4ccbe` | Hairlines |
| `--customer` | `#0b4f4c` | Customer labels and text, not a side stripe |
| `--customer-wash` | `#0b4f4c14` | Customer chapter ground |
| `--partner` | `#6e4524` | Partner labels and text |
| `--partner-wash` | `#6e452414` | Partner chapter ground |
| `--engineer` | `#1a3f73` | Engineer labels and text |
| `--engineer-wash` | `#1a3f7314` | Engineer chapter ground |
| `--signal` | `#1c6b45` | Verified / active diagram node |
| `--space-1`…`--space-8` | 4, 8, 12, 16, 24, 32, 48, 72 | Spacing only |
| `--radius-s` | 8px | |
| `--radius-m` | 16px | |
| `--font-display` | "Noto Serif CJK KR", "Noto Serif CJK JP", serif | Headings, left-aligned |
| `--font-body` | "Noto Sans CJK KR", "Noto Sans CJK JP", sans-serif | Body |
| `--font-mono` | "IBM Plex Mono", ui-monospace, monospace | Indexes |
| `--step-display` | `clamp(28px, 3.2vw, 40px)` | H1 cap. v1 68px rejected. |
| `--step-title` | `clamp(22px, 2.2vw, 28px)` | H2 |
| `--step-body` | 17px | Body, line-height 1.75 |
| `--step-meta` | 13px | |

No accent border on rounded surfaces. Audience color is a label and a wash, never `border-left`. Focus ring is the only colored edge: 2px `--ink`, offset 3px.

## 2. Motion module (swappable)

Files: `prototype/motion.css`, `prototype/motion.js`. Pages only add `data-step` on diagram segments and `data-reveal` on blocks.

Current module, pending `../research/`:

- Diagram segments start dim and reach full opacity as their section crosses the viewport. Opacity only, 500ms, `cubic-bezier(0.22, 1, 0.36, 1)`. No bounce, no infinite loop.
- Text reveal: opacity plus translateY(12px), within the current AGENTS.md 13px / ~0.5s chrome rule.
- `prefers-reduced-motion: reduce` and JS failure: every segment and paragraph is fully visible. JS adds `html.js` before dimming anything.

Exceeds the current AGENTS.md motion sentence: a drawn path can span more than 17px of the layout as the visitor scrolls, because the motion is a sequence of segment opacities along a diagram, not a 13px UI nudge. Duration is tied to scroll position, not a 0.5s timer for the whole story. Documented for the owner in the proposal. Do not edit AGENTS.md from this folder.

## 3. Primitives

- Wordmark: BLRO plus a 6px signal square. No third-party logo.
- Primary button: `--ink` fill, paper label, min-height 44px, radius `--radius-s`.
- Secondary button: transparent, ink hairline, same hit area.
- Audience kicker: mono label in the audience color.
- Diagram panel: `--card`, radius `--radius-m`, hairline, no heavy shadow.
- Fact callout: paper-2 band, no fake metrics.
- Permission slot: dashed hairline, label only. Not a fake product photo.

## 4. Accessibility

- Body contrast ink on paper above 7:1.
- Skip link, visible focus, labels on any form-like links.
- Motion is not the only carrier. Each step has text.
- Touch targets ≥44px.

## 5. Accepted debt

- Prototype is three static pages, not the production app.
- Partner and engineer full routes are drafted in the proposal and shown as chapters on the home prototype, not as separate HTML files (task named three prototype files).
- Atmospheric photographs are slots plus prompts, plus drawn SVGs. Not claimed as site photography or case studies.
- Sangfor page body was not re-fetched this session (Cloudflare block). Product behavior stays `확인 필요`.
