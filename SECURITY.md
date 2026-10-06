# Security policy

## Dependency gates

`pnpm audit:high` is a blocking release gate for high and critical advisories across production and development dependencies. `pnpm audit:prod` applies the same threshold to the production graph. Active pnpm age and trust exceptions are registered in `security/supply-chain-exceptions.json` and checked one-to-one by `pnpm test:policy`.

## Accepted moderate production advisory

As of 2026-07-13, `pnpm audit --prod` reports one moderate advisory: [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93), affecting `postcss@8.4.31` through pinned `next@16.2.10`.

- Exposure: Next.js uses this dependency during framework CSS processing; the BLRO site does not accept or stringify untrusted CSS at runtime.
- Decision: retain the official Next.js dependency graph instead of forcing an unverified transitive override.
- Owner: BLRO Website Maintainer.
- Review date: 2026-08-12, or immediately when Next.js publishes a compatible patched dependency graph.
- Removal condition: upgrade Next.js to a reviewed version whose production audit no longer contains the advisory.

This moderate advisory does not weaken the blocking high/critical release threshold.

## Accepted high advisory with no published patch

As of 2026-10-06, `pnpm audit` reports [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) on `braces@3.0.3`. npm `latest` is still `3.0.3` (published 2024-05-21). The advisory's patched range, `>=3.0.4`, is not a published release, so it cannot be overridden.

- Path: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`, and `react-doctor` → `deslop-js` → `fast-glob` → `micromatch` → `braces`. Both parents are devDependencies.
- Exposure: stack exhaustion while expanding a deeply nested brace pattern. Lint and `react-doctor` run on the developer or CI machine. The static site and the lead worker do not import `braces`. `pnpm audit --prod` does not report this advisory.
- Decision: keep the documented `auditIgnoreGhsa` entry until a real release exists. Do not pretend `3.0.4` is installable.
- Owner: BLRO Website Maintainer.
- Review date: 2026-11-06.
- Removal condition: publish and lock `braces >=3.0.4`, or drop both dependents, then delete the register entry. `pnpm audit:high` fails if the entry expires or the advisory disappears while the entry remains.

The same review overrode published fixes for the other high and critical findings: `source-map-js@1.2.2`, `proxy-addr@2.0.8`, and `compression@1.8.2`.
