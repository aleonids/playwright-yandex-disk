import { FullConfig, chromium } from "@playwright/test";
import { login } from "./login";

async function globalSetup(config: FullConfig): Promise<void> {
  const username = process.env.LOGIN_NAME ?? "";
  const password = process.env.PASSWORD ?? "";
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await login({ page, username, password });
  await page.context().storageState({
    path: "storageState.json",
  });
  await browser.close();
}

export default globalSetup;
