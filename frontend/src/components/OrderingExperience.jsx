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
    <section className="relative py-32 bg-[#FCFCFC] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">

     <Button
  className="
    inline-flex
    px-5 py-2
    rounded-full
    bg-red-100
    border border-red-200
    text-red-600
    font-medium
  "
>
  {t("ordering.badge")}
</Button>

          <h2 className="text-5xl lg:text-6xl font-black text-[#111827] mt-6">
            {t("ordering.headingLine1")}
            <span className="block text-red-600">
              {t("ordering.headingLine2")}
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 mt-5 text-lg">
            {t("ordering.description")}
          </p>

        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-4 gap-6 auto-rows-[260px]">

          {/* Card 1 */}
          <FeatureCard
            Icon={Globe}
            title={t("ordering.cards.brandedWebsite.title")}
            subtitle={t("ordering.cards.brandedWebsite.subtitle")}
            cardClassName="h-full flex flex-col justify-between"
          />

          {/* Card 2 */}
          <FeatureCard
            Icon={Percent}
            title={t("ordering.cards.zeroCommission.title")}
            subtitle={t("ordering.cards.zeroCommission.subtitle")}
            cardClassName="h-full flex flex-col justify-between"
          />

          {/* Main Dashboard */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              lg:col-span-2
              lg:row-span-2
              relative
              overflow-hidden
              rounded-[40px]
              bg-gradient-to-br
              from-white
              via-red-50
              to-white
              border
              border-red-100
              shadow-[0_30px_80px_rgba(0,0,0,0.08)]
              p-8
            "
          >
            <div className="relative h-full flex items-center justify-center">

              <motion.img
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={dashboardImage}
                alt=""
                className="
                  w-full
                  max-w-[700px]
                  rounded-[28px]
                  shadow-[0_40px_80px_rgba(0,0,0,0.12)]
                "
              />

         

{/* Floating Stats */}

<FeatureCard
  absolute
  title="+248%"
  subtitle={t("ordering.stats.directOrders")}
  className="top-4 right-4"
  cardClassName=""
/>

<FeatureCard
  absolute
  title="$18.7K"
  subtitle={t("ordering.stats.revenue")}
  className="bottom-6 left-4"
  cardClassName=""
/>

<FeatureCard
  absolute
  title="+412"
  subtitle={t("ordering.stats.newCustomers")}
  className="bottom-6 right-4"
  cardClassName=""
/>

            </div>
          </motion.div>

          {/* Card 3 */}
          <FeatureCard
            Icon={Truck}
            title={t("ordering.cards.pickupDelivery.title")}
            subtitle={t("ordering.cards.pickupDelivery.subtitle")}
            cardClassName="h-full flex flex-col justify-between"
          />

          {/* Card 4 */}
          <FeatureCard
            Icon={ShoppingBag}
            title={t("ordering.cards.directOrders.title")}
            subtitle={t("ordering.cards.directOrders.subtitle")}
            cardClassName="h-full flex flex-col justify-between"
          />

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">

<Button
  className="
    bg-red-600
    hover:bg-white
    text-white
    hover:text-red-600
    border border-red-600
    px-8
    py-4
    rounded-full
    font-semibold
    flex
    items-center
    gap-3
    transition-all
    duration-300
    hover:-translate-y-1
    shadow-lg
  "
>
  {t("ordering.cta")}
  <ArrowRight size={18} />
</Button>
        </div>

      </div>
    </section>
  );
}