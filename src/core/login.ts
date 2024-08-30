import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { TypeLogin } from "./types";
import { LOGIN, LOGIN_URL } from "./constant";

export async function login({
  page,
  username,
  password,
}: TypeLogin): Promise<void> {
  chromium.use(StealthPlugin());
  await page.goto(LOGIN_URL);
  await page.locator(LOGIN.EMAIL_BUTTON).click();
  await page.locator(LOGIN.INPUT_LOGIN).fill(username);
  await page.locator(LOGIN.LOGIN_BUTTON).click();
  await page.locator(LOGIN.INPUT_PASSWORD).fill(password);
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.locator(LOGIN.PASSWORD_FORM).locator(LOGIN.LOGIN_BUTTON).click(),
  ]);
}
