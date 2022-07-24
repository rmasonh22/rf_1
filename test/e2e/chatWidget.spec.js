const { test } = require("@playwright/test");
const util_signupUser = require("./util_signupUser");

test("chat widget in signup area", async ({ page }) => {
  await util_signupUser(page);
  // Click [aria-label="Chat widget"]
  await page.click('[aria-label="Chat widget"]');
  // Click [aria-label="Send us a message..."]
  await page.click('[aria-label="Send us a message..."]');
  // Click button:has-text("Feature request")
  await page.click('button:has-text("Feature request")');
  // Click text=👋 Hi! Tell us what is missing!
  await page.click("text=👋 Hi! Tell us what is missing!");
  // Click [aria-label="Send us a message..."]
  await page.click('[aria-label="Send us a message..."]');
  // Fill [aria-label="Send us a message..."]
  await page.fill('[aria-label="Send us a message..."]', "Test message 1");
  // Click [aria-label="Send message"]
  await page.click('[aria-label="Send message"]');

  await page.click("text=Test message 1");
  // Click [aria-label="Send us a message..."]
  await page.click('[aria-label="Send us a message..."]');
  // Fill [aria-label="Send us a message..."]
  await page.fill('[aria-label="Send us a message..."]', "Test message 2");
  // Click [aria-label="Send message"]
  await page.click('[aria-label="Send message"]');
  // Click text=Test 2
  await page.click("text=Test message 2");
});

test("chat widget with anonymous user", async ({ page }) => {
  // Go to /
  await page.goto("/");
  // This is necessary as we lazy load the chat widget in the landing page with
  // 5000 ms delay
  await page.waitForTimeout(5500);
  // Click text=Accept all
  await page.click("text=Accept all");
  // Click [aria-label="Chat widget"]
  await page.click('[aria-label="Chat widget"]');
  // Click text=EmailOptional
  await page.click("text=EmailOptional");
  // Click [placeholder="you@example.com"]
  await page.click('[placeholder="you@example.com"]');
  // Fill [placeholder="you@example.com"]
  await page.fill('[placeholder="you@example.com"]', "text@example.com");
  // Click [aria-label="Send us a message..."]
  await page.click('[aria-label="Send us a message..."]');
  // Fill [aria-label="Send us a message..."]
  await page.fill('[aria-label="Send us a message..."]', "Test message 1");
  // Click [aria-label="Send message"]
  await page.click('[aria-label="Send message"]');
  await page.click("text=Test message 1");
});
