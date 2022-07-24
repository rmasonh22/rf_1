const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.env.PWD);

if (
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS.toLocaleLowerCase() === "false"
) {
  // We make sure that the tests are only executed against the local Firebase emulators
  throw Error(
    "Local tests should be done against the local Firebase emulators and not the online Firebase services. Set NEXT_PUBLIC_USE_FIREBASE_EMULATORS in the file '.env.local' to true."
  );
}
