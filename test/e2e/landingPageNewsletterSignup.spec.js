const { test } = require("@playwright/test");

test("should be able to sign up for the newsletter successfully", async ({
  page,
}) => {
  await page.goto("/");
  // Click [placeholder="Your email address"]
  await page.click('[placeholder="Your email address"]');
  // Fill [placeholder="Your email address"]
  await page.fill('[placeholder="Your email address"]', "Test@example.com");
  // Click text=Register
  await page.click("text=Register");
  // Click text=Successfully signed up. Thank you!
  await page.click("text=Successfully signed up. Thank you!");
});
