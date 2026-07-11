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
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-red-50/60 border border-red-100 p-12 md:p-16">
          <div className="max-w-2xl">
            <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
              {t("menuManagement.dashboard.eyebrow")}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {t("menuManagement.dashboard.headingLine1")}
              <span className="block">{t("menuManagement.dashboard.headingLine2")}</span>
            </h2>

            <p className="text-gray-600 mt-5 text-lg max-w-xl">
              {t("menuManagement.dashboard.description")}
            </p>

            <Button
              className="
                mt-8 inline-flex items-center gap-3
                bg-red-600 text-white border border-red-600
                px-8 py-4 rounded-full font-semibold shadow-lg
                transition-all duration-300
                hover:bg-white hover:text-red-600
              "
            >
              {t("menuManagement.dashboard.cta")}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {benefits.map(({ key, Icon }) => (
              <div
                key={key}
                className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <Icon className="text-red-600 mx-auto" size={24} />
                <p className="text-sm font-semibold text-gray-900 mt-3">
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
