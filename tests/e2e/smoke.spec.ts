import { expect, test } from "@playwright/test";

test("home page responds and renders", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator("body")).toContainText("OPMX");
});
