import { expect, test } from "@playwright/test";

test("desktop navigation reaches an institutional page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("banner").getByRole("link", { name: "Metodología" }).click();
  await expect(page).toHaveURL(/\/metodologia$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Metodología");
});

test("breadcrumbs mark the current page with aria-current", async ({ page }) => {
  await page.goto("/sobre-opmx");
  const current = page.locator('nav[aria-label="Breadcrumb"] [aria-current="page"]');
  await expect(current).toHaveText("Sobre OPMX");
});

test("placeholder sections are marked noindex", async ({ page }) => {
  const response = await page.goto("/encuestas");
  expect(response?.status()).toBeLessThan(400);
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute("content", /noindex/);
});
