import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ServicesGrid, Seo } from "../components/shared";
import posImage from "../assets/posimage.png";

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={t("services.seo.title")}
        description={t("services.seo.description")}
        path="/products"
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-28 pb-14 lg:pt-36 lg:pb-20 w-full">
          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 mb-3">
                  <Link to="/" className="hover:text-red-600 transition-colors">
                    {t("services.breadcrumbHome")}
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-red-600">{t("services.breadcrumbServices")}</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] text-gray-900">
                  {t("services.headingLine1")}
                  <span className="block text-red-600">{t("services.headingLine2")}</span>
                </h1>

                <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl leading-relaxed">
                  {t("services.description")}
                </p>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute w-[300px] h-[300px] bg-red-100/60 blur-[90px] rounded-full pointer-events-none" />
                <img
                  src={posImage}
                  alt={t("services.headingLine2")}
                  className="relative z-10 w-full max-w-[460px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <ServicesGrid
          eyebrow={t("services.eyebrow")}
          heading={t("services.sectionTitle")}
          description={t("services.sectionDescription")}
        />
      </main>

      <Footer />
    </div>
  );
}
