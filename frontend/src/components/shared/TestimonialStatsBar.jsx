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
    <section className="relative z-10 py-16 bg-red-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="max-w-xl">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold mx-auto md:mx-0">
              {name?.charAt(0)}
            </div>
            <p className="text-gray-700 mt-4 leading-relaxed">“{quote}”</p>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              — {name}, {role}
            </p>
          </div>

          <div className={`grid ${statsGridClassName} gap-8`}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-red-600">{stat.value}</h3>
                <p className="text-xs text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
