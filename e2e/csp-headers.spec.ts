import { test, expect } from "@playwright/test";

test.describe("Security headers", () => {
  test("public page returns security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response!.headers();

    expect(headers["content-security-policy"]).toBeDefined();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin"
    );
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["strict-transport-security"]).toContain("max-age=");
  });

  test("/studio does NOT have X-Frame-Options DENY", async ({ page }) => {
    const response = await page.goto("/studio");
    const headers = response!.headers();
    expect(headers["x-frame-options"]).toBeUndefined();
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });
});

test.describe("CSP runtime verification", () => {
  const pagesToCheck = [
    { path: "/", label: "homepage" },
    { path: "/contact", label: "contact (turnstile)" },
    { path: "/prayer-request", label: "prayer request (turnstile)" },
    { path: "/about", label: "about (sanity images)" },
    { path: "/live", label: "live (facebook embed)" },
  ];

  for (const { path, label } of pagesToCheck) {
    test(`no CSP violations on ${label}`, async ({ page }) => {
      const cspViolations: string[] = [];

      page.on("console", (msg) => {
        const text = msg.text();
        if (
          text.includes("Content-Security-Policy") ||
          text.includes("content security policy") ||
          (text.includes("Refused to") && msg.type() === "error")
        ) {
          cspViolations.push(text);
        }
      });

      await page.goto(path);
      await page.waitForTimeout(2000);

      if (cspViolations.length > 0) {
        console.log(`CSP violations on ${path}:`, cspViolations);
      }
      expect(cspViolations).toHaveLength(0);
    });
  }
});
