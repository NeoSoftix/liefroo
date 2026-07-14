import {  Target, PenLine, BarChart3, Lightbulb, Megaphone, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { GrowFasterSection } from "../components/MetaAds";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function MetaAds() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: FaFacebook, key: "campaigns" },
    { Icon: Target, key: "targeting" },
    { Icon: PenLine, key: "creative" },
    { Icon: BarChart3, key: "tracking" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`metaAds.hero.features.${key}`) }));

  const featureItems = [
    { key: "campaigns", Icon: FaFacebook },
    { key: "targeting", Icon: Target },
    { key: "creative", Icon: PenLine },
    { key: "tracking", Icon: BarChart3 },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`metaAds.featureGrid.items.${key}.title`),
    desc: t(`metaAds.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "strategy", Icon: Lightbulb, number: "01" },
    { key: "launch", Icon: Megaphone, number: "02" },
    { key: "reach", Icon: Users, number: "03" },
    { key: "orders", Icon: ShoppingCart, number: "04" },
    { key: "optimize", Icon: TrendingUp, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`metaAds.process.steps.${key}.title`),
    desc: t(`metaAds.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("metaAds.testimonial.stats.roas"), label: t("metaAds.testimonial.stats.roasLabel") },
    { value: t("metaAds.testimonial.stats.reached"), label: t("metaAds.testimonial.stats.reachedLabel") },
    { value: t("metaAds.testimonial.stats.cost"), label: t("metaAds.testimonial.stats.costLabel") },
    { value: t("metaAds.testimonial.stats.satisfaction"), label: t("metaAds.testimonial.stats.satisfactionLabel") },
    { value: t("metaAds.testimonial.stats.growth"), label: t("metaAds.testimonial.stats.growthLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("metaAds.seo.title")}
        description={t("metaAds.seo.description")}
        path="/meta-ads"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("metaAds.hero.badge")}
          headingLine1={t("metaAds.hero.headingLine1")}
          headingLine2={t("metaAds.hero.headingLine2")}
          description={t("metaAds.hero.description")}
          checklist={["campaigns", "targeting", "creative", "tracking"].map((key) =>
            t(`metaAds.hero.checklist.${key}`)
          )}
          ctaLabel={t("metaAds.hero.cta")}
          secondaryCtaLabel={t("metaAds.hero.secondaryCta")}
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
          eyebrow={t("metaAds.process.eyebrow")}
          heading={t("metaAds.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <GrowFasterSection />
        <TestimonialStatsBar
          quote={t("metaAds.testimonial.quote")}
          name={t("metaAds.testimonial.name")}
          role={t("metaAds.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
