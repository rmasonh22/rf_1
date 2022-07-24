import React, { useState, useEffect } from "react";
import shallow from "zustand/shallow";
import useStore from "../StateManagement";
import {
  signOut,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import AuthError from "./AuthError";
import Spinner from "../Spinner";
import Link from "next/link";
import { auth } from "../firebase-init";
import collectAnalyticsEvent from "../Analytics/collectAnalyticsEvent";

function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { user, set } = useStore(
    (state) => ({
      user: state.user,
      set: state.set,
    }),
    shallow
  );

  useEffect(() => {
    //Clear the error on page load
    setErrorAuth(undefined);
  }, []);

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
      const isAnonymousUser = user && !user.email;
      const isNormalUser = user && user.email;
      if (isNormalUser) {
        // If we have a user signed in that has a normal account
        // we sign them out and create a new user
        await signOut(auth);
        await createUserWithEmailAndPassword(auth, email, password);
      } else if (isAnonymousUser) {
        // If the current user is anonymous, we will convert the
        // user into a normal account with username/password auth
        const credential = EmailAuthProvider.credential(email, password);
        const linkedUser = await linkWithCredential(
          auth.currentUser,
          credential
        );
        if (linkedUser?.user) {
          set((state) => {
            state.user = linkedUser.user;
          });
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
      collectAnalyticsEvent({
        eventName: "signup_action_emailpassword",
      });
      router.push("/getting-started");
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl bg-lightning-100 p-10 shadow">
        <div>
          <Link href="/">
            <a>
              <LightningBoltIcon className="sm:h-30 mx-auto h-20 w-auto rotate-12 scale-y-110 transform stroke-lightning-500 text-lightning-200" />
            </a>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account for a free look inside
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/login">
              <a className="font-medium text-lightning-600 hover:text-lightning-500">
                sign in to your account
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

          <button
            type="submit"
            disabled={loading}
            onClick={handleLogin}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-lightning-500 py-2 px-4 text-sm font-medium text-white hover:bg-lightning-600 focus:outline-none focus:ring-2 focus:ring-lightning-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LightningBoltIcon
                className="h-5 w-5 text-lightning-500 group-hover:text-lightning-400"
                aria-hidden="true"
              />
            </span>
            {loading ? (
              <Spinner className="h-5 w-5 text-white" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
