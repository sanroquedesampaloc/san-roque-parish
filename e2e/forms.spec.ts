import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders all form fields with labels", async ({ page }) => {
    await expect(page.getByLabel(/^name$/i)).toBeVisible();
    await expect(page.getByLabel(/^email$/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test("submit button exists and is labeled", async ({ page }) => {
    const submit = page.getByRole("button", { name: /send message/i });
    await expect(submit).toBeVisible();
    await expect(submit).toBeEnabled();
  });

  test("fields have correct input types", async ({ page }) => {
    const emailInput = page.getByLabel(/^email$/i);
    await expect(emailInput).toHaveAttribute("type", "email");

    const phoneInput = page.getByLabel(/phone/i);
    await expect(phoneInput).toHaveAttribute("type", "tel");
  });

  test("fields are keyboard-navigable", async ({ page }) => {
    const nameInput = page.getByLabel(/^name$/i);
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    const emailInput = page.getByLabel(/^email$/i);
    await emailInput.focus();
    await expect(emailInput).toBeFocused();

    const messageInput = page.getByLabel(/message/i);
    await messageInput.focus();
    await expect(messageInput).toBeFocused();
  });
});

test.describe("Prayer request form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/prayer-request");
  });

  test("renders form fields with labels", async ({ page }) => {
    await expect(page.getByLabel(/^name/i)).toBeVisible();
    await expect(page.getByLabel(/^email/i)).toBeVisible();
    await expect(page.getByLabel(/prayer intention/i)).toBeVisible();
  });

  test("submit button exists", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /submit prayer request/i })
    ).toBeVisible();
  });

  test("wantsContact checkbox makes email required", async ({ page }) => {
    const checkbox = page.getByRole("checkbox", {
      name: /contact me/i,
    });
    await expect(checkbox).not.toBeChecked();

    const emailLabel = page.getByLabel(/^email/i);
    await expect(emailLabel).not.toHaveAttribute("required");

    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(emailLabel).toHaveAttribute("required", "");
  });

  test("prayer form fields are keyboard-navigable", async ({ page }) => {
    const nameInput = page.locator("#prayer-name");
    await nameInput.click();
    await expect(nameInput).toBeFocused();

    const emailInput = page.locator("#prayer-email");
    await emailInput.click();
    await expect(emailInput).toBeFocused();

    const intentionInput = page.locator("#prayer-intention");
    await intentionInput.click();
    await expect(intentionInput).toBeFocused();
  });
});
