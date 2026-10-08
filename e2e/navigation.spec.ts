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

  test("footer links to the Columbarium page", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const link = footer.getByRole("link", { name: /columbarium/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/columbarium/);
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

  test("mobile menu links to the Columbarium page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await dialog.getByRole("link", { name: /columbarium/i }).click();
    await expect(page).toHaveURL(/\/columbarium/);
  });

  test("escape key closes mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("Donate CTA and all nav links are visible or reachable via menu scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await expect(dialog).toBeVisible();

    const expectedLinks = [
      "Donate",
      "Home",
      "About",
      "Sacraments",
      "Columbarium",
      "Ministries",
      "News",
      "Events",
      "Homilies",
      "Contact",
    ];

    for (const name of expectedLinks) {
      const link = dialog.getByRole("link", { name, exact: true });
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
    }
  });

  test("background is not interactive while mobile menu is open", async ({
    page,
  }) => {
    await page.goto("/");

    const heroLink = page.locator("main a").first();
    const heroBox = await heroLink.boundingBox();
    expect(heroBox).not.toBeNull();

    await page.getByRole("button", { name: /open menu/i }).click();
    const dialog = page.getByRole("dialog", { name: /mobile/i });
    await expect(dialog).toBeVisible();

    const topElementAtHeroPoint = await page.evaluate(
      ({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        return {
          insideDialog: !!el?.closest('[role="dialog"]'),
          tag: el?.tagName,
        };
      },
      { x: heroBox!.x + heroBox!.width / 2, y: heroBox!.y + heroBox!.height / 2 }
    );

    expect(topElementAtHeroPoint.insideDialog).toBe(true);

    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  });
});
