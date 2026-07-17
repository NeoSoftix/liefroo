import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "./Button";

export default function ReservationSection() {
  const { t } = useTranslation();
  const benefits = [
    t("reservation.benefits.availability"),
    t("reservation.benefits.googleReserve"),
    t("reservation.benefits.confirmations"),
    t("reservation.benefits.noShows"),
  ];
  return (
    <section className="snap-start snap-always min-h-screen flex flex-col justify-center relative py-4 lg:py-8 bg-[#fafafa] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-[-200px] w-[600px] h-[600px] bg-red-100/50 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-[-200px] w-[600px] h-[600px] bg-orange-100/40 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6"
          >
            <span className="uppercase tracking-[0.35em] text-red-500 text-xs font-semibold">
              {t("reservation.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-3 leading-[1.05]">
              {t("reservation.headingLine1")}
              <span className="block text-red-600">
                {t("reservation.headingLine2")}
              </span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3 max-w-xl">
              {t("reservation.description")}
            </p>

            {/* Benefits */}
            <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3">

              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={16}
                    className="text-red-500 shrink-0"
                  />

                  <span className="text-gray-700 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-6">

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-red-600">
                  42%
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t("reservation.stats.fewerNoShows")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-red-600">
                  3x
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t("reservation.stats.fasterBooking")}
                </p>
              </div>

            </div>

            <Button
              className="
                mt-6
                bg-red-600
                text-white
                px-6
                py-3
                sm:px-8
                sm:py-4
                rounded-full
                font-semibold
                text-sm sm:text-base
              "
            >
              {t("reservation.cta")}
            </Button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex relative justify-center"
          >

            {/* Glow */}
            <div className="absolute w-120 h-[min(560px,72vh)] bg-red-200/40 blur-[140px] rounded-full" />

            {/* Main Card */}
            <div className="relative w-120 h-[min(600px,78vh)] rounded-[40px] bg-white border border-gray-200 shadow-[0_50px_120px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">

              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 text-white shrink-0">

                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {t("reservation.card.title")}
                  </h3>

                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {t("reservation.card.liveAvailability")}
                  </span>
                </div>

              </div>

              <div className="p-4 space-y-3 overflow-y-auto">

                {/* Floor Layout */}
           {/* Floor Plan */}

<div className="bg-[#fafafa] border border-gray-200 rounded-3xl p-4">

  <div className="flex items-center justify-between mb-3">

    <h4 className="font-bold text-gray-900 text-sm">
      {t("reservation.card.floorPlan")}
    </h4>

    <div className="flex items-center gap-4 text-xs">

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-600" />
        {t("reservation.card.selected")}
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white border border-red-300" />
        {t("reservation.card.available")}
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        {t("reservation.card.reserved")}
      </div>

    </div>

  </div>

<div className="grid grid-cols-3 gap-3">

  {/* Row 1 */}

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 1 })}
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 2 })}
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-gray-200
      flex items-center justify-center
      text-gray-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 3 })}
  </motion.div>

  {/* Row 2 */}

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[64px]
      rounded-2xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 4 })}
  </motion.div>

  {/* Selected Table */}

  <motion.div
    animate={{
      boxShadow: [
        "0 0 0 rgba(239,68,68,0.2)",
        "0 0 35px rgba(239,68,68,0.35)",
        "0 0 0 rgba(239,68,68,0.2)",
      ],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
    whileHover={{ scale: 1.05 }}
    className="
      h-[64px]
      rounded-2xl
      bg-red-600
      text-white
      flex flex-col
      items-center
      justify-center
      font-bold
      cursor-pointer
    "
  >
    <span className="text-xs opacity-80">
      {t("reservation.card.selected")}
    </span>

    <span className="text-xl">
      {t("reservation.card.table", { number: 5 })}
    </span>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[64px]
      rounded-2xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 6 })}
  </motion.div>

  {/* Row 3 */}

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 7 })}
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-gray-200
      flex items-center justify-center
      text-gray-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 8 })}
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      h-[56px]
      rounded-3xl
      bg-white
      border border-red-200
      flex items-center justify-center
      text-red-600 font-bold
      shadow-sm
      cursor-pointer
    "
  >
    {t("reservation.card.table", { number: 9 })}
  </motion.div>

</div>

</div>

<div className="bg-gradient-to-r from-red-50 to-white border border-red-100 rounded-2xl p-3">

  <div className="flex justify-between items-center">

    <div>
      <p className="text-gray-500 text-xs">
        {t("reservation.card.selectedReservation")}
      </p>

      <h3 className="text-lg font-black text-gray-900 mt-0.5">
        {t("reservation.card.table", { number: 5 })}
      </h3>
    </div>

    <div className="text-right">
      <p className="text-green-500 text-xs font-medium">
        {t("reservation.card.available")}
      </p>

      <p className="text-gray-500 text-xs">
        {t("reservation.card.instantConfirmation")}
      </p>
    </div>

  </div>

</div>
                {/* Booking Details */}
                <div className="grid grid-cols-3 gap-2">

                  <div className="border border-gray-200 rounded-xl p-2">
                    <Calendar
                      size={16}
                      className="text-red-500 mb-1"
                    />

                    <p className="text-xs text-gray-500">
                      {t("reservation.card.date")}
                    </p>

                    <h4 className="font-bold text-sm">
                      Jun 24
                    </h4>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-2">
                    <Users
                      size={16}
                      className="text-red-500 mb-1"
                    />

                    <p className="text-xs text-gray-500">
                      {t("reservation.card.guests")}
                    </p>

                    <h4 className="font-bold text-sm">
                      {t("reservation.card.guestsCount")}
                    </h4>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-2">
                    <Clock3
                      size={16}
                      className="text-red-500 mb-1"
                    />

                    <p className="text-xs text-gray-500">
                      {t("reservation.card.time")}
                    </p>

                    <h4 className="font-bold text-sm">
                      7:30 PM
                    </h4>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
