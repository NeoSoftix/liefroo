import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, BarChart3, ShoppingBag } from "lucide-react";

export default function POSSection() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const steps = [
    {
      icon: CreditCard,
      title: "Instant Billing Engine",
      desc: "Lightning fast checkout with zero delay processing",
      revenue: "$2,480",
      orders: "128",
      time: "12m"
    },
    {
      icon: ShoppingBag,
      title: "Smart Order Flow",
      desc: "Automatically syncs kitchen, staff & delivery",
      revenue: "$3,120",
      orders: "184",
      time: "9m"
    },
    {
      icon: BarChart3,
      title: "AI Analytics Dashboard",
      desc: "Predict revenue & optimize performance in real time",
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
      className="relative py-36 bg-white overflow-hidden"
    >

      {/* Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] bg-red-100/40 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] bg-orange-100/30 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gray-200">

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

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-10">

            <div>
              <span className="text-red-500 text-sm tracking-[0.3em] uppercase">
                Restaurant OS
              </span>

              <h2 className="text-5xl font-black text-gray-900 mt-4 leading-tight">
                Next Generation
                <span className="text-red-600 block">{current.title}</span>
              </h2>

              <p className="text-gray-600 mt-5 max-w-md">
                {current.desc}
              </p>
            </div>

            {/* STEP LIST */}
            <div className="space-y-6">
              {steps.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;

                return (
                  <motion.div
                    key={i}
                    className={`flex gap-4 p-4 rounded-2xl transition-all ${
                      isActive
                        ? "bg-red-50 border border-red-200"
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">

  <h4 className="font-bold text-gray-900 mb-3">
    System Status
  </h4>

  <div className="space-y-3 text-sm">

    <div className="flex justify-between items-center">
      <span className="text-gray-600">Server Health</span>
      <span className="text-green-500 font-semibold">Stable</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-600">Sync Speed</span>
      <span className="text-red-500 font-semibold">120ms</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-600">Uptime</span>
      <span className="text-green-500 font-semibold">99.9%</span>
    </div>

  </div>
</div>

          </div>

    {/* RIGHT SIDE - DYNAMIC CARD */}
<div className="relative flex justify-center">

  <div className="absolute w-[520px] h-[720px] bg-red-200/30 blur-[140px] rounded-full" />

  <motion.div
    key={active}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="relative w-[520px] h-[740px] rounded-[50px] bg-white border border-gray-200 shadow-[0_50px_120px_rgba(0,0,0,0.15)] overflow-hidden"
  >

    {/* Header */}
    <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-white flex justify-between items-center">
      <h3 className="font-bold">Live POS System</h3>
      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
        ● LIVE
      </span>
    </div>

    <div className="p-9 space-y-6">

      {/* Revenue */}
      <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
        <p className="text-gray-500 text-sm">Revenue</p>
        <h2 className="text-4xl font-black text-red-600 mt-2">
          {current.revenue}
        </h2>

        {/* Mini trend bar */}
        <div className="mt-4 h-2 w-full bg-red-100 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Orders</p>
          <p className="text-2xl font-bold">{current.orders}</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg Time</p>
          <p className="text-2xl font-bold">{current.time}</p>
        </div>

      </div>

      {/* Kitchen Status */}
      <div className="bg-white border rounded-3xl p-5 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-3">
          Kitchen Status
        </h4>

        <div className="space-y-2 text-sm text-gray-600">

          <div className="flex justify-between">
            <span>🍳 Preparing</span>
            <span className="text-red-500 font-semibold">12</span>
          </div>

          <div className="flex justify-between">
            <span>🍽 Ready</span>
            <span className="text-green-500 font-semibold">5</span>
          </div>

          <div className="flex justify-between">
            <span>🚚 Delivery</span>
            <span className="text-blue-500 font-semibold">3</span>
          </div>

        </div>
      </div>

      {/* Live Orders Feed */}
      <div className="bg-white border rounded-3xl p-5 shadow-sm">

        <h4 className="font-bold text-gray-900 mb-3">
          Live Orders
        </h4>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Order #1024</span>
            <span className="text-yellow-500">Preparing</span>
          </div>

          <div className="flex justify-between">
            <span>Order #1025</span>
            <span className="text-green-500">Delivered</span>
          </div>

          <div className="flex justify-between">
            <span>Order #1026</span>
            <span className="text-red-500">New</span>
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