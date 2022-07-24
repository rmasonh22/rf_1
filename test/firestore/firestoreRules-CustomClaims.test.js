const { readFileSync } = require("fs");
const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails } = testing;

const { doc, getDoc, setDoc, setLogLevel } = require("firebase/firestore");

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

describe("Custom claims", () => {
  async function createCustomClaimsWithAdmin(user) {
    // Setup: Create documents in DB for testing (bypassing Security Rules).
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), `customClaims/${user}/`), {
        admin: true,
      });
    });
  }
  // Test CREATE of customClaims

  it("shouldn't allow users to create custom claims in an untrusted context", async function () {
    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(
      setDoc(doc(aliceDb, `customClaims/alice`), {
        admin: true,
      })
    );
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthedDb, "customClaims/alice"), {
        admin: true,
      })
    );
  });
  // Test READ of customClaims
  it("shouldn't allow users to read custom claims in an untrusted context", async function () {
    await createCustomClaimsWithAdmin("alice");

    const aliceDb = testEnv.authenticatedContext("alice").firestore();

    await assertFails(getDoc(doc(aliceDb, "customClaims/alice")));
    await assertFails(getDoc(doc(aliceDb, "customClaims/bob")));

    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(unauthedDb, "customClaims/alice")));
  });
});
