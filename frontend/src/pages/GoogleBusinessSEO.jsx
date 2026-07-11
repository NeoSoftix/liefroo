import { Store, Search, Share2, Star, Megaphone, MousePointerClick, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar } from "../components/shared";
import { AlwaysAheadSection } from "../components/GoogleBusinessSEO";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function GoogleBusinessSEO() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Store, key: "profile" },
    { Icon: Search, key: "localSeo" },
    { Icon: Share2, key: "social" },
    { Icon: Star, key: "reviews" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`googleBusinessSEO.hero.features.${key}`) }));

  const featureItems = [
    { key: "profile", Icon: Store },
    { key: "localSeo", Icon: Search },
    { key: "social", Icon: Share2 },
    { key: "reviews", Icon: Star },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`googleBusinessSEO.featureGrid.items.${key}.title`),
    desc: t(`googleBusinessSEO.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "audit", Icon: Store, number: "01" },
    { key: "optimize", Icon: Search, number: "02" },
    { key: "discovered", Icon: Megaphone, number: "03" },
    { key: "visit", Icon: MousePointerClick, number: "04" },
    { key: "grow", Icon: TrendingUp, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`googleBusinessSEO.process.steps.${key}.title`),
    desc: t(`googleBusinessSEO.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("googleBusinessSEO.testimonial.stats.visibility"), label: t("googleBusinessSEO.testimonial.stats.visibilityLabel") },
    { value: t("googleBusinessSEO.testimonial.stats.orders"), label: t("googleBusinessSEO.testimonial.stats.ordersLabel") },
    { value: t("googleBusinessSEO.testimonial.stats.keywords"), label: t("googleBusinessSEO.testimonial.stats.keywordsLabel") },
    { value: t("googleBusinessSEO.testimonial.stats.rating"), label: t("googleBusinessSEO.testimonial.stats.ratingLabel") },
    { value: t("googleBusinessSEO.testimonial.stats.savings"), label: t("googleBusinessSEO.testimonial.stats.savingsLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <main>
        <ServiceHero
          badge={t("googleBusinessSEO.hero.badge")}
          headingLine1={t("googleBusinessSEO.hero.headingLine1")}
          headingLine2={t("googleBusinessSEO.hero.headingLine2")}
          description={t("googleBusinessSEO.hero.description")}
          checklist={["profile", "localSeo", "social", "reviews"].map((key) =>
            t(`googleBusinessSEO.hero.checklist.${key}`)
          )}
          ctaLabel={t("googleBusinessSEO.hero.cta")}
          secondaryCtaLabel={t("googleBusinessSEO.hero.secondaryCta")}
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
          eyebrow={t("googleBusinessSEO.process.eyebrow")}
          heading={t("googleBusinessSEO.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <AlwaysAheadSection />
        <TestimonialStatsBar
          quote={t("googleBusinessSEO.testimonial.quote")}
          name={t("googleBusinessSEO.testimonial.name")}
          role={t("googleBusinessSEO.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
