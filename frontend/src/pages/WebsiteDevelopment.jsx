import { Globe, Smartphone, UtensilsCrossed, BarChart3, RefreshCw, ShoppingBag, LifeBuoy, LayoutTemplate, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout";
import { ServiceHero, FeatureGridSection, ProcessSteps, FAQ } from "../components/shared";
import { TemplatesShowcase, StatsTestimonial, PricingComparison, BundledCTA } from "../components/services";
import { translateItems } from "../utils/translateItems";

const heroFeatures = [
  { key: "domain", Icon: Globe },
  { key: "mobile", Icon: Smartphone },
  { key: "ordering", Icon: UtensilsCrossed },
  { key: "seo", Icon: BarChart3 },
];

const features = [
  { key: "updates", Icon: RefreshCw },
  { key: "ordering", Icon: ShoppingBag },
  { key: "support", Icon: LifeBuoy },
];

const steps = [
  { key: "choose", Icon: LayoutTemplate },
  { key: "customize", Icon: UtensilsCrossed },
  { key: "launch", Icon: Rocket },
];

export default function WebsiteDevelopment() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("websiteDevelopment.seo.title")}
      description={t("websiteDevelopment.seo.description")}
      path="/website-development"
    >
      <ServiceHero
        badge={t("websiteDevelopment.hero.badge")}
        headingLine1={t("websiteDevelopment.hero.headingLine1")}
        headingLine2={t("websiteDevelopment.hero.headingLine2")}
        description={t("websiteDevelopment.hero.description")}
        ctaLabel={t("websiteDevelopment.hero.cta")}
        features={translateItems(t, "websiteDevelopment.hero.features", heroFeatures, { label: "" })}
      />
      <TemplatesShowcase />
      <ProcessSteps
        eyebrow={t("websiteDevelopment.howItWorks.eyebrow")}
        heading={t("websiteDevelopment.howItWorks.heading")}
        headingRed={t("websiteDevelopment.howItWorks.headingRed")}
        steps={translateItems(t, "websiteDevelopment.howItWorks.steps", steps)}
        gridClassName="md:grid-cols-3"
        connector
      />
      <FeatureGridSection
        eyebrow={t("websiteDevelopment.features.eyebrow")}
        heading={t("websiteDevelopment.features.heading")}
        headingRed={t("websiteDevelopment.features.headingRed")}
        items={translateItems(t, "websiteDevelopment.features.items", features)}
        gridClassName="md:grid-cols-3"
      />
      <StatsTestimonial />
      <PricingComparison />
      <BundledCTA />
      <FAQ />
    </PageLayout>
  );
}
