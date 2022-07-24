import {
  ChatAlt2Icon,
  CollectionIcon,
  LightningBoltIcon,
  TerminalIcon,
  // UserCircleIcon,
  // UserGroupIcon,
  LogoutIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";

import Link from "next/link";

import useStore from "../../StateManagement";
import { auth } from "../../firebase-init";

import { useRouter } from "next/router";
import Logo from "./Logo";
import FirebaseLogo from "./FirebaseLogo";
import classNames from "../../classNames";

const navigation = [
  {
    name: "Getting started",
    href: "/getting-started",
    icon: LightningBoltIcon,
  },
  {
    name: "Tech stack",
    href: "/techstack",
    icon: TerminalIcon,
  },
  { name: "Firebase", href: "/firebase", icon: FirebaseLogo },
  {
    name: "State Management",
    href: "/state-management",
    icon: CollectionIcon,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCardIcon,
  },
];
const adminNavigation = [
  {
    name: "Chat messages",
    href: "/admin/chat",
    icon: ChatAlt2Icon,
  },
  // {
  //   name: "Users",
  //   href: "/admin/users",
  //   icon: UserGroupIcon,
  // },
  // { name: "Team", href: "/admin/team", icon: UserCircleIcon, current: false },
];

function SidebarContent() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const set = useStore((state) => state.set);
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-lightning-500">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center border-b px-4 pb-3">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className={classNames(
                  item.href === router.pathname
                    ? "bg-lightning-700 text-white"
                    : "text-white hover:bg-lightning-600 hover:bg-opacity-75",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
                onClick={() =>
                  set((state) => {
                    state.sidebarOpen = false;
                  })
                }
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0 text-lightning-300"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
        {/* Navigation Links for logged in admins */}
        {user?.claims?.admin && (
          <nav className="mt-5 flex-1 space-y-1 border-t border-white px-2">
            <div className="px-2 py-2 font-bold text-white">
              <span>Admin pages</span>
            </div>

            {adminNavigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={classNames(
                    item.href === router.pathname
                      ? "bg-lightning-700 text-white"
                      : "text-white hover:bg-lightning-600 hover:bg-opacity-75",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0 text-lightning-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </div>
      {/* Bottom section of Sidebar with the user profile link and sign out button */}
      <div className="flex w-full flex-shrink-0 items-center justify-between border-t border-white p-4">
        <Link href="/profile">
          <a className="group block flex-shrink-0">
            <div className="flex items-center">
              <div className="mr-3">
                <p className="w-44 truncate text-sm font-medium text-white group-hover:underline">
                  {user?.email || "Anonymous"}
                </p>
                <p className="text-xs font-medium text-lightning-200 group-hover:text-white group-hover:underline">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </Link>
        <button
          onClick={async () => {
            const { signOut } = await import("firebase/auth");
            await signOut(auth);
          }}
          aria-label="Sign out"
          className="mr-2 focus:outline-none"
        >
          <LogoutIcon className="h-9 w-9 rounded-full  bg-white p-2 text-gray-600 hover:bg-gray-100 " />
        </button>
      </div>
    </div>
  );
}

export default SidebarContent;
