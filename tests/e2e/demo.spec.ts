import { expect, test } from "@playwright/test";

const DEMO_PATH = "/demo/michoacan-gubernatura-junio-2026";

test("demo page is noindex and not attributed to OPMX as real research", async ({ page }) => {
  await page.goto(DEMO_PATH);

  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute("content", /noindex/);
  await expect(robots).toHaveAttribute("content", /nofollow/);

  await expect(page.getByText(/no es una investigación diseñada/i)).toBeVisible();
});

test("demo page shows the 97% discrepancy warning and unaltered figures", async ({ page }) => {
  await page.goto(DEMO_PATH);

  await expect(page.getByText(/suman 97%, no 100%/i)).toBeVisible();
  await expect(page.getByText("MORENA")).toBeVisible();
  await expect(page.getByText("40%")).toBeVisible();
});

test("demo page has no Dataset (or other research) structured data", async ({ page }) => {
  await page.goto(DEMO_PATH);

  const ldJsonScripts = page.locator('script[type="application/ld+json"]');
  await expect(ldJsonScripts).toHaveCount(0);
});

test("home links to the demo and the demo route resolves", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /ver demostración/i }).click();
  await expect(page).toHaveURL(new RegExp(DEMO_PATH.replace(/\//g, "\\/") + "$"));
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Michoacán");
});
