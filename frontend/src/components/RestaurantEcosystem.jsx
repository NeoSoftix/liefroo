import { motion } from "framer-motion";
import {
  ShoppingBag,
  CalendarDays,
  QrCode,
  Megaphone,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import centerImage from "../assets/panel.png";
import FeatureCard from "../components/FeatureCard";
import Button from "./Button";

export default function RestaurantEcosystem() {
  const { t } = useTranslation();
  return (
    <section id="features" className="flex flex-col justify-center relative pt-24 pb-8 lg:pt-16 lg:pb-16 overflow-hidden bg-[#FAFAFA]">

      {/* Premium Background */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-red-100 rounded-full blur-[180px]" />
      <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-red-50 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">

        {/* Heading */}
        <div className="text-center mb-6">
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
        </div>

        {/* Desktop Circular Ecosystem Layout */}
        <div className="hidden lg:flex relative justify-center items-center h-[700px]">
          {/* Center Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-red-100 blur-[120px]" />

          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[500px] h-[500px] rounded-full border-2 border-dashed border-red-200"
          />

          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[420px] h-[420px] rounded-full border border-red-100"
          />

          {/* Center Image */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="relative z-20 w-[380px] h-[380px] rounded-full overflow-hidden bg-white border-[10px] border-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
          >
            <img src={centerImage} alt="" className="w-full h-full object-cover" />
          </motion.div>

          {/* Cards */}
          <FeatureCard
            absolute
            title={t("ecosystem.features.onlineOrdering")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={ShoppingBag}
            className="top-0 left-1/2 -translate-x-1/2"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />

          <FeatureCard
            absolute
            title={t("ecosystem.features.reservations")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={CalendarDays}
            className="top-32 right-0"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />

          <FeatureCard
            absolute
            title={t("ecosystem.features.qrOrdering")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={QrCode}
            className="bottom-32 right-0"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />

          <FeatureCard
            absolute
            title={t("ecosystem.features.marketing")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={Megaphone}
            className="bottom-0 left-1/2 -translate-x-1/2"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />

          <FeatureCard
            absolute
            title={t("ecosystem.features.posSystem")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={CreditCard}
            className="bottom-32 left-0"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />

          <FeatureCard
            absolute
            title={t("ecosystem.features.analytics")}
            subtitle={t("ecosystem.connectedModule")}
            Icon={BarChart3}
            className="top-32 left-0"
            cardClassName="min-w-[240px] flex items-center gap-3 p-4"
          />
        </div>

        {/* Mobile Grid Layout */}
        <div className="lg:hidden flex flex-col items-center gap-6 mt-2 w-full">
          {/* Center Image (smaller) */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="relative z-20 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden bg-white border-4 border-white shadow-lg"
          >
            <img src={centerImage} alt="" className="w-full h-full object-cover" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-2">
            <FeatureCard
              title={t("ecosystem.features.onlineOrdering")}
              Icon={ShoppingBag}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
            <FeatureCard
              title={t("ecosystem.features.reservations")}
              Icon={CalendarDays}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
            <FeatureCard
              title={t("ecosystem.features.qrOrdering")}
              Icon={QrCode}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
            <FeatureCard
              title={t("ecosystem.features.marketing")}
              Icon={Megaphone}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
            <FeatureCard
              title={t("ecosystem.features.posSystem")}
              Icon={CreditCard}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
            <FeatureCard
              title={t("ecosystem.features.analytics")}
              Icon={BarChart3}
              cardClassName="flex items-center gap-2 p-3"
              className="w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
