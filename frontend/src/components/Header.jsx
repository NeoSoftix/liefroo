// components/Header.jsx

import { useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductsMegaMenu from "./ProductsMegaMenu";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimeout = useRef(null);

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
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/40 px-8 py-4 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">

        {/* max-w-7xl aur mx-auto lagaya taaki andar ka content center me rahe aur baki sab same hai */}
        <div className="relative flex items-center justify-between max-w-7xl mx-auto">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              R
            </div>

            <h2 className="font-black text-xl">
              Restro<span className="text-red-600">OS</span>
            </h2>
          </div>

          <nav className="hidden lg:flex items-center gap-10" onMouseLeave={closeProducts}>
            <a href="#">{t("header.nav.home")}</a>

            <button
              className="flex items-center gap-1.5"
              onMouseEnter={openProducts}
              onClick={() => setProductsOpen((open) => !open)}
            >
              {t("header.nav.products")}
              <ChevronDown
                size={16}
                className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <a href="#">{t("header.nav.features")}</a>
            <a href="#">{t("header.nav.pricing")}</a>
            <a href="#">{t("header.nav.contact")}</a>
          </nav>

          <ProductsMegaMenu
            isOpen={productsOpen}
            onMouseEnter={openProducts}
            onMouseLeave={closeProducts}
          />

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-full p-1 text-sm font-semibold">
              <button
                onClick={() => changeLanguage("de")}
                className={`px-3 py-1 rounded-full transition-all ${
                  i18n.resolvedLanguage === "de"
                    ? "bg-red-600 text-white"
                    : "text-gray-600"
                }`}
              >
                DE
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 rounded-full transition-all ${
                  i18n.resolvedLanguage === "en"
                    ? "bg-red-600 text-white"
                    : "text-gray-600"
                }`}
              >
                EN
              </button>
            </div>

            <button className="hidden lg:flex bg-red-600 text-white px-6 py-3 rounded-full">
              {t("header.bookDemo")}
            </button>

            <Menu size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
