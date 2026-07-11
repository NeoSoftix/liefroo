import {
  Headphones,
  Globe2,
  Phone,
  UserCog,
  Zap,
  MessageCircleQuestion,
  Search,
  Settings2,
  ThumbsUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar } from "../components/shared";
import { AlwaysThereSection } from "../components/TechnicalSupport";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function TechnicalSupport() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Headphones, key: "support7d" },
    { Icon: Globe2, key: "languages" },
    { Icon: Phone, key: "channels" },
    { Icon: UserCog, key: "onboarding" },
    { Icon: Zap, key: "reliable" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`technicalSupport.hero.features.${key}`) }));

  const featureItems = [
    { key: "support7d", Icon: Headphones },
    { key: "languages", Icon: Globe2 },
    { key: "channels", Icon: Phone },
    { key: "onboarding", Icon: UserCog },
    { key: "reliable", Icon: Zap },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`technicalSupport.featureGrid.items.${key}.title`),
    desc: t(`technicalSupport.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "reachOut", Icon: MessageCircleQuestion, number: "01" },
    { key: "explainIssue", Icon: MessageCircleQuestion, number: "02" },
    { key: "investigate", Icon: Search, number: "03" },
    { key: "resolve", Icon: Settings2, number: "04" },
    { key: "allSet", Icon: ThumbsUp, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`technicalSupport.process.steps.${key}.title`),
    desc: t(`technicalSupport.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("technicalSupport.testimonial.stats.rating"), label: t("technicalSupport.testimonial.stats.ratingLabel") },
    { value: t("technicalSupport.testimonial.stats.resolved"), label: t("technicalSupport.testimonial.stats.resolvedLabel") },
    { value: t("technicalSupport.testimonial.stats.partners"), label: t("technicalSupport.testimonial.stats.partnersLabel") },
    { value: t("technicalSupport.testimonial.stats.available"), label: t("technicalSupport.testimonial.stats.availableLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <main>
        <ServiceHero
          badge={t("technicalSupport.hero.badge")}
          headingLine1={t("technicalSupport.hero.headingLine1")}
          headingLine2={t("technicalSupport.hero.headingLine2")}
          description={t("technicalSupport.hero.description")}
          checklist={["support7d", "languages", "channels", "onboarding"].map((key) =>
            t(`technicalSupport.hero.checklist.${key}`)
          )}
          ctaLabel={t("technicalSupport.hero.cta")}
          secondaryCtaLabel={t("technicalSupport.hero.secondaryCta")}
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
          eyebrow={t("technicalSupport.process.eyebrow")}
          heading={t("technicalSupport.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <AlwaysThereSection />
        <TestimonialStatsBar
          quote={t("technicalSupport.testimonial.quote")}
          name={t("technicalSupport.testimonial.name")}
          role={t("technicalSupport.testimonial.role")}
          stats={testimonialStats}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
