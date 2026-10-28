import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  CalendarDays,
  Megaphone,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "./Button";
import { LocalizedLink } from "./shared";
import { Reveal } from "./motion";

const ease = [0.22, 1, 0.36, 1];

// Previews live in public/ecosystem/. Screenshots fill the preview box
// (`cover`); pos-devices is a transparent cut-out, so it is fitted whole.
const modules = [
  { key: "onlineOrdering", Icon: ShoppingBag, image: "/ecosystem/online-ordering.webp", to: "/online-ordering" },
  { key: "reservations", Icon: CalendarDays, image: "/ecosystem/reservation.webp", to: "/reservation-system" },
  { key: "posSystem", Icon: CreditCard, image: "/ecosystem/pos-devices.webp", fit: "contain", to: "/pos-system-development" },
  { key: "marketing", Icon: Megaphone, image: "/ecosystem/marketing.webp", to: "/meta-ads" },
  { key: "analytics", Icon: BarChart3, image: "/ecosystem/analytics.webp", to: "/google-analytics" },
];

export default function RestaurantEcosystem() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const current = modules[active];

  // Fetch every preview up front so switching never shows an empty box
  useEffect(() => {
    modules.forEach(({ image }) => {
      new Image().src = image;
    });
  }, []);

  return (
    <section id="features" className="flex flex-col justify-center relative pt-24 pb-8 lg:pt-16 lg:pb-16 overflow-hidden bg-[#FAFAFA]">

      {/* Premium Background */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-red-100 rounded-full blur-[180px]" />
      <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-red-50 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">

        {/* Heading */}
        <Reveal className="text-center mb-10">
          <Button
            className="
              inline-block
              px-4 py-1.5
              rounded-full
              bg-red-100
              border border-red-200
              text-red-600
              text-xs sm:text-sm
              font-medium
            "
          >
            {t("ecosystem.badge")}
          </Button>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-4 text-[#111827]">
            {t("ecosystem.headingLine1")}
            <span className="block text-red-600">
              {t("ecosystem.headingLine2")}
            </span>
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            {t("ecosystem.description")}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] gap-6 lg:gap-8 items-stretch">

          {/* Module list — click selects; the active one links to its page */}
          <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-3">
            {modules.map(({ key, Icon, to, image }, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className={`relative rounded-2xl border transition-colors duration-300 ${
                    isActive
                      ? "bg-red-600 border-red-600 text-white shadow-[0_20px_45px_rgba(220,38,38,0.3)]"
                      : "bg-white border-gray-100 text-gray-900 hover:border-red-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="ecosystem-panel"
                    onClick={() => setActive(i)}
                    className="w-full flex items-center gap-4 p-4 lg:p-5 text-left"
                  >
                    <span
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isActive ? "bg-white text-red-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="flex-1 font-bold text-base lg:text-lg">
                      {t(`ecosystem.features.${key}`)}
                    </span>
                    <ArrowRight
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        {/* Phones/tablets: the preview sits right inside the active block */}
                        <div className="lg:hidden mx-4 mb-3 rounded-xl overflow-hidden bg-white">
                          <img src={image} alt="" className="block w-full h-auto" />
                        </div>
                        <LocalizedLink
                          to={to}
                          className="ml-4 lg:ml-[84px] mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white underline-offset-4 hover:underline"
                        >
                          {t("hero.learnMore")}
                          <ArrowRight size={14} />
                        </LocalizedLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Preview box */}
          <motion.div
            id="ecosystem-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative hidden lg:flex flex-col rounded-[32px] bg-white border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-[260px] sm:h-[360px] lg:h-auto lg:flex-1 lg:min-h-[380px] bg-gradient-to-br from-red-50 via-white to-orange-50">
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.key}
                  src={current.image}
                  alt={t(`ecosystem.features.${current.key}`)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease }}
                  className={`absolute inset-0 w-full h-full ${
                    current.fit === "contain" ? "object-contain p-8" : "object-cover object-left-top"
                  }`}
                />
              </AnimatePresence>
            </div>

            {/* Caption + link */}
            <div className="relative border-t border-gray-100 px-7 py-5 flex items-center gap-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 min-w-0"
                >
                  <h3 className="text-xl lg:text-2xl font-black text-gray-900">
                    {t(`ecosystem.features.${current.key}`)}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <LocalizedLink
                to={current.to}
                className="group inline-flex items-center justify-center gap-2 shrink-0 bg-red-600 text-white border border-red-600 px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 hover:bg-white hover:text-red-600"
              >
                {t("hero.learnMore")}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
