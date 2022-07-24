import classNames from "../../classNames";
import NewChatMessageButton from "./NewChatMessageButton";

function MessageContainerHeader({ messageOrder, setMessageOrder }) {
  return (
    <div className="mt-5 rounded-t-xl border-b border-gray-200 bg-lightning-100 px-4 py-5 shadow sm:px-6">
      <div className="-ml-4 -mt-2 sm:flex sm:items-baseline">
        <div className="ml-4 mt-2 flex items-center justify-between sm:block">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Chats</h3>
          <NewChatMessageButton isMobile={true} />
        </div>
        <div className="mt-4 ml-4 sm:mt-0 sm:ml-10">
          <nav className="-mb-px flex space-x-8">
            {["Unprocessed", "Recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMessageOrder(tab)}
                className={classNames(
                  tab === messageOrder
                    ? "border-lightning-500 text-lightning-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium focus:outline-none"
                )}
                aria-current={tab.current ? "order" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="ml-auto mt-2 hidden flex-shrink-0 sm:block">
          <NewChatMessageButton isMobile={false} />
        </div>
      </div>
    </div>
  );
}

export default MessageContainerHeader;
