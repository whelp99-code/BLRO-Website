import { defineConfig, devices } from "@playwright/test"

const baseURL = process.env["PLAYWRIGHT_BASE_URL"] ?? "http://127.0.0.1:4173"
const continuousIntegration =
  process.env["CI"] === "true" ? { retries: 2, workers: 1 } : { retries: 0 }

export default defineConfig({
  ...continuousIntegration,
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm start --port 4173",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
