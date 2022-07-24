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
  updateDoc,
} = require("firebase/firestore");

let testEnv;

before(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel("error");

  testEnv = await initializeTestEnvironment({
    projectId: "test-firestore",
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

describe("Chat Users", () => {
  async function createChatUserDocumentViaAdmin({ owner }) {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), `chatUsers/${owner}`), {
        processed: false,
        newestMessageCreatedAt: serverTimestamp(),
        email: "test@example.com",
      });
    });
  }
  // Test CREATE of chat users

  it("should allow users with an account to create a new chat user", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, `chatUsers/alice`), {
        processed: false,
        newestMessageCreatedAt: serverTimestamp(),
        email: "alice@example.com",
      })
    );
  });
  it("should not allow users with an account to create a new chat user with processed = true", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/alice`), {
        processed: true,
        newestMessageCreatedAt: serverTimestamp(),
        email: "alice@example.com",
      })
    );
  });
  it("should not allow users with an account to create a new chat user for another user", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/bob`), {
        processed: false,
        newestMessageCreatedAt: serverTimestamp(),
        email: "alice@example.com",
      })
    );
  });
  it("should allow admins to create a new chat user", async function () {
    const aliceDb = testEnv
      .authenticatedContext("admin", { admin: true })
      .firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, `chatUsers/alice`), {
        processed: false,
        newestMessageCreatedAt: serverTimestamp(),
        email: "alice@example.com",
      })
    );
  });

  it("should not allow the creation of a chat user  with an additional field", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();
    await assertFails(
      setDoc(doc(aliceDb, "chatUsers/alice"), {
        processed: false,
        newestMessageCreatedAt: serverTimestamp(),
        email: "alice@example.com",
        additionalField: "test",
      })
    );
  });
  // Test READ of chat users

  it("should allow an admin to read chat users", async function () {
    await createChatUserDocumentViaAdmin({ owner: "alice" });
    await createChatUserDocumentViaAdmin({ owner: "bob" });

    const aliceDb = testEnv
      .authenticatedContext("alice", { admin: true })
      .firestore();

    await assertSucceeds(getDoc(doc(aliceDb, "chatUsers/alice")));
    await assertSucceeds(getDoc(doc(aliceDb, "chatUsers/bob")));
  });
  it("should not allow an user to read chat users", async function () {
    await createChatUserDocumentViaAdmin({ owner: "alice" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(getDoc(doc(aliceDb, "chatUsers/alice")));
  });
  // Test UPDATE of chat message documents

  it("should allow users with an account to update a chat user", async function () {
    await createChatUserDocumentViaAdmin({ owner: "alice" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      updateDoc(doc(aliceDb, `chatUsers/alice`), {
        newestMessageCreatedAt: serverTimestamp(),
      })
    );
  });

  // Test DELETE of chat message documents

  it("should not allow a user to delete a chat message", async function () {
    await createChatUserDocumentViaAdmin({ owner: "alice" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(deleteDoc(doc(aliceDb, "chatUsers/alice")));
  });
  it("should allow an admin to delete a chat message", async function () {
    await createChatUserDocumentViaAdmin({ owner: "alice" });

    const aliceDb = testEnv
      .authenticatedContext("alice", { admin: true })
      .firestore();

    await assertSucceeds(deleteDoc(doc(aliceDb, "chatUsers/alice")));
  });
});
