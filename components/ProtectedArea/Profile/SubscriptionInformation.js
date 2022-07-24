import {
  CalendarIcon,
  CashIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import useStore from "../../StateManagement";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../../firebase-init";

function SubDisplay({ subInfo }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.user);
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
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          {subInfo.sub.name}
        </h2>
        <div className="mt-1 ">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CashIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {subInfo.sub.interval}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {`${subInfo.sub.currency}${subInfo.sub.price}`}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {`Started on ${subInfo.sub.startedAt}`}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            onClick={handleCustomerPortal}
            disabled={loading}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <Spinner className="h-5 w-5 text-lightning-500" />
            ) : (
              <>
                <PencilIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                <span> Edit</span>
              </>
            )}
          </button>
        </span>
      </div>
    </div>
  );
}

function SubscriptionInformation() {
  const [subInfo, setSubInfo] = useState({ status: "loading" });

  const user = useStore((state) => state.user);

  useEffect(() => {
    try {
      if (!firestore) return;

      if (!user) return;
      getDocs(collection(firestore, "customers", user.uid, "subscriptions"))
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // User has no subscriptions
            setSubInfo({ status: "empty" });
          } else {
            // Get the subscriptions of the user and set the active one for display
            let hasAtLeastOneActiveSub = false;
            querySnapshot.forEach((sub) => {
              const subData = sub.data();

              // Stripe stores prices in the smallest possible unit, i.e. cents for USD
              // Therefore, we have to divide the price amount by 100 to get to dollars
              // There are exceptions for some currencies that do not use decimals, for
              // which we can directly take the amount as the price
              const zeroDecimalCurrencies = [
                "BIF2",
                "CLP",
                "DJF",
                "GNF",
                "JPY",
                "KMF",
                "KRW",
                "MGA",
                "PYG",
                "RWF",
                "UGX",
                "VND",
                "VUV",
                "XAF",
                "XOF",
                "XPF",
              ];
              // The subscription is active
              if (subData.ended_at === null) {
                hasAtLeastOneActiveSub = true;
                const currencyValue = subData.items[0].plan.currency;
                const currency =
                  (currencyValue === "eur" && "€") ||
                  (currencyValue === "usd" && "$") ||
                  currencyValue.toUpperCase();
                const intervalValue = subData.items[0].plan.interval;
                const interval =
                  (intervalValue === "month" && "Billed monthly") ||
                  (intervalValue === "year" && "Billed yearly") ||
                  (intervalValue === "week" && "Billed weekly") ||
                  (intervalValue === "day" && "Billed daily");
                const sub = {
                  startedAt: new Date(
                    subData.items[0].plan.created * 1000
                  ).toLocaleDateString(undefined),
                  name: subData.items[0].price.product.name,
                  price: zeroDecimalCurrencies.includes(
                    currencyValue.toUpperCase()
                  )
                    ? subData.items[0].plan.amount
                    : subData.items[0].plan.amount / 100,
                  currency: currency,
                  interval: interval,
                };
                setSubInfo({ status: "loaded", sub: sub });
              } else {
                // If you like you can show ended subscriptions to the user
                // you can set the ended subscriptions to another state here
              }
            });
            // in case there are subscriptions for the user but there is no
            // active subscription, we show the empty component
            if (hasAtLeastOneActiveSub === false) {
              setSubInfo({ status: "empty" });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setSubInfo({ status: "error" });
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Your subscription
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You can mange your subscription in the Stripe customer portal.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden rounded-md shadow">
              <div className="bg-white px-4 py-5 sm:p-6">
                {(subInfo.status === "loading" && (
                  <div className="flex w-full justify-center">
                    <Spinner className="h-6 w-5 text-lightning-500" />
                  </div>
                )) ||
                  (subInfo.status === "loaded" && (
                    <SubDisplay subInfo={subInfo} />
                  )) ||
                  (subInfo.status === "empty" && (
                    <div className="text-sm font-medium text-gray-700">
                      <p className="text-xl font-bold">No subscription</p>
                      <Link href="/payments">
                        <a>
                          Subscribe to the PRO plan{" "}
                          <span className="underline">here.</span>
                        </a>
                      </Link>
                    </div>
                  )) ||
                  (subInfo.status === "error" && (
                    <div className="text-sm font-medium text-gray-700">
                      <p className="flex">
                        <ExclamationCircleIcon className="mr-2 h-5 w-5 text-red-500" />
                        An error occurred, please try again later!
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionInformation;
