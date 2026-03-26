"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Account", href: "/account" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="mt-5 flex w-fit justify-center gap-10 rounded-full bg-gray-300/50 px-4 py-2 shadow-xl inset-shadow-gray-400/60 backdrop-blur-sm transition duration-400 hover:shadow-2xl">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "transistion rounded-full px-4 py-2 text-5xl duration-300 hover:bg-indigo-400 hover:inset-shadow-sm hover:inset-shadow-indigo-300/50",
            {
              "bg-indigo-600/50 text-cyan-200": pathname === link.href,
            },
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
