const { test } = require("@playwright/test");

test("should show the cookie banner, show the details and open the privacy page", async ({
  page,
}) => {
  await page.goto("/");
  // Click text=Cookie settings
  await page.click("text=Cookie settings");
  // Click button:has-text("Details")
  await page.click('button:has-text("Details")');
  // Click button:has-text("Necessary")
  await page.click('button:has-text("Necessary")');
  // Click h3:has-text("Necessary")
  await page.click('h3:has-text("Necessary")');
  // Click button:has-text("Statistic")
  await page.click('button:has-text("Statistic")');
  // Click h3:has-text("Statistic")
  await page.click('h3:has-text("Statistic")');

  // Click button:has-text("Dismiss")
  await page.click('button:has-text("Dismiss")');
  // Click text=Privacy Policy
  const [page1] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("text=Privacy Policy"),
  ]);
  // Click text=Privacy Policy
  await page1.click("text=Privacy Policy");
});

test("should show the cookie banner and accept all Cookies", async ({
  page,
  context,
}) => {
  await page.goto("/");
  // Click text=Cookie settings
  await page.click("text=Cookie settings");
  // Click text=Accept all
  await page.click("text=Accept all");
  const cookies = await context.cookies();

  // Check whether the statistic cookie is set to true
  const statisticCookieSet = cookies.some((element) => {
    if (element.name === "acceptStatistic" && element.value === "true") {
      return true;
    }
  });
  if (!statisticCookieSet) throw "Statistic cookie not set";

  // Check whether the cookie choice done cookie is set to true

  const cookieChoiceDone = cookies.some((element) => {
    if (element.name === "cookieChoiceDone" && element.value === "true") {
      return true;
    }
  });
  if (!cookieChoiceDone) throw "cookieChoiceDone cookie not set";
});

test("should show the cookie banner and accept only necessary Cookies", async ({
  page,
  context,
}) => {
  await page.goto("/");
  // Click text=Cookie settings
  await page.click("text=Cookie settings");
  // Click text=Accept all
  await page.click("text=Accept only necessary");
  const cookies = await context.cookies();

  // Check whether the statistic cookie is set to false
  const statisticCookieSet = cookies.some((element) => {
    if (element.name === "acceptStatistic" && element.value === "false") {
      return true;
    }
  });
  if (!statisticCookieSet) throw "Statistic cookie set but shouldn't";

  // Check whether the cookie choice done cookie is set to true

  const cookieChoiceDone = cookies.some((element) => {
    if (element.name === "cookieChoiceDone" && element.value === "true") {
      return true;
    }
  });
  if (!cookieChoiceDone) throw "cookieChoiceDone cookie not set";
});
test("should show the cookie banner and accept selected Cookies (statistic=true)", async ({
  page,
  context,
}) => {
  await page.goto("/");
  // Click text=Cookie settings
  await page.click("text=Cookie settings");

  // Check input[name="statisticCookies"]
  await page.check('input[name="statisticCookies"]');
  // Click text=Accept selection
  await page.click("text=Accept selection");

  const cookies = await context.cookies();

  // Check whether the statistic cookie is set to true
  const statisticCookieSet = cookies.some((element) => {
    if (element.name === "acceptStatistic" && element.value === "true") {
      return true;
    }
  });
  if (!statisticCookieSet) throw "Statistic cookie not set";

  // Check whether the cookie choice done cookie is set to true

  const cookieChoiceDone = cookies.some((element) => {
    if (element.name === "cookieChoiceDone" && element.value === "true") {
      return true;
    }
  });
  if (!cookieChoiceDone) throw "cookieChoiceDone cookie not set";
});
test("should show the cookie banner and accept selected Cookies (statistic=false)", async ({
  page,
  context,
}) => {
  await page.goto("/");
  // Click text=Cookie settings
  await page.click("text=Cookie settings");

  // Click text=Accept selection
  await page.click("text=Accept selection");

  const cookies = await context.cookies();

  // Check whether the statistic cookie is set to false
  const statisticCookieSet = cookies.some((element) => {
    if (element.name === "acceptStatistic" && element.value === "false") {
      return true;
    }
  });
  if (!statisticCookieSet) throw "Statistic cookie not set";

  // Check whether the cookie choice done cookie is set to true

  const cookieChoiceDone = cookies.some((element) => {
    if (element.name === "cookieChoiceDone" && element.value === "true") {
      return true;
    }
  });
  if (!cookieChoiceDone) throw "cookieChoiceDone cookie not set";
});
