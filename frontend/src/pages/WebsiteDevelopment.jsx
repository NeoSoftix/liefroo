import { Globe, Smartphone, UtensilsCrossed, BarChart3, RefreshCw, ShoppingBag, LifeBuoy, LayoutTemplate, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps } from "../components/shared";
import {
  TemplatesShowcase,
  StatsTestimonial,
  PricingComparison,
  BundledCTA,
} from "../components/WebsiteDevelopment";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function WebsiteDevelopment() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Globe, key: "domain" },
    { Icon: Smartphone, key: "mobile" },
    { Icon: UtensilsCrossed, key: "ordering" },
    { Icon: BarChart3, key: "seo" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`websiteDevelopment.hero.features.${key}`) }));

  const featureItems = [
    { key: "updates", Icon: RefreshCw },
    { key: "ordering", Icon: ShoppingBag },
    { key: "support", Icon: LifeBuoy },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`websiteDevelopment.features.items.${key}.title`),
    desc: t(`websiteDevelopment.features.items.${key}.desc`),
  }));

  const steps = [
    { key: "choose", Icon: LayoutTemplate, number: "01" },
    { key: "customize", Icon: UtensilsCrossed, number: "02" },
    { key: "launch", Icon: Rocket, number: "03" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`websiteDevelopment.howItWorks.steps.${key}.title`),
    desc: t(`websiteDevelopment.howItWorks.steps.${key}.desc`),
  }));

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <ServiceHero
          badge={t("websiteDevelopment.hero.badge")}
          headingLine1={t("websiteDevelopment.hero.headingLine1")}
          headingLine2={t("websiteDevelopment.hero.headingLine2")}
          description={t("websiteDevelopment.hero.description")}
          ctaLabel={t("websiteDevelopment.hero.cta")}
          features={heroFeatures}
        />
        <TemplatesShowcase />
        <ProcessSteps
          eyebrow={t("websiteDevelopment.howItWorks.eyebrow")}
          heading={t("websiteDevelopment.howItWorks.heading")}
          headingRed={t("websiteDevelopment.howItWorks.headingRed")}
          steps={steps}
          gridClassName="md:grid-cols-3"
          connector
        />
        <FeatureGridSection
          eyebrow={t("websiteDevelopment.features.eyebrow")}
          heading={t("websiteDevelopment.features.heading")}
          headingRed={t("websiteDevelopment.features.headingRed")}
          items={featureItems}
          gridClassName="md:grid-cols-3"
        />
        <StatsTestimonial />
        <PricingComparison />
        <BundledCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
