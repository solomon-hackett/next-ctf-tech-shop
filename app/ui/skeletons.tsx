export function CarouselSkeleton() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-44 rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-hidden pb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex min-w-60 max-w-60 flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="w-full aspect-square bg-gray-100 animate-pulse" />

            {/* Card body */}
            <div className="flex flex-col gap-2 p-4 pt-3">
              {/* Category eyebrow */}
              <div className="h-2.5 w-16 rounded-full bg-gray-200 animate-pulse" />
              {/* Product name — two lines */}
              <div className="h-3.5 w-full rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-3/4 rounded-full bg-gray-200 animate-pulse" />
              {/* Actions row */}
              <div className="mt-2 flex items-center justify-between">
                <div className="h-3 w-20 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-7 w-12 rounded-lg bg-gray-200 animate-pulse" />
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
            className={`h-1.5 rounded-full bg-gray-200 animate-pulse ${i === 0 ? "w-5" : "w-1.5"}`}
          />
        ))}
      </div>
    </section>
  );
}