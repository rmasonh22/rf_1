import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect } from "react";
import AuthError from "./AuthError";
import { sendPasswordResetEmail } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import Spinner from "../Spinner";
import { functions, auth } from "../firebase-init";

function ForgotPage() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);

  // Clear Auth Errors on mount
  useEffect(() => () => setErrorAuth(undefined), []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // If you want to send custom password reset email,
      // we will use a Cloud Function to send the email
      // with Postmark
      if (process.env.NEXT_PUBLIC_SEND_CUSTOM_AUTH_EMAILS === "true") {
        const passwordReset = httpsCallable(
          functions,
          "callable-passwordReset"
        );
        await passwordReset({ email: emailRef.current.value });
      } else {
        await sendPasswordResetEmail(auth, emailRef.current.value);
      }

      setSuccessMessage(
        "Check your email inbox for further instructions to reset your password."
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorAuth({ errorCode: error?.code });
    }

    setLoading(false);
  }
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LightningBoltIcon className="sm:h-30 mx-auto h-20 w-auto rotate-12 scale-y-110 transform stroke-lightning-500 text-lightning-200" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {successMessage ? (
            <div className="text-center">
              <h3 className="text-sm font-medium text-green-600">
                {successMessage}
              </h3>
            </div>
          ) : (
            <>
              {errorAuth && (
                <AuthError
                  errorCode={errorAuth.errorCode}
                  customMessage={errorAuth.customMessage}
                />
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      ref={emailRef}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lightning-400 focus:outline-none focus:ring-lightning-400 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md border border-transparent bg-lightning-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lightning-600 focus:outline-none focus:ring-2 focus:ring-lightning-400 focus:ring-offset-2"
                  >
                    {loading ? (
                      <Spinner className="h-5 w-5 text-white" />
                    ) : (
                      <span> Send password reset email</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
