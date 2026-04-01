"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleSearch(term: string) {
    updateParams({ query: term });
  }

  function handleSort(value: string) {
    updateParams({ sort: value });
  }

  function handleCategory(value: string) {
    updateParams({ category: value });
  }

  return (
    <div className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <label htmlFor="sorting" className="sr-only">
        Sort By
      </label>
      <label htmlFor="category" className="sr-only">
        Category
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

      <select
        name="sorting"
        id="sorting"
        defaultValue={searchParams.get("sort") ?? "name-asc"}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-desc">Price - Highest First</option>
        <option value="price-asc">Price - Lowest First</option>
      </select>
      <select
        name="category"
        id="category"
        defaultValue={
          searchParams.get("category") ? `${searchParams.get("category")}` : ""
        }
        onChange={(e) => handleCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="laptop">Laptops</option>
        <option value="smartphone">Mobile Phones</option>
        <option value="headphones">Headphones</option>
        <option value="monitor">Monitors</option>
        <option value="mouse">Mice</option>
        <option value="keyboard">Keyboards</option>
        <option value="wearable">Wearables</option>
        <option value="smart home">Smart Home</option>
        <option value="camera">Cameras</option>
        <option value="storage">Storage Devices</option>
        <option value="accessories">Accessories</option>
        <option value="console">Consoles</option>
      </select>
    </div>
  );
}
