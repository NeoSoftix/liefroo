import { GripVertical, PencilLine, Search, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const benefits = [
  { key: "dragDrop", Icon: GripVertical },
  { key: "bulkEdits", Icon: PencilLine },
  { key: "search", Icon: Search },
  { key: "insights", Icon: LineChart },
];

export default function DashboardSection() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-12 lg:py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-red-50/60 border border-red-100 p-6 sm:p-8 lg:p-12">
          <div className="max-w-2xl">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              {t("menuManagement.dashboard.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 lg:mt-4 leading-tight">
              {t("menuManagement.dashboard.headingLine1")}
              <span className="block">{t("menuManagement.dashboard.headingLine2")}</span>
            </h2>

            <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl leading-relaxed">
              {t("menuManagement.dashboard.description")}
            </p>

            <Button
              className="
                mt-4 inline-flex items-center gap-2
                bg-red-600 text-white border border-red-600
                px-6 py-3 rounded-full font-semibold shadow-lg text-sm
                transition-all duration-300
                hover:bg-white hover:text-red-600
              "
            >
              {t("menuManagement.dashboard.cta")}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {benefits.map(({ key, Icon }) => (
              <div
                key={key}
                className="bg-white border border-gray-100 rounded-2xl lg:rounded-3xl p-4 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-full flex flex-col justify-center items-center"
              >
                <Icon className="text-red-600 mx-auto animate-pulse" size={20} />
                <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-2">
                  {t(`menuManagement.dashboard.benefits.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
