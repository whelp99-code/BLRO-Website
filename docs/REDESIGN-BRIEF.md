# BLRO redesign brief (2026-10-01)

Build brief for 윤비서 / Cursor. This branch does not change production, DNS, or Pages production deploy.

Sources copied as-is from `/home/jm/orca/projects/blro-website-workspace/docs/redesign-2026-09-motion/` (written 2026-09-30):

- `docs/redesign-2026-09-motion/BLRO-REDESIGN-PROPOSAL-KO.md` (v1)
- `docs/redesign-2026-09-motion/v2/BLRO-REDESIGN-PROPOSAL-V2-KO.md`
- `docs/redesign-2026-09-motion/research/MOTION-TREND-RESEARCH-KO.md`
- `docs/redesign-2026-09-motion/DESIGN.md` and `v2/DESIGN.md`
- prototypes and captures (evidence, not the app)

Canonical app is this repo (`whelp99-code/BLRO-Website`), not the uncommitted local tree at `/home/jm/orca/projects/blro-website`.

## Owner rules (binding)

- Real rewrite of copy and imagery. Not a thin structure proposal.
- Research-based modern motion. Respect `prefers-reduced-motion`. Stay performant (transform/opacity, no scroll hijack, no infinite decorative loops).
- Do not invent customers, logos, testimonials, or numbers. Use only facts already in this repo or company materials. Unknown facts are TODO for the owner, not filler.
- Korean primary.
- Do not switch production. Preview only if explicitly approved later.

## Page list and sections

v2 is the content target. v1 motion system still applies. Role routes stay separate (`/customer`, `/partner`, `/engineer` are contracts; do not merge them into one path).

| Route | Sections |
|---|---|
| `/` | Kicker (주식회사 베를로). One sentence that keeps supply and transition-check in one path. Lifecycle figure (five stages). Three role entries (customer / partner / engineer), not merged. Then a door into HCI. Primary CTA: diagnostic / contact by role. |
| `/customer` | Situations (server replace, storage, workplace boundary). Solution index (21 products exist; do not pretend all are rewritten in one pass). Transition only when constraints require it. Operations without invented SLA. Contact facts already on file: 박재민, 010-8896-1260, jm.park@blro.co.kr, 사업자 420-87-02727. |
| `/partner` | Joint sales, proposal/PoC with success criteria and rollback, build/ops R&R (draft, not a contract), approved materials only. |
| `/engineer` | Install, ops/incident, compatibility/ports, approved downloads, support. No fake files. Keep existing resource/Q&A/workbench paths. |
| `/solutions` | HCI, VDI, network/security, backup/DR, SASE. Manufacturer names in body only, not hero keyword lists. No logo wall. |
| `/solutions/hci` | Role, five review questions, pass criteria, boundaries with aSV/SCP/VDI/aStor, limits, what to send with an inquiry. Other 20 product pages: same skeleton, different sentences. Not in this brief's first build. |
| `/projects` | Judgment process. No customer names. Step numbers may appear on view. |
| `/blro` | What BLRO does / does not do. Omit certification and customer sections until the owner approves facts. |
| `/contact` | Role first, then the checklist for that role swaps without layout animation. |
| `/insights`, AI | Keep, but not first-nav. AI is a solution item, not a home headline. |

Recommended home sentence (v1, still open): "제품 공급과 전환 검증을 한 경로로 맡깁니다." v2 title is role-connection. Owner has not closed this. Do not invent a third slogan.

## Motion spec

From v1 proposal + 2026-09-30 research. Motion explains path progress only.

| Token | Value |
|---|---|
| Enter | 420ms, `cubic-bezier(0.22, 1, 0.36, 1)`, opacity + translateY 12px |
| Hover | 180ms, translateY -1px, links and buttons only |
| Path | `animation-timeline: view()`, stroke-dashoffset. Not a timer. |
| Stagger | 70ms, max 4 |
| Counters | Do not use |
| Budget | Prefer CSS. IntersectionObserver fallback only. Zero infinite animations |
| Reduced motion | Completed path, no pulse, no counters. Content visible if JS fails |
| Mobile | No sticky diagram pin. Path is one figure under the hero. No scroll hijack |

Do not copy Cloudflare orange, globe, marquee, or agent copy. Do not add bounce or Lenis-style smooth scroll.

Existing `AGENTS.md` in the workspace still says 13px vertical / 17px horizontal, ~0.5s, no bounce, no infinite motion. This brief does not change that file. Scroll-linked diagram opacity is the proposed exception; owner has not approved a rule change. Until then, UI chrome stays inside the old nudge. Diagram stage reveal may use opacity over ~500ms ease-out.

## Design tokens

From `docs/redesign-2026-09-motion/DESIGN.md`:

