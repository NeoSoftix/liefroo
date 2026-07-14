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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";

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

/**
 * Full "our services" grid — eyebrow, heading, description, and the
 * ServiceCard grid built from the shared services.items translations.
 * Used by both the Services page and the About page.
 */
export default function ServicesGrid({ eyebrow, heading, description, bgClassName = "bg-[#fafafa]" }) {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }).map((item, index) => ({
    ...item,
    ...serviceMeta[index],
  }));

  return (
    <section className={`snap-start snap-always relative z-10 w-full py-14 lg:py-20 ${bgClassName}`}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        {(eyebrow || heading) && (
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            {eyebrow && (
              <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3 text-gray-900">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

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
  );
}
