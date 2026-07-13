# BLRO Website Design System

## 0. Research Log

- Embedded references: shortlisted Linear, Stripe, and IBM-style enterprise systems; selected `minimalist-skill.md` + `linear.app.md` for editorial restraint, precise hierarchy, and engineered interaction states. The light BLRO palette and approved typography override the references' dark palette and Inter preference.
- Lazyweb: 4 queries, 32 results, 6 desktop screens viewed. Reused the low-density hero, immediate proof rail, first-class partner path, and low-chrome capability modules found across Equinix, SentinelOne, ScienceLogic, Zscaler, Paddle, and Checkout.com.
- Imagen: 8 concept sections inspected. Selected `01-hero.png` as the primary composition contract and the full set as a shared visual grammar: warm off-white paper, deep navy fields, cyan route lines, hairline coordinates, and clipped technical edges.
- Source constraints: `01_BLUEPRINT.md`, `04_INFORMATION_ARCHITECTURE.md`, `05_CONTENT_STRATEGY.md`, and `06_DESIGN_SYSTEM.md` remain authoritative. No reference logo, copy, customer mark, metric, dashboard, map coordinate, or product claim is copied.

## 1. Atmosphere & Identity

BLRO feels like a calm technical dossier: spacious, exact, and evidence-led. The signature is **Precision Cartography**, a thin cyan signal line that connects decisions, audiences, and outcomes across warm paper and deep navy technical fields. It is structural, not decorative: the line always explains flow, sequence, or relationship.

Design principles:

1. Clarity before decoration.
2. Evidence before claims.
3. One system, three journeys.
4. Accessible by default.
5. Responsive information without deleted content.

## 2. Color

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Canvas | `--color-canvas` | `#F7F9FC` | Page background |
| Surface | `--color-surface` | `#FFFFFF` | Reading surfaces and controls |
| Surface alternate | `--color-surface-alt` | `#EEF3F8` | Quiet grouping and disabled backgrounds |
| Navy field | `--color-field` | `#071B33` | Technical diagrams and high-contrast sections |
| Ink | `--color-ink` | `#102033` | Primary text |
| Muted ink | `--color-ink-muted` | `#526579` | Supporting text |
| Inverse ink | `--color-ink-inverse` | `#F7F9FC` | Text on navy |
| Line | `--color-line` | `#D6E0EA` | Dividers and control outlines |
| Brand | `--color-brand` | `#0B5CFF` | Primary action only |
| Brand hover | `--color-brand-strong` | `#073B9A` | Primary hover/active |
| Signal | `--color-accent` | `#00A8C6` | Flow lines and selected technical markers |
| Success | `--color-success` | `#137A4B` | Confirmed state |
| Warning | `--color-warning` | `#9A5B00` | Caution state |
| Danger | `--color-danger` | `#B42318` | Validation/destructive state |
| Focus | `--color-focus` | `#7C3AED` | Keyboard focus ring |

### Rules

- Body text uses ink or muted ink; cyan is never small body text.
- Brand blue is reserved for the one primary action in a local decision group.
- State always has text or icon support; color alone never carries meaning.
- Raw colors are forbidden outside the token declaration.
- Dark mode is not part of the MVP.

## 3. Typography

### Families

- Korean and UI: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif`.
- English and numerals use the same stack until an approved Inter asset is supplied; system geometric features are preferred over a network font.
- Technical labels: `"IBM Plex Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace`.
- No remote font request is allowed. Local font files require license and source approval before addition.

### Scale

| Role | Token | Size / line height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Display | `--type-display` | `clamp(2.75rem, 6vw, 5.5rem) / 1.04` | 650 | `-0.045em` |
| H1 | `--type-h1` | `clamp(2.25rem, 4.5vw, 4rem) / 1.1` | 650 | `-0.035em` |
| H2 | `--type-h2` | `clamp(1.75rem, 3vw, 2.75rem) / 1.2` | 620 | `-0.025em` |
| H3 | `--type-h3` | `1.375rem / 1.35` | 620 | `-0.015em` |
| Lead | `--type-lead` | `1.25rem / 1.7` | 450 | `-0.01em` |
| Body | `--type-body` | `1rem / 1.75` | 400 | `0` |
| Small | `--type-small` | `0.875rem / 1.6` | 450 | `0` |
| Eyebrow | `--type-eyebrow` | `0.75rem / 1.4` | 650 | `0.12em` |
| Control | `--type-control` | `0.9375rem / 1.25` | 650 | `0` |

