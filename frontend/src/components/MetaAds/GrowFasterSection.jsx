import { motion } from "framer-motion";
import { Users, ShoppingBag, Target, RotateCcw, ArrowDownCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const stats = [
  { key: "reach", Icon: Users },
  { key: "directOrders", Icon: ShoppingBag },
  { key: "roi", Icon: Target },
  { key: "retarget", Icon: RotateCcw },
  { key: "lowerCost", Icon: ArrowDownCircle },
];

export default function GrowFasterSection() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-red-50/60 border border-red-100 p-12 md:p-16">
          <div className="max-w-2xl">
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {t("metaAds.growFaster.eyebrow")}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {t("metaAds.growFaster.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-14">
            {stats.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <Icon className="text-red-600 mx-auto" size={24} />
                <h4 className="font-bold text-gray-900 mt-3 text-sm">
                  {t(`metaAds.growFaster.stats.${key}.title`)}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {t(`metaAds.growFaster.stats.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
