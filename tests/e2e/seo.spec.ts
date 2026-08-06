import { expect, test } from "@playwright/test";

test("robots.txt allows public content and reserves admin/api", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain("Allow: /");
  expect(body).toContain("Disallow: /admin/");
  expect(body).toContain("Disallow: /api/");
  expect(body).toContain("Sitemap:");
});

test("sitemap.xml only lists indexable pages, never the demo or placeholders", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();

  for (const path of ["/sobre-opmx", "/transparencia", "/metodologia", "/glosario"]) {
    expect(body).toContain(path);
  }
  expect(body).not.toContain("/demo/michoacan-gubernatura-junio-2026");
  expect(body).not.toContain("/encuestas<");
});

test("indexable pages declare a canonical URL", async ({ page }) => {
  await page.goto("/metodologia");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /\/metodologia$/);
});
