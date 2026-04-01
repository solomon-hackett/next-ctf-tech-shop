"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Tech Haven</h2>
            <p className="max-w-xs text-sm text-gray-500">
              Modern tech storefront selling only the best tech for the best
              prices.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link
                href="/"
                className="transition-colors hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="transition-colors hover:text-gray-900"
              >
                Shop
              </Link>
              <Link
                href="/cart"
                className="transition-colors hover:text-gray-900"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Legal / Extra */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="#" className="transition-colors hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="transition-colors hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 text-xs text-gray-400 md:flex-row">
          <p>© {new Date().getFullYear()} Tech Haven. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              className="cursor-pointer transition-colors hover:text-gray-600"
              href="https://nextjs.org/"
            >
              Built with Next.js
            </Link>
            <Link
              className="cursor-pointer transition-colors hover:text-gray-600"
              href="https://tailwindcss.com/"
            >
              Tailwind CSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
