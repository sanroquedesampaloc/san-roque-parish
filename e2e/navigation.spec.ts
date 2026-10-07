import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test("desktop nav links are visible and functional", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: /main/i });
    await expect(nav).toBeVisible();

    const links = nav.getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(7);

    await nav.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);
  });
});

test.describe("Footer navigation", () => {
  test("footer contains quick links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    await expect(
      footer.getByRole("link", { name: /contact/i })
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: /events/i })
    ).toBeVisible();
  });
});

test.describe("Homepage CTAs", () => {
  test("hero section has call-to-action links", async ({ page }) => {
    await page.goto("/");
    const main = page.locator("main");
    const links = main.getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu opens and closes", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /open menu/i });
    await expect(trigger).toBeVisible();

    await trigger.click();
    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await expect(dialog).toBeVisible();

    const closeBtn = page.getByRole("button", { name: /close menu/i });
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();
  });

  test("mobile menu links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await dialog.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("escape key closes mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});
