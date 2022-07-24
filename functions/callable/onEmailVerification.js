const config = require("../config");

let isAdminInitiated = false;

module.exports = async (data) => {
  try {
    // Return early if no email is given
    if (!data.email) return;
    const { initializeApp } = await require("firebase-admin/app");
    const { getAuth } = await require("firebase-admin/auth");

    if (!isAdminInitiated) {
      initializeApp();
      isAdminInitiated = true;
    }
    const email = data.email;

    const link = await getAuth().generateEmailVerificationLink(email);

    const postmark = await require("postmark");

    // Initialize the postmark serverClient
    const client = new postmark.ServerClient(config.EMAIL.POSTMARK_SERVER);
    await client.sendEmailWithTemplate({
      From: config.EMAIL.EMAIL_SENDER_ADDRESS,
      To: email,
      TemplateAlias: "email-verification",
      TemplateModel: {
        product_url: config.EMAIL.PRODUCT_URL,
        product_name: config.EMAIL.PRODUCT_NAME,
        action_url: link,
        twitter_url: config.EMAIL.TWITTER_URL,
        company_name: config.EMAIL.COMPANY_NAME,
        company_address: config.EMAIL.COMPANY_ADDRESS,
      },
    });
  } catch (error) {
    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
