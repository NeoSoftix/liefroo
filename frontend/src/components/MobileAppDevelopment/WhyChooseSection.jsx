import { motion } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const stats = [
  { key: "satisfaction", Icon: ShieldCheck },
  { key: "appsDelivered", Icon: Users },
  { key: "repeatOrders", Icon: TrendingUp },
  { key: "support", Icon: Clock },
];

export default function WhyChooseSection() {
  const { t } = useTranslation();

  return (
    <section className="snap-start snap-always relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-[#0f0f14] p-6 sm:p-8 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="absolute right-0 top-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {t("mobileAppDevelopment.whyChoose.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 lg:mt-4 leading-tight">
              {t("mobileAppDevelopment.whyChoose.heading")}
            </h2>

            <ul className="mt-4 lg:mt-6 space-y-1.5 text-left inline-block text-sm">
              {["loyalty", "repeat", "sales", "insights"].map((key) => (
                <li key={key} className="flex items-center gap-3 text-gray-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  {t(`mobileAppDevelopment.whyChoose.benefits.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {stats.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-center"
              >
                <Icon className="text-red-500 mx-auto" size={20} />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-red-505 mt-2 text-red-500">
                  {t(`mobileAppDevelopment.whyChoose.stats.${key}.value`)}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  {t(`mobileAppDevelopment.whyChoose.stats.${key}.label`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
