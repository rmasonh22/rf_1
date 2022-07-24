import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect } from "react";
import AuthError from "./AuthError";
import Link from "next/link";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase-init";

import { useRouter } from "next/router";
import Spinner from "../Spinner";

function ResetPage() {
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const router = useRouter();

  // Clear Auth Errors on mount
  useEffect(() => () => setErrorAuth(undefined), []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { oobCode } = router.query;
    if (!router.query) {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Missing the password reset code",
      });
      return;
    }
    try {
      setLoading(true);
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, passwordRef.current.value);
      setSuccessMessage("Password successfully changed.");
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
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
            <>
              <div className="text-center">
                <h3 className="text-sm font-medium text-green-600">
                  {successMessage}
                </h3>
              </div>
              <Link href="/login">
                <a
                  disabled={loading}
                  className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-lightning-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lightning-600 focus:outline-none focus:ring-2 focus:ring-lightning-400 focus:ring-offset-2"
                >
                  You can sign in with your new password now.
                </a>
              </Link>
            </>
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
                    htmlFor="password"
                    className="block text-base font-medium text-gray-700"
                  >
                    Enter a new password
                  </label>
                  <div className="mt-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      ref={passwordRef}
                      required
                      placeholder="Password"
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
                      <span>Reset password</span>
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

export default ResetPage;
