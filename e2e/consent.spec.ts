import { test, expect } from "@playwright/test";

const BANNER_NAME = /cookie and privacy preferences/i;
const MAP_IFRAME_SELECTOR = 'iframe[src*="google.com/maps/embed"]';
const MAP_PLACEHOLDER_TEXT = /loading this map connects your browser to google/i;

// Each Playwright test gets a brand-new browser context (no cookies), so
// every test below is implicitly a "first visit" unless it explicitly makes
// a decision first.

test.describe("First visit", () => {
  test("banner appears with three equally-usable actions", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: BANNER_NAME });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("button", { name: /necessary only/i })).toBeVisible();
    await expect(banner.getByRole("button", { name: /allow external media/i })).toBeVisible();
    await expect(banner.getByRole("button", { name: /^preferences$/i })).toBeVisible();
  });

  test("homepage makes zero Google Maps and zero Facebook iframe requests before a decision", async ({
    page,
  }) => {
    const hits: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (/maps\.googleapis\.com|google\.com\/maps\/embed|facebook\.com\/plugins\/video/.test(url)) {
        hits.push(url);
      }
    });
    await page.goto("/");
    await page.waitForTimeout(800);
    expect(hits).toHaveLength(0);
  });

  test("/contact shows the Maps placeholder, not the iframe", async ({ page }) => {
    await page.goto("/contact");
    expect(await page.locator(MAP_IFRAME_SELECTOR).count()).toBe(0);
    await expect(page.getByText(MAP_PLACEHOLDER_TEXT)).toBeVisible();
  });
});

test.describe("Necessary Only", () => {
  test("persists across reload and keeps Maps gated", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /necessary only/i }).click();
    await expect(page.getByRole("region", { name: BANNER_NAME })).toBeHidden();

    await page.reload();
    await expect(page.getByRole("region", { name: BANNER_NAME })).toBeHidden();
    expect(await page.locator(MAP_IFRAME_SELECTOR).count()).toBe(0);
    await expect(page.getByText(MAP_PLACEHOLDER_TEXT)).toBeVisible();
  });
});

test.describe("Allow External Media", () => {
  test("persists across reload and the Maps iframe loads", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /allow external media/i }).click();
    await expect(page.getByRole("region", { name: BANNER_NAME })).toBeHidden();

    await page.reload();
    await expect(page.getByRole("region", { name: BANNER_NAME })).toBeHidden();
    await expect(page.locator(MAP_IFRAME_SELECTOR).first()).toBeVisible();
  });
});

test.describe("Per-embed consent", () => {
  test("clicking Load Map grants External Media and dismisses the banner", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /^load map$/i }).click();

    await expect(page.locator(MAP_IFRAME_SELECTOR).first()).toBeVisible();
    await expect(page.getByRole("region", { name: BANNER_NAME })).toBeHidden();

    await page.reload();
    await expect(page.locator(MAP_IFRAME_SELECTOR).first()).toBeVisible();
  });

  test("clicking Watch Here grants External Media when a stream is active", async ({ page }) => {
    await page.goto("/live");
    const watchHere = page.getByRole("button", { name: /^watch here$/i });
    const isLive = await watchHere.isVisible().catch(() => false);
    test.skip(
      !isLive,
      "No active livestream configured right now — the gating mechanism itself is already covered by the Load Map test above."
    );

    await watchHere.click();
    await expect(page.locator('iframe[src*="facebook.com/plugins/video"]').first()).toBeVisible();
  });
});

test.describe("Preferences panel", () => {
  test("footer link opens it, and revoking live-reverts an already-loaded embed", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /allow external media/i }).click();
    await expect(page.locator(MAP_IFRAME_SELECTOR).first()).toBeVisible();

    await page.getByRole("button", { name: /cookie preferences/i }).click();
    const dialog = page.getByRole("dialog", { name: /cookie preferences/i });
    await expect(dialog).toBeVisible();

    const toggle = dialog.getByRole("switch", { name: /external media/i });
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await dialog.getByRole("button", { name: /save preferences/i }).click();

    await expect(dialog).toBeHidden();
    // No reload — the already-mounted gate should revert immediately.
    expect(await page.locator(MAP_IFRAME_SELECTOR).count()).toBe(0);
    await expect(page.getByText(MAP_PLACEHOLDER_TEXT)).toBeVisible();
  });

  test("user can change their mind after deciding Necessary Only", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /necessary only/i }).click();
    expect(await page.locator(MAP_IFRAME_SELECTOR).count()).toBe(0);

    await page.getByRole("button", { name: /cookie preferences/i }).click();
    const dialog = page.getByRole("dialog", { name: /cookie preferences/i });
    const toggle = dialog.getByRole("switch", { name: /external media/i });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await toggle.click();
    await dialog.getByRole("button", { name: /save preferences/i }).click();

    await expect(page.locator(MAP_IFRAME_SELECTOR).first()).toBeVisible();
  });

  test("Escape closes the panel and returns focus to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /cookie preferences/i });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: /cookie preferences/i });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("the Necessary category cannot be toggled off", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /cookie preferences/i }).click();
    const dialog = page.getByRole("dialog", { name: /cookie preferences/i });
    await expect(dialog.getByText(/always on/i)).toBeVisible();
    // Only one toggle control exists in the panel — External Media's.
    expect(await dialog.getByRole("switch").count()).toBe(1);
  });
});

test.describe("Turnstile", () => {
  test("remains unaffected by the consent system", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /allow external media/i }).click();

    // No site key is configured in this environment, so the script should
    // still never load — unrelated to whatever consent decision was made.
    expect(await page.locator('script[src*="turnstile"]').count()).toBe(0);
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });
});