| Token | Value |
|---|---|
| `--ink` | `#102033` |
| `--ink-soft` | `#3d4d63` |
| `--paper` | `#f4f1ea` |
| `--paper-2` | `#ebe6dc` |
| `--card` | `#fffcf7` |
| `--line` | `#d7d0c4` |
| `--signal` | `#1f7a4d` (verified node only) |
| `--action` | `#1d4ed8` (one primary action) |
| `--copper` | `#8a5a32` (partner text only) |
| Display | Pretendard, clamp 40–68px in v1; v2 caps titles at 40px |
| Grid | 1120, body 38–42 characters |

No accent side-stripe on cards. Focus ring is 2px `--action`, offset 3px.

Imagery: CSS/SVG diagrams (lifecycle, R&R, HCI layers, material flow). No generated "case" photos labeled as real work. No third-party logos.

## TODO facts only the owner can supply

- Which sentence is canonical: v2 role-connection title, or the public diagnostic line as subtitle.
- Whether Insights and global-vendor Korea entry stay in primary nav.
- Public case material. If none, do not add a case section.
- Partner program terms (tier, margin, registration, co-brand).
- Approved download list and files.
- B02/B03 actual supply/delivery scope.
- Live inquiry owner and privacy operating text.
- Current Sangfor HCI specs (official page was blocked on 2026-09-30).
- Whether AGENTS motion rule may relax for explanatory diagrams.
- Whether to generate the five atmosphere images in `v2/images/PROMPTS.md` (not evidence of real work).
- Which home sentence is canonical. Until the owner chooses, the preview shows only the v2 role-connection title. The v1 line "제품 공급과 전환 검증을 한 경로로 맡깁니다." stays in this brief and is not shown on the page.
- Whether "21" is the actual offering list or only a design target. The v2 proposal summarizes a design target (Sangfor 15 product/services, Cisco·Juniper switches, Fortinet firewall, GIGABYTE·KAYTUS servers, HIWARE server access control) in `docs/redesign-2026-09-motion/v2/BLRO-REDESIGN-PROPOSAL-V2-KO.md`. This repo does not contain a 21-row catalog. Do not print the count on the site until the owner confirms the list and what it means.
- Form storage retention. The worker sets `leads.expires_at` with `RETENTION_DAYS = 90` and a daily cron deletes expired rows (`workers/lead-gateway/wrangler.jsonc`). The 2026-07-14 architecture note calls 90 days a recommended default pending legal and business approval. The previous public sentence also said “처리 완료 후 90일 중 먼저”, which that worker does not implement. The privacy page does not state a day count until the owner confirms live retention.
- B02/B03 supply scope and the live inquiry owner.
- Partner tier, margin, registration, and co-brand. The R&R table on `/partner` is a draft, not terms.
- This repo has no `/engineer/resources`, Q&A, or workbench route.
- Sangfor HCI node count, performance, license, and hypervisor. The official page was blocked on 2026-09-30. A past note of three Korean files was not rechecked against this build.
- Certification, customer list, and street address. Not printed.

Known company facts already recorded (do not replace with invented ones): 주식회사 베를로, 박재민, 사업자등록번호 420-87-02727, 010-8896-1260, jm.park@blro.co.kr. Address text lives in workspace `START-HERE.md` history; confirm before reprinting if this repo's content files differ.

## How to run locally

This repo (canonical):

```bash
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Node 22.23.1, pnpm 11.8.0 per README. Open http://localhost:3000.

The other tree `/home/jm/orca/projects/blro-website` is an uncommitted parallel Next-looking app plus a 2.1.0 custom server. It was not merged (see PR). Do not treat it as newer than `main`.

`/home/jm/orca/projects/blro-website-workspace` is the local 2.1.0 static preview (`publishingEnabled=false`, Tailscale port 8771). It is not this git repo.

## Deployment (read-only description)

Not executed by this brief.

- Production site: https://blro.co.kr . Do not change DNS, TLS, or the production Pages deploy.
- This repo builds with Next and can preview via `pnpm deploy:preview` (`wrangler pages deploy out --project-name blro-website --branch preview`). That command is documented only. Do not run it from this task.
- Worker: `workers/lead-gateway/wrangler.jsonc`. Allowed origins include `https://blro.co.kr`, `https://www.blro.co.kr`, `https://preview.blro-website.pages.dev`. Secrets stay out of git.
- README: a localhost `NEXT_PUBLIC_SITE_URL` must not leak into production canonicals; Pages preview origins on `pages.dev` are kept.
- No `wrangler.toml` at repo root. Pages project name in package.json is `blro-website`.

## What was not found

- No wrangler project config inside `/home/jm/orca/projects/blro-website` or the workspace tree.
- Local Next pages and this repo's `app/` pages share routes but are different files (not a patch on top of `main`).