Korean body lines target 42–68 characters on desktop and 24–38 on mobile. `word-break: keep-all` is used where it prevents orphaned particles without causing overflow; long technical identifiers may break.

## 4. Spacing & Layout

Base unit: 4px.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | `4px` | Hairline offset |
| `--space-2` | `8px` | Icon/label gap |
| `--space-3` | `12px` | Compact control gap |
| `--space-4` | `16px` | Default inner gap |
| `--space-5` | `20px` | Mobile gutter |
| `--space-6` | `24px` | Control and content group |
| `--space-8` | `32px` | Tablet gutter and grouped modules |
| `--space-10` | `40px` | Large component rhythm |
| `--space-12` | `48px` | Desktop gutter |
| `--space-18` | `72px` | Mobile section gap |
| `--space-24` | `96px` | Intermediate section gap |
| `--space-30` | `120px` | Desktop section gap |

- Maximum content width: `1200px`; prose width: `760px`.
- Gutters: 20px mobile, 32px tablet, 48px desktop.
- Grid: 4 columns mobile, 8 tablet, 12 desktop.
- Breakpoints: 640px, 768px, 1024px, 1280px.
- Content ordering may change responsively, but content is never removed.
- Cards are not the default. Lists, timelines, rules, and diagrams express relationships first.

## 5. Components

### Button

- Structure: native `button`, optional icon, label, loading indicator.
- Variants: `primary`, `secondary`, `text`, `danger`.
- Sizes: `default` (48px minimum), `compact` (44px minimum), `icon` (44×44px minimum).
- States: default, hover, active, focus-visible, disabled, loading, error/danger.
- Accessibility: icon-only requires an accessible name; loading uses `aria-busy` and preserves width; disabled uses the native attribute; focus uses the focus token.
- Motion: 160ms color/transform transition; active translates by 1px; reduced motion removes transform.

### Action Link

- Structure: native anchor with explicit destination and descriptive label.
- Variants: `inline`, `standalone`, `muted`.
- States: default, hover, active, focus-visible, visited where appropriate, disabled.
- Accessibility: disabled links use `aria-disabled`, cannot navigate or invoke handlers, and leave the tab order. Underlines or directional marks do not rely on color alone.

### Container

- Constrains content to 1200px and applies responsive gutters.
- Variants: standard and prose.
- Never introduces vertical spacing; Sections own vertical rhythm.

### Section

- Semantic section wrapper with optional labelled heading reference.
- Tones: canvas, surface, alternate, navy.
- Spacing: compact, default, generous mapped to tokens.
- Navy preserves inverse contrast and is reserved for a real change in information mode.

### Typography

- `Heading`: levels 1–3 with display option; no visual level may change semantic heading level.
- `Text`: lead, body, small, inverse variants.
- `Eyebrow`: short technical category label; uppercase only for Latin text.
- All primitives accept semantic content and additive class names without bypassing tokens.

### Prose

- Reading width 760px, predictable heading/list/link rhythm, visible focus, and Korean line-breaking safeguards.
- Raw MDX remains restricted to the content pipeline allowlist.

### Signal Route

- A labelled `figure` that explains a real input-to-output relationship through five nodes, a cyan route, coordinate hairlines, and the off-white/navy threshold.
- Generic `INPUT 00` and `OUTPUT 01` labels carry no customer, location, metric, or outcome claim.
- The route is reusable content structure rather than a background ornament; pages must supply a concise accessible label.

### Global Header & Navigation

