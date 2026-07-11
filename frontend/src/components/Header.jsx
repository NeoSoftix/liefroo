// components/Header.jsx

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProductsMegaMenu from "./ProductsMegaMenu";
import logo from "../assets/logo.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              alt="RestroOS Logo" 
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
          </div>
        </div>
      </div>
    </header>
  );
}
