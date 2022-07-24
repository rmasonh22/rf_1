import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../StateManagement";
import NavigationContainer from "./Navigation/NavigationContainer";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid";
import Spinner from "../Spinner";
import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../firebase-init";

import MainLayout from "./MainLayout";
import PageHeader from "./PageHeader";
import PageDescriptionParagraph from "./PageDescriptionParagraph";
import toast from "react-hot-toast";
import Toaster from "../Toaster";

function PaymentSuccessDisplay({ handleCustomerPortal }) {
  return (
    <div className="w-64 space-y-6 px-4 py-5 sm:p-6">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center  rounded-full bg-green-500  p-2 text-white ">
            <CheckIcon className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-3 text-center text-xl font-extrabold text-gray-700">
          Successfully subscribed!
        </div>
        <button
          onClick={handleCustomerPortal}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-3 py-1 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none"
        >
          Manage your subscription here!
        </button>
      </div>
    </div>
  );
}
function PaymentInstructionDisplay({ loading, handleSubscribe }) {
  return (
    <div>
      <div className="mt-4 flex w-64 items-center justify-center text-5xl font-extrabold text-gray-900">
        <span>$20</span>
        <span className="ml-3 text-xl font-medium text-gray-500">/month</span>
      </div>

      <div className="mt-6">
        <div className="rounded-md shadow">
          <button
            disabled={loading}
            onClick={handleSubscribe}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none"
          >
            {loading ? (
              <Spinner className="h-5 w-5 text-white" />
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <p className="font-medium text-gray-900">
          Use the testing credit card number{" "}
        </p>
        <p className="font-normal text-gray-500">4242 4242 4242 4242</p>
        <p className="font-normal text-gray-500">Any expiration date.</p>
        <p className="font-normal text-gray-500">Any CCV number.</p>
      </div>
    </div>
  );
}

function PaymentsPage() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (router.query?.success) {
      setPaymentSuccess(true);
    }
    if (router.query?.canceled) {
      setPaymentSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = async () => {
    // return early if the user is undefined
    if (!user) return;
    try {
      setLoading(true);
      const { doc, collection, addDoc, onSnapshot } = await import(
        "firebase/firestore"
      );

      if (!firestore) return;
      const customerRef = doc(collection(firestore, "customers"), user.uid);
      console.log(window.location.origin + router.pathname + "?success=true");
      const newCheckoutSessionRef = await addDoc(
        collection(customerRef, "checkout_sessions"),
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE,
          success_url:
            window.location.origin + router.pathname + "?success=true",
          cancel_url:
            window.location.origin + router.pathname + "?canceled=true",
        }
      );
      const unsubscribe = onSnapshot(newCheckoutSessionRef, (doc) => {
        const { error, url } = doc.data();
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          console.error(`An error occurred: ${error.message}`);
          toast.error("An error occurred. Please try again later.", {
            duration: 4000,
          });
          unsubscribe();
          setLoading(false);
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          router.push(url);
          unsubscribe();
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCustomerPortal = async () => {
    // return early if the user is undefined
    if (!user) return;
    try {
      setLoading(true);

      const customerPortalLinkRef = httpsCallable(
        functions,
        process.env.NEXT_PUBLIC_STRIPE_FUNCTION_PORTAL_LINK
      );
      const { data } = await customerPortalLinkRef({
        returnUrl: window.location.origin + router.pathname,
        locale: "auto", // Optional, defaults to "auto"
      });
      console.log(data);
      router.push(data.url);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>Payments with Stripe</PageHeader>

        <PageDescriptionParagraph>
          Stripe.com is the most advanced payment provider in the digital world.
        </PageDescriptionParagraph>
        <PageDescriptionParagraph>
          Use the{" "}
          <a
            href="https://stripe.com/docs/payments/checkout"
            target="_blank"
            rel="noreferrer"
            className=" underline"
          >
            hosted checkout
          </a>{" "}
          to seamlessly collect one-time and recurring payments.
        </PageDescriptionParagraph>
        <div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-lightning-200 bg-lightning-100 shadow-sm">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Try the payment integration in this live demo!
                  </h3>
                  <p className="mt-4 text-xl text-gray-600">
                    Nothing will be charged.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-lightning-100 pb-16 sm:mt-12 sm:pb-20 ">
              <div className="relative">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
                    <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                      <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Pro Subscription (TEST)
                      </h3>
                      <p className="mt-6 text-justify text-base text-gray-500">
                        Checkout creates a secure, Stripe-hosted payment page
                        that lets you collect payments quickly. It works across
                        devices and can help increase your conversion.
                      </p>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <h4 className="flex-shrink-0 bg-white pr-4 text-sm font-semibold uppercase tracking-wider text-lightning-600">
                            Benefits of Stripe Checkout
                          </h4>
                          <div className="flex-1 border-t-2 border-gray-200" />
                        </div>
                        <ul
                          role="list"
                          className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                        >
                          {[
                            "Increase sales with a better payments experience",
                            "Designed to reduce friction",
                            "Optimized for any device",
                            "25+ languages, 135+ currencies",
                          ].map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start lg:col-span-1"
                            >
                              <div className="flex-shrink-0">
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-sm text-gray-700">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                      {paymentSuccess ? (
                        <PaymentSuccessDisplay
                          handleCustomerPortal={handleCustomerPortal}
                        />
                      ) : (
                        <PaymentInstructionDisplay
                          handleSubscribe={handleSubscribe}
                          loading={loading}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <Toaster />
    </NavigationContainer>
  );
}

export default PaymentsPage;
