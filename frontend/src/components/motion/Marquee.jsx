// Infinite horizontally-scrolling strip. Items are rendered twice so the
// -50% translate in the `marquee` keyframe loops seamlessly.
export default function Marquee({ items, reverse = false, className = "" }) {
  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div
        className="flex w-max gap-4 marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map(({ label, Icon }, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-3 shrink-0 rounded-full border border-red-100 bg-white/80 backdrop-blur px-5 py-2.5 shadow-sm"
          >
            {Icon && <Icon size={18} className="text-red-600" />}
            <span className="text-sm sm:text-base font-semibold text-gray-800 whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
