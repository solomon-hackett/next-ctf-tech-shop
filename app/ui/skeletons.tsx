export function CarouselSkeleton() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header row */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-hidden pb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex max-w-60 min-w-60 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* Image placeholder */}
            <div className="aspect-square w-full animate-pulse bg-gray-100" />

            {/* Card body */}
            <div className="flex flex-col gap-2 p-4 pt-3">
              {/* Category eyebrow */}
              <div className="h-2.5 w-16 animate-pulse rounded-full bg-gray-200" />
              {/* Product name — two lines */}
              <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-200" />
              <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-200" />
              {/* Actions row */}
              <div className="mt-2 flex items-center justify-between">
                <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-7 w-12 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 animate-pulse rounded-full bg-gray-200 ${i === 0 ? "w-5" : "w-1.5"}`}
          />
        ))}
      </div>
    </section>
  );
}
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}
