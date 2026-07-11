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
  gridClassName = "sm:grid-cols-2 md:grid-cols-3",
  connector = false,
  bgClassName = "bg-[#fafafa]",
}) {
  return (
    <section id={id} className={`relative z-10 py-28 ${bgClassName} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          {eyebrow && (
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {eyebrow}
            </span>
          )}

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
            {heading}
            {headingRed && <span className="text-red-600 block">{headingRed}</span>}
          </h2>
        </div>

        <div className={`relative grid ${gridClassName} gap-8`}>
          {connector && (
            <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-[2px] bg-red-200" />
          )}

          {steps.map(({ key, Icon, number, title, desc }) => (
            <motion.div
              key={key ?? title}
              whileHover={{ y: -6 }}
              className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)] text-center"
            >
              <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg">
                <Icon size={26} />
              </div>

              <span className="block text-red-200 font-black text-4xl mt-4">{number}</span>

              <h4 className="font-bold text-gray-900 text-xl mt-2">{title}</h4>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
