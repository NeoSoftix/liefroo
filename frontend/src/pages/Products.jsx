import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { Seo } from "../components/shared";
import HeroSlider from "../components/HeroSlider";
import RestaurantEcosystem from "../components/RestaurantEcosystem";
import POSDevicesSection from "../components/POSDevicesSection";
import ComplianceSection from "../components/ComplianceSection";
import POSFeaturesSection from "../components/POSFeaturesSection";
// import OrderingExperience from "../components/OrderingExperience";
// import PoSSection from "../components/POSSection";
// import ReservationSection from "../components/ReservationSection";
import Footer from "../components/Footer";
import QRSection from "../components/QRSection";
import FAQ from "../components/FAQ";
// import WebsiteMarketingSection from "../components/WebsiteMarketingSection";
import ContactSection from "../components/ContactSection";
import { scrollToElementId } from "../utils/scrollToSection";
import {
  ShoppingBag,
  CalendarDays,
  QrCode,
  Megaphone,
  CreditCard,
  BarChart3,
  Zap,
  Percent,
} from "lucide-react";
import { Marquee, ScrollProgress, SectionTransition } from "../components/motion";

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

  const marqueeItems = [
    { label: t("ecosystem.features.onlineOrdering"), Icon: ShoppingBag },
    { label: t("hero.badges.zeroCommission"), Icon: Percent },
    { label: t("ecosystem.features.reservations"), Icon: CalendarDays },
    { label: t("ecosystem.features.qrOrdering"), Icon: QrCode },
    { label: t("hero.badges.liveIn30"), Icon: Zap },
    { label: t("ecosystem.features.posSystem"), Icon: CreditCard },
    { label: t("ecosystem.features.marketing"), Icon: Megaphone },
    { label: t("ecosystem.features.analytics"), Icon: BarChart3 },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        path="/"
      />
      <ScrollProgress />
      <Header dark />
      <HeroSlider />

      {/* Tilted feature ticker that breaks up the hero and the first section */}
      <div className="relative z-10 -rotate-2 scale-105 my-6">
        <div className="py-5 bg-gradient-to-r from-red-600 to-red-500 shadow-[0_20px_60px_rgba(220,38,38,0.25)]">
          <Marquee items={marqueeItems} />
        </div>
      </div>

      <SectionTransition>
        <RestaurantEcosystem />
      </SectionTransition>
      <SectionTransition>
        <POSDevicesSection />
      </SectionTransition>
      <SectionTransition>
        <ComplianceSection />
      </SectionTransition>
      <SectionTransition>
        <POSFeaturesSection />
      </SectionTransition>
      {/* Hidden for now — Ordering, POS and Reservation sections */}
      {/* <SectionTransition><OrderingExperience /></SectionTransition> */}
      {/* <WebsiteMarketingSection /> */}
      {/* <SectionTransition><PoSSection /></SectionTransition> */}
      {/* <SectionTransition><ReservationSection /></SectionTransition> */}
      <SectionTransition>
        <QRSection />
      </SectionTransition>

      <SectionTransition>
        <FAQ />
      </SectionTransition>
      <SectionTransition>
        <ContactSection />
      </SectionTransition>
      <Footer />
    </div>
  );
}

