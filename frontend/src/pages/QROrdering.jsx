import {
  QrCode,
  ShoppingCart,
  CreditCard,
  Bell,
  BarChart3,
  Settings2,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { SmarterOrderingSection } from "../components/QROrdering";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import serviceImage from "../assets/qrordering.png";

export default function QROrdering() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: QrCode, key: "scanOrder" },
    { Icon: ShoppingCart, key: "easyOrdering" },
    { Icon: CreditCard, key: "securePayments" },
    { Icon: Bell, key: "realTimeUpdates" },
    { Icon: BarChart3, key: "insights" },
    { Icon: Settings2, key: "posIntegration" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`qrOrdering.hero.features.${key}`) }));

  const featureItems = [
    { key: "scanOrder", Icon: QrCode },
    { key: "easyOrdering", Icon: ShoppingCart },
    { key: "securePayments", Icon: CreditCard },
    { key: "realTimeUpdates", Icon: Bell },
    { key: "insights", Icon: BarChart3 },
    { key: "posIntegration", Icon: Settings2 },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`qrOrdering.featureGrid.items.${key}.title`),
    desc: t(`qrOrdering.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "scanQr", Icon: QrCode, number: "01" },
    { key: "browseMenu", Icon: BookOpen, number: "02" },
    { key: "placeOrder", Icon: ShoppingCart, number: "03" },
    { key: "makePayment", Icon: CreditCard, number: "04" },
    { key: "enjoyMeal", Icon: CheckCircle2, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`qrOrdering.process.steps.${key}.title`),
    desc: t(`qrOrdering.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("qrOrdering.testimonial.stats.turnover"), label: t("qrOrdering.testimonial.stats.turnoverLabel") },
    { value: t("qrOrdering.testimonial.stats.orders"), label: t("qrOrdering.testimonial.stats.ordersLabel") },
    { value: t("qrOrdering.testimonial.stats.orderValue"), label: t("qrOrdering.testimonial.stats.orderValueLabel") },
    { value: t("qrOrdering.testimonial.stats.satisfaction"), label: t("qrOrdering.testimonial.stats.satisfactionLabel") },
    { value: t("qrOrdering.testimonial.stats.contactless"), label: t("qrOrdering.testimonial.stats.contactlessLabel") },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("qrOrdering.seo.title")}
        description={t("qrOrdering.seo.description")}
        path="/qr-ordering"
      />
      <Header />
      <main>
        <ServiceHero
          badge={t("qrOrdering.hero.badge")}
          headingLine1={t("qrOrdering.hero.headingLine1")}
          headingLine2={t("qrOrdering.hero.headingLine2")}
          description={t("qrOrdering.hero.description")}
          checklist={[
            "contactless",
            "securePayments",
            "fasterService",
            "reduceWorkload",
            "realTimeUpdates",
            "posIntegration",
          ].map((key) => t(`qrOrdering.hero.checklist.${key}`))}
          ctaLabel={t("qrOrdering.hero.cta")}
          secondaryCtaLabel={t("qrOrdering.hero.secondaryCta")}
          secondaryCtaHref="#success-stories"
          features={heroFeatures}
          featuresGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
          image={serviceImage}
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-3"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("qrOrdering.process.eyebrow")}
          heading={t("qrOrdering.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <SmarterOrderingSection />
        <TestimonialStatsBar
          quote={t("qrOrdering.testimonial.quote")}
          name={t("qrOrdering.testimonial.name")}
          role={t("qrOrdering.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
