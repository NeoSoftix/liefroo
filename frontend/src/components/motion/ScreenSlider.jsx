import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const slideEase = [0.65, 0, 0.35, 1];

// Auto-advancing slides clipped to a device's screen. Position it over the
// screen area of a device image with `className`/`style` (absolute).
//
// Every slide stays mounted (stacked) so each image is loaded and decoded up
// front — mounting a fresh <img> per slide showed the blank screen background
// for a few seconds while the browser fetched/decoded it.
//
// Each slide is { src, srcSet?, position? }; pass `sizes` (the screen's rendered
// width) so the browser picks a file close to 1:1 — heavy GPU downscaling of a
// large screenshot makes the UI text look jagged.
export default function ScreenSlider({ slides, interval = 4000, sizes, className = "", style }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const prev = (index - 1 + slides.length) % slides.length;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden bg-white ${className}`}
      style={style}
    >
      {slides.map((slide, i) => {
        const isCurrent = i === index;
        const isPrev = i === prev && slides.length > 1;
        // current slides in from the right, previous slides out to the left,
        // everything else waits off-screen right without animating
        const target = reduceMotion
          ? { x: 0, opacity: isCurrent ? 1 : 0 }
          : { x: isCurrent ? "0%" : isPrev ? "-100%" : "100%", opacity: 1 };
        const animated = isCurrent || isPrev;

        return (
          <motion.img
            key={slide.src}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes={sizes}
            alt=""
            loading="eager"
            decoding="async"
            initial={false}
            animate={target}
            transition={animated ? { duration: 0.8, ease: slideEase } : { duration: 0 }}
            style={{ zIndex: isCurrent ? 2 : isPrev ? 1 : 0 }}
            className={`absolute inset-0 w-full h-full object-cover ${slide.position ?? "object-top"}`}
          />
        );
      })}
    </div>
  );
}
