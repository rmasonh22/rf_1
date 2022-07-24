import { useRef, useState } from "react";
import Spinner from "../Spinner";
import { CheckCircleIcon } from "@heroicons/react/solid";

const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
function EmailForm({ setStatus }) {
  const refEmail = useRef();
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const email = refEmail.current.value;
      if (!email || !validateEmail(email)) {
        setStatus("waiting");
        setFormError(true);
        return;
      }
      const { firestore } = await import("../../components/firebase-init");
      const { addDoc, collection, serverTimestamp } = await import(
        "firebase/firestore"
      );

      if (!firestore) return;
      await addDoc(collection(firestore, "newsletter"), {
        subscriber: email,
        createdAt: serverTimestamp(),
        source: "landing_page",
      });

      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("waiting");
      setFormError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={() => {
          setFormError(false);
        }}
        ref={refEmail}
        name="email"
        id="email"
        required
        className="mr-5 w-full rounded-md  border-gray-300 pl-4 focus:border-lightning-500 focus:outline-none focus:ring-lightning-500 sm:w-80 sm:text-base"
        placeholder="Your email address"
      />
      {formError && (
        <p className="absolute mt-1 text-sm font-medium text-red-500">
          Please enter an email address.
        </p>
      )}
      <div className="mt-4 inline-flex w-full rounded-md shadow sm:mt-0 sm:w-auto">
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-lightning-600 px-5 py-2 text-base font-medium text-white hover:bg-lightning-700 sm:w-auto"
        >
          Keep me updated once a month
        </button>
      </div>
    </form>
  );
}
function Success() {
  return (
    <div className="flex flex-row items-center rounded-full bg-lightning-200 py-2 px-4">
      <CheckCircleIcon className="mr-3 h-8 w-8 text-green-500" />
      <span className="text-gray-900">Successfully signed up. Thank you!</span>
    </div>
  );
}

function EmailCapture() {
  const [status, setStatus] = useState("waiting");

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-left sm:text-4xl ">
          <span className="block">Like coding at lightning speed?</span>
          <span className="mt-2 block text-lightning-600 sm:mt-0">
            Get the monthly newsletter.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {
            {
              waiting: <EmailForm setStatus={setStatus} />,
              loading: <Spinner className="mx-10 h-5 w-5 text-lightning-500" />,
              success: <Success />,
            }[status]
          }
        </div>
      </div>
    </div>
  );
}

export default EmailCapture;
