import { motion } from "framer-motion";
import { LayoutGrid, XCircle, Users, Clock, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const stats = [
  { key: "occupancy", Icon: LayoutGrid },
  { key: "noShows", Icon: XCircle },
  { key: "satisfaction", Icon: Users },
  { key: "saveTime", Icon: Clock },
  { key: "revenue", Icon: TrendingUp },
];

export default function BetterReservationsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-red-50/60 border border-red-100 p-6 sm:p-8 lg:p-12">
          <div className="max-w-2xl">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {t("reservationSystem.betterReservations.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
              {t("reservationSystem.betterReservations.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {stats.map(({ key, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-full flex flex-col justify-center items-center"
              >
                <Icon className="text-red-600 mx-auto" size={20} className="lg:size-[24px]" />
                <h4 className="font-bold text-gray-900 mt-2 lg:mt-3 text-xs sm:text-sm">
                  {t(`reservationSystem.betterReservations.stats.${key}`)}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