- The header is a stable 72px surface above page content; it never changes height when a menu opens and becomes compact only below the 1024px shell breakpoint.
- Desktop navigation is one horizontal roving group. `ArrowLeft`/`ArrowRight` move between primary controls, `Home`/`End` jump to the bounds, and `ArrowDown` enters an available submenu.
- Only Solutions and Partner Business open depth-two panels. Expanded, current-route, hover, focus-visible, and pressed states remain visually distinct without relying on color alone.
- `Escape`, outside activation, or route change closes an open menu. Focus returns to the control that opened it when the user explicitly dismisses a menu.
- The mobile drawer is depth-three at most, locks background scroll, traps focus, exposes an explicit close control, and always restores focus to its trigger after dismissal.
- Navigation destinations are route-registry data. A planned destination may be linked before its content PR, but the shell must not create placeholder pages or claim that future content exists.

### Breadcrumb

- The breadcrumb is a compact ordered list immediately before page-specific content. The final item is text with `aria-current="page"`; earlier items are links.
- Labels and hierarchy come from the route registry. Unknown paths render no breadcrumb rather than guessing a label.
- Home pages omit the breadcrumb because there is no deeper hierarchy to communicate.

### Locale Switch

- The locale control is a text-labelled link, never a flag icon. It renders only when a published counterpart is available for the current route.
- Counterpart relationships are typed route data. Missing or future-only counterparts produce no control and no dead link.

### Global Footer

- The footer is a navy information field with one factual BLRO definition, route-derived business links, three distinct inquiry transitions, policy links, and an optional locale switch.
- Contact details, customer names, credentials, legal entity names, and metrics are omitted until approved source data exists.
- Footer groups remain semantic lists and preserve source order at every breakpoint; responsive layout may stack groups but may not remove them.

### Skip Link & Landmarks

- The skip link is the first focusable element, remains visually hidden until focus, and targets the single global `main#main-content` landmark.
- Every page shell contains exactly one banner, primary navigation, main, and contentinfo landmark. Sticky/fixed shell surfaces must not obscure focused content.

### Primitive Showcase

- Development-only `/design-preview` presents every variant and state.
- It is absent in production, navigation, sitemap, and search indexing.
- It exists only through PR-02 visual QA and is removed after screenshots and interaction evidence are captured.

## 6. Motion & Interaction

| Token | Value | Usage |
| --- | --- | --- |
| `--duration-micro` | `160ms` | Press and focus feedback |
| `--duration-standard` | `200ms` | Hover and state change |
| `--duration-spinner` | `700ms` | Loading indicator rotation only |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Calm, precise response |

- Only `transform`, `opacity`, and color paint values transition.
- Motion must explain state, focus, or direction; decorative loops are forbidden.
- `prefers-reduced-motion: reduce` removes nonessential transform and animation.
- Hover never hides information; touch and keyboard receive equivalent state feedback.

## 7. Depth & Surface

Strategy: **mixed hairline + tonal shift**.

Material geometry tokens: `--signal-field-min-height` (`18rem`), `--signal-threshold-mobile` (`36%`), and `--signal-threshold-wide` (`22%`) keep the technical field readable without burying proportions in component rules.

- Canvas, surface, alternate, and navy establish most hierarchy.
- Hairline borders show control boundaries, data rows, and technical coordinates.
- Shadows are limited to elements that physically float above content; primitives in PR-02 use none.
- Radius tokens: 8px controls, 16px panels, 24px emphasis fields.
- A low-contrast gradient may describe a signal flow only; generic decorative gradients are forbidden.
- The memorable material is the off-white/navy threshold crossed by a cyan route line, not glass or card chrome.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA: 4.5:1 body contrast, 3:1 large text and component boundaries.
- Every interactive element has a visible 3px focus ring with offset.
- Minimum target is 44×44px; default action target is 48px.
- Keyboard, 200% zoom, 320px width, reduced motion, and natural CJK wrapping are release constraints.
- Error state includes text and `aria-invalid` or an associated description where applicable.
- No Critical or Major persona/accessibility issue may be accepted as ordinary debt.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Approved local Pretendard and Inter font files are not yet present | Global typography | Installing an unapproved font asset or license is prohibited; the complete local/system fallback prevents network and rendering failure | Brand owner supplies licensed files and provenance before production typography freeze |

No other design or accessibility debt is accepted.
