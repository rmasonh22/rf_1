const { readFileSync } = require("fs");

const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails, assertSucceeds } = testing;

const {
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  setLogLevel,
  getDocs,
  collection,
  where,
  limit,
  query,
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

describe("Todo list example", () => {
  async function createTodoItemViaAdmin() {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "todos/todo1"), {
        owner: "alice",
        todo: "Todo #1",
        status: "open",
        priority: "High",
        createdAt: serverTimestamp(),
      });
    });
  }
  // Test CREATE of todo documents

  it("should ONLY allow users to create a todo for themselves", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "alice",
        todo: "Todo #1",
        status: "open",
        priority: "High",
        createdAt: serverTimestamp(),
      })
    );
  });

  it("should not allow a todo creation by a non-owner", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "bob",
        todo: "Todo #1",
        status: "open",
        priority: "High",
        createdAt: serverTimestamp(),
      })
    );
  });
  it("should not allow a todo creation with a missing field", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        todo: "Todo #1",
        status: "open",
        priority: "High",
        createdAt: serverTimestamp(),
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "alice",
        status: "open",
        priority: "High",
        createdAt: serverTimestamp(),
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "alice",
        todo: "Todo #1",
        priority: "High",
        createdAt: serverTimestamp(),
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "alice",
        todo: "Todo #1",
        status: "open",
        createdAt: serverTimestamp(),
      })
    );
    await assertFails(
      setDoc(doc(aliceDb, "todos/testTodo_1"), {
        owner: "alice",
        todo: "Todo #1",
        status: "open",
        priority: "High",
      })
    );
  });

  // Test LIST of todo documents

  it("should allow to read owned todos", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();
    const q = query(
      collection(aliceDb, "todos"),
      where("owner", "==", "alice"),
      limit(100)
    );
    await assertSucceeds(getDocs(q));
  });

  it("should not allow to read an not owned todo", async function () {
    await createTodoItemViaAdmin();

    const bobDb = testEnv.authenticatedContext("bob").firestore();
    const q = query(
      collection(bobDb, "todos"),
      where("owner", "==", "alice"),
      limit(100)
    );

    await assertFails(getDocs(q));
  });

  // Test UPDATE of todo documents

  it("should not allow an update that changes the todo owner", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, "todos/todo1"), {
        owner: "bob",
      })
    );
  });

  it("should allow an update that changes the status", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      updateDoc(doc(aliceDb, "todos/todo1"), {
        status: "done",
      })
    );
  });

  it("should not allow an update that changes the todo name", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      updateDoc(doc(aliceDb, "todos/todo1"), {
        todo: "Changed",
      })
    );
  });

  // Test DELETE of todo documents

  it("should not allow to delete a not owned todo", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("bob").firestore();

    await assertFails(deleteDoc(doc(aliceDb, "todos/todo1")));
  });

  it("should allow to delete an owned todo", async function () {
    await createTodoItemViaAdmin();

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(deleteDoc(doc(aliceDb, "todos/todo1")));
  });
});
