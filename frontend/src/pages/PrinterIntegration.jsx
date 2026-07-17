import {
  Printer,
  MonitorSmartphone,
  UtensilsCrossed,
  Zap,
  ShoppingCart,
  Cloud,
  Route,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { HardwareSection } from "../components/PrinterIntegration";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import serviceImage from "../assets/pos.png";

export default function PrinterIntegration() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Printer, key: "autoPrint" },
    { Icon: MonitorSmartphone, key: "androidDisplay" },
    { Icon: UtensilsCrossed, key: "kitchenBar" },
    { Icon: Zap, key: "noManual" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`printerIntegration.hero.features.${key}`) }));

  const featureItems = [
    { key: "autoPrint", Icon: Printer },
    { key: "androidDisplay", Icon: MonitorSmartphone },
    { key: "kitchenBar", Icon: UtensilsCrossed },
    { key: "noManual", Icon: Zap },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`printerIntegration.featureGrid.items.${key}.title`),
    desc: t(`printerIntegration.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "orderReceived", Icon: ShoppingCart, number: "01" },
    { key: "sentToSystem", Icon: Cloud, number: "02" },
    { key: "autoRouting", Icon: Route, number: "03" },
    { key: "printedInstantly", Icon: Printer, number: "04" },
    { key: "orderInProgress", Icon: CheckCircle2, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`printerIntegration.process.steps.${key}.title`),
    desc: t(`printerIntegration.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("printerIntegration.testimonial.stats.printSuccess"), label: t("printerIntegration.testimonial.stats.printSuccessLabel") },
    { value: t("printerIntegration.testimonial.stats.restaurants"), label: t("printerIntegration.testimonial.stats.restaurantsLabel") },
    { value: t("printerIntegration.testimonial.stats.manualForwarding"), label: t("printerIntegration.testimonial.stats.manualForwardingLabel") },
    { value: t("printerIntegration.testimonial.stats.performance"), label: t("printerIntegration.testimonial.stats.performanceLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("printerIntegration.seo.title")}
        description={t("printerIntegration.seo.description")}
        path="/printer-integration"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("printerIntegration.hero.badge")}
          headingLine1={t("printerIntegration.hero.headingLine1")}
          headingLine2={t("printerIntegration.hero.headingLine2")}
          description={t("printerIntegration.hero.description")}
          checklist={["thermalPrint", "androidDisplay", "printerSupport", "zeroForwarding"].map((key) =>
            t(`printerIntegration.hero.checklist.${key}`)
          )}
          ctaLabel={t("printerIntegration.hero.cta")}
          secondaryCtaLabel={t("printerIntegration.hero.secondaryCta")}
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
          eyebrow={t("printerIntegration.process.eyebrow")}
          heading={t("printerIntegration.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <HardwareSection />
        <TestimonialStatsBar
          quote={t("printerIntegration.testimonial.quote")}
          name={t("printerIntegration.testimonial.name")}
          role={t("printerIntegration.testimonial.role")}
          stats={testimonialStats}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
