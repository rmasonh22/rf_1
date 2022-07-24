import { CheckIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon, LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Script from "next/script";
import collectAnalyticsEvent from "../Analytics/collectAnalyticsEvent";

const includedFeatures = [
  "React full-stack website set-up for development and production.",
  "This landing page and the protected pages after signing in.",
  "Authentication workflows and pages.",
  "TailwindCSS for rapid and seamless UI and UX development.",
  "Real-time database with Firestore and tested security rules.",
  "Chat widget to directly chat with and contact your users.",
  "Payments with Stripe.",
  "Transactional emails with Postmark and email templates.",
  "REST API backend and serverless Cloud Functions set-up.",
  "GDPR-compliant cookie banner and Google Analytics integration.",
  "Easy to use and powerful state management.",
  "End-to-end tests with Playwright.",
  "Uses Next.js for development and production-ready static HTML export.",
  "Lifetime access and updates.",
  "Use for an unlimited number of personal or commercial projects.",
];
function WhatsIncluded() {
  return (
    <section className="mx-auto mt-12">
      <h3 className="text-md text-center font-bold uppercase tracking-wide text-gray-900">
        What&apos;s included
      </h3>
      <ul role="list" className="mt-4 space-y-3">
        {includedFeatures.map((feature) => (
          <li key={feature} className="flex space-x-3">
            <CheckIcon
              className="h-5 w-5 flex-shrink-0 text-green-500"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CTA({ showWhatsIncluded = true }) {
  return (
    <div className="bg-lightning-200 py-8" id="pricing">
      <Script
        strategy="afterInteractive"
        src="https://gumroad.com/js/gumroad.js"
      ></Script>

      <div className="mx-auto  max-w-5xl px-4 sm:px-6 lg:px-8 ">
        <div className="grid items-center gap-x-20 rounded-xl bg-lightning-100 p-10 shadow">
          <section className="mx-auto mt-8 w-full max-w-lg space-y-8 sm:mt-0">
            <div>
              <LightningBoltIcon
                style={{ color: "#ffecd2", stroke: "#dd914a" }}
                className="mx-auto h-16 w-auto rotate-12 scale-y-110 transform"
              />
              <h3 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-gray-900 ">
                <span className="block text-lightning-600 ">
                  {" "}
                  React & Firebase
                </span>
                <span className="block xl:inline">SaaS starter</span>{" "}
              </h3>
              <div className="mt-4 flex justify-center">
                <span className="flex w-64 rounded-full border border-green-600 bg-emerald-50 p-1">
                  <BadgeCheckIcon
                    className="ml-3 mr-2 h-5 w-5 flex-shrink-0 text-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">
                    14-day money back guarantee
                  </span>
                </span>
              </div>
              <div className="mt-8">
                <div className="group relative rounded-xl shadow">
                  <a
                    href={
                      "https://apphafen.gumroad.com/l/reactfirebasesaasstarter?wanted=true"
                    }
                    onClick={() => {
                      collectAnalyticsEvent({
                        eventName: `click_reactappstarter`,
                      });
                    }}
                    data-gumroad-single-product="true"
                    className="flex w-full items-center justify-center rounded-xl border border-transparent bg-lightning-600 px-8 py-3 text-center text-base font-medium text-white group-hover:bg-lightning-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Buy this starter now
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="mt-4 text-center text-gray-500">
            <Link href="/signup">
              <a className="text-center underline">
                or have a look at the protected pages first
              </a>
            </Link>
          </div>
          {showWhatsIncluded && <WhatsIncluded />}
        </div>
      </div>
    </div>
  );
}

export default CTA;
