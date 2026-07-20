import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import heroImage from "../../assets/online ordering.png";

export default function OnlineOrderingHero() {
  const { t } = useTranslation();
  const checklist = ["brandedLink", "customMenu", "deliveryOptions", "orderPayment"].map((key) =>
    t(`onlineOrdering.hero.checklist.${key}`)
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-28 pb-12 lg:pt-36 lg:pb-20 z-10 w-full">
      <div
        className="absolute top-24 left-8 w-40 h-40 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fca5a5 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-200/30 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {t("onlineOrdering.hero.badge")}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 lg:mt-6 leading-[1.05] text-gray-900">
              {t("onlineOrdering.hero.headingLine1")}
              <span className="block text-red-600">{t("onlineOrdering.hero.headingLine2")}</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("onlineOrdering.hero.description")}
            </p>

            <ul className="mt-4 lg:mt-6 space-y-1.5 sm:space-y-2 max-w-md mx-auto lg:mx-0 text-left text-sm sm:text-base">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 lg:mt-8">
              <Button
                className="
                  inline-flex items-center gap-2 sm:gap-3
                  bg-red-600 text-white border border-red-600
                  px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg text-sm sm:text-base
                  transition-all duration-300
                  hover:bg-white hover:text-red-600
                "
              >
                {t("onlineOrdering.hero.cta")}
                <ArrowRight size={16} className="sm:size-[18px]" />
              </Button>

              <a
                href="#success-stories"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base"
              >
                {t("onlineOrdering.hero.secondaryCta")}
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: IMAGE */}
          <motion.div
            initial={{ x: 60, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center items-center order-first lg:order-last"
          >
            <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-r from-red-100 via-red-50 to-transparent blur-3xl" />

            <motion.img
              src={heroImage}
              alt={t("onlineOrdering.hero.headingLine1")}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[320px] sm:max-w-[460px] lg:max-w-[560px] lg:max-h-[85vh] object-cover drop-shadow-[0_50px_60px_rgba(0,0,0,0.18)]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
