import { motion } from "framer-motion";

/**
 * Generic numbered process/steps grid — used by every "how it works" style
 * section across the service pages.
 */
export default function ProcessSteps({
  id,
  eyebrow,
  heading,
  headingRed,
  steps = [],
  gridClassName,
  connector = false,
  bgClassName = "bg-[#fafafa]",
}) {
  const columns = steps.length || 3;
  const columnGridClassName = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 md:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-4",
    5: "sm:grid-cols-2 md:grid-cols-5",
  };
  const resolvedGridClassName =
    gridClassName || columnGridClassName[columns] || "sm:grid-cols-2 md:grid-cols-3";
  const connectorInset = `${100 / (2 * columns)}%`;

  return (
    <section id={id} className={`snap-start snap-always relative z-10 py-12 lg:py-20 ${bgClassName} overflow-hidden w-full`}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-8">
          {eyebrow && (
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {eyebrow}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
            {heading}
            {headingRed && <span className="text-red-600 block">{headingRed}</span>}
          </h2>
        </div>

        <div className={`relative grid ${resolvedGridClassName} gap-4 lg:gap-8`}>
          {connector && (
            <div
              className="hidden md:block absolute top-8 h-[2px] bg-red-200"
              style={{ left: connectorInset, right: connectorInset }}
            />
          )}

          {steps.map(({ key, Icon, number, title, desc }) => (
            <motion.div
              key={key ?? title}
              whileHover={{ y: -6 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.06)] text-center"
            >
              <div className="relative z-10 w-12 h-12 mx-auto rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                <Icon size={20} />
              </div>

              <span className="block text-red-200 font-black text-2xl lg:text-3xl mt-2">{number}</span>

              <h4 className="font-bold text-gray-900 text-base lg:text-lg mt-1">{title}</h4>

              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
