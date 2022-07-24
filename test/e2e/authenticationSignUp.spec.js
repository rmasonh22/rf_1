const { test, expect } = require("@playwright/test");
const util_signupUser = require("./util_signupUser");

test("should redirect after successful signup", async ({ page }) => {
  await util_signupUser(page);
});

test("should prevent double sign-up", async ({ page }) => {
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

  await page.goto("/");
  // Click text=Sign up
  await page.click("text=Sign up");

  // Fill [placeholder="Email address"]
  await page.fill(
    '[placeholder="Email address"]',
    `${randomEmail}@example.com`
  );
  // Press Tab
  await page.press('[placeholder="Email address"]', "Tab");
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123456");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');
  // Click text=There already exists an account with the given email address.
  await page.click(
    "text=There already exists an account with the given email address."
  );
});

test("should have a valid email address", async ({ page }) => {
  // Go to /
  await page.goto("/");
  // Click text=Sign up
  await page.click("text=Sign up");

  // Click text=Accept all
  await page.click("text=Accept all");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');
  // Click text=Please enter an email address
  await page.click("text=Please enter an email address");
  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');
  // Fill [placeholder="Email address"]
  await page.fill('[placeholder="Email address"]', "test@");
  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123456");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');
  // Click text=Invalid email address.
  await page.click("text=Invalid email address.");
});

test("should have a valid password", async ({ page }) => {
  // Go to /
  await page.goto("/");
  // Click text=Sign up
  await page.click("text=Sign up");

  // Click text=Accept all
  await page.click("text=Accept all");

  // Click [placeholder="Email address"]
  await page.click('[placeholder="Email address"]');
  // Fill [placeholder="Email address"]
  await page.fill('[placeholder="Email address"]', "test@example.com");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');
  // Click text=Please enter a password
  await page.click("text=Please enter a password");

  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]');
  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', "123");
  // Click button:has-text("Sign Up")
  await page.click('button:has-text("Sign Up")');
  // Click text=Please enter a password with six characters or more
  await page.click("text=Please enter a password with six characters or more");
});
