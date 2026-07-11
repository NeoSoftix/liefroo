import {
  FiSmartphone,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function WebsiteMarketingSection() {
  const { t } = useTranslation();

  const websiteFeatures = [
    {
      icon: <FiSmartphone />,
      title: t("marketing.website.features.mobileFirst"),
    },
    {
      icon: <LuUtensilsCrossed />,
      title: t("marketing.website.features.orderingBuiltIn"),
    },
    {
      icon: <FiCalendar />,
      title: t("marketing.website.features.reservationsReady"),
    },
    {
      icon: <FiTrendingUp />,
      title: t("marketing.website.features.seoOptimised"),
    },
  ];

  const marketingFeatures = [
    t("marketing.automation.features.emailCampaigns"),
    t("marketing.automation.features.smsReminders"),
    t("marketing.automation.features.loyaltyPrograms"),
    t("marketing.automation.features.winBackAutomation"),
    t("marketing.automation.features.giftCards"),
  ];

  return (
    <>
      {/* SECTION 1: WEBSITE BUILDER */}
      <section className="snap-start snap-always min-h-screen flex flex-col justify-center relative bg-white py-10 lg:py-12 overflow-hidden w-full">
        {/* Background glow */}
        <div className="absolute top-0 left-[-200px] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="relative pl-6 lg:pl-10">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-red-600 rounded-full"></div>

              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 rounded-xl border border-red-200 flex items-center justify-center text-red-600 text-lg bg-red-50">
                  💻
                </div>
                <span className="uppercase tracking-[3px] text-red-600 font-semibold text-xs sm:text-sm">
                  {t("marketing.website.badge")}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-black mb-4">
                {t("marketing.website.headingLine1")}{" "}
                {t("marketing.website.headingLine2")}
                <br />
                <span className="text-red-600 relative inline-block">
                  {t("marketing.website.headingLine3")}
                </span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed mb-4">
                {t("marketing.website.description")}
              </p>

              <button className="group flex items-center gap-2 text-red-600 font-semibold text-sm sm:text-base">
                {t("marketing.website.cta")}
                <FiArrowRight className="group-hover:translate-x-1.5 transition-all duration-300" />
              </button>
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
              <div className="h-1.5 bg-red-600"></div>
              <div className="grid grid-cols-2">
                {websiteFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-6 text-center border-r border-b last:border-r-0 border-gray-100"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xl sm:text-2xl mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: MARKETING AUTOMATION */}
      <section className="snap-start snap-always min-h-screen flex flex-col justify-center relative bg-[#FCFCFC] py-10 lg:py-12 overflow-hidden w-full">
        {/* Background glow */}
        <div className="absolute bottom-0 right-[-200px] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-5xl mx-auto bg-white border border-red-100 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            
            {/* Top Label */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-br-2xl text-xs sm:text-sm">
              ✉️
              <span className="uppercase tracking-[3px] font-semibold">
                {t("marketing.automation.badge")}
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-10">
              
              {/* Left Column */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4">
                  {t("marketing.automation.headingLine1")}
                  <br />
                  <span className="text-red-600">
                    {t("marketing.automation.headingLine2")}
                  </span>
                </h2>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {t("marketing.automation.description")}
                </p>

                <button className="group flex items-center gap-2 text-red-600 font-semibold text-sm sm:text-base">
                  {t("marketing.automation.cta")}
                  <FiArrowRight className="group-hover:translate-x-1.5 transition-all duration-300" />
                </button>
              </div>

              {/* Right Column */}
              <div className="lg:border-l border-gray-100 lg:pl-10 flex flex-col justify-center">
                <div className="space-y-3 sm:space-y-4">
                  {marketingFeatures.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border border-red-500 flex items-center justify-center text-red-500 text-xs shrink-0 bg-red-50">
                          ✓
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-800">
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
      </section>
    </>
  );
}