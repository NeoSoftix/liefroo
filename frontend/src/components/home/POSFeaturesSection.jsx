import { motion } from "framer-motion";
import { MonitorSmartphone, TabletSmartphone, Smartphone, QrCode, BookOpen, CalendarCheck, BadgePercent, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal, ease } from "../motion";

const items = [
  { key: "pos", Icon: MonitorSmartphone },
  { key: "kiosk", Icon: TabletSmartphone },
  { key: "mobileOrdering", Icon: Smartphone },
  { key: "qrMenu", Icon: QrCode },
  { key: "cashbook", Icon: BookOpen },
  { key: "reservations", Icon: CalendarCheck },
  { key: "offers", Icon: BadgePercent },
  { key: "reports", Icon: LineChart },
];

export default function POSFeaturesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 lg:py-20 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-100/50 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
            {t("posFeatures.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-4 text-[#111827] leading-tight">
            {t("posFeatures.heading")}{" "}
            <span className="text-red-600">{t("posFeatures.headingHighlight")}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            {t("posFeatures.description")}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease }}
              className="group relative rounded-3xl bg-white border border-gray-100 p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_25px_60px_rgba(220,38,38,0.12)]"
            >
              <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg lg:text-xl font-bold text-gray-900">
                {t(`posFeatures.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm lg:text-base text-gray-600 leading-relaxed">
                {t(`posFeatures.items.${key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
