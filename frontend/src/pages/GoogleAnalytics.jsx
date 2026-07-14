import {
  BarChart3,
  Users,
  Target,
  PieChart,
  TrendingUp,
  Settings2,
  Waypoints,
  Search,
  FileText,
  RotateCw,
  Rocket,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { BetterInsightsSection } from "../components/GoogleAnalytics";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function GoogleAnalytics() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: BarChart3, key: "visibility" },
    { Icon: Users, key: "audience" },
    { Icon: Target, key: "goals" },
    { Icon: PieChart, key: "dashboards" },
    { Icon: TrendingUp, key: "decisions" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`googleAnalytics.hero.features.${key}`) }));

  const featureItems = [
    { key: "visibility", Icon: BarChart3 },
    { key: "audience", Icon: Users },
    { key: "goals", Icon: Target },
    { key: "dashboards", Icon: PieChart },
    { key: "decisions", Icon: TrendingUp },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`googleAnalytics.featureGrid.items.${key}.title`),
    desc: t(`googleAnalytics.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "setup", Icon: Settings2, number: "01" },
    { key: "collection", Icon: Waypoints, number: "02" },
    { key: "analyze", Icon: Search, number: "03" },
    { key: "report", Icon: FileText, number: "04" },
    { key: "optimize", Icon: RotateCw, number: "05" },
    { key: "grow", Icon: Rocket, number: "06" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`googleAnalytics.process.steps.${key}.title`),
    desc: t(`googleAnalytics.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("googleAnalytics.testimonial.stats.traffic"), label: t("googleAnalytics.testimonial.stats.trafficLabel") },
    { value: t("googleAnalytics.testimonial.stats.conversions"), label: t("googleAnalytics.testimonial.stats.conversionsLabel") },
    { value: t("googleAnalytics.testimonial.stats.roi"), label: t("googleAnalytics.testimonial.stats.roiLabel") },
    { value: t("googleAnalytics.testimonial.stats.rating"), label: t("googleAnalytics.testimonial.stats.ratingLabel") },
    { value: t("googleAnalytics.testimonial.stats.tracking"), label: t("googleAnalytics.testimonial.stats.trackingLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("googleAnalytics.seo.title")}
        description={t("googleAnalytics.seo.description")}
        path="/google-analytics"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("googleAnalytics.hero.badge")}
          headingLine1={t("googleAnalytics.hero.headingLine1")}
          headingLine2={t("googleAnalytics.hero.headingLine2")}
          description={t("googleAnalytics.hero.description")}
          checklist={["performance", "audience", "conversions", "reports", "decisions"].map((key) =>
            t(`googleAnalytics.hero.checklist.${key}`)
          )}
          ctaLabel={t("googleAnalytics.hero.cta")}
          secondaryCtaLabel={t("googleAnalytics.hero.secondaryCta")}
          secondaryCtaHref="#success-stories"
          features={heroFeatures}
          featuresGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-5"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("googleAnalytics.process.eyebrow")}
          heading={t("googleAnalytics.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-3"
        />
        <BetterInsightsSection />
        <TestimonialStatsBar
          quote={t("googleAnalytics.testimonial.quote")}
          name={t("googleAnalytics.testimonial.name")}
          role={t("googleAnalytics.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
