import scanBg from "../assets/scan.png";
import {
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function QRSection() {
  const { t } = useTranslation();
  return (
    <section className="snap-start snap-always min-h-screen flex flex-col justify-center relative py-6 lg:py-16 overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-6 w-full h-full flex flex-col justify-center">
        <div className="relative min-h-[600px] lg:min-h-0 lg:h-[80vh] rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl">

          {/* Background Image */}
          <img
            src={scanBg}
            alt="QR Ordering"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* White Overlay Right Side */}
          <div className="absolute right-0 top-0 h-full w-full lg:w-[48%] flex items-center">
            <div className="px-6 py-8 sm:p-10 lg:px-36 w-full">

              {/* Tag */}
              <div className="inline-flex items-center border border-red-500 rounded-full px-4 py-1.5 sm:px-6 sm:py-2.5 text-red-600 font-semibold tracking-wide text-xs sm:text-sm mb-4 lg:mb-6">
                {t("qr.badge")}
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[45px] leading-[0.95] font-black uppercase text-black">
                {t("qr.headingLine1")}
                <br />
                {t("qr.headingLine2")}
                <br />
                {t("qr.headingLine3")}
                <br />
                <span className="text-red-600">{t("qr.headingLine4")}</span>
              </h2>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed max-w-xl">
                {t("qr.description")}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">

                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border border-red-200 flex items-center justify-center bg-red-50/50">
                    <FiClock className="text-red-600 text-base sm:text-lg" />
                  </div>
                  <h4 className="mt-2 font-bold text-xs sm:text-sm text-gray-900">{t("qr.features.faster.title")}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs leading-tight mt-0.5">{t("qr.features.faster.subtitle")}</p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border border-red-200 flex items-center justify-center bg-red-50/50">
                    <FiTrendingUp className="text-red-600 text-base sm:text-lg" />
                  </div>
                  <h4 className="mt-2 font-bold text-xs sm:text-sm text-gray-900">{t("qr.features.higher.title")}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs leading-tight mt-0.5">{t("qr.features.higher.subtitle")}</p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border border-red-200 flex items-center justify-center bg-red-50/50">
                    <FiUsers className="text-red-600 text-base sm:text-lg" />
                  </div>
                  <h4 className="mt-2 font-bold text-xs sm:text-sm text-gray-900">{t("qr.features.lessStaff.title")}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs leading-tight mt-0.5">{t("qr.features.lessStaff.subtitle")}</p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border border-red-200 flex items-center justify-center bg-red-50/50">
                    <FiShield className="text-red-600 text-base sm:text-lg" />
                  </div>
                  <h4 className="mt-2 font-bold text-xs sm:text-sm text-gray-900">{t("qr.features.secure.title")}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs leading-tight mt-0.5">{t("qr.features.secure.subtitle")}</p>
                </div>

              </div>

              {/* CTA */}
              <button className="group mt-6 lg:mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300">
                {t("qr.cta")}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none">
            <div className="absolute inset-0 border border-red-200 rounded-full scale-100"></div>
            <div className="absolute inset-0 border border-red-200 rounded-full scale-125"></div>
            <div className="absolute inset-0 border border-red-200 rounded-full scale-150"></div>
          </div>

        </div>
      </div>
    </section>
  );
}