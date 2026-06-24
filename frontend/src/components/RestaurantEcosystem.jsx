import { motion } from "framer-motion";
import {
  ShoppingBag,
  CalendarDays,
  QrCode,
  Megaphone,
  CreditCard,
  BarChart3,
} from "lucide-react";

import centerImage from "../assets/panel.png";
import FeatureCard from "../components/FeatureCard";
import Button from "./Button";

const features = [
  {
    title: "Online Ordering",
    icon: ShoppingBag,
    position: "top",
  },
  {
    title: "Reservations",
    icon: CalendarDays,
    position: "top-right",
  },
  {
    title: "QR Ordering",
    icon: QrCode,
    position: "bottom-right",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    position: "bottom",
  },
  {
    title: "POS System",
    icon: CreditCard,
    position: "bottom-left",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    position: "top-left",
  },
];

export default function RestaurantEcosystem() {
return (
  <section className="relative py-24 overflow-hidden bg-[#FAFAFA]">

    {/* Premium Background */}

    <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-red-100 rounded-full blur-[180px]" />

    <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[180px]" />

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-red-50 rounded-full blur-[160px]" />

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Heading */}

      <div className="text-center mb-10">
<Button
  className="
    inline-block
    px-5 py-2
    rounded-full
    bg-red-100
    border border-red-200
    text-red-600
    font-medium
  "
>
  Connected Restaurant Ecosystem
</Button>

        <h2 className="text-5xl lg:text-6xl font-black mt-6 text-[#111827]">
          Everything Your Restaurant

          <span className="block text-red-600">
            Needs In One Place
          </span>

        </h2>

        <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
          Manage orders, reservations, POS, QR menus,
          marketing and analytics from one platform.
        </p>

      </div>

      {/* Ecosystem */}

      <div className="relative flex justify-center items-center h-[850px]">

        {/* Center Glow */}

        <div className="absolute w-[650px] h-[650px] rounded-full bg-red-100 blur-[140px]" />

        {/* Outer Ring */}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            w-[650px]
            h-[650px]
            rounded-full
            border-2
            border-dashed
            border-red-200
          "
        />

        {/* Inner Ring */}

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            w-[560px]
            h-[560px]
            rounded-full
            border
            border-red-100
          "
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
          className="
            relative
            z-20
            w-[520px]
            h-[520px]
            rounded-full
            overflow-hidden
            bg-white
            border-[14px]
            border-white
            shadow-[0_40px_100px_rgba(0,0,0,0.12)]
          "
        >
          <img
            src={centerImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
{/* Cards */}

<FeatureCard
  absolute
  title="Online Ordering"
  subtitle="Connected Module"
  Icon={ShoppingBag}
  className="top-0 left-1/2 -translate-x-1/2"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>

<FeatureCard
  absolute
  title="Reservations"
  subtitle="Connected Module"
  Icon={CalendarDays}
  className="top-40 right-0"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>

<FeatureCard
  absolute
  title="QR Ordering"
  subtitle="Connected Module"
  Icon={QrCode}
  className="bottom-40 right-0"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>

<FeatureCard
  absolute
  title="Marketing"
  subtitle="Connected Module"
  Icon={Megaphone}
  className="bottom-0 left-1/2 -translate-x-1/2"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>

<FeatureCard
  absolute
  title="POS System"
  subtitle="Connected Module"
  Icon={CreditCard}
  className="bottom-40 left-0"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>

<FeatureCard
  absolute
  title="Analytics"
  subtitle="Connected Module"
  Icon={BarChart3}
  className="top-40 left-0"
  cardClassName="min-w-[250px] flex items-center gap-4"
/>
      </div>

    </div>

  </section>
);
}

