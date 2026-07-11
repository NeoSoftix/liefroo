import { motion } from "framer-motion";
import {
  Globe,
  Percent,
  Truck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import dashboardImage from "../assets/sqpanel.png";
import FeatureCard from "./FeatureCard";
import Button from "./Button";

export default function OrderingExperience() {
  const { t } = useTranslation();
  return (
    <section className="snap-start snap-always min-h-screen lg:h-screen flex flex-col justify-center relative py-10 lg:py-16 bg-[#FCFCFC] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">

        {/* Heading */}
        <div className="text-center mb-6">
          <Button
            className="
              inline-flex
              px-4 py-1.5
              rounded-full
              bg-red-100
              border border-red-200
              text-red-600
              text-xs sm:text-sm
              font-medium
            "
          >
            {t("ordering.badge")}
          </Button>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] mt-4">
            {t("ordering.headingLine1")}
            <span className="block text-red-600">
              {t("ordering.headingLine2")}
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 mt-2 text-sm sm:text-base">
            {t("ordering.description")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto lg:auto-rows-[140px]">

          {/* Card 1 */}
          <FeatureCard
            Icon={Globe}
            title={t("ordering.cards.brandedWebsite.title")}
            subtitle={t("ordering.cards.brandedWebsite.subtitle")}
            cardClassName="h-full flex flex-col justify-between p-5"
          />

          {/* Card 2 */}
          <FeatureCard
            Icon={Percent}
            title={t("ordering.cards.zeroCommission.title")}
            subtitle={t("ordering.cards.zeroCommission.subtitle")}
            cardClassName="h-full flex flex-col justify-between p-5"
          />

          {/* Main Dashboard */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              sm:col-span-2
              lg:col-span-2
              lg:row-span-2
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-white
              via-red-50
              to-white
              border
              border-red-100
              shadow-[0_20px_50px_rgba(0,0,0,0.06)]
              p-6
              flex
              items-center
              justify-center
            "
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={dashboardImage}
                alt=""
                className="
                  w-full
                  max-w-[500px]
                  max-h-[25vh]
                  lg:max-h-[35vh]
                  object-contain
                  rounded-2xl
                  shadow-[0_30px_60px_rgba(0,0,0,0.1)]
                "
              />
            </div>
          </motion.div>

          {/* Card 3 */}
          <FeatureCard
            Icon={Truck}
            title={t("ordering.cards.pickupDelivery.title")}
            subtitle={t("ordering.cards.pickupDelivery.subtitle")}
            cardClassName="h-full flex flex-col justify-between p-5"
          />

          {/* Card 4 */}
          <FeatureCard
            Icon={ShoppingBag}
            title={t("ordering.cards.directOrders.title")}
            subtitle={t("ordering.cards.directOrders.subtitle")}
            cardClassName="h-full flex flex-col justify-between p-5"
          />

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <Button
            className="
              bg-red-600
              hover:bg-white
              text-white
              hover:text-red-600
              border border-red-600
              px-6
              py-3
              rounded-full
              font-semibold
              flex
              items-center
              gap-2
              text-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              shadow-md
            "
          >
            {t("ordering.cta")}
            <ArrowRight size={16} />
          </Button>
        </div>

      </div>
    </section>
  );
}