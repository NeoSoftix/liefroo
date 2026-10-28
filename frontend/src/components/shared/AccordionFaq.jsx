import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, ease } from "../motion";

/**
 * Heading + single-open accordion of `{ q, a }` items — used by the
 * tax-compliance pages.
 */
export default function AccordionFaq({ id, heading, items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id={id} className="py-14 lg:py-20 bg-[#FAFAFA] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{heading}</h2>
        </Reveal>
        <div className="space-y-3">
          {items.map(({ q, a }, i) => {
            const open = openIndex === i;
            return (
              <div key={q} className={`rounded-2xl border transition-colors bg-white ${open ? "border-red-200 shadow-[0_15px_40px_rgba(220,38,38,0.08)]" : "border-gray-100"}`}>
                <button type="button" onClick={() => setOpenIndex(open ? null : i)} aria-expanded={open} className="w-full flex items-center gap-4 px-5 py-4 lg:px-6 lg:py-5 text-left">
                  <span className="flex-1 font-bold text-gray-900">{q}</span>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-red-600 text-white rotate-45" : "bg-red-50 text-red-600"}`}>
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                      <p className="px-5 pb-5 lg:px-6 text-sm lg:text-base text-gray-600 leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
