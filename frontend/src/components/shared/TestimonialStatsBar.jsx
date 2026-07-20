/**
 * Generic quote + stat-row bar — used by every testimonial/stats strip
 * across the service pages.
 */
export default function TestimonialStatsBar({
  quote,
  name,
  role,
  stats = [],
  statsGridClassName = "grid-cols-2 md:grid-cols-4",
}) {
  return (
    <section className="relative z-10 py-12 lg:py-16 bg-red-50/60 w-full">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10 text-center md:text-left">
          <div className="max-w-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold mx-auto md:mx-0 text-sm sm:text-base">
              {name?.charAt(0)}
            </div>
            <p className="text-gray-700 mt-3 leading-relaxed text-sm sm:text-base">“{quote}”</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
              — {name}, {role}
            </p>
          </div>

          <div className={`grid ${statsGridClassName} gap-4 lg:gap-8`}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-xl md:text-2xl font-black text-red-600">{stat.value}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
