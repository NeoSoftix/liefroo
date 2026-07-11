import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, BarChart3, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function POSSection() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const steps = [
    {
      icon: CreditCard,
      title: t("pos.steps.billing.title"),
      desc: t("pos.steps.billing.desc"),
      revenue: "$2,480",
      orders: "128",
      time: "12m"
    },
    {
      icon: ShoppingBag,
      title: t("pos.steps.orderFlow.title"),
      desc: t("pos.steps.orderFlow.desc"),
      revenue: "$3,120",
      orders: "184",
      time: "9m"
    },
    {
      icon: BarChart3,
      title: t("pos.steps.analytics.title"),
      desc: t("pos.steps.analytics.desc"),
      revenue: "$4,560",
      orders: "240",
      time: "7m"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("pos-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height;
      const visible = windowHeight - rect.top;

      let percent = (visible / total) * 100;

      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;

      setProgress(percent);

      // ACTIVE STEP LOGIC 🔥
      if (percent < 33) setActive(0);
      else if (percent < 66) setActive(1);
      else setActive(2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = steps[active];

  return (
    <section
      id="pos-section"
      className="snap-start snap-always min-h-screen lg:h-screen flex flex-col justify-center relative py-8 lg:py-16 bg-white overflow-hidden"
    >

      {/* Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] bg-red-100/40 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] bg-orange-100/30 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative w-full">

        {/* CENTER LINE */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gray-200">
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 w-full bg-red-500 transition-all duration-300"
            style={{ height: `${progress}%` }}
          />

          {/* Active glow dot */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-lg transition-all duration-300"
            style={{ top: `${progress}%` }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-4 sm:space-y-6">

            <div>
              <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase">
                {t("pos.eyebrow")}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
                {t("pos.headingPrefix")}{" "}
                <span className="text-red-600 block">{current.title}</span>
              </h2>

              <p className="text-gray-600 mt-2 max-w-md text-sm sm:text-base">
                {current.desc}
              </p>
            </div>

            {/* STEP LIST */}
            <div className="space-y-3 sm:space-y-4">
              {steps.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;

                return (
                  <motion.div
                    key={i}
                    className={`flex gap-3 p-3 rounded-2xl transition-all ${
                      isActive
                        ? "bg-red-50 border border-red-200"
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                {t("pos.systemStatus.title")}
              </h4>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("pos.systemStatus.serverHealth")}</span>
                  <span className="text-green-500 font-semibold">{t("pos.systemStatus.stable")}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("pos.systemStatus.syncSpeed")}</span>
                  <span className="text-red-500 font-semibold">120ms</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("pos.systemStatus.uptime")}</span>
                  <span className="text-green-500 font-semibold">99.9%</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - DYNAMIC CARD */}
          <div className="hidden lg:flex relative justify-center">
            <div className="absolute w-[450px] h-[580px] bg-red-200/30 blur-[120px] rounded-full" />

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-[450px] h-[600px] rounded-[40px] bg-white border border-gray-200 shadow-[0_40px_100px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white flex justify-between items-center text-sm">
                <h3 className="font-bold">{t("pos.card.live")}</h3>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                  ● {t("pos.card.liveBadge")}
                </span>
              </div>

              <div className="p-6 space-y-4">
                {/* Revenue */}
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                  <p className="text-gray-500 text-xs">{t("pos.card.revenue")}</p>
                  <h2 className="text-2xl font-black text-red-600 mt-1">
                    {current.revenue}
                  </h2>
                  {/* Mini trend bar */}
                  <div className="mt-2 h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-red-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white border rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-gray-500">{t("pos.card.orders")}</p>
                    <p className="text-lg font-bold">{current.orders}</p>
                  </div>
                  <div className="bg-white border rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-gray-500">{t("pos.card.avgTime")}</p>
                    <p className="text-lg font-bold">{current.time}</p>
                  </div>
                </div>

                {/* Kitchen Status */}
                <div className="bg-white border rounded-2xl p-4 shadow-sm text-xs">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("pos.card.kitchenStatus")}
                  </h4>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between">
                      <span>🍳 {t("pos.card.preparing")}</span>
                      <span className="text-red-500 font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🍽 {t("pos.card.ready")}</span>
                      <span className="text-green-500 font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🚚 {t("pos.card.delivery")}</span>
                      <span className="text-blue-500 font-semibold">3</span>
                    </div>
                  </div>
                </div>

                {/* Live Orders Feed */}
                <div className="bg-white border rounded-2xl p-4 shadow-sm text-xs">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("pos.card.liveOrders")}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Order #1024</span>
                      <span className="text-yellow-500 font-semibold">{t("pos.card.orderPreparing")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order #1025</span>
                      <span className="text-green-500 font-semibold">{t("pos.card.orderDelivered")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}