import { slides } from "../../data/slides";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { goToSection } from "../utils/scrollToSection";

export default function HeroSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeSlide = slides[0];
  const slideText = t(`hero.slides.${activeSlide.id}`, { returnObjects: true });

  return (
    <section className="snap-start snap-always min-h-screen flex flex-col justify-center relative overflow-hidden bg-white">

      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 pt-24 pb-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              {slideText.subtitle}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-4 lg:mt-6 leading-[0.95]">
              {slideText.title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4 max-w-xl leading-relaxed">
              {slideText.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button
                onClick={() => goToSection(navigate, pathname, "contact")}
                className="
                  bg-red-600 text-white border border-red-600
                  px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg text-sm sm:text-base
                  transition-all duration-300
                  hover:bg-white hover:text-red-600
                "
              >
                {t("hero.bookDemo")}
              </Button>
              <Button
                onClick={() => console.log("Learn More")}
                className="
                  bg-white text-black border border-red-600
                  px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base
                  transition-all duration-300
                  hover:bg-red-600 hover:text-white
                "
              >
                {t("hero.learnMore")}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 mt-6 text-xs sm:text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-red-600">✓</span>
                {t("hero.badges.liveIn30")}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600">✓</span>
                {t("hero.badges.zeroCommission")}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600">✓</span>
                {t("hero.badges.smartOs")}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center items-center">
            {/* Main Glow */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-100 via-red-50 to-transparent blur-3xl" />

            {/* Image */}
            <motion.img
              src={activeSlide.image}
              alt={slideText.title}
              initial={{
                x: 250,
                opacity: 0,
                scale: 0.9,
                rotate: 5,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -15, 0],
              }}
              transition={{
                x: {
                  duration: 0.8,
                  ease: "easeOut",
                },
                opacity: {
                  duration: 0.6,
                },
                scale: {
                  duration: 0.8,
                },
                rotate: {
                  duration: 0.8,
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative z-20 w-full max-h-[35vh] lg:max-h-[50vh] object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.18)]"
            />
          </div>

        </div>
      </motion.div>
    </section>
  );
}