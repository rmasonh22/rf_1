const { test, expect } = require("@playwright/test");
const util_signupUser = require("./util_signupUser");

test("should allow create, check and delete actions with the todo list", async ({
  page,
}) => {
  await util_signupUser(page);

  // Click text=Firebase
  await Promise.all([
    page.waitForNavigation(/*{ url: '/firebase' }*/),
    page.click("nav >> text=Firebase"),
  ]);
  // Click input[name="toDo"]
  await page.click('input[name="toDo"]');
  // Fill input[name="toDo"]
  await page.fill('input[name="toDo"]', "Item 1");

  // Select High
  await page.selectOption('select[name="priority"]', "High");
  // Click text=Save
  await page.click("text=Save");
  await page.waitForTimeout(300);

  await page.waitForSelector("text=Item 1HighRemove");

  // Click input[name="toDo"]
  await page.click('input[name="toDo"]');
  // Fill input[name="toDo"]
  await page.fill('input[name="toDo"]', "Item 2");

  // Select Medium
  await page.selectOption('select[name="priority"]', "Medium");
  // Click text=Save
  await page.click("text=Save");
  await page.waitForTimeout(300);
  await page.waitForSelector("text=Item 2MediumRemove");

  // Click input[name="toDo"]
  await page.click('input[name="toDo"]');
  // Fill input[name="toDo"]
  await page.fill('input[name="toDo"]', "Item 3");

  // Click text=Save
  await page.click("text=Save");
  await page.waitForTimeout(300);
  await page.waitForSelector("text=Item 3MediumRemove");

  await page.click("text=Item 1");
  await page.click("text=Item 2");
  await page.click("text=Item 3");

  await page.check('input:left-of(:text("Item 1"))');

  expect(await page.isChecked('input:left-of(:text("Item 1"))')).toBeTruthy();

  const tableItemsBeforeRemove = page.locator("tr");
  await expect(tableItemsBeforeRemove).toHaveCount(4);

  // Click text=Item 2MediumRemove >> button
  await page.click("text=Item 2MediumRemove >> button");

  const tableItemsAfterRemove = page.locator("tr");
  await expect(tableItemsAfterRemove).toHaveCount(3);
});
