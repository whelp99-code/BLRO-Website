# BLRO Website

BLRO의 기업 고객, 국내 파트너, 글로벌 벤더를 위한 공식 기업 웹사이트입니다. 현재 저장소는 승인된 13개 계획 문서와 Next.js 구현을 함께 보관합니다.

## Local development

Requirements:

- Node.js 22.23.1
- pnpm 11.8.0

```bash
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. The PR-00 bootstrap page heading is `BLRO Website Foundation`.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test:policy
pnpm audit:high
pnpm audit:prod
pnpm test:run
pnpm build
pnpm test:e2e
pnpm check:release
```

`check:release` builds the production app before the Playwright smoke test. Lighthouse is available through `pnpm test:lighthouse` and becomes a blocking release gate in the quality milestone.

The release check blocks high and critical dependency advisories. The active pnpm age/trust exception register is `security/supply-chain-exceptions.json`; accepted moderate production findings and review dates are recorded in `SECURITY.md`.

## Development-only React inspection

The following packages are dev dependencies and are not imported by application code:

- `pnpm dev:grab` exposes the react-grab setup commands for an intentional local opt-in.
- `pnpm dev:scan` exposes the react-scan setup command for an intentional local opt-in.
- `pnpm inspect:react` runs the non-runtime React Doctor analysis.

The two setup CLIs are interactive and mutate application wiring, so they are deliberately manual instead of running during install or CI. Production verification checks rendered HTML and emitted chunks for leakage before release.

## Environment

`NEXT_PUBLIC_SITE_URL` must be an absolute URL. The runtime boundary is parsed by Zod in `lib/env.ts`. Local and test builds default to `http://localhost:3000`. Production builds treat blank `NEXT_PUBLIC_*` values as unset and use `https://blro.co.kr`, `https://api.blro.co.kr`, and the public Turnstile site key so Cloudflare Pages can ship intake without copying empty dashboard variables. Worker secrets stay out of git.

## Planning package

Start with `00_INDEX.md`. The accepted delivery sequence and test gates are defined in `08_PR_PLAN.md`, `09_PR_SUB_DETAIL.md`, and `10_TEST_ACCEPTANCE.md`.

## Business ideas

Customer-value hypotheses, validation status, and next actions are maintained in [`docs/idea-vault/README.md`](docs/idea-vault/README.md). Ideas stay separate from approved website scope until their promotion conditions are met.
