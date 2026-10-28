import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  GraduationCap,
  Headphones,
  RefreshCw,
  MessagesSquare,
  PackageCheck,
  Users,
  LifeBuoy,
  MonitorSmartphone,
  Printer,
  CalendarDays,
  Globe,
  Megaphone,
  Smartphone,
  PiggyBank,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout";
import { POSDevicesSection } from "../components/home";
import { ContactSection, SectionHeading, useGoToSection } from "../components/shared";
import { Reveal, ease } from "../components/motion";

// TODO: placeholder prices (EUR / month, net) — replace with Liefro's real pricing.
const PLANS = [
  { key: "start", price: 69, devices: 1 },
  { key: "plus", price: 99, devices: 2, popular: true },
  { key: "pro", price: 139, devices: 3 },
];
const ADDONS = [
  { key: "device", Icon: MonitorSmartphone, price: 29 },
  { key: "printer", Icon: Printer, price: 9 },
  { key: "reservations", Icon: CalendarDays, price: 39 },
  { key: "website", Icon: Globe, price: 29 },
  { key: "marketing", Icon: Megaphone, price: 19 },
  { key: "app", Icon: Smartphone, price: 49 },
];

const included = [
  { key: "tse", Icon: ShieldCheck },
  { key: "setup", Icon: GraduationCap },
  { key: "support", Icon: Headphones },
  { key: "updates", Icon: RefreshCw },
];

// App screenshots (public/ecosystem/) and the cheapest plan that includes them.
const showcase = [
  { key: "onlineOrdering", image: "/ecosystem/online-ordering-menu.webp", plan: "start" },
  { key: "analytics", image: "/ecosystem/analytics.webp", plan: "start" },
  { key: "reservations", image: "/ecosystem/reservation.webp", plan: "pro" },
  { key: "marketing", image: "/ecosystem/marketing.webp", plan: "pro" },
];

