import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const productItems = t("footer.product.items", { returnObjects: true });
  const companyItems = t("footer.company.items", { returnObjects: true });
  return (
    <footer className="relative bg-[#fafafa] pt-32 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-100 blur-[120px] rounded-full opacity-70" />

      {/* Watermark */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[180px] font-black text-red-50 select-none pointer-events-none whitespace-nowrap uppercase">
        {t("footer.watermark")}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* CTA SECTION */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-red-600 to-red-500 p-12 md:p-16 shadow-[0_30px_80px_rgba(239,68,68,0.25)]">

          {/* Decorative Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            <div>
              <span className="uppercase tracking-[0.3em] text-red-100 text-xs">
                {t("footer.cta.eyebrow")}
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">
                {t("footer.cta.headingLine1")}
                <span className="block">
                  {t("footer.cta.headingLine2")}
                </span>
              </h2>

              <p className="text-red-100 mt-4 max-w-xl">
                {t("footer.cta.description")}
              </p>
            </div>

           <Button
  className="
    bg-white
    text-red-600
    px-8
    py-4
    rounded-full
    font-semibold
    flex
    items-center
    gap-3
    shadow-lg
  "
>
  {t("footer.cta.button")}
  <ArrowRight size={18} />
</Button>

          </div>
        </div>

        {/* FOOTER CONTENT */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">

          {/* BRAND */}
          <div>

            <h3 className="text-4xl font-black text-gray-900">
              Meals
              <span className="text-red-600">
                Hub
              </span>
            </h3>

            <p className="mt-5 text-gray-600 leading-relaxed">
              {t("footer.brand.description")}
            </p>

            {/* Small Stats */}
            <div className="flex gap-6 mt-8">

              <div>
                <h4 className="text-2xl font-black text-red-600">
                  500+
                </h4>
                <p className="text-xs text-gray-500">
                  {t("footer.brand.restaurants")}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-black text-red-600">
                  99.9%
                </h4>
                <p className="text-xs text-gray-500">
                  {t("footer.brand.uptime")}
                </p>
              </div>

            </div>

          </div>

          {/* PRODUCT */}
          <div>

            <h4 className="font-bold text-gray-900 mb-5">
              {t("footer.product.title")}
            </h4>

            <ul className="space-y-3">

              {Object.values(productItems).map((item) => (
                <li
                  key={item}
                  className="text-gray-600 hover:text-red-600 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* COMPANY */}
          <div>

            <h4 className="font-bold text-gray-900 mb-5">
              {t("footer.company.title")}
            </h4>

            <ul className="space-y-3">

              {Object.values(companyItems).map((item) => (
                <li
                  key={item}
                  className="text-gray-600 hover:text-red-600 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h4 className="font-bold text-gray-900 mb-5">
              {t("footer.contact.title")}
            </h4>

            <ul className="space-y-3 text-gray-600">
              <li>{t("footer.contact.email")}</li>
              <li>{t("footer.contact.phone")}</li>
              <li>{t("footer.contact.support")}</li>
              <li>{t("footer.contact.location")}</li>
            </ul>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">
            {t("footer.copyright")}
          </p>

          <div className="flex items-center gap-4">

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaLinkedinIn size={16} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaTwitter size={16} />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}