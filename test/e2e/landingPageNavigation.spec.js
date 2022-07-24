const { test, expect } = require("@playwright/test");

test("should navigate to the privacy page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Click text=Accept all
  await page.click("text=Accept all");
  // Click text=Privacy
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/privacy' }*/),
    page.click("text=Privacy"),
  ]);
  await expect(page).toHaveURL("/privacy");
  // The new page should contain an h1 with "Privacy Policy"
  await expect(page.locator("h1")).toContainText("Privacy Policy");
});
test("should navigate to the legal page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'Legal Notice' and click on it
  await page.click("text=Legal Notice");

  // Click text=Legal notice / Impressum
  await page.click("text=Legal notice");
});
test("should navigate to the tagged h1s", async ({ page }) => {
  await page.goto("/");

  // Click text=Features
  await page.click("text=Features");
  await expect(page).toHaveURL("/#features");

  await page.dblclick("text=A better way to start your next SaaS business");
  // Click text=Pricing
  await page.click("text=Pricing");
  await expect(page).toHaveURL("/#pricing");
  // Double click h1:has-text("Pricing")
  await page.click("text=Buy this starter now");
});
