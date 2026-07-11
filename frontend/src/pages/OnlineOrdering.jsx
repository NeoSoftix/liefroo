import { Package, BadgePercent, ClipboardList, ShieldCheck, ShoppingCart, Bell, Truck, ThumbsUp, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar } from "../components/shared";
import { TakeControlSection } from "../components/OnlineOrdering";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function OnlineOrdering() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Package, key: "brandedExperience" },
    { Icon: BadgePercent, key: "noCommission" },
    { Icon: ClipboardList, key: "orderOptions" },
    { Icon: ShieldCheck, key: "securePayments" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`onlineOrdering.hero.features.${key}`) }));

  const featureItems = [
    { key: "brandedExperience", Icon: Package },
    { key: "noCommission", Icon: BadgePercent },
    { key: "orderOptions", Icon: ClipboardList },
    { key: "securePayments", Icon: ShieldCheck },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`onlineOrdering.featureGrid.items.${key}.title`),
    desc: t(`onlineOrdering.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "placeOrder", Icon: ShoppingCart, number: "01" },
    { key: "orderReceived", Icon: Bell, number: "02" },
    { key: "prepareDeliver", Icon: Truck, number: "03" },
    { key: "satisfied", Icon: ThumbsUp, number: "04" },
    { key: "grows", Icon: TrendingUp, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`onlineOrdering.process.steps.${key}.title`),
    desc: t(`onlineOrdering.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("onlineOrdering.testimonial.stats.directOrders"), label: t("onlineOrdering.testimonial.stats.directOrdersLabel") },
    { value: t("onlineOrdering.testimonial.stats.repeatOrders"), label: t("onlineOrdering.testimonial.stats.repeatOrdersLabel") },
    { value: t("onlineOrdering.testimonial.stats.restaurants"), label: t("onlineOrdering.testimonial.stats.restaurantsLabel") },
    { value: t("onlineOrdering.testimonial.stats.rating"), label: t("onlineOrdering.testimonial.stats.ratingLabel") },
    { value: t("onlineOrdering.testimonial.stats.savings"), label: t("onlineOrdering.testimonial.stats.savingsLabel") },
  ];

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <ServiceHero
          badge={t("onlineOrdering.hero.badge")}
          headingLine1={t("onlineOrdering.hero.headingLine1")}
          headingLine2={t("onlineOrdering.hero.headingLine2")}
          description={t("onlineOrdering.hero.description")}
          checklist={["brandedLink", "customMenu", "deliveryOptions", "orderPayment"].map((key) =>
            t(`onlineOrdering.hero.checklist.${key}`)
          )}
          ctaLabel={t("onlineOrdering.hero.cta")}
          secondaryCtaLabel={t("onlineOrdering.hero.secondaryCta")}
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
          eyebrow={t("onlineOrdering.process.eyebrow")}
          heading={t("onlineOrdering.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <TakeControlSection />
        <TestimonialStatsBar
          quote={t("onlineOrdering.testimonial.quote")}
          name={t("onlineOrdering.testimonial.name")}
          role={t("onlineOrdering.testimonial.role")}
          stats={testimonialStats}
          statsGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
