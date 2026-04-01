"use client";

import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function NotFound() {
  return (
    <main className="flex h-full min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <FaceFrownIcon className="mx-auto mb-4 w-12 text-gray-400" />
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          404 - Not Found
        </h1>
        <p className="mb-6 text-gray-500">
          The product you are looking for could not be found.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
