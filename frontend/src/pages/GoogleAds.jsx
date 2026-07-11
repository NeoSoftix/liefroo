import { Search, LayoutTemplate, Crosshair, BarChart3, PlayCircle, Target, MousePointerClick, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar } from "../components/shared";
import { SmarterAdsSection } from "../components/GoogleAds";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function GoogleAds() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Search, key: "searchAds" },
    { Icon: LayoutTemplate, key: "displayAds" },
    { Icon: Crosshair, key: "locationTargeting" },
    { Icon: BarChart3, key: "roiTracking" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`googleAds.hero.features.${key}`) }));

  const featureItems = [
    { key: "searchAds", Icon: Search },
    { key: "displayAds", Icon: LayoutTemplate },
    { key: "locationTargeting", Icon: Crosshair },
    { key: "roiTracking", Icon: BarChart3 },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`googleAds.featureGrid.items.${key}.title`),
    desc: t(`googleAds.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "keywordResearch", Icon: Search, number: "01" },
    { key: "createLaunch", Icon: PlayCircle, number: "02" },
    { key: "showRightPeople", Icon: Target, number: "03" },
    { key: "clickOrder", Icon: MousePointerClick, number: "04" },
    { key: "optimizeGrow", Icon: TrendingUp, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`googleAds.process.steps.${key}.title`),
    desc: t(`googleAds.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("googleAds.testimonial.stats.directOrders"), label: t("googleAds.testimonial.stats.directOrdersLabel") },
    { value: t("googleAds.testimonial.stats.roi"), label: t("googleAds.testimonial.stats.roiLabel") },
    { value: t("googleAds.testimonial.stats.orders"), label: t("googleAds.testimonial.stats.ordersLabel") },
    { value: t("googleAds.testimonial.stats.rating"), label: t("googleAds.testimonial.stats.ratingLabel") },
    { value: t("googleAds.testimonial.stats.cost"), label: t("googleAds.testimonial.stats.costLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <main>
        <ServiceHero
          badge={t("googleAds.hero.badge")}
          headingLine1={t("googleAds.hero.headingLine1")}
          headingLine2={t("googleAds.hero.headingLine2")}
          description={t("googleAds.hero.description")}
          checklist={["searchDisplay", "keywordResearch", "locationBidding", "conversionTracking"].map((key) =>
            t(`googleAds.hero.checklist.${key}`)
          )}
          ctaLabel={t("googleAds.hero.cta")}
          secondaryCtaLabel={t("googleAds.hero.secondaryCta")}
          secondaryCtaHref="#success-stories"
          features={heroFeatures}
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-4"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("googleAds.process.eyebrow")}
          heading={t("googleAds.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <SmarterAdsSection />
        <TestimonialStatsBar
          quote={t("googleAds.testimonial.quote")}
          name={t("googleAds.testimonial.name")}
          role={t("googleAds.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
