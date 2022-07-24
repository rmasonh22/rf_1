import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import collectAnalyticsEvent from "../components/Analytics/collectAnalyticsEvent";
import Footer from "../components/LandingPage/Footer";

function Header() {
  return (
    <div className="-mt-32 overflow-hidden bg-lightning-500 pt-32">
      <div className="relative z-10 bg-white  lg:w-full">
        <Popover>
          <div className="relative p-6 pl-4 sm:pl-6 lg:pl-8">
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-between"
              aria-label="Global"
            >
              <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="#" aria-label="Home">
                    <LightningBoltIcon className="h-8 w-auto rotate-12 scale-y-110 transform stroke-lightning-500  text-lightning-200 sm:h-10" />
                  </a>
                  <div className="mr-2 flex items-center md:hidden">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <div className="hidden md:mx-10 md:block md:space-x-6">
                <Link href="/login">
                  <a
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "login",
                      })
                    }
                    className="rounded-full bg-lightning-100 py-2 px-3 font-medium text-lightning-600 hover:text-lightning-500"
                  >
                    Log in
                  </a>
                </Link>
                <Link href="/signup">
                  <a
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "signup",
                      })
                    }
                    className="rounded-full bg-lightning-100 py-2 px-3 font-medium text-lightning-600 hover:text-lightning-500"
                  >
                    Sign up
                  </a>
                </Link>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <LightningBoltIcon className="h-8 w-auto rotate-12 scale-y-110 transform stroke-lightning-500 text-lightning-200 sm:h-10" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                <Link href="/login">
                  <a
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "login",
                      })
                    }
                    className="block w-full bg-lightning-100 px-5 py-3 text-center font-medium text-lightning-600 hover:bg-lightning-200"
                  >
                    Log in
                  </a>
                </Link>
                <Link href="/signup">
                  <a
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "signup",
                      })
                    }
                    className="mt-2 block w-full bg-lightning-100 px-5 py-3 text-center font-medium text-lightning-600 hover:bg-lightning-200"
                  >
                    Sign up
                  </a>
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div className="relative bg-lightning-200">
          <div className="relative mx-auto max-w-lg py-16 px-4 text-center sm:px-6 lg:py-20">
            <h1 className="sm:text-4.5xl mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Changelog
            </h1>
            <p className="leading-relaxed text-gray-700">
              Stay up to date with all of the latest additions and improvements
              we&apos;ve made to the React &amp; Firebase starter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Changelog() {
  return (
    <div>
      <main className="flex-auto">
        <Header />
        <div className=" px-4 py-14 sm:py-16 lg:py-20">
          <div className="prose prose-sm mx-auto max-w-[37.5rem]">
            <h2>July 6, 2022</h2>
            <h3>🚀 New additions</h3>
            <ul>
              <li>
                Add the option for the end user to revert their cookie choices
                on the privacy page
              </li>
              <li>Overview about all used cookies on the privacy page</li>
              <li>Loading a Google font in an optimized way</li>
            </ul>
            <h3>🔧 Improvements</h3>
            <ul>
              <li>Updated all packages</li>
              <li>Fix the position of the open chats on the admin chat page</li>
            </ul>

            <hr />
            <h2>April 1, 2022</h2>
            <h3>🔧 Improvement</h3>
            <ul>
              <li>Updated to React 18</li>
              <li>
                Mobile sidebar in the protected area closed automatically after
                the user clicks a link
              </li>
            </ul>
            <hr />
            <h2>March 2, 2022</h2>
            <h3>🚀 New additions</h3>
            <ul>
              <li>
                Added automatic image optimization using{" "}
                <a href="https://www.npmjs.com/package/next-image-export-optimizer">
                  next-image-export-optimizer
                </a>
                , which reduces page loading times significantly for large
                images.
              </li>
              <li>Added social sharing images to the meta tags.</li>
            </ul>
            <hr />

            <h2>February 28, 2022</h2>
            <h3>🔧 Improvement</h3>
            <ul>
              <li>
                Modified the getting started instructions for an easier
                onboarding flow.
              </li>
            </ul>
            <hr />

            <h2>January 11, 2022</h2>
            <h3>🚀 New addition</h3>
            <ul>
              <li>
                Added <a href="https://playwright.dev/docs/intro">Playwright</a>{" "}
                end-to-end tests, covering all major features.
              </li>
            </ul>
            <hr />
            <h2>December 22, 2021</h2>
            <h3>🚀 New addition</h3>
            <ul>
              <li>Added a GDPR-compliant cookie banner to the starter.</li>
            </ul>
            <hr />
            <h2>December 05, 2021</h2>
            <h3>🚀 New addition</h3>
            <ul>
              <li>Added a chat widget for direct chat with the customers.</li>
            </ul>
            <hr />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Changelog;
