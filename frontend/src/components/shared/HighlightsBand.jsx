import { motion } from "framer-motion";

const cardClass =
  "bg-white border border-gray-100 rounded-2xl lg:rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-full";

/**
 * Tinted panel with an eyebrow + heading and a grid of small icon cards —
 * the "why it matters" band on every service page.
 *
 * `items` are `{ key, Icon, title, desc? }`. `variant` picks the card style:
 *   "stack" — icon above a short title (and optional desc)
 *   "value" — icon above a large figure, `desc` as its caption
 *   "row"   — icon tile to the left of title + desc
 * `action` renders under the intro (e.g. a CTA button).
 */
export default function HighlightsBand({
  eyebrow,
  heading,
  description,
  action,
  centered = false,
  items = [],
  variant = "stack",
  gridClassName = "grid-cols-2 md:grid-cols-4",
}) {
  return (
    <section className="relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-red-50/60 border border-red-100 p-6 sm:p-8 lg:p-12">
          <div className={centered ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
              {heading}
            </h2>

            {description && (
              <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl leading-relaxed">{description}</p>
            )}

            {action}
          </div>

          <div className={`grid ${gridClassName} gap-4 lg:gap-6 mt-6 lg:mt-8`}>
            {items.map((item) => (
              <motion.div key={item.key} whileHover={{ y: -4 }} className="h-full">
                {variant === "row" ? <RowCard {...item} /> : <StackCard {...item} large={variant === "value"} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCard({ Icon, title, desc, large }) {
  return (
    <div className={`${cardClass} p-4 lg:p-6 text-center flex flex-col ${desc ? "justify-between" : "justify-center items-center"}`}>
      <div>
        <Icon className="text-red-600 mx-auto" size={large ? 24 : 20} />
        {large ? (
          <h3 className="text-base sm:text-lg font-black text-gray-900 mt-2">{title}</h3>
        ) : (
          <h4 className="font-bold text-gray-900 mt-2 lg:mt-3 text-xs sm:text-sm">{title}</h4>
        )}
      </div>
      {desc && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{desc}</p>}
    </div>
  );
}

function RowCard({ Icon, title, desc }) {
  return (
    <div className={`${cardClass} flex items-start gap-3 p-3 lg:p-6`}>
      <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-xl lg:rounded-2xl bg-red-50 flex items-center justify-center">
        <Icon className="text-red-600" size={20} />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{title}</h4>
        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-snug">{desc}</p>
      </div>
    </div>
  );
}
