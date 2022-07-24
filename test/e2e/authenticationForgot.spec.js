const { test } = require("@playwright/test");

test("should show a success messages after email enter on pw forget", async ({
  page,
}) => {
  // Go to /
  await page.goto("/");
  // Click text=Log in
  await Promise.all([
    page.waitForNavigation(/*{ url: '/login' }*/),
    page.click("text=Log in"),
  ]);
  await page.click("text=Accept all");

  // Click text=Forgot your password?
  await Promise.all([
    page.waitForNavigation(/*{ url: '/forgot' }*/),
    page.click("text=Forgot your password?"),
  ]);
  // Click input[name="email"]
  await Promise.all([
    page.waitForNavigation(/*{ url: '/login' }*/),
    await page.click('input[type="email"]'),
  ]);
  // Fill input[name="email"]
  await page.fill('input[type="email"]', "test@example.com");
  // Click button:has-text("Send password reset email")
  await page.click('button:has-text("Send password reset email")');
  // Click text=Check your email inbox for further instructions to reset your password.
  await page.click(
    "text=Check your email inbox for further instructions to reset your password."
  );
});
