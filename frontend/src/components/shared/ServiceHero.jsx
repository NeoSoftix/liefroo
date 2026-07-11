import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../Button";

/**
 * Generic centered "service" page hero — badge, two-line heading, description,
 * optional checklist, primary/secondary CTA and a row of feature badges.
 * No image — all content is centered, used across every /*-development pages.
 */
export default function ServiceHero({
  badge,
  headingLine1,
  headingLine2,
  description,
  checklist = [],
  ctaLabel,
  onCtaClick,
  secondaryCtaLabel,
  secondaryCtaHref = "#how-it-works",
  features = [],
  featuresGridClassName = "grid-cols-2 md:grid-cols-4",
  imageSrc,
}) {
  return (
    <section className="snap-start snap-always relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-28 pb-12 lg:pt-36 lg:pb-20 z-10 w-full">
      <div
        className="absolute top-24 left-8 w-40 h-40 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fca5a5 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="absolute bottom-10 right-8 w-40 h-52 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fca5a5 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-200/30 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative px-6 w-full ${imageSrc ? "max-w-6xl mx-auto text-center lg:text-left" : "max-w-4xl mx-auto text-center"}`}
      >
        {imageSrc ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side: Image */}
            <div className="lg:col-span-5 flex justify-center order-1">
              <img
                src={imageSrc}
                alt={headingLine1}
                className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Right side: Text Content */}
            <div className="lg:col-span-7 order-2 text-left">
              <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                {badge}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 lg:mt-6 leading-[1.05] text-gray-900">
                {headingLine1}
                <span className="block text-red-600">{headingLine2}</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4 leading-relaxed">
                {description}
              </p>

              {checklist.length > 0 && (
                <ul className="mt-4 lg:mt-6 space-y-1.5 sm:space-y-2 text-left text-sm sm:text-base">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 lg:mt-8">
                {ctaLabel && (
                  <Button
                    onClick={onCtaClick}
                    className="
                      inline-flex items-center gap-2 sm:gap-3
                      bg-red-600 text-white border border-red-600
                      px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg text-sm sm:text-base
                      transition-all duration-300
                      hover:bg-white hover:text-red-600
                    "
                  >
                    {ctaLabel}
                    <ArrowRight size={16} className="sm:size-[18px]" />
                  </Button>
                )}

                {secondaryCtaLabel && (
                  <a
                    href={secondaryCtaHref}
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base"
                  >
                    {secondaryCtaLabel}
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {badge}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 lg:mt-6 leading-[1.05] text-gray-900">
              {headingLine1}
              <span className="block text-red-600">{headingLine2}</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            {checklist.length > 0 && (
              <ul className="mt-4 lg:mt-6 space-y-1.5 sm:space-y-2 max-w-md mx-auto text-left text-sm sm:text-base">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 lg:mt-8">
              {ctaLabel && (
                <Button
                  onClick={onCtaClick}
                  className="
                    inline-flex items-center gap-2 sm:gap-3
                    bg-red-600 text-white border border-red-600
                    px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg text-sm sm:text-base
                    transition-all duration-300
                    hover:bg-white hover:text-red-600
                  "
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="sm:size-[18px]" />
                </Button>
              )}

              {secondaryCtaLabel && (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base"
                >
                  {secondaryCtaLabel}
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </>
        )}

        {features.length > 0 && (
          <div className={`grid ${featuresGridClassName} gap-4 sm:gap-6 mt-8 lg:mt-12 w-full ${imageSrc ? "max-w-4xl" : "max-w-2xl"} mx-auto`}>
            {features.map(({ Icon, label }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full border border-red-200 bg-white flex items-center justify-center shadow-sm">
                  <Icon className="text-red-600" size={20} className="sm:size-[26px]" />
                </div>
                <h4 className="mt-2 font-semibold text-gray-900 text-xs sm:text-sm">{label}</h4>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
