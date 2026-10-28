import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cloud, FileSpreadsheet, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from "./shared";
import { taxMenuItems } from "../routesConfig";

const iconByKey = { overview: ShieldCheck, onlineTse: Cloud, dataExport: FileSpreadsheet, guarantee: BadgeCheck };

export default function TaxMegaMenu({ isOpen, onMouseEnter, onMouseLeave, onNavigate }) {
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
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-6 grid sm:grid-cols-2 gap-3">
              {taxMenuItems.map(({ key, path }) => {
                const Icon = iconByKey[key];
                return (
                  <LocalizedLink
                    key={key}
                    to={path}
                    onClick={onNavigate}
                    className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-red-50"
                  >
                    <span className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="block font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {t(`taxPages.menu.${key}.title`)}
                      </span>
                      <span className="block mt-0.5 text-sm text-gray-500 whitespace-normal">
                        {t(`taxPages.menu.${key}.desc`)}
                      </span>
                    </span>
                  </LocalizedLink>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
