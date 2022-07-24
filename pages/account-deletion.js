import { CheckCircleIcon } from "@heroicons/react/outline";

function accountDeletion() {
  return (
    <div className="w-screen flex flex-col justify-center h-screen items-center">
      <div className="inline-flex items-center h-8 justify-center py-2 px-4 border border-lightning-400 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-lightning-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500">
        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
        Account deletion successful
      </div>
      <p className="text-gray-700 mt-4">We are sorry to see you go.</p>
    </div>
  );
}

export default accountDeletion;
