import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "./shared";
import { Reveal } from "./motion";

const ease = [0.22, 1, 0.36, 1];

// Device cut-outs are shared with the hero (public/hero/).
const devices = [
  { key: "station", image: "/hero/device-tablet.webp", width: 1250, height: 1199, imgClass: "max-w-[85%]", to: "/pos-system-development" },
  { key: "go", image: "/hero/device-handheld.webp", width: 691, height: 1536, imgClass: "max-w-[42%]", to: "/pos-system-development" },
  { key: "waiter", image: "/hero/device-phone.webp", width: 720, height: 1151, imgClass: "max-w-[45%]", to: "/mobile-app-development" },
  { key: "printer", image: "/hero/device-printer.webp", width: 1000, height: 1043, imgClass: "max-w-[70%]", to: "/printer-integration" },
];

export default function POSDevicesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <Reveal className="text-center mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
            {t("posDevices.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-4 text-[#111827]">
            {t("posDevices.headingPrefix")}{" "}
            <span className="text-red-600">{t("posDevices.headingHighlight")}</span>{" "}
            {t("posDevices.headingSuffix")}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {devices.map(({ key, image, width, height, imgClass, to }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="group flex flex-col rounded-[28px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_80px_rgba(220,38,38,0.12)] transition-shadow duration-500 overflow-hidden"
            >
              {/* Device on a soft stage */}
              <div className="relative h-[260px] lg:h-[240px] xl:h-[270px] flex items-end justify-center pt-6 bg-gradient-to-b from-red-50/70 via-white to-white">
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-10 rounded-[50%] bg-black/10 blur-xl" />
                <img
                  src={image}
                  width={width}
                  height={height}
                  alt={t(`posDevices.${key}.name`)}
                  loading="lazy"
                  className={`relative max-h-full w-auto object-contain mb-6 transition-transform duration-500 group-hover:-translate-y-2 ${imgClass}`}
                />
              </div>

              <div className="flex flex-col flex-1 p-5 xl:p-6">
                <h3 className="text-lg xl:text-xl font-black text-gray-900 leading-snug">
                  <span className="text-red-600">{t(`posDevices.${key}.name`)}</span>
                  {" – "}
                  {t(`posDevices.${key}.tagline`)}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {t(`posDevices.${key}.description`)}
                </p>
                <LocalizedLink
                  to={to}
                  className="group/btn mt-5 self-start inline-flex items-center gap-2 bg-red-600 text-white border border-red-600 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors duration-300 hover:bg-white hover:text-red-600"
                >
                  {t(`posDevices.${key}.cta`)}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </LocalizedLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
