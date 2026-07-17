import { motion } from "framer-motion";
import {
  LayoutGrid,
  Wallet,
  BarChart3,
  Users,
  Printer,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "menu", Icon: LayoutGrid },
  { key: "payments", Icon: Wallet },
  { key: "reports", Icon: BarChart3 },
  { key: "staff", Icon: Users },
  { key: "printers", Icon: Printer },
];

export default function POSFeaturesShowcase() {
  const { t } = useTranslation();

  return (
    <section className="snap-start snap-always relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-red-50/60 border border-red-100 p-6 sm:p-8 lg:p-12">
          <div className="max-w-2xl">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {t("posSystemDevelopment.showcase.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
              {t("posSystemDevelopment.showcase.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {items.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="flex items-start gap-3 bg-white border border-gray-100 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-full"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-xl lg:rounded-2xl bg-red-50 flex items-center justify-center">
                  <Icon className="text-red-600" size={18} className="lg:size-[22px]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                    {t(`posSystemDevelopment.showcase.items.${key}.title`)}
                  </h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-snug">
                    {t(`posSystemDevelopment.showcase.items.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
