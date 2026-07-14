import {
  Hand,
  ShoppingBag,
  Users,
  Store,
  ShoppingCart,
  Inbox,
  Settings2,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { POSFeaturesShowcase } from "../components/POSSystemDevelopment";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import serviceImage from "../assets/posimage.png";

export default function POSSystemDevelopment() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Hand, key: "touchInterface" },
    { Icon: ShoppingBag, key: "unifiedOrders" },
    { Icon: Users, key: "tableManagement" },
    { Icon: Store, key: "multiLocation" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`posSystemDevelopment.hero.features.${key}`) }));

  const featureItems = [
    { key: "touchInterface", Icon: Hand },
    { key: "unifiedOrders", Icon: ShoppingBag },
    { key: "tableManagement", Icon: Users },
    { key: "multiLocation", Icon: Store },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`posSystemDevelopment.featureGrid.items.${key}.title`),
    desc: t(`posSystemDevelopment.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "orderAnywhere", Icon: ShoppingCart, number: "01" },
    { key: "arrivesInPos", Icon: Inbox, number: "02" },
    { key: "processManage", Icon: Settings2, number: "03" },
    { key: "printPrepare", Icon: Printer, number: "04" },
    { key: "serveGetPaid", Icon: CheckCircle2, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`posSystemDevelopment.process.steps.${key}.title`),
    desc: t(`posSystemDevelopment.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("posSystemDevelopment.testimonial.stats.restaurants"), label: t("posSystemDevelopment.testimonial.stats.restaurantsLabel") },
    { value: t("posSystemDevelopment.testimonial.stats.uptime"), label: t("posSystemDevelopment.testimonial.stats.uptimeLabel") },
    { value: t("posSystemDevelopment.testimonial.stats.efficiency"), label: t("posSystemDevelopment.testimonial.stats.efficiencyLabel") },
    { value: t("posSystemDevelopment.testimonial.stats.support"), label: t("posSystemDevelopment.testimonial.stats.supportLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("posSystemDevelopment.seo.title")}
        description={t("posSystemDevelopment.seo.description")}
        path="/pos-system-development"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("posSystemDevelopment.hero.badge")}
          headingLine1={t("posSystemDevelopment.hero.headingLine1")}
          headingLine2={t("posSystemDevelopment.hero.headingLine2")}
          description={t("posSystemDevelopment.hero.description")}
          checklist={["touchInterface", "unifiedOrders", "tableManagement", "multiLocation"].map((key) =>
            t(`posSystemDevelopment.hero.checklist.${key}`)
          )}
          ctaLabel={t("posSystemDevelopment.hero.cta")}
          secondaryCtaLabel={t("posSystemDevelopment.hero.secondaryCta")}
          features={heroFeatures}
          image={serviceImage}
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-4"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("posSystemDevelopment.process.eyebrow")}
          heading={t("posSystemDevelopment.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <POSFeaturesShowcase />
        <TestimonialStatsBar
          quote={t("posSystemDevelopment.testimonial.quote")}
          name={t("posSystemDevelopment.testimonial.name")}
          role={t("posSystemDevelopment.testimonial.role")}
          stats={testimonialStats}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
