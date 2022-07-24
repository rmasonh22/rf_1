import React, { useEffect, useState } from "react";
import { Switch, Disclosure } from "@headlessui/react";
import {
  IdentificationIcon,
  CalendarIcon,
  ChevronDownIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";

import ChatWindow from "./ChatWindow";
import { firestore, functions } from "../../firebase-init";
import classNames from "../../classNames";
import useStore from "../../StateManagement";
import { httpsCallable } from "firebase/functions";
import { BadgeCheckIcon } from "@heroicons/react/solid";

function useUserEmailVerified(userUID) {
  const [userEmailVerified, setUserEmailVerified] = useState(false);
  useEffect(() => {
    const checkUserEmailVerified = httpsCallable(
      functions,
      "callable-checkEmailVerified"
    );
    checkUserEmailVerified(userUID)
      .then((result) => {
        setUserEmailVerified(result.userEmailVerified);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userUID]);
  return userEmailVerified;
}

function ChatRow({ chat, alwaysExpanded = false }) {
  const chatData = chat.data();
  const set = useStore((state) => state.set);
  const userEmailVerified = useUserEmailVerified(chatData.userUID);

  const newestMessageCreatedAt = chatData.newestMessageCreatedAt
    ? new Date(chatData.newestMessageCreatedAt.seconds * 1000)
    : new Date();

  const handleChangeProcessed = async () => {
    try {
      const { doc, collection, updateDoc } = await import("firebase/firestore");
      if (!firestore) return;
      // Change the processed flag of a conversation with an user
      const chatUserRef = doc(collection(firestore, "chatUsers"), chat.id);
      await updateDoc(chatUserRef, {
        processed: !chatData.processed,
        email: chatData.email,
        newestMessageCreatedAt: chatData.newestMessageCreatedAt,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const { doc, collection, deleteDoc } = await import("firebase/firestore");
      if (!firestore) return;
      const chatUserRef = doc(collection(firestore, "chatUsers"), chat.id);

      await deleteDoc(chatUserRef);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Disclosure defaultOpen={alwaysExpanded ? true : false}>
      {({ open }) => (
        <div className="z-10">
          <div
            className={classNames(
              "flex items-center",
              open && "border-b border-lightning-400"
            )}
          >
            <div className="block flex-1 ">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col justify-between sm:flex-row">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center truncate text-sm font-medium lowercase text-lightning-600">
                        {chatData.email !== "Anonymous" ? (
                          <MailIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <UserIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        {(chatData.email && chatData.email !== "Anonymous" && (
                          <span className="flex items-center">
                            <a
                              className="underline"
                              href={`mailto:${chatData.email}`}
                            >
                              {chatData.email}
                            </a>
                            {userEmailVerified === true && (
                              <BadgeCheckIcon className="ml-1 h-5 w-5" />
                            )}
                          </span>
                        )) ||
                          "Anonymous"}
                      </p>
                    </div>
                    <div className="mt-2">
                      <div className="">
                        <p className="flex items-center text-xs text-gray-500 sm:text-sm">
                          <IdentificationIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {chat.id}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500 sm:text-sm">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          {`Last message: ${newestMessageCreatedAt.toLocaleDateString(
                            undefined
                          )} at ${newestMessageCreatedAt.toLocaleTimeString(
                            undefined
                          )}
                           `}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 flex flex-shrink-0 justify-between sm:mt-0 sm:ml-2 sm:flex-col sm:items-stretch">
                      <Switch.Group as="div" className="flex items-center">
                        <Switch
                          checked={chatData.processed}
                          onChange={handleChangeProcessed}
                          className={classNames(
                            chatData.processed
                              ? "bg-lightning-600"
                              : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lightning-500 focus:ring-offset-2"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              chatData.processed
                                ? "translate-x-5"
                                : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            Processed
                          </span>
                        </Switch.Label>
                      </Switch.Group>

                      <button
                        onClick={handleDelete}
                        className="mt-0 inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-2 sm:text-sm"
                      >
                        Delete chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {alwaysExpanded === true ? null : (
              <button
                onClick={() => {
                  set((state) => {
                    // add an entry to the chatRibbonArray as an object with the chat id and the open state
                    // if it is not yet included otherwise only change the open state to true

                    const oldChatRibbonArray = state.chatRibbonArray;
                    let index = oldChatRibbonArray.findIndex(
                      (oldChat) => oldChat.id === chat.id
                    );

                    if (index === -1) {
                      oldChatRibbonArray.push({ id: chat.id, open: true });
                      state.chatRibbonArray = oldChatRibbonArray;
                    } else {
                      // set open in chat object to true
                      oldChatRibbonArray[index].open = true;

                      state.chatRibbonArray = oldChatRibbonArray;
                    }
                  });
                }}
                className="mr-4 rounded-full border border-lightning-500 bg-lightning-100 p-2 hover:bg-lightning-200 sm:mr-6"
              >
                <ChevronDownIcon className="h-5 w-5 text-lightning-500" />
              </button>
            )}
          </div>
          <Disclosure.Panel className="relative z-0 overflow-hidden">
            <div className="overflow-hidden bg-lightning-50 px-4 pb-4 pt-1 sm:px-6">
              <ChatWindow chatUserId={chat.id} chatUserEmail={chatData.email} />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export default ChatRow;
