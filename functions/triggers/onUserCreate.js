const config = require("../config");

module.exports = async (newUser) => {
  try {
    // return early if you haven't configured Postmark yet
    if (config.EMAIL.POSTMARK_SERVER === "") return;

    // return early if we don't have an email address for the user
    if (newUser.email === undefined) return;
    const postmark = await require("postmark");
    // Initialize the postmark serverClient
    const client = new postmark.ServerClient(config.EMAIL.POSTMARK_SERVER);

    // send email with a specified template
    await client.sendEmailWithTemplate({
      From: config.EMAIL.EMAIL_SENDER_ADDRESS,
      To: newUser.email,
      TemplateAlias: "welcome",
      TemplateModel: {
        product_url: config.EMAIL.PRODUCT_URL,
        product_name: config.EMAIL.PRODUCT_NAME,
        action_url: config.EMAIL.TEMPLATE_WELCOME.ACTION_URL,
        support_email: config.EMAIL.EMAIL_SENDER_ADDRESS,
        sender_name: config.EMAIL.SENDER_NAME,
        twitter_url: config.EMAIL.TWITTER_URL,
        company_name: config.EMAIL.COMPANY_NAME,
        company_address: config.EMAIL.COMPANY_ADDRESS,
      },
    });
  } catch (error) {
    // We want to capture errors and render them in a user-friendly way, while
    // still logging an exception with StackDriver
    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
