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
    <section className="relative z-10 py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-red-600 to-red-500 p-12 md:p-16 shadow-[0_30px_80px_rgba(239,68,68,0.25)]">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {t("websiteDevelopment.bundled.headingLine1")}
                <span className="block">
                  {t("websiteDevelopment.bundled.headingLine2")}
                </span>
              </h2>

              <p className="text-red-100 mt-4 max-w-xl">
                {t("websiteDevelopment.bundled.description")}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-white text-sm font-medium">
                    <CheckCircle2 size={16} />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="
                bg-white text-red-600 px-8 py-4 rounded-full
                font-semibold flex items-center gap-3 shadow-lg shrink-0
              "
            >
              {t("websiteDevelopment.bundled.cta")}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
