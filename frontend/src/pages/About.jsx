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
  Award,
  CalendarDays,
  Handshake,
  Globe,
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

  const storyHighlights = [
    { key: "founded", Icon: CalendarDays },
    { key: "trusted", Icon: Handshake },
    { key: "dedicated", Icon: Award },
    { key: "growing", Icon: Globe },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`about.story.highlights.${key}.title`),
    desc: t(`about.story.highlights.${key}.desc`),
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

        <section className="relative z-10 w-full py-14 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {t("about.story.eyebrow")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-4 leading-[1.15] text-gray-900">
              {t("about.story.heading")} <span className="text-red-600">{t("about.story.headingRed")}</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mt-6 leading-relaxed">
              {t("about.story.paragraph1")}
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
              {t("about.story.paragraph2")}
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
              {t("about.story.paragraph3")}
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 mt-10 lg:mt-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {storyHighlights.map(({ key, Icon, title, desc }) => (
                <div
                  key={key}
                  className="bg-red-50/60 border border-red-100 rounded-2xl p-5 lg:p-6 text-center hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-white border border-red-200 flex items-center justify-center shadow-sm">
                    <Icon className="text-red-600" size={22} />
                  </div>
                  <h4 className="mt-3 font-bold text-gray-900 text-sm sm:text-base">{title}</h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
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
