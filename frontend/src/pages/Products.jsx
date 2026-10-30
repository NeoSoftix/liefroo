import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { PageLayout } from "../components/layout";
import {
  HeroSlider,
  RestaurantEcosystem,
  POSDevicesSection,
  ComplianceSection,
  POSFeaturesSection, 
  QRSection,
} from "../components/home";
import { FAQ, ContactSection } from "../components/shared";
import { Marquee, ScrollProgress, SectionTransition } from "../components/motion";
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
    <PageLayout title={t("home.seo.title")} description={t("home.seo.description")} path="/" dark>
      <ScrollProgress />
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
      <SectionTransition>
        <QRSection />
      </SectionTransition>

      <SectionTransition>
        <FAQ />
      </SectionTransition>
      <SectionTransition>
        <ContactSection />
      </SectionTransition>
    </PageLayout>
  );
}

