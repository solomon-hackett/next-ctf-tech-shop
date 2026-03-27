"use client";
import type { Product } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

export default function ProductCarousel({
  content,
  title,
}: {
  content: Product[];
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 240;
  const GAP = 20;
  const STRIDE = CARD_WIDTH + GAP;
  const COUNT = content.length;

  // We render: [clones of last N] + [real items] + [clones of first N]
  // CLONE_COUNT controls how many items are cloned on each side.
  // We clone all items so the "seam" is never visible.
  const items = [...content, ...content, ...content]; // prev-clone | real | next-clone

  const getRealIndex = useCallback(
    (scrollLeft: number) => {
      // The real items start at index COUNT (after one full set of clones)
      const offset = scrollLeft - COUNT * STRIDE;
      const raw = Math.round(offset / STRIDE);
      return ((raw % COUNT) + COUNT) % COUNT;
    },
    [COUNT, STRIDE],
  );

  // On mount, jump to the real first item (the middle clone group)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Silence scroll listener during the initial jump
    isJumping.current = true;
    el.scrollLeft = COUNT * STRIDE;
    // Small timeout to let layout settle
    requestAnimationFrame(() => {
      isJumping.current = false;
    });
  }, [COUNT, STRIDE]);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isJumping.current) return;

    const scrollLeft = el.scrollLeft;
    const totalWidth = COUNT * STRIDE;

    // Update active dot
    setActiveIndex(getRealIndex(scrollLeft));

    // Boundary detection: jumped past the last clone group → wrap to real start
    if (scrollLeft >= totalWidth * 2) {
      isJumping.current = true;
      el.scrollLeft = scrollLeft - totalWidth;
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
    // Jumped before the first clone group → wrap to real end
    else if (scrollLeft <= 0) {
      isJumping.current = true;
      el.scrollLeft = scrollLeft + totalWidth;
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
  }, [COUNT, STRIDE, getRealIndex]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -STRIDE : STRIDE,
      behavior: "smooth",
    });
  };

  const scrollToRealIndex = (targetIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    // Find the real item position (middle clone group)
    const targetScroll = COUNT * STRIDE + targetIndex * STRIDE;
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header row */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-150 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-150 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        // Note: we intentionally omit scroll-smooth here so the jump teleport is instant.
        // smooth scrolling for nav buttons is handled via el.scrollBy({ behavior: "smooth" })
      >
        {items.map((product, index) => {
          // Determine real index for this rendered clone
          const realIdx = index % COUNT;
          return (
            <article
              key={`${product.id}-${index}`}
              data-card
              className="group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl"
              style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
            >
              {/* Image area */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  priority={realIdx < 3}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-1 p-4 pt-3">
                <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  {product.category}
                </span>
                <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={`/shop/${product.id}`}
                    className="group/link flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
                  >
                    View details
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                    >
                      <path
                        d="M2.5 6h7M6.5 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={`/shop/purchase/${product.id}`}
                    className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dot indicators — always COUNT dots, always one active */}
      {COUNT > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {content.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToRealIndex(i)}
              aria-label={`Go to product ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 bg-gray-900"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
