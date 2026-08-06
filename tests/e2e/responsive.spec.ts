import { expect, test } from "@playwright/test";

const breakpoints = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const routes = ["/", "/metodologia", "/demo/michoacan-gubernatura-junio-2026"];

for (const bp of breakpoints) {
  for (const route of routes) {
    test(`${route} has no horizontal overflow at ${bp.name} (${bp.width}px)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(route);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }
}

test("mobile viewport shows the disclosure menu instead of the desktop nav", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("details > summary", { hasText: "Menú" })).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Metodología" }),
  ).toBeHidden();
});

test("desktop viewport shows the full nav instead of the disclosure menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Metodología" }),
  ).toBeVisible();
  await expect(page.locator("details > summary", { hasText: "Menú" })).toBeHidden();
});
