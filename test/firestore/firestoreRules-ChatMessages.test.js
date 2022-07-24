const { readFileSync } = require("fs");
const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails, assertSucceeds } = testing;

const {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  setLogLevel,
  updateDoc,
  query,
  limit,
  getDocs,
  collection,
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

describe("Chat messages", () => {
  async function createChatMessageDocumentViaAdmin({ owner, isReply = false }) {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `chatUsers/${owner}/chatMessages/123`),
        {
          message: "Test",
          ...(isReply && { reply: "admin" }),
          createdAt: serverTimestamp(),
          customerEmail: "Email@example.com",
        }
      );
    });
  }
  // Test CREATE of chat documents

  it("should allow users with an account to create a new chat item", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        createdAt: serverTimestamp(),
        customerEmail: "alice@example.com",
      })
    );
  });

  it("shouldn't allow unauthenticated users to create a new chat item for a user with an account", async function () {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthedDb, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        createdAt: serverTimestamp(),
        customerEmail: "Anonymous",
      })
    );
  });
  it("shouldn't allow users to create a new chat item for a different user", async function () {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();

    await assertFails(
      setDoc(doc(unauthedDb, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        createdAt: serverTimestamp(),
        customerEmail: "Anonymous",
      })
    );
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/bob/chatMessages/123`), {
        message: "Test",
        createdAt: serverTimestamp(),
        customerEmail: "Anonymous",
      })
    );
  });
  it("should allow admin users to create a new chat item as a reply", async function () {
    const adminDB = testEnv
      .authenticatedContext("adminID", { admin: true })
      .firestore();

    await assertSucceeds(
      setDoc(doc(adminDB, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        reply: "adminID",
        unread: true,
        createdAt: serverTimestamp(),
        customerEmail: "Anonymous",
      })
    );
  });
  it("should not allow a chat message creation with a missing field", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/alice/chatMessages/123`), {
        createdAt: serverTimestamp(),
        customerEmail: "alice@example.com",
      })
    );

    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        customerEmail: "alice@example.com",
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, `chatUsers/alice/chatMessages/123`), {
        message: "Test",
        createdAt: serverTimestamp(),
      })
    );
  });

  it("should not allow the creation of a chat message document with an additional field", async function () {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthedDb, "chatUsers/alice/chatMessages/123"), {
        message: "Test",
        createdAt: serverTimestamp(),
        customerEmail: "alice@example.com",
        additional: "field",
      })
    );
  });
  // Test READ of chat documents

  it("should allow a user to read its own chat messages", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();
    const q = query(
      collection(aliceDb, "chatUsers/alice/chatMessages"),
      limit(1000)
    );
    await assertSucceeds(getDocs(q));
  });
  it("shouldn't allow a user to read other users chat messages", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice" });
    await createChatMessageDocumentViaAdmin({ owner: "bob" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();
    const q = query(
      collection(aliceDb, "chatUsers/bob/chatMessages"),
      limit(1000)
    );
    await assertFails(getDocs(q));
  });
  it("should allow an admin user to read all chat messages", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice" });

    const adminDB = testEnv
      .authenticatedContext("adminID", { admin: true })
      .firestore();
    await assertSucceeds(
      getDoc(doc(adminDB, "chatUsers/alice/chatMessages/123"))
    );
  });

  // Test UPDATE of chat message documents

  it("should allow an update that updates the unread status on a reply", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice", isReply: true });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      updateDoc(doc(aliceDb, "chatUsers/alice/chatMessages/123"), {
        unread: false,
      })
    );
  });
  it("should not allow an update that changes the chat message reply admin UID", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice", isReply: true });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      updateDoc(doc(aliceDb, "chatUsers/alice/chatMessages/123"), {
        unread: false,
        reply: "bob",
      })
    );
  });

  // Test DELETE of chat message documents

  it("should not allow to delete of a chat message", async function () {
    await createChatMessageDocumentViaAdmin({ owner: "alice" });
    await createChatMessageDocumentViaAdmin({ owner: "bob" });

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      deleteDoc(doc(aliceDb, "chatUsers/alice/chatMessages/123"))
    );
    await assertFails(
      deleteDoc(doc(aliceDb, "chatUsers/bob/chatMessages/123"))
    );
  });
});
