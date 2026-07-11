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
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-red-50/60 border border-red-100 p-12 md:p-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {t("printerIntegration.hardware.eyebrow")}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {t("printerIntegration.hardware.heading")}
            </h2>

            <p className="text-gray-600 mt-5 text-lg">
              {t("printerIntegration.hardware.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {hardware.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <Icon className="text-red-600 mx-auto" size={28} />
                <p className="text-sm font-semibold text-gray-900 mt-3">
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
