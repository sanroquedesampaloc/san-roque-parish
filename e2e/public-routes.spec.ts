import { test, expect } from "@playwright/test";

const publicRoutes = [
  { path: "/", title: "San Roque de Sampaloc Parish" },
  { path: "/about", title: "About" },
  { path: "/mass-sacraments", title: "Mass" },
  { path: "/live", title: "Live Mass" },
  { path: "/columbarium", title: "Columbarium" },
  { path: "/news", title: "News" },
  { path: "/events", title: "Events" },
  { path: "/homilies", title: "Homilies" },
  { path: "/ministries", title: "Ministries" },
  { path: "/contact", title: "Contact" },
  { path: "/prayer-request", title: "Prayer Request" },
  { path: "/give", title: "Support" },
  { path: "/privacy", title: "Privacy" },
];

for (const route of publicRoutes) {
  test(`${route.path} loads without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(route.path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(new RegExp(route.title, "i"));
    expect(errors).toHaveLength(0);
  });
}

test("custom 404 page renders for unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Page Not Found");
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});
