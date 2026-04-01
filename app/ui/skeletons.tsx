export function CarouselSkeleton() {
  const CARD_WIDTH = 240;
  const CARD_COUNT = 5;

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header row */}
      <div className="mb-6 flex items-center justify-between">
        {/* Title placeholder */}
        <div className="shimmer h-8 w-48 rounded-lg" />

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <div className="shimmer h-9 w-9 rounded-full" />
          <div className="shimmer h-9 w-9 rounded-full" />
        </div>
      </div>

      {/* Carousel cards */}
      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: CARD_COUNT }).map((_, index) => (
            <div
              key={index}
              className="flex shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
            >
              {/* Image placeholder */}
              <div className="shimmer aspect-square w-full" />

              {/* Card body */}
              <div className="flex flex-col gap-2 p-4 pt-3">
                <div className="shimmer h-2.5 w-16 rounded-full" />{" "}
                {/* category */}
                <div className="shimmer h-3.5 w-full rounded-full" />{" "}
                {/* name line 1 */}
                <div className="shimmer h-3.5 w-3/4 rounded-full" />{" "}
                {/* name line 2 */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="shimmer h-3 w-20 rounded-full" />{" "}
                  {/* View details */}
                  <div className="shimmer h-7 w-12 rounded-lg" />{" "}
                  {/* Add to Cart */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`shimmer h-1.5 rounded-full ${
              i === 0 ? "w-5" : "w-1.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function ProductGridSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* Image */}
            <div className="shimmer aspect-square w-full" />

            {/* Info */}
            <div className="flex flex-col gap-2 p-4 pt-3">
              <div className="shimmer h-2 w-16 rounded" />
              <div className="shimmer h-3 w-3/4 rounded" />
              <div className="shimmer h-3 w-1/2 rounded" />
              <div className="shimmer h-3 w-1/4 rounded" />

              <div className="mt-3 flex items-center justify-between">
                <div className="shimmer h-3 w-20 rounded" />
                <div className="shimmer h-6 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