const benefits = [
  { key: "advice", Icon: MessagesSquare },
  { key: "setup", Icon: PackageCheck },
  { key: "training", Icon: Users },
  { key: "support", Icon: LifeBuoy },
];

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const goToSection = useGoToSection();
  const price = new Intl.NumberFormat(i18n.resolvedLanguage === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const toContact = () => goToSection("contact");

  return (
    <PageLayout title={t("pricing.seo.title")} description={t("pricing.seo.description")} path="/pricing" dark>
      {/* Hero */}
      <section className="relative overflow-hidden text-white bg-[radial-gradient(ellipse_at_70%_40%,#ef4444_0%,#dc2626_35%,#b91c1c_75%,#991b1b_100%)]">
        <div className="pointer-events-none absolute top-1/4 right-[5%] w-[600px] h-[600px] rounded-full bg-red-400/40 blur-[160px]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <span className="inline-flex bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              {t("pricing.hero.badge")}
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight">
              {t("pricing.hero.heading")}
              <span className="block text-white/80">{t("pricing.hero.headingHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-light text-white/90 max-w-xl">{t("pricing.hero.description")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={toContact}
                className="group inline-flex items-center gap-2 bg-white text-red-600 px-7 py-3.5 rounded-full font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                {t("pricing.hero.cta")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#plans"
                className="inline-flex items-center border-2 border-white/80 px-7 py-3.5 rounded-full font-semibold transition-colors hover:bg-white hover:text-red-600"
              >
                {t("pricing.hero.secondary")}
              </a>
            </div>
          </motion.div>
          <motion.img
            src="/ecosystem/pos-devices.webp"
            alt=""
            width={1600}
            height={980}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="w-full h-auto drop-shadow-[0_40px_50px_rgba(60,0,0,0.45)]"
          />
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="relative py-14 lg:py-20 bg-[#FAFAFA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t("pricing.plans.heading")} highlight={t("pricing.plans.headingHighlight")} />

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map(({ key, price: amount, devices, popular }, i) => {
              const features = t(`pricing.plans.items.${key}.features`, { returnObjects: true });
              const prev = PLANS[i - 1];
              return (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className={`relative flex flex-col rounded-[28px] p-7 lg:p-8 border transition-shadow duration-300 ${
                    popular
                      ? "bg-gradient-to-b from-red-600 to-red-700 text-white border-red-600 shadow-[0_30px_70px_rgba(220,38,38,0.35)] md:-translate-y-3"
                      : "bg-white text-gray-900 border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-red-600 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                      {t("pricing.plans.popular")}
                    </span>
                  )}
                  <h3 className="text-2xl font-black">{t(`pricing.plans.items.${key}.name`)}</h3>
                  <p className={`mt-1 text-sm ${popular ? "text-white/80" : "text-gray-500"}`}>
                    {t(`pricing.plans.items.${key}.tagline`)}
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl lg:text-5xl font-black leading-none">{price.format(amount)}</span>
                    <span className={`pb-1 text-sm ${popular ? "text-white/80" : "text-gray-500"}`}>{t("pricing.plans.perMonth")}</span>
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${popular ? "text-white" : "text-red-600"}`}>
                    {t("pricing.plans.devices", { count: devices })}
                  </p>

                  <div className={`my-6 h-px ${popular ? "bg-white/25" : "bg-gray-100"}`} />

                  {prev && (
                    <p className={`mb-3 text-sm font-semibold ${popular ? "text-white/90" : "text-gray-700"}`}>
                      {t("pricing.plans.everythingIn", { plan: t(`pricing.plans.items.${prev.key}.name`) })}
                    </p>
                  )}
                  <ul className="space-y-3 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm lg:text-base">
                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? "bg-white text-red-600" : "bg-red-50 text-red-600"}`}>
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={toContact}
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm border transition-colors duration-300 ${
                      popular
                        ? "bg-white text-red-600 border-white hover:bg-red-50"
                        : "bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600"
                    }`}
                  >
                    {t("pricing.plans.cta")}
                    <ArrowRight size={16} />
                  </button>
                </motion.article>
              );
            })}
          </div>

          {/* Included in every plan */}
          <Reveal className="mt-10 rounded-3xl bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.05)] px-6 py-6 lg:px-10">
            <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-red-600">{t("pricing.included.heading")}</p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {included.map(({ key, Icon }) => (
                <div key={key} className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </span>
                  <span className="font-semibold text-sm lg:text-base text-gray-900">{t(`pricing.included.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hardware */}
      <POSDevicesSection />

      {/* Save with longer terms */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-10 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10" />
            <span className="relative w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <PiggyBank size={32} />
            </span>
            <div className="relative flex-1">
              <h2 className="text-2xl lg:text-3xl font-black">{t("pricing.save.heading")}</h2>
              <p className="mt-2 text-white/85 max-w-2xl">{t("pricing.save.text")}</p>
            </div>
            <button
              type="button"
              onClick={toContact}
              className="relative self-start lg:self-auto inline-flex items-center gap-2 bg-white text-red-600 px-7 py-3.5 rounded-full font-semibold shrink-0 hover:bg-red-50 transition-colors"
            >
              {t("pricing.save.cta")}
              <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Software showcase */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            heading={t("pricing.showcase.heading")}
            highlight={t("pricing.showcase.headingHighlight")}
            description={t("pricing.showcase.description")}
          />
          <div className="space-y-12 lg:space-y-20">
            {showcase.map(({ key, image, plan }, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={key}
                  className={`grid gap-8 lg:gap-14 items-center ${flip ? "lg:grid-cols-[1fr_1.25fr]" : "lg:grid-cols-[1.25fr_1fr]"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: flip ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease }}
                    className={`rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.1)] ${flip ? "lg:order-2" : ""}`}
                  >
                    <img src={image} alt={t(`pricing.showcase.items.${key}.title`)} loading="lazy" className="block w-full h-auto" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className={flip ? "lg:order-1" : ""}
                  >
                    <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                      {t("pricing.showcase.includedFrom", { plan: t(`pricing.plans.items.${plan}.name`) })}
                    </span>
                    <h3 className="mt-4 text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                      {t(`pricing.showcase.items.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-base lg:text-lg text-gray-600 leading-relaxed">
                      {t(`pricing.showcase.items.${key}.text`)}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t("pricing.benefits.heading")} highlight={t("pricing.benefits.headingHighlight")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {benefits.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="rounded-3xl bg-[#FAFAFA] border border-gray-100 p-6"
              >
                <span className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{t(`pricing.benefits.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t(`pricing.benefits.items.${key}.text`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            heading={t("pricing.addons.heading")}
            highlight={t("pricing.addons.headingHighlight")}
            description={t("pricing.addons.description")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {ADDONS.map(({ key, Icon, price: amount }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className="group flex items-start gap-4 rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200"
              >
                <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-bold text-gray-900">{t(`pricing.addons.items.${key}.title`)}</h3>
                    <span className="text-sm font-bold text-red-600 whitespace-nowrap">
                      {t("pricing.addons.from")} {price.format(amount)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{t(`pricing.addons.items.${key}.text`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="rounded-[32px] bg-gradient-to-br from-red-100/70 via-red-50 to-orange-50 border border-red-200 px-6 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t("pricing.cta.heading")}</h2>
            <p className="mt-3 text-gray-600">{t("pricing.cta.text")}</p>
            <button
              type="button"
              onClick={toContact}
              className="mt-7 inline-flex items-center gap-2 bg-red-600 text-white border border-red-600 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              {t("pricing.cta.button")}
              <ArrowRight size={18} />
            </button>
            <p className="mt-6 text-xs text-gray-500">{t("pricing.note")}</p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  );
}
