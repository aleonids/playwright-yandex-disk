import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { BASE_URL } from "./src/core/constant";

dotenv.config();

export default defineConfig({
  workers: 4,
  timeout: 40000,
  expect: {
    timeout: 20000,
  },
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // globalSetup: path.resolve(__dirname, "./src/core/global-setup.ts"),
  use: {
    //  storageState: "storageState.json",
    baseURL: BASE_URL,
    trace: "on-first-retry",
    // screenshot: "only-on-failure",
    // ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
  ],
});
