import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Printer,
  Monitor,
  CalendarCheck,
  LayoutGrid,
  QrCode,
  Search,
  Share2,
  MapPin,
  BarChart3,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "./shared";
import { megaMenuItems } from "../routesConfig";

const iconByKey = {
  menuManagement: LayoutGrid,
  onlineOrdering: Search,
  qrOrdering: QrCode,
  posSystem: Monitor,
  reservationSystem: CalendarCheck,
  printerIntegration: Printer,
  websiteDevelopment: Globe,
  mobileAppDevelopment: Smartphone,
  googleAds: Search,
  metaAds: Share2,
  googleBusinessSEO: MapPin,
  googleAnalytics: BarChart3,
};

const groups = [
  { key: "orderingOperations", items: megaMenuItems("orderingOperations") },
  { key: "growthMarketing", items: megaMenuItems("growthMarketing") },
];

export default function ProductsMegaMenu({ isOpen, onMouseEnter, onMouseLeave }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-0 right-0 top-full pt-4 z-40"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8 grid md:grid-cols-3 gap-8">
              {groups.map((group) => (
                <div key={group.key}>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-4">
                    {t(`header.megaMenu.groups.${group.key}`)}
                  </h4>
                  <ul className="space-y-1">
                    {group.items.map(({ key, path }) => {
                      const Icon = iconByKey[key];
                      return (
                        <li key={key}>
                          <LocalizedLink
                            to={path}
                            className="group flex items-start gap-3 rounded-2xl p-2.5 -mx-2.5 hover:bg-red-50 transition-colors"
                          >
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-red-50 group-hover:bg-white flex items-center justify-center transition-colors">
                              <Icon className="text-red-600" size={18} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">
                                {t(`header.megaMenu.items.${key}.title`)}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                                {t(`header.megaMenu.items.${key}.desc`)}
                              </p>
                            </div>
                          </LocalizedLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="md:col-span-1 bg-red-50/60 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                    <Headphones size={18} />
                  </div>
                  <p className="font-bold text-gray-900 mt-4">
                    {t("header.megaMenu.items.technicalSupport.title")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t("header.megaMenu.items.technicalSupport.desc")}
                  </p>
                </div>

                <LocalizedLink
                  to="/technical-support"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mt-6 hover:gap-3 transition-all"
                >
                  {t("header.megaMenu.exploreAll")}
                  <ArrowRight size={16} />
                </LocalizedLink>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
