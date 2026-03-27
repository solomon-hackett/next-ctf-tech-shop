"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-in-out",
        scrolled
          ? "border-b border-gray-100 bg-white/80 py-2 shadow-sm backdrop-blur-md"
          : "bg-white/60 py-5 backdrop-blur-sm",
      )}
    >
      <div className="relative mx-auto flex max-w-6xl items-center px-6">
        {/* Wordmark — far left */}
        <Link
          href="/"
          className={clsx(
            "font-bold tracking-tight text-gray-900 transition-all duration-500 select-none",
            scrolled ? "text-lg" : "text-2xl",
          )}
        >
          <span className="text-gray-900">Tech Haven</span>
          <span className="text-gray-400">.</span>
        </Link>

        {/* Nav links — absolutely centered in the header */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "relative rounded-lg font-medium tracking-wide transition-all duration-300",
                  scrolled ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base",
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {link.name}
                <span
                  className={clsx(
                    "absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 transition-all duration-300",
                    isActive ? "h-0.5 w-4 opacity-100" : "h-0.5 w-0 opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Cart + Account — far right */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            aria-label="Cart"
            className={clsx(
              "relative flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md",
              scrolled ? "h-8 w-8" : "h-9 w-9",
            )}
            href="/cart"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Link>
          <Link
            href="/account"
            className={clsx(
              "rounded-full bg-gray-900 font-semibold text-white transition-all duration-300 hover:bg-gray-700",
              scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
            )}
          >
            Account
          </Link>
        </div>
      </div>
    </header>
  );
}
