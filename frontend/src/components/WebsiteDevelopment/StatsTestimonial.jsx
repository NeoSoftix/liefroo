import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StatsTestimonial() {
  const { t } = useTranslation();

  const stats = [
    { value: "94/100", label: t("websiteDevelopment.stats.seoScore") },
    { value: "+3.2x", label: t("websiteDevelopment.stats.conversionLift") },
    { value: t("websiteDevelopment.stats.launchValue"), label: t("websiteDevelopment.stats.launchTime") },
  ];

  return (
    <section className="relative z-10 py-28 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <h3 className="text-3xl font-black text-red-600">{stat.value}</h3>
                <p className="text-xs text-gray-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative">
            <Quote className="text-red-200" size={40} />

            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              “{t("websiteDevelopment.stats.testimonial")}”
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                {t("websiteDevelopment.stats.testimonialName").charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {t("websiteDevelopment.stats.testimonialName")}
                </h4>
                <p className="text-sm text-gray-500">
                  {t("websiteDevelopment.stats.testimonialRole")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
