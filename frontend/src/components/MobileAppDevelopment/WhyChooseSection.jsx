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
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-[#0f0f14] p-12 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="absolute right-0 top-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-red-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {t("mobileAppDevelopment.whyChoose.eyebrow")}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 leading-tight">
              {t("mobileAppDevelopment.whyChoose.heading")}
            </h2>

            <ul className="mt-8 space-y-2 text-left inline-block">
              {["loyalty", "repeat", "sales", "insights"].map((key) => (
                <li key={key} className="flex items-center gap-3 text-gray-200 font-medium">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0">
                    ✓
                  </span>
                  {t(`mobileAppDevelopment.whyChoose.benefits.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {stats.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
              >
                <Icon className="text-red-500 mx-auto" size={26} />
                <h3 className="text-2xl md:text-3xl font-black text-red-500 mt-3">
                  {t(`mobileAppDevelopment.whyChoose.stats.${key}.value`)}
                </h3>
                <p className="text-xs text-gray-400 mt-2">
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
