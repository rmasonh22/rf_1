import { XCircleIcon } from "@heroicons/react/solid";

function AuthError({ errorCode, customMessage }) {
  // Select the correct message to be displayed based on the error code
  const message =
    {
      "auth/invalid-email": "Invalid email address.",
      "auth/user-disabled": "Your email address has been disabled.",
      "auth/user-not-found": "There is no user with that email address.",
      "auth/wrong-password": "Wrong password.",
      "auth/email-already-in-use":
        "There already exists an account with the given email address.",
      "auth/operation-not-allowed":
        "Email/password accounts are not enabled. Enable them in the Firebase Console. Follow the necessary steps here: https://firebase.google.com/docs/auth/web/password-auth#before_you_begin",
      "auth/weak-password": "Password is not strong enough.",
      "auth/invalid-action-code":
        "Your password reset link either has been used or has expired.",
      "auth/configuration-not-found":
        "Please active the Email/Password authentication provider. Follow the necessary steps here: https://firebase.google.com/docs/auth/web/password-auth#before_you_begin",
      custom: customMessage,
    }[errorCode] || "An error occurred. Please try again later.";

  return (
    <div className="mb-4 rounded-md bg-red-200 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-800">{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
