import {
  Rocket,
  TrendingUp,
  Headphones,
  Store,
  Users,
  ClipboardList,
  Clock,
  LayoutGrid,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Seo,
  ServiceHero,
  FeatureGridSection,
  ProcessSteps,
  TestimonialStatsBar,
  ServicesGrid,
} from "../components/shared";
import panelImage from "../assets/panel.png";

export default function About() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: Rocket, key: "builtFor" },
    { Icon: TrendingUp, key: "innovation" },
    { Icon: Headphones, key: "support" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`about.hero.features.${key}`) }));

  const stats = [
    { Icon: Store, key: "restaurants" },
    { Icon: Users, key: "users" },
    { Icon: ClipboardList, key: "orders" },
    { Icon: Clock, key: "uptime" },
  ].map(({ Icon, key }) => ({
    Icon,
    value: t(`about.stats.${key}.value`),
    label: t(`about.stats.${key}.label`),
  }));

  const whyItems = [
    { key: "allInOne", Icon: LayoutGrid },
    { key: "experience", Icon: Users },
    { key: "saveTime", Icon: Clock },
    { key: "scalable", Icon: TrendingUp },
    { key: "insights", Icon: BarChart3 },
    { key: "support", Icon: Headphones },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`about.why.items.${key}.title`),
    desc: t(`about.why.items.${key}.desc`),
  }));

  const steps = [
    { key: "understand", Icon: Rocket, number: "01" },
    { key: "setup", Icon: LayoutGrid, number: "02" },
    { key: "launch", Icon: TrendingUp, number: "03" },
    { key: "grow", Icon: BarChart3, number: "04" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`about.process.steps.${key}.title`),
    desc: t(`about.process.steps.${key}.desc`),
  }));

  const testimonialStats = [
    { value: t("about.testimonial.stats.restaurants"), label: t("about.testimonial.stats.restaurantsLabel") },
    { value: t("about.testimonial.stats.users"), label: t("about.testimonial.stats.usersLabel") },
    { value: t("about.testimonial.stats.orders"), label: t("about.testimonial.stats.ordersLabel") },
    { value: t("about.testimonial.stats.uptime"), label: t("about.testimonial.stats.uptimeLabel") },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        path="/about"
      />
      <Header />

      <main>
        <ServiceHero
          badge={t("about.hero.eyebrow")}
          headingLine1={t("about.hero.headingLine1")}
          headingLine2={t("about.hero.headingLine2")}
          description={t("about.hero.description")}
          features={heroFeatures}
          featuresGridClassName="grid-cols-3"
          image={panelImage}
        />

        <section className="relative z-10 w-full py-10 lg:py-14 bg-red-50/60">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 bg-white rounded-3xl border border-red-100 shadow-[0_15px_50px_rgba(0,0,0,0.06)] p-6 lg:p-8">
              {stats.map(({ Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="text-red-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-gray-900">{value}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGridSection
          eyebrow={t("about.why.eyebrow")}
          heading={t("about.why.heading")}
          headingRed={t("about.why.headingRed")}
          items={whyItems}
          gridClassName="sm:grid-cols-2"
        />

        <ServicesGrid
          eyebrow={t("about.offer.eyebrow")}
          heading={`${t("about.offer.heading")} ${t("about.offer.headingRed")}`}
        />

        <ProcessSteps
          eyebrow={t("about.process.eyebrow")}
          heading={t("about.process.heading")}
          headingRed={t("about.process.headingRed")}
          steps={steps}
          connector
        />

        <TestimonialStatsBar
          quote={t("about.testimonial.quote")}
          name={t("about.testimonial.name")}
          role={t("about.testimonial.role")}
          stats={testimonialStats}
        />
      </main>

      <Footer />
    </div>
  );
}
