import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

export default function BundledCTA() {
  const { t } = useTranslation();

  const benefits = [
    t("websiteDevelopment.bundled.benefits.noSetup"),
    t("websiteDevelopment.bundled.benefits.cancel"),
    t("websiteDevelopment.bundled.benefits.launch"),
  ];

  return (
    <section className="relative z-10 py-12 lg:py-20 bg-[#fafafa] w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-gradient-to-r from-red-600 to-red-500 p-6 sm:p-8 lg:p-12 shadow-[0_30px_80px_rgba(239,68,68,0.25)]">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {t("websiteDevelopment.bundled.headingLine1")}
                <span className="block">
                  {t("websiteDevelopment.bundled.headingLine2")}
                </span>
              </h2>

              <p className="text-red-100 mt-2 max-w-xl text-xs sm:text-sm">
                {t("websiteDevelopment.bundled.description")}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium">
                    <CheckCircle2 size={14} className="shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="
                bg-white text-red-600 px-6 py-3 rounded-full
                font-semibold flex items-center gap-2 shadow-lg shrink-0
                text-xs sm:text-sm
              "
            >
              {t("websiteDevelopment.bundled.cta")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
