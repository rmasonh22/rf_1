import Link from "next/link";
import { LightningBoltIcon } from "@heroicons/react/solid";

function Footer() {
  return (
    <div className="mt-10 flex h-40 w-full flex-col justify-between bg-gray-800 p-4">
      <div className="grid w-full grid-cols-2 items-center">
        <div className="mx-auto flex h-16 flex-row items-center  p-4 align-middle">
          <Link href="/">
            <a aria-label="Home" className="flex items-center">
              <LightningBoltIcon className="h-8 w-auto rotate-12 scale-y-110 transform stroke-lightning-500 text-lightning-200" />

              <span className=" ml-2 font-extrabold tracking-tight text-gray-900">
                <span className="block text-lightning-600 ">
                  {" "}
                  React & Firebase
                </span>
                <span className="block text-gray-300">SaaS starter</span>
              </span>
            </a>
          </Link>
        </div>
        <div className="mx-auto grid grid-cols-2 gap-x-6">
          <div className="mt-2">
            <Link href="/legal">
              <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                Legal Notice
              </a>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/privacy">
              <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                Privacy
              </a>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/changelog">
              <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                Changelog
              </a>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/license">
              <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                License
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400">© Copyright AppHafen 2022</div>
    </div>
  );
}

export default Footer;
