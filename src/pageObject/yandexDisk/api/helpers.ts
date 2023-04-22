import { APIRequestContext, expect, test } from "@playwright/test";

import { API_URL } from "../../../core/constant";

const token = process.env.TOKEN ?? "";

// Create folder by API
export async function createFolderByApiRequest(
  request: APIRequestContext,
  folderName: string
) {
  await test.step("Sending a request to create a folder using the API", async () => {
    const response = await request.put(API_URL, {
      headers: {
        Authorization: token,
      },
      params: { path: folderName },
    });
    await test.step("Checking the response status", async () => {
      expect(response.status()).toBe(201);
    });
  });
}

// Delete by API
export async function deleteByApiRequest(
  request: APIRequestContext,
  name: string
) {
  await test.step("Sending a request to delete a folder using the API", async () => {
    const response = await request.delete(API_URL, {
      headers: {
        Authorization: token,
      },
      params: { path: name, permanently: true },
    });

    await test.step("Checking the response status", async () => {
      expect(response.status() === 202 || response.status() === 204).toBe(true);
    });
  });
}
