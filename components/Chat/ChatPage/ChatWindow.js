import React, { useState, useRef, useEffect } from "react";
import useStore from "../../StateManagement";
import Spinner from "../../Spinner";

import {
  doc,
  collection,
  serverTimestamp,
  writeBatch,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase-init";

import { PaperAirplaneIcon, CheckIcon } from "@heroicons/react/outline";
import Linkifier from "../Linkifier/Linkifier";
import classNames from "../../classNames";

function ChatWindow({ chatUserId, chatUserEmail }) {
  const user = useStore((state) => state.user);

  const [showSpinner, setShowSpinner] = useState(false);
  const [queryLimit, setQueryLimit] = useState(20);
  const [skipScroll, setSkipScroll] = useState(false);

  const [messages, setMessages] = useState(undefined);
  useEffect(() => {
    try {
      if (!firestore) return;
      // Only create and execute the query when there is a logged in user
      const q = user
        ? query(
            collection(firestore, "chatUsers", chatUserId, "chatMessages"),
            orderBy("createdAt", "desc"),
            limit(queryLimit)
          )
        : null;

      if (q === null) return;
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setMessages(querySnapshot);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user, queryLimit, chatUserId]);

  const messagesEndRef = useRef();
  const firstReloadedRef = useRef();
  const refTextInput = useRef();

  useEffect(() => {
    // This effect gets executed, when there are new messages
    // and serves the purpose to scroll the scroll view to the
    // new message
    const scrollToTop = () => {
      firstReloadedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };
    if (skipScroll) {
      setSkipScroll(false);
      scrollToTop();
      return;
    }
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // disable submit function while loading
    if (showSpinner) return;
    setShowSpinner(true);

    try {
      // we add a message and update the user message collection at once

      if (!firestore) return;
      const batchWrite = writeBatch(firestore);
      const chatUserRef = doc(collection(firestore, "chatUsers"), chatUserId);

      // new chat message document ref
      const newMessageRef = doc(collection(chatUserRef, "chatMessages"));

      // add the chat message to the batchWrite
      batchWrite.set(newMessageRef, {
        customerEmail: chatUserEmail || "Anonymous",
        message: refTextInput.current.value,
        reply: user.uid,
        unread: true,
        createdAt: serverTimestamp(),
      });

      batchWrite.update(chatUserRef, {
        newestMessageCreatedAt: serverTimestamp(),
      });
      // execute the batch write
      await batchWrite.commit();

      refTextInput.current.value = "";

      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="mb-3 flex max-h-56 flex-col-reverse overflow-scroll px-3 text-sm font-medium text-gray-700 sm:max-h-72"
        style={{ minHeight: "200px" }}
      >
        {user && messages && (
          <>
            <div ref={messagesEndRef} />
            {/* The Linkifier component will look for URLS and emails in the messages and formats them as links */}
            <Linkifier
              renderer={({ href, children }) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                  href={href}
                >
                  {children}
                </a>
              )}
            >
              {messages.docs.map((messageItem, index) => {
                const messageData = messageItem.data();
                return (
                  <div
                    ref={
                      index === queryLimit - 20 + 1 ? firstReloadedRef : null
                    }
                    key={messageItem.id}
                    className={classNames(
                      "relative mx-3 my-1 whitespace-pre-wrap rounded-xl px-3 py-1 text-sm text-gray-900",
                      messageData.reply
                        ? "self-end bg-lightning-200"
                        : "self-start bg-blue-50"
                    )}
                    style={{ maxWidth: "80%" }}
                  >
                    {messageData.message}
                    {messageData.unread === false && (
                      <div className="absolute -bottom-1 -right-1 flex text-green-700">
                        <CheckIcon className="h-3 w-3 translate-x-2 transform" />
                        <CheckIcon className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </Linkifier>
            {messages.size === queryLimit && (
              <button
                onClick={() => {
                  setSkipScroll(true);
                  setQueryLimit(queryLimit + 20);
                }}
                className="my-1 self-center rounded-xl bg-lightning-500 px-3 py-1 text-sm text-white hover:bg-lightning-600"
              >
                Load older messages
              </button>
            )}
          </>
        )}
      </div>
      <form
        className="relative border-t-2 border-lightning-300 p-2"
        onSubmit={handleSubmit}
      >
        <textarea
          className="h-auto w-full resize-none whitespace-pre-wrap break-words rounded-xl border-none py-4 pr-16 text-sm leading-5 text-gray-900 shadow focus:outline-none focus:ring-0"
          placeholder="Reply to the user..."
          aria-label="Reply to the user..."
          style={{ minHeight: "56px", maxHeight: "200px" }}
          required
          disabled={showSpinner}
          ref={refTextInput}
        />
        <button
          type="submit"
          disabled={showSpinner}
          className="absolute right-7 top-6 rounded-full bg-lightning-500 p-2 hover:bg-lightning-600"
        >
          {showSpinner ? (
            <Spinner className="h-6 w-6 text-white" />
          ) : (
            <PaperAirplaneIcon className="h-6 w-6 translate-x-0.5 -translate-y-0.5 rotate-45 transform text-white  " />
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
