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
