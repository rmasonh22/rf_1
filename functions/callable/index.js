const functions = require("firebase-functions");

exports.passwordReset = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .https.onCall(lazy("./onPasswordReset"));

exports.emailVerification = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .https.onCall(lazy("./onEmailVerification"));

exports.checkUserExists = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .https.onCall(lazy("./checkUserExists"));

exports.checkEmailVerified = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 1,
  })
  .https.onCall(lazy("./checkEmailVerified"));

/**
 * Lazy load package / file
 *
 * @param {string} pkg - Package or file name
 */
function lazy(pkg) {
  return (...args) => require(pkg)(...args);
}
