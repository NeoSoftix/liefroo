import {
  LayoutGrid,
  Search,
  QrCode,
  Monitor,
  CalendarCheck,
  Printer,
  Megaphone,
  BarChart3,
  Headphones,
  Globe,
  Smartphone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ServiceCard, Seo } from "../components/shared";
import posImage from "../assets/posimage.png";

const serviceMeta = [
  { icon: LayoutGrid, href: "/menu-management" },
  { icon: Search, href: "/online-ordering" },
  { icon: QrCode, href: "/qr-ordering" },
  { icon: Monitor, href: "/pos-system-development" },
  { icon: CalendarCheck, href: "/reservation-system" },
  { icon: Printer, href: "/printer-integration" },
  { icon: Megaphone, href: "/google-ads" },
  { icon: BarChart3, href: "/google-analytics" },
  { icon: Headphones, href: "/technical-support" },
  { icon: Globe, href: "/website-development" },
  { icon: Smartphone, href: "/mobile-app-development" },
  { icon: MapPin, href: "/google-business-seo" },
];

export default function Services() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }).map((item, index) => ({
    ...item,
    ...serviceMeta[index],
  }));

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={`${t("services.headingLine1")} ${t("services.headingLine2")}`}
        description={t("services.description")}
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

        {/* SERVICES GRID */}
        <section className="w-full py-14 lg:py-20 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                {t("services.eyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-gray-900">
                {t("services.sectionTitle")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                {t("services.sectionDescription")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {items.map((item, index) => (
                <ServiceCard
                  key={item.title}
                  number={index + 1}
                  icon={item.icon}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  bullets={item.bullets}
                  href={item.href}
                  exploreLabel={t("services.exploreMore")}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
