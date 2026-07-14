import { Smartphone, ShoppingBag, Bell, LayoutGrid } from "lucide-react";
import {
  ShoppingCart,
  CreditCard,
  Activity,
  Cloud,
  Lightbulb,
  PenTool,
  Code2,
  CheckCircle2,
  UploadCloud,
  LifeBuoy,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { WhyChooseSection } from "../components/MobileAppDevelopment";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import mobileAppImg from "../assets/mobileAppDevelopmentImage.png";

export default function MobileAppDevelopment() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Smartphone, key: "nativeApps" },
    { Icon: Bell, key: "pushNotifications" },
    { Icon: LayoutGrid, key: "storeDeployment" },
    { Icon: ShoppingBag, key: "ecosystem" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`mobileAppDevelopment.hero.features.${key}`) }));

  const featureItems = [
    { key: "brandedApp", Icon: Smartphone },
    { key: "ordering", Icon: ShoppingCart },
    { key: "notifications", Icon: Bell },
    { key: "payments", Icon: CreditCard },
    { key: "tracking", Icon: Activity },
    { key: "integration", Icon: Cloud },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`mobileAppDevelopment.featureGrid.items.${key}.title`),
    desc: t(`mobileAppDevelopment.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "discovery", Icon: Lightbulb, number: "01" },
    { key: "design", Icon: PenTool, number: "02" },
    { key: "development", Icon: Code2, number: "03" },
    { key: "testing", Icon: CheckCircle2, number: "04" },
    { key: "deployment", Icon: UploadCloud, number: "05" },
    { key: "support", Icon: LifeBuoy, number: "06" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`mobileAppDevelopment.process.steps.${key}.title`),
    desc: t(`mobileAppDevelopment.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("mobileAppDevelopment.testimonial.stats.rating"), label: t("mobileAppDevelopment.testimonial.stats.ratingLabel") },
    { value: t("mobileAppDevelopment.testimonial.stats.orders"), label: t("mobileAppDevelopment.testimonial.stats.ordersLabel") },
    { value: t("mobileAppDevelopment.testimonial.stats.downloads"), label: t("mobileAppDevelopment.testimonial.stats.downloadsLabel") },
    { value: t("mobileAppDevelopment.testimonial.stats.processed"), label: t("mobileAppDevelopment.testimonial.stats.processedLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("mobileAppDevelopment.seo.title")}
        description={t("mobileAppDevelopment.seo.description")}
        path="/mobile-app-development"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("mobileAppDevelopment.hero.badge")}
          headingLine1={t("mobileAppDevelopment.hero.headingLine1")}
          headingLine2={t("mobileAppDevelopment.hero.headingLine2")}
          description={t("mobileAppDevelopment.hero.description")}
          checklist={["nativeApps", "tracking", "deployment", "integration"].map((key) =>
            t(`mobileAppDevelopment.hero.checklist.${key}`)
          )}
          ctaLabel={t("mobileAppDevelopment.hero.cta")}
          secondaryCtaLabel={t("mobileAppDevelopment.hero.secondaryCta")}
          features={heroFeatures}
          imageSrc={mobileAppImg}
        />
        <FeatureGridSection
          eyebrow={t("mobileAppDevelopment.featureGrid.eyebrow")}
          heading={t("mobileAppDevelopment.featureGrid.heading")}
          headingRed={t("mobileAppDevelopment.featureGrid.headingRed")}
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-3"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("mobileAppDevelopment.process.eyebrow")}
          heading={t("mobileAppDevelopment.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-3"
        />
        <WhyChooseSection />
        <TestimonialStatsBar
          quote={t("mobileAppDevelopment.testimonial.quote")}
          name={t("mobileAppDevelopment.testimonial.name")}
          role={t("mobileAppDevelopment.testimonial.role")}
          stats={testimonialStats}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
