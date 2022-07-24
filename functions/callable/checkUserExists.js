const functions = require("firebase-functions");

let isAdminInitiated = false;

module.exports = async (data, context) => {
  try {
    // Only admins are allowed to call this function
    const uid = context.auth.uid;
    const admin = context.auth.token.admin;
    if (!(uid && admin === true)) {
      throw new functions.https.HttpsError(
        "unauthorized",
        "Only admins are allowed to call this function."
      );
    }

    const { initializeApp } = await require("firebase-admin/app");
    const { getAuth } = await require("firebase-admin/auth");

    if (!isAdminInitiated) {
      initializeApp();
      isAdminInitiated = true;
    }
    const userUID = data.userUID;
    const auth = getAuth();

    // make sure the user exists (can be fetched)
    return auth
      .getUser(userUID)
      .then((user) => {
        // user does exists
        return { userExists: true, userEmail: user.email };
      })
      .catch(() => {
        // user does not exists
        return { userExists: false };
      });
  } catch (error) {
    functions.logger.log(error);
  }
};
