import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

import { ChatAlt2Icon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
import useStore from "../../StateManagement";
import classNames from "../../classNames";
const ChatPopUp = dynamic(() => import("./ChatPopUp"));
const CheckUnread = dynamic(() => import("./CheckUnread"));

export default function Chat() {
  const [checkForMessages, setCheckForMessages] = useState(false);
  const unreadChatMessage = useStore((state) => state.unreadChatMessage);
  const [bounceAnimation, setBounceAnimation] = useState(true);
  useEffect(() => {
    // We will check for unread messages in the chat after 2.5 seconds
    const timer = setTimeout(() => setCheckForMessages(true), 2500);

    // We stop the animation after 5 seconds
    const animationTimer = setTimeout(() => setBounceAnimation(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);
  return (
    <div className=" w-16 ">
      <Popover className="">
        {() => (
          <>
            <Popover.Button
              className={`group fixed right-4 bottom-4 flex h-16 w-16 items-center justify-center rounded-full
                bg-lightning-500 px-3 py-2 text-center text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus:ring-2 focus:ring-lightning-500 focus:ring-offset-4 sm:right-14 sm:bottom-14 sm:h-20 sm:w-20 `}
              aria-label="Chat widget"
            >
              <ChatAlt2Icon className="h-12 w-12" />
              {unreadChatMessage > 0 && (
                <div
                  className={classNames(
                    "absolute  -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500",
                    bounceAnimation && "animate-bounce"
                  )}
                >
                  {unreadChatMessage}
                </div>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed bottom-24 z-10 w-full px-4 sm:bottom-40 sm:right-14 sm:w-96 sm:px-0 lg:max-w-3xl">
                <ChatPopUp />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      {checkForMessages && <CheckUnread />}
    </div>
  );
}
