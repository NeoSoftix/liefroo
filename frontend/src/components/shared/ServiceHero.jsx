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
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-52 pb-28 z-10">
      <div
        className="absolute top-24 left-8 w-40 h-40 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #fca5a5 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="absolute bottom-10 right-8 w-40 h-52 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #fca5a5 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-200/30 blur-[160px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm">
          {badge}
        </span>

        <h1 className="text-5xl md:text-7xl font-black mt-6 leading-[1.05] text-gray-900">
          {headingLine1}
          <span className="block text-red-600">{headingLine2}</span>
        </h1>

        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {checklist.length > 0 && (
          <ul className="mt-8 space-y-2 max-w-md mx-auto text-left">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
          {ctaLabel && (
            <Button
              onClick={onCtaClick}
              className="
                inline-flex items-center gap-3
                bg-red-600 text-white border border-red-600
                px-8 py-4 rounded-full font-semibold shadow-lg
                transition-all duration-300
                hover:bg-white hover:text-red-600
              "
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </Button>
          )}

          {secondaryCtaLabel && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all duration-300"
            >
              {secondaryCtaLabel}
              <ArrowRight size={16} />
            </a>
          )}
        </div>

        {features.length > 0 && (
          <div className={`grid ${featuresGridClassName} gap-6 mt-16 max-w-2xl mx-auto`}>
            {features.map(({ Icon, label }) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full border border-red-200 bg-white flex items-center justify-center shadow-sm">
                  <Icon className="text-red-600" size={26} />
                </div>
                <h4 className="mt-3 font-semibold text-gray-900 text-sm">{label}</h4>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
