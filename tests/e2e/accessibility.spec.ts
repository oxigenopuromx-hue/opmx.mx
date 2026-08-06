import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/sobre-opmx",
  "/transparencia",
  "/metodologia",
  "/glosario",
  "/demo/michoacan-gubernatura-junio-2026",
  "/encuestas",
  "/datos",
  "/tendencias",
  "/elecciones",
  "/estados",
  "/personas",
  "/partidos",
  "/auditoria",
  "/archivo",
  "/analisis",
];

for (const route of routes) {
  test(`${route} has no automated WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("skip link moves focus to main content on activation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Saltar al contenido principal" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeVisible();
});

test("mobile menu disclosure is keyboard operable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const summary = page.locator("details > summary", { hasText: "Menú" });
  await expect(summary).toBeVisible();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details[open]")).toBeVisible();
});
