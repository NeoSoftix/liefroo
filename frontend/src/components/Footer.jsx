import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const { t } = useTranslation();
  const productItems = t("footer.product.items", { returnObjects: true });
  const companyItems = t("footer.company.items", { returnObjects: true });
  return (
    <footer className="snap-start snap-always min-h-screen flex flex-col justify-center relative bg-[#fafafa] pt-10 lg:pt-16 pb-4 lg:pb-6 overflow-hidden w-full">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-red-100/50 blur-[100px] rounded-full opacity-70 pointer-events-none" />

      {/* Watermark */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[80px] sm:text-[120px] md:text-[150px] lg:text-[180px] font-black text-red-50 select-none pointer-events-none whitespace-nowrap uppercase">
        {t("footer.watermark")}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* CTA SECTION */}
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[40px] bg-gradient-to-r from-red-600 to-red-500 p-5 sm:p-8 lg:p-12 shadow-[0_30px_80px_rgba(239,68,68,0.25)]">

          {/* Decorative Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">

            <div>
              <span className="uppercase tracking-[0.3em] text-red-100 text-[10px] sm:text-xs">
                {t("footer.cta.eyebrow")}
              </span>

              <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-white mt-2 leading-tight">
                {t("footer.cta.headingLine1")}
                <span className="block">
                  {t("footer.cta.headingLine2")}
                </span>
              </h2>

              <p className="text-red-100 mt-2 max-w-xl text-xs sm:text-sm">
                {t("footer.cta.description")}
              </p>
            </div>

            <Button
              className="
                bg-white
                text-red-600
                px-6
                py-3
                rounded-full
                font-semibold
                flex
                items-center
                gap-2
                shadow-lg
                text-xs sm:text-sm
                shrink-0
              "
            >
              {t("footer.cta.button")}
              <ArrowRight size={16} />
            </Button>

          </div>
        </div>

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 py-8 lg:py-12">

          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1">

            <Link to="/" className="inline-block mb-3">
              <img src={logo} alt="MealsHub Logo" className="h-10 md:h-12 w-auto object-contain" />
            </Link>

            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              {t("footer.brand.description")}
            </p>

            {/* Small Stats */}
            <div className="flex gap-6 mt-4">

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-red-600">
                  500+
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {t("footer.brand.restaurants")}
                </p>
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-red-600">
                  99.9%
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {t("footer.brand.uptime")}
                </p>
              </div>

            </div>

          </div>

          {/* PRODUCT */}
          <div className="col-span-1">

            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-5">
              {t("footer.product.title")}
            </h4>

            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {Object.entries(productItems).map(([key, label]) => {
                let href = "/";
                if (key === "pos") href = "/pos-system-development";
                else if (key === "onlineOrdering") href = "/online-ordering";
                else if (key === "kitchenDisplay") href = "/menu-management";
                else if (key === "qrMenu") href = "/qr-ordering";
                else if (key === "analytics") href = "/google-analytics";

                return (
                  <li key={key}>
                    <Link
                      to={href}
                      className="text-gray-600 hover:text-red-600 transition font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

          </div>

          {/* COMPANY */}
          <div className="col-span-1">

            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-5">
              {t("footer.company.title")}
            </h4>

            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {Object.entries(companyItems).map(([key, label]) => {
                let href = "/";
                if (key === "contact") href = "/#contact";
                else if (key === "about") href = "/#features";
                else href = "#";

                return (
                  <li key={key}>
                    {href.startsWith("#") ? (
                      <a
                        href={href}
                        className="text-gray-600 hover:text-red-600 transition font-medium"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="text-gray-600 hover:text-red-600 transition font-medium"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

          </div>

          {/* CONTACT */}
          <div className="col-span-2 lg:col-span-1">

            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-5">
              {t("footer.contact.title")}
            </h4>

            <ul className="space-y-2 sm:space-y-3 text-gray-600 font-medium text-xs sm:text-sm">
              <li>{t("footer.contact.email")}</li>
              <li>{t("footer.contact.phone")}</li>
              <li>{t("footer.contact.support")}</li>
              <li>{t("footer.contact.location")}</li>
            </ul>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 py-4 lg:py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            {t("footer.copyright")}
          </p>

          <div className="flex items-center gap-3 sm:gap-4">

            <a
              href="#"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaInstagram size={14} className="sm:size-[16px]" />
            </a>

            <a
              href="#"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaFacebookF size={14} className="sm:size-[16px]" />
            </a>

            <a
              href="#"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaLinkedinIn size={14} className="sm:size-[16px]" />
            </a>

            <a
              href="#"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <FaTwitter size={14} className="sm:size-[16px]" />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}