const functions = require("firebase-functions");

// Firestore Triggers
exports.onChatMessageCreate = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .firestore.document("/chatUsers/{userId}/chatMessages/{messageId}")
  .onCreate(lazy("./onChatMessageCreate"));
exports.onCustomClaimChange = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .firestore.document("/customClaims/{userId}")
  .onWrite(lazy("./onCustomClaimChange"));
exports.onChatsDelete = functions
  .region("europe-west1")
  .runWith({
    minInstances: 0,
    maxInstances: 60,
  })
  .firestore.document("/chatUsers/{userId}")
  .onDelete(lazy("./onChatsDelete"));

// --- TRIGGER EXAMPLES ---

// Auth Triggers
// exports.onUserCreate = functions
//   .region("europe-west1")
//   .auth.user()
//   .onCreate(lazy("./onUserCreate"));
// exports.onUserDelete = functions.auth.user().onDelete(lazy('./onUserDelete'))

// Firestore Triggers
// exports.onPostUpdate = functions.firestore.document('posts/{postId}').onUpdate((change, context) => {})
// exports.onPostWrite = functions.firestore.document('posts/{postId}').onWrite((change, context) => {})

// Remote Config Triggers
// exports.onRemoteConfigUpdate = functions.remoteConfig.onUpdate((versionMetadata) => {})

// Google Analytics Triggers
// exports.sendCouponOnPurchase  = functions.analytics.event('in_app_purchase').onLog((event) => { return event.user.userId })

// Crashlytics Triggers
// exports.notifyOnNewIssue = functions.crashlytics.issue().onNew(async (issue) => {})
// exports.notifyOnRegress = functions.crashlytics.issue().onRegress(async (issue) => {})
// exports.notifyOnVelocityAlert = functions.crashlytics.issue().onVelocityAlert(async (issue) => {})

// Cloud Storage Triggers
// exports.onFileArchive = functions.storage.object().onArchive(async (object) => {})
// exports.onFileDelete = functions.storage.object().onDelete(async (object) => {})
// exports.onFileCreate = functions.storage.object().onFinalize(async (object) => {})
// exports.onFileMetaUpdate = functions.storage.object().onMetadataUpdate(async (object) => {})

// Cloud Pub/Sub Triggers
// exports.helloPubSub = functions.pubsub.topic('topic-name').onPublish((message) => {})

// Test Lab Triggers
// exports.sendNotificationOnTestLab = functions.testLab.testMatrix().onComplete((testMatrix) => {})

/**
 * Lazy load package / file
 *
 * @param {string} pkg - Package or file name
 */
function lazy(pkg) {
  return (...args) => require(pkg)(...args);
}
