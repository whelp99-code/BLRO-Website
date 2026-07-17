import { mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import {
  compileContentBody,
  createContentIndex,
  createContentDigest,
  getPublicContent,
  parseContentSource,
} from "@/lib/content"
import { removeContentFixture, writeContentFixture } from "@/tests/helpers/content-fixture"

const fixtureRoots: string[] = []

afterEach(async () => {
  await Promise.all(fixtureRoots.splice(0).map(removeContentFixture))
})

describe("content index", () => {
  it("indexes only deterministic approved and published real content", async () => {
    const now = new Date("2026-07-15T00:00:00.000Z")

    const [index, services, projects, insights] = await Promise.all([
      createContentIndex({ contentRoot: join(process.cwd(), "content"), now }),
      getPublicContent("service", "ko", now),
      getPublicContent("project", "ko", now),
      getPublicContent("insight", "ko", now),
    ])

    expect(services.map((record) => record.meta.slug)).toEqual([
      "backup-disaster-recovery",
      "hci-private-cloud",
      "network-security",
      "sase-global-connectivity",
      "vdi-digital-workspace",
    ])
    expect(projects).toHaveLength(0)
    expect(index.allRecords.filter((record) => record.type === "project")).toHaveLength(3)
    expect(index.allRecords.filter((record) => record.type === "project").map((record) => record.meta.status)).toEqual([
      "review",
      "review",
      "review",
    ])
    expect(insights).toHaveLength(8)
    expect(index.allRecords.filter((record) => record.type === "insight").map((record) => [
      record.meta.slug,
      record.meta.status,
    ])).toContainEqual(["security-consulting-baseline", "approved"])
    expect(index.allRecords.filter((record) => record.type === "insight").map((record) => [
      record.meta.slug,
      record.meta.status,
    ])).toContainEqual(["infrastructure-consulting-baseline", "approved"])
    expect(index.allRecords.filter((record) => record.type === "insight").map((record) => [
      record.meta.slug,
      record.meta.status,
    ])).toContainEqual(["virtualization-hci-migration-guide", "approved"])
    expect(index.allRecords.filter((record) => record.type === "insight").map((record) => [
      record.meta.slug,
      record.meta.status,
    ])).toContainEqual(["vmware-nutanix-evaluation-matrix", "draft"])
    expect(index.publicRecords.map((record) => record.meta.slug)).not.toContain("vmware-nutanix-evaluation-matrix")
    const firstInsight = insights.at(0)
    expect(firstInsight).toBeDefined()
    if (firstInsight === undefined) {
      return
    }
    const compiled = await compileContentBody(firstInsight)
    expect(compiled).toContain("function _createMdxContent")
  })

  it("filters draft and archived records without leaking them", async () => {
    const root = await mkdtemp(join(tmpdir(), "blro-content-"))
    fixtureRoots.push(root)
    const base = `---
contentId: insight-safe
title: Safe insight
summary: Planning-derived summary
slug: safe
locale: ko
status: approved
publishedAt: 2026-07-01
updatedAt: 2026-07-01
audience: [customer]
tags: [safe]
evidenceRefs: [05_CONTENT_STRATEGY.md:133-148]
claimIds: [claim-safe]
approvalRefs: [approval-safe]
relatedContent: []
---
Safe body`
    const records = [
      { relativePath: "insights/ko/safe.mdx", source: base },
      { relativePath: "insights/ko/draft.mdx", source: base.replaceAll("safe", "draft").replace("status: approved", "status: draft") },
      { relativePath: "insights/ko/archived.mdx", source: base.replaceAll("safe", "archived").replace("status: approved", "status: archived") },
    ]
    const safeRecord = parseContentSource({
      filePath: join(root, "insights", "ko", "safe.mdx"),
      source: base,
      type: "insight",
    })
    const registry = JSON.stringify({
      approvals: [
        {
          approvalId: "approval-safe",
          contentId: "insight-safe",
          claimId: "claim-safe",
          locale: "ko",
          approverRole: "planning-source-owner",
          source: "approved-planning-package",
          approvedAt: "2026-07-01",
          publicScopes: ["website:public:ko"],
          evidenceRefs: ["05_CONTENT_STRATEGY.md:133-148"],
          contentSha256: createContentDigest(safeRecord),
          reviewAt: "2026-10-01",
          expiresAt: "2027-07-01",
        },
      ],
    })
    await writeContentFixture(root, records, registry)

    const index = await createContentIndex({ contentRoot: root, now: new Date("2026-07-13T00:00:00.000Z") })

    expect(index.publicRecords.map((record) => record.meta.slug)).toEqual(["safe"])
  })

  it.each([
    ["directory locale", "insights/ko/safe.mdx", "locale: en", "[locale]"],
    ["filename slug", "insights/ko/not-safe.mdx", "locale: ko", "[slug]"],
  ])("rejects a %s mismatch", async (_label, relativePath, localeLine, field) => {
    const root = await mkdtemp(join(tmpdir(), "blro-content-"))
    fixtureRoots.push(root)
    const source = `---
contentId: insight-safe
title: Safe insight
summary: Planning-derived summary
slug: safe
${localeLine}
status: review
updatedAt: 2026-07-01
audience: [customer]
tags: [safe]
relatedContent: []
---
Safe body`
    await writeContentFixture(root, [{ relativePath, source }], JSON.stringify({ approvals: [] }))

    await expect(createContentIndex({ contentRoot: root, now: new Date("2026-07-13T00:00:00.000Z") })).rejects.toThrow(field)
  })

  it("compiles every body before returning a validated index", async () => {
    const root = await mkdtemp(join(tmpdir(), "blro-content-"))
    fixtureRoots.push(root)
    const source = `---
contentId: insight-unsafe
title: Unsafe insight
summary: Invalid allowlisted component markup
slug: unsafe
locale: ko
status: review
updatedAt: 2026-07-01
audience: [customer]
tags: [unsafe]
relatedContent: []
---
<Callout>unterminated`
    await writeContentFixture(root, [{ relativePath: "insights/ko/unsafe.mdx", source }], JSON.stringify({ approvals: [] }))

    await expect(createContentIndex({ contentRoot: root, now: new Date("2026-07-13T00:00:00.000Z") })).rejects.toThrow("[body]")
  })

  it("wraps a missing content root in the content error contract", async () => {
    const root = join(tmpdir(), "blro-content-root-that-does-not-exist")

    await expect(createContentIndex({ contentRoot: root, now: new Date("2026-07-13T00:00:00.000Z") })).rejects.toThrow("[directory]")
  })

  it("validates the real corpus against the current build date", async () => {
    await expect(createContentIndex({ contentRoot: join(process.cwd(), "content"), now: new Date() })).resolves.toBeDefined()
  })
})
