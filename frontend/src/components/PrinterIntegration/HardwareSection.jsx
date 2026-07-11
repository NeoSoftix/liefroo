import { motion } from "framer-motion";
import { Printer, MonitorSmartphone, Wifi, CloudCog } from "lucide-react";
import { useTranslation } from "react-i18next";

const hardware = [
  { key: "printers", Icon: Printer },
  { key: "display", Icon: MonitorSmartphone },
  { key: "connectivity", Icon: Wifi },
  { key: "cloud", Icon: CloudCog },
];

export default function HardwareSection() {
  const { t } = useTranslation();

  return (
    <section className="snap-start snap-always relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-red-50/60 border border-red-100 p-6 sm:p-8 lg:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {t("printerIntegration.hardware.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
              {t("printerIntegration.hardware.heading")}
            </h2>

            <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
              {t("printerIntegration.hardware.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {hardware.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-full flex flex-col justify-center items-center"
              >
                <Icon className="text-red-600 mx-auto" size={20} className="lg:size-[28px]" />
                <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-2">
                  {t(`printerIntegration.hardware.items.${key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
