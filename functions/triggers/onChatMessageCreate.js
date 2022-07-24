const config = require("../config");

module.exports = async (snap, context) => {
  try {
    // return early if you don't want to be informed by Email when a user
    // sends a message through the Chat widget
    if (config.CHAT_WIDGET.SEND_EMAIL_ON_RECEIVE !== "true") return;
    // return early if you haven't configured Postmark yet
    if (config.EMAIL.POSTMARK_SERVER === "") return;
    // don't send the email in the local dev environment
    if (process.env.NODE_ENV !== "production") return;

    const newChatMessage = snap.data();
    // return early if there is no message
    if (newChatMessage.message === undefined || newChatMessage.message === "")
      return;
    // return early if the message comes from an admin and not an user
    if (newChatMessage.reply) return;

    const postmark = await require("postmark");
    // Initialize the postmark serverClient
    const client = new postmark.ServerClient(config.EMAIL.POSTMARK_SERVER);

    // send email with a specified template
    await client.sendEmailWithTemplate({
      From: config.EMAIL.EMAIL_SENDER_ADDRESS,
      To: config.CHAT_WIDGET.CHAT_RECEIVE_EMAIL,
      TemplateAlias: "chat-notification",
      TemplateModel: {
        product_url: config.EMAIL.PRODUCT_URL,
        product_name: config.EMAIL.PRODUCT_NAME,
        twitter_url: config.EMAIL.TWITTER_URL,
        company_name: config.EMAIL.COMPANY_NAME,
        message: newChatMessage.message,
        chat_sender: `Email: ${newChatMessage.customerEmail} Id: ${context.params.userId}`,
        chat_websiteURL: config.CHAT_WIDGET.CHAT_WEBSITE_URL,
        timestamp: new Date(
          newChatMessage.createdAt._seconds * 1000
        ).toUTCString(),
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
