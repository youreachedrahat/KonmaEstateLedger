import Link from "next/link";
import { CardanoWallet } from "@meshsdk/react";

export default function Navbar() {
  return (
    <div className=" z-50 fixed w-full">
      <header className="bg-black relative ">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <span className="flex items-center text-sm font-medium text-gray-100 hover:text-gray-300">
                    <Link href="/">KONMA</Link>
                  </span>
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <CardanoWallet />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
