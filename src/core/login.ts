import { expect } from "@playwright/test";
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
  const emailButton = page.locator(LOGIN.EMAIL_BUTTON);

  await expect(emailButton).toBeEnabled();
  await emailButton.click();
  await page.locator(LOGIN.INPUT_LOGIN).fill(username);
  const loginAssertButton = page.locator(LOGIN.LOGIN_BUTTON);

  await expect(loginAssertButton).toBeEnabled();
  await loginAssertButton.click();
  await page.locator(LOGIN.INPUT_PASSWORD).fill(password);
  const passwordAssertButton = page
    .locator(LOGIN.PASSWORD_FORM)
    .locator(LOGIN.LOGIN_BUTTON);

  await expect(passwordAssertButton).toBeEnabled();
  await Promise.all([page.waitForNavigation(), passwordAssertButton.click()]);
}
