// components/Header.jsx

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProductsMegaMenu from "./ProductsMegaMenu";
import logo from "../assets/logo.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollTop =
        event.target?.scrollTop ||
        window.scrollY ||
        document.documentElement?.scrollTop ||
        0;
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const openProducts = () => {
    clearTimeout(closeTimeout.current);
    setProductsOpen(true);
  };

  const closeProducts = () => {
    closeTimeout.current = setTimeout(() => setProductsOpen(false), 150);
  };

  const mobileNavLinks = [
    { to: "/", label: t("header.nav.home") },
    { to: "/#features", label: t("header.nav.features") },
    { to: "/website-development#pricing", label: t("header.nav.pricing") },
    { to: "/#contact", label: t("header.nav.contact") },
  ];

  return (
    // Header ko full width kiya aur top par stick kiya
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Backdrop blur aur border bottom apply kiya */}
      <div className={`transition-all duration-300 px-4 md:px-8 py-3 sm:py-4 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-[0_15px_50px_rgba(0,0,0,0.08)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}>

        {/* max-w-7xl aur mx-auto lagaya taaki andar ka content center me rahe aur baki sab same hai */}
        <div className="relative flex items-center justify-between max-w-7xl mx-auto w-full">

          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Liefro Logo" 
              className={`transition-all duration-300 w-auto object-contain ${
                isScrolled ? "h-10" : "h-[60px]"
              }`} 
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10" onMouseLeave={closeProducts}>
            <Link to="/" className="hover:text-red-600 transition-colors font-medium text-gray-700">{t("header.nav.home")}</Link>

            <button
              className="flex items-center gap-1.5 hover:text-red-600 transition-colors font-medium text-gray-700"
              onMouseEnter={openProducts}
              onClick={() => setProductsOpen((open) => !open)}
            >
              {t("header.nav.products")}
              <ChevronDown
                size={16}
                className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <Link to="/#features" className="hover:text-red-600 transition-colors font-medium text-gray-700">{t("header.nav.features")}</Link>
            <Link to="/website-development#pricing" className="hover:text-red-600 transition-colors font-medium text-gray-700">{t("header.nav.pricing")}</Link>
            <Link to="/#contact" className="hover:text-red-600 transition-colors font-medium text-gray-700">{t("header.nav.contact")}</Link>
          </nav>

          <ProductsMegaMenu
            isOpen={productsOpen}
            onMouseEnter={openProducts}
            onMouseLeave={closeProducts}
          />

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 border border-gray-200 rounded-full p-1 text-xs sm:text-sm font-semibold bg-white/50">
              <button
                onClick={() => changeLanguage("de")}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all ${
                  i18n.resolvedLanguage === "de"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                DE
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all ${
                  i18n.resolvedLanguage === "en"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                EN
              </button>
            </div>

            <button className="hidden sm:flex bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-red-700 transition-all shadow-sm">
              {t("header.bookDemo")}
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white/70 text-gray-700 shrink-0"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 max-w-7xl mx-auto w-full rounded-2xl border border-gray-100 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.08)] max-h-[75vh] overflow-y-auto">
            <nav className="flex flex-col divide-y divide-gray-100">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((open) => !open)}
                  className="w-full flex items-center justify-between px-5 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {t("header.nav.products")}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileProductsOpen && (
                  <div className="px-5 pb-3 flex flex-col gap-1">
                    {[
                      { key: "menuManagement", href: "/menu-management" },
                      { key: "onlineOrdering", href: "/online-ordering" },
                      { key: "qrOrdering", href: "/qr-ordering" },
                      { key: "posSystem", href: "/pos-system-development" },
                      { key: "reservationSystem", href: "/reservation-system" },
                      { key: "printerIntegration", href: "/printer-integration" },
                      { key: "websiteDevelopment", href: "/website-development" },
                      { key: "mobileAppDevelopment", href: "/mobile-app-development" },
                      { key: "googleAds", href: "/google-ads" },
                      { key: "metaAds", href: "/meta-ads" },
                      { key: "googleBusinessSEO", href: "/google-business-seo" },
                      { key: "googleAnalytics", href: "/google-analytics" },
                    ].map(({ key, href }) => (
                      <Link
                        key={key}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        {t(`header.megaMenu.items.${key}.title`)}
                      </Link>
                    ))}
                    <Link
                      to="/technical-support"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {t("header.megaMenu.items.technicalSupport.title")}
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button className="w-full bg-red-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-red-700 transition-all shadow-sm">
                {t("header.bookDemo")}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
