import { test, expect } from "@playwright/test";

test.describe("Dynamic route: news detail", () => {
  test("navigating from /news to a detail page works", async ({ page }) => {
    await page.goto("/news");

    const firstLink = page.locator('a[href^="/news/"]').first();
    const hasContent = (await firstLink.count()) > 0;

    if (hasContent) {
      await firstLink.click();
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.getByRole("link", { name: /back to news/i })
      ).toBeVisible();
    }
  });

  test("invalid news slug returns 404", async ({ page }) => {
    const response = await page.goto("/news/nonexistent-slug-xyz");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Dynamic route: event detail", () => {
  test("navigating from /events to a detail page works", async ({ page }) => {
    await page.goto("/events");

    const firstLink = page.locator('a[href^="/events/"]').first();
    const hasContent = (await firstLink.count()) > 0;

    if (hasContent) {
      await firstLink.click();
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.getByRole("link", { name: /back to events/i })
      ).toBeVisible();
    }
  });

  test("invalid event slug returns 404", async ({ page }) => {
    const response = await page.goto("/events/nonexistent-event-xyz");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Dynamic route: homily detail", () => {
  test("navigating from /homilies to a detail page works", async ({
    page,
  }) => {
    await page.goto("/homilies");

    const firstLink = page.locator('a[href^="/homilies/"]').first();
    const hasContent = (await firstLink.count()) > 0;

    if (hasContent) {
      await firstLink.click();
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.getByRole("link", { name: /back to homilies/i })
      ).toBeVisible();
    }
  });

  test("invalid homily slug returns 404", async ({ page }) => {
    const response = await page.goto("/homilies/nonexistent-homily-xyz");
    expect(response?.status()).toBe(404);
  });
});
