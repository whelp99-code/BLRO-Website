import { mkdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type FixtureContent = {
  readonly relativePath: string
  readonly source: string
}

export async function writeContentFixture(
  root: string,
  contents: readonly FixtureContent[],
  registrySource: string,
): Promise<void> {
  await Promise.all(
    ["services", "projects", "insights"].flatMap((type) =>
      ["ko", "en"].map((locale) => mkdir(join(root, type, locale), { recursive: true })),
    ),
  )
  await Promise.all(
    contents.map(async (content) => {
      const path = join(root, content.relativePath)
      const directory = path.slice(0, path.lastIndexOf("/"))
      await mkdir(directory, { recursive: true })
      await writeFile(path, content.source, "utf8")
    }),
  )
  const registryPath = join(root, "_registry")
  await mkdir(registryPath, { recursive: true })
  await writeFile(join(registryPath, "public-approvals.json"), registrySource, "utf8")
}

export async function removeContentFixture(root: string): Promise<void> {
  await rm(root, { force: true, recursive: true })
}
