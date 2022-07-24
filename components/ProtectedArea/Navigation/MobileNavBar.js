import { MenuIcon } from "@heroicons/react/outline";
import React from "react";
import useStore from "../../StateManagement";
function MobileNavBar() {
  const set = useStore((state) => state.set);
  return (
    <div className="sticky top-0 z-10 bg-lightning-500 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
      <button
        type="button"
        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500"
        onClick={() =>
          set((state) => {
            state.sidebarOpen = true;
          })
        }
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export default MobileNavBar;
