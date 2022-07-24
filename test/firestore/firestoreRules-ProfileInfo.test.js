const { readFileSync } = require("fs");
const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails } = testing;

const {
  doc,
  getDoc,
  setDoc,
  setLogLevel,
  updateDoc,
} = require("firebase/firestore");
const { assertSucceeds } = require("@firebase/rules-unit-testing");

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

describe("Profile information", () => {
  async function createCustomerProfileInfoWithAdmin(user) {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), `/customers/${user}/customerProfileInfo/123`),
        {
          firstName: "alice",
          lastName: "alice_last",
          email: "alice@example.com",
          country: "Germany",
          address: "Example street no.1",
          city: "Hamburg",
          state: "Hamburg",
          zip: "22838",
        }
      );
    });
  }
  // Test CREATE of customerProfileInfo

  it("should allow users to create their customerProfileInfo", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, `/customers/alice/customerProfileInfo/123`), {
        firstName: "alice",
        lastName: "alice_last",
        email: "alice@example.com",
        country: "Germany",
        address: "Example street no.1",
        city: "Hamburg",
        state: "Hamburg",
        zip: "22838",
      })
    );
  });
  it("should allow users to create their customerProfileInfo partly", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, `/customers/alice/customerProfileInfo/123`), {
        firstName: "alice",
        lastName: "alice_last",
        email: "alice@example.com",
        country: "Germany",
        city: "Hamburg",
        state: "Hamburg",
        zip: "22838",
      })
    );
  });
  it("should not allow users to create other users customerProfileInfo", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `/customers/bob/customerProfileInfo/123`), {
        firstName: "alice",
        lastName: "alice_last",
        email: "alice@example.com",
        country: "Germany",
        address: "Example street no.1",
        city: "Hamburg",
        state: "Hamburg",
        zip: "22838",
      })
    );
  });

  // Test READ of customerProfileInfo
  it("should allow users to read their customerProfileInfo", async function () {
    await createCustomerProfileInfoWithAdmin("alice");

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      getDoc(doc(aliceDb, "/customers/alice/customerProfileInfo/123"))
    );
  });
  it("should not allow users to read others customerProfileInfo", async function () {
    await createCustomerProfileInfoWithAdmin("bob");

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      getDoc(doc(aliceDb, "/customers/bob/customerProfileInfo/123"))
    );
  });
  // Test UPDATE of customerProfileInfo
  it("should allow users to update their customerProfileInfo", async function () {
    await createCustomerProfileInfoWithAdmin("alice");

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertSucceeds(
      updateDoc(doc(aliceDb, "/customers/alice/customerProfileInfo/123"), {
        address: "updated",
      })
    );
  });
  it("should not allow users to update others customerProfileInfo", async function () {
    await createCustomerProfileInfoWithAdmin("bob");

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      updateDoc(doc(aliceDb, "/customers/bob/customerProfileInfo/123"), {
        address: "updated",
      })
    );
  });
});
