/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDdhEWqm0txj7w7_vMWTiBh4ZRqmKF1K7M",
  authDomain: "proj-run.firebaseapp.com",
  projectId: "proj-run",
  storageBucket: "proj-run.appspot.com",
  messagingSenderId: "638900382228",
  appId: "1:638900382228:web:c7d0b063e20181d4e4d501",
  measurementId: "G-TZ0B0NM0Z1"
};
const reCaptchaV3ProviderId = "";

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
export function getRecaptchaProviderConfig() {
  return reCaptchaV3ProviderId;
}
