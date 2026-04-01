"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "price-asc", label: "Price: Low–High" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "laptop", label: "Laptops" },
  { value: "smartphone", label: "Mobile Phones" },
  { value: "headphones", label: "Headphones" },
  { value: "monitor", label: "Monitors" },
  { value: "mouse", label: "Mice" },
  { value: "keyboard", label: "Keyboards" },
  { value: "wearable", label: "Wearables" },
  { value: "smart home", label: "Smart Home" },
  { value: "camera", label: "Cameras" },
  { value: "storage", label: "Storage Devices" },
  { value: "accessories", label: "Accessories" },
  { value: "console", label: "Consoles" },
];

function CustomSelect({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" aria-label={label}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-white py-2.5 pr-3.5 pl-4 text-sm font-medium shadow-sm transition-all duration-200 outline-none sm:w-auto ${
          open
            ? "border-gray-300 shadow-md"
            : "border-gray-100 hover:border-gray-200 hover:shadow-md"
        } `}
      >
        <span className="text-gray-700">{selected.label}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-[calc(100%+6px)] right-0 z-50 min-w-full origin-top overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-y-95 opacity-0"
        } `}
      >
        <ul className="py-1.5">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-6 px-4 py-2.5 text-left text-sm transition-colors duration-100 ${
                  opt.value === value
                    ? "bg-gray-50 font-semibold text-gray-900"
                    : "font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } `}
              >
                {opt.label}
                {opt.value === value && (
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-gray-900"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      params.set('page', '1')
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    updateParams({ query: value });
  }, 300);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="peer w-full rounded-2xl border border-gray-100 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 shadow-sm transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-gray-200 hover:shadow-md focus:border-gray-300 focus:shadow-md"
            placeholder={placeholder}
            onChange={(e) => debouncedSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-gray-600" />
        </div>

        {/* Sort */}
        <CustomSelect
          label="Sort by"
          options={SORT_OPTIONS}
          value={searchParams.get("sort") ?? "name-asc"}
          onChange={(v) => updateParams({ sort: v })}
        />

        {/* Category */}
        <CustomSelect
          label="Category"
          options={CATEGORY_OPTIONS}
          value={searchParams.get("category") ?? ""}
          onChange={(v) => updateParams({ category: v })}
        />
      </div>
    </div>
  );
}
