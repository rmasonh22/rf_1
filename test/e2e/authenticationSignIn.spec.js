const { test, expect } = require("@playwright/test");
const util_signupUser = require("./util_signupUser");

test("should redirect after successful sign in", async ({ page }) => {
  const randomEmail = await util_signupUser(page);

  // Click [aria-label="Sign out"]
  await page.click('[aria-label="Sign out"]');
  await page.waitForNavigation();
  await page.goto("/");
  await page.click("text=Log in");

  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');
  // Fill [placeholder="Email address"]
  await page.fill('[placeholder="Email address"]', randomEmail);
  // Press Tab
  await page.press('[placeholder="Email address"]', "Tab");
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123456");
  // Click button:has-text("Sign in")
  await page.click('button:has-text("Sign in")');
  await expect(page).toHaveURL("/getting-started");
});
test("should show correct error messages on sign in", async ({ page }) => {
  // Go to /
  await page.goto("/");
  // Click text=Sign up
  await page.click("text=Log in");
  await page.click("text=Accept all");

  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');
  // Fill [placeholder="Email address"]
  await page.fill('[placeholder="Email address"]', "test@example.com");
  // Click button:has-text("Sign in")
  await page.click('button:has-text("Sign in")');
  // Click text=Please enter a password
  await page.click("text=Please enter a password");
  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123");
  // Click button:has-text("Sign in")
  await page.click('button:has-text("Sign in")');
  // Click text=Please enter a password with six characters or more
  await page.click("text=Please enter a password with six characters or more");
});
