import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import img1 from "../../assets/websiteDevelopmentSectionImage1.png";
import img2 from "../../assets/websiteDevelopmentSectionImage2.png";

const templates = [
  { key: "fineDining", img: img1 },
  { key: "cafeBrunch", img: img2 },
  { key: "fastCasual", img: img1 },
  { key: "barLounge", img: img2 },
];

export default function TemplatesShowcase() {
  const { t } = useTranslation();

  return (
    <section className="snap-start snap-always relative z-10 py-12 lg:py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-8">
          <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
            {t("websiteDevelopment.templates.eyebrow")}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 leading-tight">
            {t("websiteDevelopment.templates.heading")}
            <span className="text-red-600 block">
              {t("websiteDevelopment.templates.headingRed")}
            </span>
          </h2>

          <p className="text-gray-600 mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
            {t("websiteDevelopment.templates.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {templates.map(({ key, img }) => (
            <motion.div
              key={key}
              whileHover={{ y: -8 }}
              className="rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white h-full flex flex-col"
            >
              <div className="h-28 sm:h-36 lg:h-48 overflow-hidden bg-gray-50 relative w-full">
                <img
                  src={img}
                  alt={t(`websiteDevelopment.templates.items.${key}`)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3 lg:p-4 bg-white mt-auto border-t border-gray-50">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                  {t(`websiteDevelopment.templates.items.${key}`)}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 lg:mt-8">
          <Button
            className="
              bg-white text-red-600 border border-red-600
              px-6 py-3 rounded-full font-semibold
              flex items-center gap-2 text-xs sm:text-sm
              transition-all duration-300
              hover:bg-red-600 hover:text-white
            "
          >
            {t("websiteDevelopment.templates.cta")}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
