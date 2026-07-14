import { Package, BadgePercent, ClipboardList, ShieldCheck, ShoppingCart, Bell, Truck, ThumbsUp, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { FeatureGridSection, ProcessSteps, TestimonialStatsBar, Seo } from "../components/shared";
import { TakeControlSection, OnlineOrderingHero } from "../components/OnlineOrdering";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function OnlineOrdering() {
  const { t } = useTranslation();

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
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Seo
        title={t("onlineOrdering.seo.title")}
        description={t("onlineOrdering.seo.description")}
        path="/online-ordering"
      />
      <Header />
      <main>
        <OnlineOrderingHero />
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
