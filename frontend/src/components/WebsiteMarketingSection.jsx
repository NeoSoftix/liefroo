import {
  FiSmartphone,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";

export default function WebsiteMarketingSection() {
  const websiteFeatures = [
    {
      icon: <FiSmartphone />,
      title: "Mobile First",
    },
    {
      icon: <LuUtensilsCrossed />,
      title: "Ordering Built-in",
    },
    {
      icon: <FiCalendar />,
      title: "Reservations Ready",
    },
    {
      icon: <FiTrendingUp />,
      title: "SEO Optimised",
    },
  ];

  const marketingFeatures = [
    "Email Campaigns",
    "SMS Reminders",
    "Loyalty Programs",
    "Win-back Automation",
    "Gift Cards",
  ];

  return (
<section
  className="
  bg-white
  rounded-[40px]
  shadow-[0_25px_80px_rgba(0,0,0,0.08)]
  border border-gray-100
  overflow-hidden
  w-[80%]
  mx-auto
  p-15
  mb-20
  mt-15
  "
>     <div className="max-w-7xl mx-auto px-6 ">

        {/* WEBSITE BUILDER */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-10">

          {/* Left */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 w-[4px] h-full bg-red-600 rounded-full"></div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl border border-red-200 flex items-center justify-center text-red-600 text-2xl">
                💻
              </div>

              <span className="uppercase tracking-[4px] text-red-600 font-semibold text-sm">
                Website Builder
              </span>
            </div>

            <h2 className="text-5xl font-black leading-tight text-black mb-6">
              Websites that
              <br />
              bring more guests,
              <br />
              <span className="text-red-600 relative inline-block">
                every single day.
              </span>
            </h2>

            <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-8">
              Mobile-first, SEO-optimised websites with ordering &
              reservations built to convert.
            </p>

            <button className="group flex items-center gap-3 text-red-600 font-semibold text-lg">
              Explore Websites

              <FiArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
            </button>

            <div className="w-48 h-[2px] bg-red-500 mt-3"></div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">

            <div className="h-2 bg-red-600"></div>

            <div className="grid grid-cols-2 md:grid-cols-4">
              {websiteFeatures.map((item, index) => (
                <div
                  key={index}
                  className="p-10 text-center border-r last:border-r-0 border-gray-100"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 text-4xl mb-6">
                    {item.icon}
                  </div>

                  <h4 className="font-semibold text-xl text-gray-900">
                    {item.title}
                  </h4>

                  <div className="w-8 h-1 bg-red-500 mx-auto mt-5 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-20"></div>

        {/* MARKETING */}
        <div className="relative">

          <div className="absolute -right-40 top-10 w-[400px] h-[400px] rounded-full bg-red-500/5 blur-3xl"></div>

          <div className="max-w-5xl mx-auto bg-white border border-red-200 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {/* Label */}
            <div className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-br-3xl">
              ✉️

              <span className="uppercase tracking-[4px] text-sm font-semibold">
                Marketing Automation
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 p-12">

              {/* Left */}
              <div>
                <h2 className="text-5xl font-black leading-tight mb-6">
                  Build loyalty.
                  <br />
                  <span className="text-red-600">
                    Bring guests back.
                  </span>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Email, SMS, loyalty, win-back, and gift cards —
                  powered by your real POS data.
                </p>

                <button className="group flex items-center gap-3 text-red-600 font-semibold text-lg">
                  Explore Marketing

                  <FiArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
                </button>

                <div className="w-48 h-[2px] bg-red-500 mt-3"></div>
              </div>

              {/* Right */}
              <div className="lg:border-l border-gray-200 lg:pl-12">
                <div className="space-y-6">
                  {marketingFeatures.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-100 pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center text-red-500 text-sm">
                          ✓
                        </div>

                        <span className="text-xl font-medium text-gray-800">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}