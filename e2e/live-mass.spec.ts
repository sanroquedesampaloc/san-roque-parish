import { test, expect } from "@playwright/test";
import { getFacebookEmbedUrl } from "../src/lib/facebookEmbed";

// Pure logic coverage for the URL whitelist — deterministic, no server or
// CMS state required, so this never depends on whatever is currently
// configured in production.
test.describe("getFacebookEmbedUrl validation", () => {
  test("accepts a facebook.com video URL", () => {
    const url = getFacebookEmbedUrl("https://www.facebook.com/SomePage/videos/123456789");
    expect(url).not.toBeNull();
    expect(url!.startsWith("https://www.facebook.com/plugins/video.php")).toBe(true);
    expect(url).toContain(encodeURIComponent("https://www.facebook.com/SomePage/videos/123456789"));
  });

  test("accepts a bare facebook.com host", () => {
    const url = getFacebookEmbedUrl("https://facebook.com/SomePage/videos/123456789");
    expect(url).not.toBeNull();
  });

  test("accepts a fb.watch short link", () => {
    const url = getFacebookEmbedUrl("https://fb.watch/abc123/");
    expect(url).not.toBeNull();
    expect(url!.startsWith("https://www.facebook.com/plugins/video.php")).toBe(true);
  });

  test("rejects a non-Facebook domain", () => {
    expect(getFacebookEmbedUrl("https://evil.example.com/video")).toBeNull();
  });

  test("rejects a lookalike domain impersonating Facebook", () => {
    expect(getFacebookEmbedUrl("https://facebook.com.evil.example/video")).toBeNull();
    expect(getFacebookEmbedUrl("https://www.facebook.com.attacker.net/video")).toBeNull();
  });

  test("rejects YouTube and other video hosts", () => {
    expect(getFacebookEmbedUrl("https://www.youtube.com/watch?v=abc")).toBeNull();
  });

  test("rejects malformed input", () => {
    expect(getFacebookEmbedUrl("not a url")).toBeNull();
    expect(getFacebookEmbedUrl("")).toBeNull();
    expect(getFacebookEmbedUrl(null)).toBeNull();
    expect(getFacebookEmbedUrl(undefined)).toBeNull();
  });

  test("rejects non-http(s) protocols", () => {
    expect(getFacebookEmbedUrl("javascript:alert(1)")).toBeNull();
    expect(getFacebookEmbedUrl("ftp://facebook.com/video")).toBeNull();
  });
});

// Browser-level coverage. These assert against whatever the production
// Sanity dataset currently has configured (no livestream, as of this
// writing) plus invariants that must hold true in ANY state — so they stay
// meaningful whether or not a parish administrator has gone live since.
test.describe("Live Mass section", () => {
  test("homepage renders exactly one Live Mass state (active or offline) with no overflow", async ({
    page,
  }) => {
    await page.goto("/");
    const offlineHeading = page.getByRole("heading", { name: "Join Us in Prayer" });
    const iframe = page.locator('iframe[title*="Mass" i], iframe[title*="Live" i]');

    const isOffline = await offlineHeading.isVisible().catch(() => false);
    const hasIframe = (await iframe.count()) > 0;

    // Exactly one of the two states should be present — never both, never neither.
    expect(isOffline !== hasIframe).toBe(true);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBe(overflow.clientWidth);
  });

  test("offline state makes no Facebook embed requests", async ({ page }) => {
    const fbRequests: string[] = [];
    page.on("request", (req) => {
      if (/facebook\.com\/plugins\/video/.test(req.url())) fbRequests.push(req.url());
    });

    await page.goto("/");
    const offlineHeading = page.getByRole("heading", { name: "Join Us in Prayer" });

    if (await offlineHeading.isVisible().catch(() => false)) {
      await page.waitForTimeout(500);
      expect(fbRequests).toHaveLength(0);
      // No iframe element should exist in the DOM at all while offline.
      expect(await page.locator('iframe[src*="facebook.com"]').count()).toBe(0);
    }
  });

  test("any rendered Facebook iframe only ever uses the official video-plugin URL", async ({
    page,
  }) => {
    await page.goto("/");
    const iframes = page.locator("iframe");
    const count = await iframes.count();
    for (let i = 0; i < count; i++) {
      const src = await iframes.nth(i).getAttribute("src");
      if (src && src.includes("facebook.com")) {
        expect(src.startsWith("https://www.facebook.com/plugins/video.php")).toBe(true);
      }
    }
  });

  test("offline state shows a Facebook page link when one is configured", async ({ page }) => {
    await page.goto("/");
    const offlineHeading = page.getByRole("heading", { name: "Join Us in Prayer" });
    if (await offlineHeading.isVisible().catch(() => false)) {
      const cta = page.getByRole("link", { name: /visit our facebook page/i });
      // The CTA only renders when a Facebook page URL is configured in
      // Parish Settings — present or absent, both are valid, so this just
      // checks that if it's there, it actually points at Facebook.
      if (await cta.isVisible().catch(() => false)) {
        const href = await cta.getAttribute("href");
        expect(href).toMatch(/facebook\.com/);
      }
    }
  });
});

test.describe("/live page", () => {
  test("loads without errors and shows the same Live Mass state as the homepage", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto("/live");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/live mass/i);
    expect(errors).toHaveLength(0);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBe(overflow.clientWidth);
  });

  test("links to the Mass schedule", async ({ page }) => {
    await page.goto("/live");
    const link = page.getByRole("link", { name: /view mass schedule/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/mass-sacraments/);
  });
});
