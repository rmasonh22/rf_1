const { expect } = require("@playwright/test");

async function util_signupUser(page) {
  // Go to /
  await page.goto("/");
  // Click text=Sign up
  await page.click("text=Sign up");
  await page.click("text=Accept all");

  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');

  const randomEmail = Math.random().toString(36).slice(-5);
  // Fill [placeholder="Email address"]
  await page.fill(
    '[placeholder="Email address"]',
    `${randomEmail}@example.com`
  );

  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123456");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');

  await expect(page).toHaveURL("/getting-started");
  return `${randomEmail}@example.com`;
}

module.exports = util_signupUser;
