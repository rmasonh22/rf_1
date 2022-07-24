import { useState, useRef, useEffect } from "react";

import { LightningBoltIcon } from "@heroicons/react/solid";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import AuthError from "./AuthError";
import Spinner from "../Spinner";
import Link from "next/link";
import useStore from "../StateManagement";
import { auth } from "../firebase-init";

function LoginPage() {
  const rememberMeRef = useRef();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.user);

  useEffect(() => {
    // Route the user to the password reset page
    if (router.query?.mode === "resetPassword") {
      router.push({ pathname: "/reset", query: router.query });
      return;
    }
    // If the user is already logged in, we redirect to the protected area.
    // Only redirect for users that have an email. Otherwise, it is an
    // anonymous user
    if (user && user.email) {
      // Get return url from query parameters or default to sending the
      // authenticated user to the protected area.
      const returnUrl = router.query.returnUrl || "/getting-started";
      router.push(returnUrl);
      return;
    } else if (user && router?.query?.returnUrl) {
      // Is anonymous user and a returnUrl is present
      // then we push the anonymous user through
      const returnUrl = router.query.returnUrl;
      router.push(returnUrl);
      return;
    }

    // Clear the error on page load
    setErrorAuth(undefined);
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorAuth(undefined);

    if (email === "") {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter an email address",
      });
      setLoading(false);
      return;
    }
    if (password === "") {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter a password",
      });
      setLoading(false);

      return;
    }
    if (password.length < 6) {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter a password with six characters or more",
      });
      setLoading(false);

      return;
    }
    try {
      const {
        signOut,
        signInWithEmailAndPassword,
        setPersistence,
        browserSessionPersistence,
        browserLocalPersistence,
      } = await import("firebase/auth");
      await signOut(auth);
      await setPersistence(
        auth,
        rememberMeRef.current.checked
          ? browserLocalPersistence
          : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);

      // Get return url from query parameters or default to sending the
      // authenticated user to the protected area.
      const returnUrl = router.query.returnUrl || "/getting-started";
      router.push(returnUrl);
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-lightning-100 p-10 shadow">
        <div>
          <Link href="/">
            <a>
              <LightningBoltIcon className="sm:h-30 mx-auto h-20 w-auto rotate-12 scale-y-110 transform  stroke-lightning-500 text-lightning-200" />
            </a>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/signup">
              <a className="font-medium text-lightning-600 hover:text-lightning-500">
                register an account
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin} action="">
          {errorAuth && (
            <AuthError
              errorCode={errorAuth.errorCode}
              customMessage={errorAuth.customMessage}
            />
          )}

          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lightning-500 focus:outline-none focus:ring-lightning-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lightning-500 focus:outline-none focus:ring-lightning-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                ref={rememberMeRef}
                className="h-4 w-4 rounded border-gray-300 text-lightning-600 focus:ring-lightning-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-right text-sm">
              <Link href="/forgot">
                <a className="font-medium text-lightning-600 hover:text-lightning-500">
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleLogin}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-lightning-600 py-2 px-4 text-sm font-medium text-white hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-lightning-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-lightning-500 group-hover:text-lightning-400"
                aria-hidden="true"
              />
            </span>
            {loading ? (
              <Spinner className="h-5 w-5 text-white" />
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
