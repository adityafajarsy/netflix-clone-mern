import React, { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CarouselLayout = ({ children }) => {
  const ref = useRef(null);

  const scroll = (offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Left Scroll Trigger */}
      <button
        onClick={() => scroll(-600)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-[#18181B]/90 hover:bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] p-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-90 opacity-0 group-hover/carousel:opacity-100 cursor-pointer -translate-x-3"
        title="Scroll left"
      >
        <GoChevronLeft size={22} />
      </button>

      {/* Right Scroll Trigger */}
      <button
        onClick={() => scroll(600)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-[#18181B]/90 hover:bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] p-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-90 opacity-0 group-hover/carousel:opacity-100 cursor-pointer translate-x-3"
        title="Scroll right"
      >
        <GoChevronRight size={22} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={ref}
        className="flex gap-3.5 sm:gap-4 lg:gap-4.5 overflow-x-auto scroll-smooth py-3 px-1 no-scrollbar scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default CarouselLayout;

