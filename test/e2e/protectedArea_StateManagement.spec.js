const { test } = require("@playwright/test");
const util_signupUser = require("./util_signupUser");

test("should change the global state with Zustand.js correctly", async ({
  page,
}) => {
  await util_signupUser(page);

  // Click text=State Management
  await Promise.all([
    page.waitForNavigation(/*{ url: '/state-management' }*/),
    page.click("text=State Management"),
  ]);
  // Click h2:has-text("State management")
  await page.click('h2:has-text("State management")');
  // Click text=Value of the counter: 0
  await page.click("text=Value of the counter: 0");
  // Click button:has-text("increaseSimpleCounter()")
  await page.click('button:has-text("increaseSimpleCounter()")');
  // Click text=Value of the counter: 1
  await page.click("text=Value of the counter: 1");
  // Click button:has-text("increaseSimpleCounter()")
  await page.click('button:has-text("increaseSimpleCounter()")');
  // Click text=Value of the counter: 2
  await page.click("text=Value of the counter: 2");
  // Click button:has-text("clearSimpleCounter()")
  await page.click('button:has-text("clearSimpleCounter()")');
  // Click text=Value of the counter: 0
  await page.click("text=Value of the counter: 0");
  // Click text=Value of the nested state: Hard to get!
  await page.click("text=Value of the nested state: Hard to get!");
  // Click text=Change nested state with set()
  await page.click("text=Change nested state with set()");
  // Click text=Value of the nested state: Deep change!
  await page.click("text=Value of the nested state: Deep change!");
});
