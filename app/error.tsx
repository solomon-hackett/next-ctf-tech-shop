"use client";

import { useEffect } from "react";
import Link from "next/link";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">Oops!</h1>
        <p className="mb-6 text-gray-500">
          Something went wrong while loading this page. Please try again or go
          back home.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Go Home
          </Link>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          {error?.message && <p>Error: {error.message}</p>}
        </div>
      </div>
    </main>
  );
}
