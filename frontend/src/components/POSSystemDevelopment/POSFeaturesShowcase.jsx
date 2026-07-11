import { motion } from "framer-motion";
import {
  LayoutGrid,
  Tag,
  Wallet,
  BarChart3,
  Users,
  Printer,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "menu", Icon: LayoutGrid },
  { key: "discounts", Icon: Tag },
  { key: "payments", Icon: Wallet },
  { key: "reports", Icon: BarChart3 },
  { key: "staff", Icon: Users },
  { key: "printers", Icon: Printer },
];

export default function POSFeaturesShowcase() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-red-50/60 border border-red-100 p-12 md:p-16">
          <div className="max-w-2xl">
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {t("posSystemDevelopment.showcase.eyebrow")}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {t("posSystemDevelopment.showcase.heading")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-14">
            {items.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Icon className="text-red-600" size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {t(`posSystemDevelopment.showcase.items.${key}.title`)}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
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
