import { ChatAlt2Icon } from "@heroicons/react/outline";

function EmptyContainer() {
  return (
    <div className="overflow-hidden bg-white py-8 text-center shadow sm:rounded-b-xl">
      <ChatAlt2Icon className="mx-auto h-12 w-12 text-lightning-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-700">
        No messages to show
      </h3>
    </div>
  );
}

export default EmptyContainer;
