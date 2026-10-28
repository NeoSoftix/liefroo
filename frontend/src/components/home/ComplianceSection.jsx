import { motion } from "framer-motion";
import { ShieldCheck, FileCheck2, Cpu, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal, ease } from "../motion";

const points = [
  { key: "inspection", Icon: FileCheck2 },
  { key: "hardware", Icon: Cpu },
  { key: "reporting", Icon: Landmark },
];

// KassenSichV / TSE reassurance card.
export default function ComplianceSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-red-100/70 via-red-50 to-orange-50 border border-red-200 shadow-[0_25px_70px_rgba(220,38,38,0.12)] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-200/50 blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-red-600 text-white items-center justify-center shadow-[0_12px_30px_rgba(220,38,38,0.3)]">
              <ShieldCheck size={28} />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              {t("compliance.heading")}{" "}
              <span className="text-red-600">{t("compliance.headingHighlight")}</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              {t("compliance.description")}
            </p>
          </div>

          <div className="relative mt-10 grid sm:grid-cols-3 gap-4 lg:gap-6">
            {points.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
                className="rounded-2xl bg-white border border-red-100/70 p-5 lg:p-6 shadow-[0_12px_30px_rgba(220,38,38,0.08)]"
              >
                <span className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-bold text-base lg:text-lg text-gray-900">
                  {t(`compliance.points.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  {t(`compliance.points.${key}.text`)}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
