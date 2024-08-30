import { Page, Response, expect, test } from "@playwright/test";

import {
  BACKGROUND_COLOR,
  CLOSE_BUTTON,
  COLUMN_BUTTONS,
  CREATE_BUTTON,
  CREATE_POPUP,
  CREATE_RESOURCE,
  Create,
  FILE,
  FOLDER,
  INPUT_FOLDER_NAME,
  LISTING,
  NEW_FOLDER_POPUP,
  RESPONSE_ENDPOINT,
  SAVE_BUTTON,
  TEST_FILE_NAME,
  TEST_FOLDER,
  UPLOAD,
  UPLOADER,
  WRAPPER,
} from "./constants";

export function getRandomName(): string {
  return (Math.random() + 1).toString(32).substring(2);
}

export async function createFolder(
  page: Page,
  folderName: string
): Promise<void> {
  await test.step("Waiting for the page to load", async () => {
    await page.waitForSelector(WRAPPER);
  });
  await test.step("Click on 'Create' button", async () => {
    await page.locator(COLUMN_BUTTONS).locator(CREATE_BUTTON).click();
  });
  const createPopup = page.locator(CREATE_POPUP);
  const newFolderPopup = page.locator(NEW_FOLDER_POPUP);

  await test.step("Check that creating folder popup is displayed", async () => {
    await expect(createPopup).toBeVisible();
    await createPopup.locator(CREATE_RESOURCE).nth(Create.Folder).click();
    await expect(newFolderPopup).toBeVisible();
  });
  await test.step("Fill a folder name", async () => {
    await newFolderPopup.locator(INPUT_FOLDER_NAME).fill(folderName);
    await newFolderPopup.locator(SAVE_BUTTON).click();
    await expect(newFolderPopup).not.toBeVisible();
  });

  await test.step("Check that a new folder is displayed", async () => {
    await expect(
      page.locator(FOLDER, {
        has: page.locator(`text="${folderName}"`),
      })
    ).toBeVisible();
  });
}

// Upload a file
export async function uploadFile(
  page: Page,
  folderName: string
): Promise<void> {
  const folder = page.locator(FOLDER, {
    has: page.locator(`text="${folderName}"`),
  });

  await test.step("Open a folder", async () => {
    await expect(folder).toBeVisible();
    await folder.dblclick();
  });
  await test.step("Upload a file", async () => {
    await page.setInputFiles(UPLOAD, `${TEST_FOLDER}/${TEST_FILE_NAME}`);
  });
  await test.step("Check the response after uploading the file", async () => {
    await page.waitForResponse(
      (response: Response) =>
        response.url().includes(RESPONSE_ENDPOINT) && response.status() === 200
    );
  });

  // Assert of the changed background color after upload
  await test.step("Assert of the changed background color after upload", async () => {
    const backgroundColor = await page
      .locator(UPLOADER)
      .evaluate(
        (element: HTMLElement) => getComputedStyle(element).backgroundColor
      );

    expect(backgroundColor).toBe(BACKGROUND_COLOR);
  });
}

// Check a file
export async function testFile(page: Page): Promise<void> {
  const file = page.locator(LISTING).locator(FILE, {
    hasText: TEST_FILE_NAME,
  });

  await test.step("Check that the file has opened", async () => {
    await expect(file).toBeVisible();
    await file.dblclick();
  });
  await test.step("Check that the file has closed", async () => {
    await page.locator(CLOSE_BUTTON).click();
    await expect(
      page.locator(LISTING).locator(FILE, {
        hasText: TEST_FILE_NAME,
      })
    ).toBeVisible();
  });
}
