let isAdminInitiated = false;

module.exports = async (change, context) => {
  try {
    const { initializeApp } = await require("firebase-admin/app");
    const { getAuth } = await require("firebase-admin/auth");

    if (!isAdminInitiated) {
      initializeApp();
      isAdminInitiated = true;
    }
    const uid = context.params.userId;
    const auth = getAuth();

    // make sure the user exists (can be fetched) before trying to set claims
    await auth.getUser(uid);

    // becomes null when the document was deleted
    const claims = change.after.data() || null;

    // if claims is not null but also isn't an object, the claims are not set in the
    // correct format
    if (claims && typeof claims !== "object") {
      const functions = await require("firebase-functions");
      functions.logger.error(
        `Invalid custom claims for user '${uid}'. Must be object, was ${JSON.stringify(
          claims
        )}`,
        { uid }
      );
      return;
    }

    await auth.setCustomUserClaims(uid, claims);

    const functions = await require("firebase-functions");

    functions.logger.info(
      `Claims: ${JSON.stringify(
        claims
      )} set for user '${uid}', logging sync time to Firestore`,
      { uid }
    );
  } catch (error) {
    // We want to capture errors and render them in a user-friendly way, while
    // still logging an exception with StackDriver
    const functions = await require("firebase-functions");
    functions.logger.log(error);
  }
};
