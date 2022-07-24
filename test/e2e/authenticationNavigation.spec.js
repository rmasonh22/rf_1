const { test } = require("@playwright/test");

test("should navigate between the authentication pages", async ({ page }) => {
  // Go to /
  await page.goto("/");

  // Click text=Log in
  await page.click("text=Log in");

  // Click text=Sign in to your account
  await page.click("text=Sign in to your account");
  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');

  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');

  // Click text=register an account
  await page.click("text=register an account");

  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');

  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
});

test("should go to the forgot page", async ({ page }) => {
  await page.goto("/");
  await Promise.all([
    page.waitForNavigation(/*{ url: '/login' }*/),
    page.click("text=Log in"),
  ]);

  await page.click("text=Forgot your password?");

  // Click text=Reset your password
  await page.click("text=Reset your password");

  // Click input[name="email"]
  await page.click('input[name="email"]');
});
