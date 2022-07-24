import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import collectAnalyticsEvent from "../Analytics/collectAnalyticsEvent";

import ExportedImage from "next-image-export-optimizer";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "https://blog.reactapp.dev" },
];

function Hero() {
  return (
    <div className="relative overflow-hidden bg-lightning-200">
      <div className="absolute hidden h-full w-full lg:block">
        <ExportedImage
          src="/images/BG_HERO.png"
          alt=""
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute block h-2/3 w-full lg:hidden">
        <ExportedImage
          src="/images/BG_HERO_MOBILE.png"
          alt=""
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10  pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          {/* <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg> */}

          <Popover>
            <div className="relative px-4 pt-6 sm:px-6 lg:pl-8 lg:pr-0">
              <nav
                className="relative flex items-center justify-between sm:h-10 "
                aria-label="Global"
              >
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <a href="#" aria-label="Home" className="flex items-center">
                      <LightningBoltIcon className="mr-2 h-8 w-auto rotate-12 scale-y-110  transform stroke-lightning-500  text-lightning-200 sm:h-10" />
                      <div className="leading-5">
                        <span className="block text-lightning-600 ">
                          React & Firebase
                        </span>
                        <span className="block xl:inline">SaaS starter</span>
                      </div>
                    </a>
                    <div className="mr-2 flex items-center md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:ml-10 md:block md:space-x-4 md:pr-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: `Navigation item: ${item.name}`,
                        })
                      }
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mx-8 hidden md:contents">
                  <Link href="/login">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "login",
                        })
                      }
                      className="rounded-full bg-lightning-50 py-2 px-3 font-medium text-lightning-600 hover:text-lightning-500"
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
                      className="mx-2 rounded-full bg-lightning-50 py-2 px-3 font-medium text-lightning-600 hover:text-lightning-500"
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
                      <div className="leading-5">
                        <span className="block text-lightning-600 ">
                          React & Firebase
                        </span>
                        <span className="block xl:inline">SaaS starter</span>
                      </div>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() =>
                          collectAnalyticsEvent({
                            eventName: `Navigation item: ${item.name}`,
                          })
                        }
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <Link href="/login">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "login",
                        })
                      }
                      className="block w-full bg-lightning-50 px-5 py-3 text-center font-medium text-lightning-600 hover:bg-lightning-200"
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
                      className="mt-2 block w-full bg-lightning-50 px-5 py-3 text-center font-medium text-lightning-600 hover:bg-lightning-200"
                    >
                      Sign up
                    </a>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="max-w-lg text-4xl font-extrabold tracking-tight text-gray-900 sm:mx-auto sm:text-5xl md:text-6xl lg:mx-0">
                Start your next SaaS site in minutes, not months
              </h1>
              <p className="mt-3 text-base text-gray-700 sm:mx-auto sm:mt-5 sm:max-w-lg sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                <strong>Full-stack:</strong> {""}
                React, Firebase, Authentication, Serverless Backend, Tailwind
                CSS, and Payments are all hooked up and ready for your next
                project.
              </p>

              <div className="mb-2 mt-7 sm:mb-0 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="group relative rounded-xl shadow">
                  <Link href={"#pricing"}>
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "main_cta_hero",
                        })
                      }
                      className="flex w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-tl from-lightning-600 to-lightning-500 px-8 py-3 text-base font-medium text-white group-hover:bg-lightning-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Build with lightning speed. Start now!
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mx-auto max-w-md p-2 text-gray-600 sm:mt-3 sm:p-0 lg:mx-0">
                <Link href="/signup">
                  <a
                    className=""
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "alternative_cta_hero",
                      })
                    }
                  >
                    Check out{" "}
                    <span className="whitespace-pre underline">
                      how to get started
                    </span>
                    .
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full">
          <ExportedImage
            src={"images/johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg"}
            alt="lightning Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
