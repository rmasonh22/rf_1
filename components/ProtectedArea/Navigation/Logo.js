import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <a className="flex w-full items-center text-white">
        <LightningBoltIcon className="mr-3 h-8 w-8 rotate-12 scale-y-110 transform stroke-lightning-500 text-lightning-200" />
        <span className="text-xl font-extrabold leading-5">
          React & Firebase SaaS Starter
        </span>
      </a>
    </Link>
  );
}

export default Logo;
