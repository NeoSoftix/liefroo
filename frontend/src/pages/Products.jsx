import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { Seo } from "../components/shared";
import HeroSlider from "../components/HeroSlider";
import RestaurantEcosystem from "../components/RestaurantEcosystem";
import OrderingExperience from "../components/OrderingExperience";
import PoSSection from "../components/POSSection";
import ReservationSection from "../components/ReservationSection";
import Footer from "../components/Footer";
import QRSection from "../components/QRSection";
import FAQ from "../components/FAQ";
// import WebsiteMarketingSection from "../components/WebsiteMarketingSection";
import ContactSection from "../components/ContactSection";
import { scrollToElementId } from "../utils/scrollToSection";

export default function Products() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    const timer = setTimeout(() => scrollToElementId(targetId), 100);
    // clear the state so refreshing/back-nav doesn't re-trigger the scroll
    navigate(location.pathname, { replace: true, state: {} });
    return () => clearTimeout(timer);
  }, [location.state, location.pathname, navigate]);

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        path="/"
      />
      <Header />
      <HeroSlider />
      <RestaurantEcosystem />
      <OrderingExperience />
      {/* <WebsiteMarketingSection /> */}

      <PoSSection />
      <ReservationSection />
      <QRSection />

      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}

