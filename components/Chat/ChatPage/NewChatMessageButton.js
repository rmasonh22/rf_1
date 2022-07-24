import React, { useState, useRef } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import useStore from "../../StateManagement";
import Spinner from "../../Spinner";
import { firestore, functions } from "../../firebase-init";

import { httpsCallable } from "firebase/functions";
import {
  doc,
  collection,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { CheckIcon } from "@heroicons/react/outline";

function NewChatMessageButton({ isMobile }) {
  const buttonClassNames = isMobile
    ? "sm:hidden relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-lightning-600 hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500"
    : "relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-lightning-600 hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500";
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const user = useStore((state) => state.user);
  const [success, setSuccess] = useState(false);
  const [userNotExists, setUserNotExists] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const messageInputRef = useRef();
  const userUIDRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showSpinner) return;
    setShowSpinner(true);
    try {
      const checkUserExists = httpsCallable(
        functions,
        "callable-checkUserExists"
      );
      const chatUserUID = userUIDRef.current.value;
      const resultCheckUserExists = await checkUserExists({
        userUID: chatUserUID,
      });
      if (resultCheckUserExists?.data?.userExists === false) {
        //   the user does not exists
        setUserNotExists(true);
      }
      // we add a message and update the user message collection at once

      if (!firestore) return;
      const batchWrite = writeBatch(firestore);
      const chatUserRef = doc(collection(firestore, "chatUsers"), chatUserUID);

      // new chat message document ref
      const newMessageRef = doc(collection(chatUserRef, "chatMessages"));

      // add the chat message to the batchWrite
      batchWrite.set(newMessageRef, {
        customerEmail: resultCheckUserExists?.data?.userEmail || "Anonymous",
        message: messageInputRef.current.value,
        reply: user.uid,
        unread: true,
        createdAt: serverTimestamp(),
      });

      batchWrite.set(chatUserRef, {
        processed: false,
        email: resultCheckUserExists?.data?.userEmail || "Anonymous",
        newestMessageCreatedAt: serverTimestamp(),
      });
      // execute the batch write
      await batchWrite.commit();

      setShowSpinner(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
      setSuccess(false);
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className={buttonClassNames}>
        Create new chat
      </Popover.Button>
      <Popover.Panel
        className="absolute z-10 w-screen max-w-xs overflow-hidden rounded-xl bg-white shadow sm:max-w-sm"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {success === false ? (
          <div className=" ">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="user-uid"
                        className="block text-sm font-medium text-gray-700"
                      >
                        User UID
                      </label>
                      <input
                        ref={userUIDRef}
                        required
                        type="text"
                        disabled={showSpinner}
                        onChange={() => setUserNotExists(false)}
                        name="user-uid"
                        id="user-uid"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lightning-500 focus:ring-lightning-500 sm:text-sm"
                      />
                      {userNotExists && (
                        <p className="mt-1 text-sm font-medium text-red-500">
                          The user does not exists.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="messageInput"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="messageInput"
                        name="messageInput"
                        ref={messageInputRef}
                        required
                        disabled={showSpinner}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-lightning-500 focus:ring-lightning-500 sm:text-sm"
                        placeholder="Write your message here..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={showSpinner}
                    className="inline-flex justify-center rounded-md border border-transparent bg-lightning-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-lightning-500 focus:ring-offset-2"
                  >
                    {showSpinner ? (
                      <Spinner className="h-6 w-6 text-white" />
                    ) : (
                      <p>Send</p>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center  rounded-full bg-green-500  p-2 text-white ">
                  <CheckIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-3 text-center text-gray-700">
                Message successfully sent!
              </div>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default NewChatMessageButton;
