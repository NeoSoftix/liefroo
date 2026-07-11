import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const rowKeys = ["setupTime", "ordering", "posSync", "support", "cost"];

export default function PricingComparison() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="snap-start snap-always relative z-10 py-12 lg:py-20 bg-white w-full">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-8">
          <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
            {t("websiteDevelopment.pricing.eyebrow")}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2 leading-tight">
            {t("websiteDevelopment.pricing.heading")}
            <span className="text-red-600 block">
              {t("websiteDevelopment.pricing.headingRed")}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 min-w-[600px] text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="text-left p-3 lg:p-4 text-gray-500 font-medium"></th>
                <th className="p-3 lg:p-4 bg-red-600 text-white rounded-t-xl lg:rounded-t-2xl font-black text-sm sm:text-base">
                  {t("websiteDevelopment.pricing.columns.us")}
                </th>
                <th className="p-3 lg:p-4 text-gray-900 font-bold text-sm sm:text-base">
                  {t("websiteDevelopment.pricing.columns.diy")}
                </th>
                <th className="p-3 lg:p-4 text-gray-900 font-bold text-sm sm:text-base">
                  {t("websiteDevelopment.pricing.columns.agency")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rowKeys.map((key, i) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="p-3 lg:p-4 text-gray-500 font-medium">
                    {t(`websiteDevelopment.pricing.rows.${key}.label`)}
                  </td>
                  <td className="p-3 lg:p-4 bg-red-50 text-center font-bold text-red-600">
                    <span className="inline-flex items-center gap-1.5 justify-center">
                      <Check size={14} />
                      {t(`websiteDevelopment.pricing.rows.${key}.us`)}
                    </span>
                    {i === rowKeys.length - 1 && (
                      <span className="block h-2 rounded-b-xl lg:rounded-b-2xl bg-red-50 -mb-4 mt-4" />
                    )}
                  </td>
                  <td className="p-3 lg:p-4 text-center text-gray-600">
                    {t(`websiteDevelopment.pricing.rows.${key}.diy`)}
                  </td>
                  <td className="p-3 lg:p-4 text-center text-gray-600">
                    {t(`websiteDevelopment.pricing.rows.${key}.agency`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
