import React, { useState, useEffect } from "react";

import {
  query,
  where,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase-init";

import NavigationContainer from "../../ProtectedArea/Navigation/NavigationContainer";
import useStore from "../../StateManagement";
import MessageContainerHeader from "./MessageContainerHeader";
import EmptyContainer from "./EmptyContainer";
import ChatRow from "./ChatRow";
import MainLayout from "../../ProtectedArea/MainLayout";
import PageHeader from "../../ProtectedArea/PageHeader";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

function MessageContainer({ chats }) {
  return (
    <div className="overflow-hidden rounded-b-xl bg-white shadow">
      <div className="divide-y divide-gray-200">
        {chats.docs.map((chat) => (
          <ChatRow chat={chat} key={chat.id} />
        ))}
      </div>
    </div>
  );
}
function ChatRibbon({ chat }) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  const [openRibbon, setOpen] = useState(false);
  const set = useStore((state) => state.set);
  const chatRibbonArray = useStore((state) => state.chatRibbonArray);
  useEffect(() => {
    // check if the chat is open in the chatRibbonArray
    const index = chatRibbonArray.findIndex((c) => c.id === chat.id);
    if (chatRibbonArray[index].open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [chatRibbonArray, chat.id]);

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  return (
    <Popover className="relative">
      <Popover.Button
        as="div"
        ref={setReferenceElement}
        className="relative inline-flex"
      >
        <div className="flex h-14 items-center justify-center space-x-2 overflow-visible rounded-t-lg border border-gray-200 bg-white px-5 shadow">
          <span className="mr-2 flex items-center text-gray-500">
            <UserIcon className="mr-1 h-3 w-3" />
            <span className="text-xs">{chat.id}</span>
          </span>
          {openRibbon ? (
            <button
              className="rounded-full bg-lightning-500 p-1 text-white"
              onClick={() => {
                // set the chat to be closed
                set((state) => {
                  const prevArray = state.chatRibbonArray;
                  const newArray = prevArray.map((item) => {
                    if (item.id === chat.id) {
                      item.open = false;
                    }
                    return item;
                  });
                  state.chatRibbonArray = newArray;
                });
              }}
            >
              <div className="relative h-5 w-5 -translate-x-px ">
                <ArrowSmDownIcon className="absolute h-5 w-5 origin-center translate-x-1 -translate-y-1 rotate-45 scale-75" />
                <ArrowSmUpIcon className="absolute h-5 w-5 origin-center -translate-x-0.5 translate-y-1 rotate-45 scale-75" />
              </div>
            </button>
          ) : (
            <button
              className="rounded-full bg-lightning-500 p-1 text-white"
              onClick={() => {
                // set the chat to be open
                set((state) => {
                  const prevArray = state.chatRibbonArray;
                  const newArray = prevArray.map((item) => {
                    if (item.id === chat.id) {
                      item.open = true;
                    }
                    return item;
                  });
                  state.chatRibbonArray = newArray;
                });
              }}
            >
              <div className="relative h-5 w-5 translate-y-0.5 translate-x-px">
                <ArrowSmUpIcon className="absolute h-5 w-5 origin-center translate-x-[3px] -translate-y-1.5 rotate-45 scale-75" />
                <ArrowSmDownIcon className="absolute h-5 w-5 origin-center translate-y-px -translate-x-1 rotate-45 scale-75" />
              </div>
            </button>
          )}
          <button className="rounded-full bg-lightning-500 p-1 text-white">
            <XIcon
              className="h-5 w-5 p-0.5"
              onClick={() => {
                set((state) => {
                  const prevArray = state.chatRibbonArray;
                  // remove the chat from the array
                  const newArray = prevArray.filter((item) => {
                    return item.id !== chat.id;
                  });
                  state.chatRibbonArray = newArray;
                });
              }}
            />
          </button>
        </div>
      </Popover.Button>
      {openRibbon && (
        <Popover.Panel
          static
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div
            // className="fixed z-10 bg-red-400 text-gray-500"
            className=" absolute right-0 bottom-0 z-10 w-screen max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl"
          >
            <ChatRow chat={chat} key={chat.id} alwaysExpanded={true} />
          </div>
        </Popover.Panel>
      )}
    </Popover>
  );
}

function ChatRibbonContainer({ chats }) {
  const chatRibbonArray = useStore((state) => state.chatRibbonArray);
  return (
    // renders the chat ribbon on the bottom of the screen
    <div className="fixed bottom-0 right-0 mx-4 flex space-x-7 overflow-visible sm:mx-14">
      {chatRibbonArray.map((chat) => {
        // find the corresponding chat in the chats array
        const index = chats.docs.findIndex((c) => c.id === chat.id);
        if (index !== -1) {
          return <ChatRibbon chat={chats.docs[index]} key={chat.id} />;
        }
      })}
    </div>
  );
}

function ChatPage() {
  const user = useStore((state) => state.user);

  const [queryLimit, setQueryLimit] = useState(20);
  const [chats, setChats] = useState(undefined);
  const [messageOrder, setMessageOrder] = useState("Unprocessed");

  useEffect(() => {
    try {
      // We change the query based on the requested order by the user
      // which is either "Unprocessed" or "Recent"
      // If there is no user, we will not query anything and set the
      // query to null
      if (!firestore) return;
      const chatQuery = user
        ? messageOrder === "Unprocessed"
          ? query(
              collection(firestore, "chatUsers"),
              where("processed", "==", false),
              orderBy("newestMessageCreatedAt", "desc"),
              limit(queryLimit)
            )
          : query(
              collection(firestore, "chatUsers"),
              orderBy("newestMessageCreatedAt", "desc"),
              limit(queryLimit)
            )
        : null;
      if (chatQuery === null) return;

      const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
        setChats(querySnapshot);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user, queryLimit, messageOrder]);

  return (
    <NavigationContainer>
      <MainLayout>
        <div>
          <PageHeader>Chat messages</PageHeader>
          <MessageContainerHeader
            messageOrder={messageOrder}
            setMessageOrder={setMessageOrder}
          />
          {chats && !chats.empty ? (
            <MessageContainer chats={chats} />
          ) : (
            <EmptyContainer />
          )}
          {chats && chats.size === queryLimit && (
            <div className=" flex w-full justify-center">
              <button
                onClick={() => {
                  setQueryLimit(queryLimit + 20);
                }}
                className="rounded-b-xl border bg-gray-100 px-4 py-2 text-center text-gray-700 hover:bg-gray-200 focus:outline-none"
              >
                Load more chats
              </button>
            </div>
          )}
        </div>
      </MainLayout>
      {chats && !chats.empty && <ChatRibbonContainer chats={chats} />}
    </NavigationContainer>
  );
}

export default ChatPage;
