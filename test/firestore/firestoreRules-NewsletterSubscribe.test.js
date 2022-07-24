const { readFileSync } = require("fs");
const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails, assertSucceeds } = testing;

const {
  doc,
  getDoc,
  // updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  setLogLevel,
} = require("firebase/firestore");

let testEnv;

before(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel("error");

  testEnv = await initializeTestEnvironment({
    firestore: { rules: readFileSync("../../firestore.rules", "utf8") },
  });
});

after(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe("Newsletter subscriber", () => {
  async function createSubscriberDocumentViaAdmin() {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "newsletter/testNewsletter_1"), {
        subscriber: "test@gmail.com",
        createdAt: serverTimestamp(),
        source: "landing_page",
      });
    });
  }

  // Test CREATE of subscriber documents

  it("should allow all users to create a new subscriber item", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, "newsletter/testNewsletter_1"), {
        subscriber: "test@gmail.com",
        createdAt: serverTimestamp(),
        source: "landing_page",
      })
    );
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(
      setDoc(doc(unauthedDb, "newsletter/testNewsletter_2"), {
        subscriber: "test@gmail.com",
        createdAt: serverTimestamp(),
        source: "landing_page",
      })
    );
  });
  it("should not allow the creation of subscriber document with an additional field", async function () {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthedDb, "newsletter/testNewsletter_1"), {
        subscriber: "test@gmail.com",
        createdAt: serverTimestamp(),
        source: "landing_page",
        additional: "field",
      })
    );
  });

  it("should not allow a subscriber creation with a missing field", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, "newsletter/testNewsletter_1"), {
        createdAt: serverTimestamp(),
        source: "landing_page",
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, "newsletter/testNewsletter_1"), {
        subscriber: "test@gmail.com",
        source: "landing_page",
      })
    );
  });

  // Test READ of subscriber documents

  it("should not allow to read any subscriber", async function () {
    await createSubscriberDocumentViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(getDoc(doc(aliceDb, "newsletter/testNewsletter_1")));
  });

  // Test UPDATE of subscriber documents

  it("should not allow an update to a subscriber document", async function () {
    await createSubscriberDocumentViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, "newsletter/testNewsletter_1"), {
        message: "changed",
      })
    );
  });

  // Test DELETE of subscriber documents

  it("should not allow to delete a subscriber document", async function () {
    await createSubscriberDocumentViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(deleteDoc(doc(aliceDb, "newsletter/testNewsletter_1")));
  });
});
