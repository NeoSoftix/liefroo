import { useEffect, useState } from "react";
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
  Handshake,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout";
import { POSDevicesSection } from "../components/home";
import { ContactSection, CustomPackageModal, SectionHeading, useGoToSection } from "../components/shared";
import { Reveal, ease } from "../components/motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// TODO: placeholder add-on prices (EUR / month, net) — replace with Liefro's real pricing.
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

// Plans are managed as products in Stripe (see backend/routes/plans.js).
function usePlans() {
  const [state, setState] = useState({ status: "loading", plans: [] });

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/plans`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        if (!cancelled) setState({ status: "ready", plans: data.plans });
      })
      .catch(() => !cancelled && setState({ status: "error", plans: [] }));
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function PlanSkeleton() {
  return (
    <div className="rounded-[28px] p-7 lg:p-8 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-pulse">
      <div className="h-7 w-28 rounded-lg bg-gray-100" />
      <div className="mt-3 h-4 w-40 rounded bg-gray-100" />
      <div className="mt-8 h-12 w-36 rounded-lg bg-gray-100" />
      <div className="my-6 h-px bg-gray-100" />
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-4 rounded bg-gray-100" style={{ width: `${85 - i * 12}%` }} />
        ))}
      </div>
      <div className="mt-10 h-12 rounded-full bg-gray-100" />
    </div>
  );
}

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const goToSection = useGoToSection();
  const lang = i18n.resolvedLanguage === "de" ? "de" : "en";
  const formatPrice = (amount, currency = "EUR") =>
    new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
      style: "currency",
      currency,
      // €59 for whole amounts, €99.50 (never €99.5) otherwise
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  const { status: plansStatus, plans } = usePlans();
  const [billingChoice, setBillingChoice] = useState("month");
  // Fall back to the other interval if no plan is sold with the chosen one
  const intervals = ["month", "year"].filter((iv) => plans.some((p) => p.prices[iv]));
  const billing = intervals.includes(billingChoice) ? billingChoice : intervals[0] || "month";
  const visiblePlans = plans.filter((p) => p.prices[billing]);
  // Biggest saving of yearly over 12 monthly payments, for the toggle badge
  const yearlySaving = Math.max(
    0,
    ...plans
      .filter((p) => p.prices.month && p.prices.year)
      .map((p) => Math.round((1 - p.prices.year.amount / (p.prices.month.amount * 12)) * 100))
  );
  const [buying, setBuying] = useState(null); // id of the plan being sent to checkout
  const [buyError, setBuyError] = useState(null); // id of the plan whose checkout failed

  // Opens Stripe's hosted payment page for the plan
  const buy = async (plan) => {
    setBuying(plan.id);
    setBuyError(null);
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, interval: billing, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.message);
      window.location.assign(data.url);
    } catch {
      setBuying(null);
      setBuyError(plan.id);
    }
  };
  const toContact = () => goToSection("contact");
  const [customOpen, setCustomOpen] = useState(false);

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

          {intervals.length > 1 && (
            <div className="-mt-4 mb-10 flex justify-center">
              <div role="tablist" aria-label={t("pricing.plans.billing.label")} className="inline-flex p-1.5 rounded-full bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                {intervals.map((iv) => {
                  const active = billing === iv;
                  return (
                    <button
                      key={iv}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setBillingChoice(iv)}
                      className={`relative px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                        active ? "text-white" : "text-gray-600 hover:text-red-600"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="billing-pill"
                          transition={{ duration: 0.35, ease }}
                          className="absolute inset-0 rounded-full bg-red-600 shadow-[0_8px_20px_rgba(220,38,38,0.3)]"
                        />
                      )}
                      <span className="relative inline-flex items-center gap-2">
                        {t(`pricing.plans.billing.${iv}`)}
                        {iv === "year" && yearlySaving > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              active ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                            }`}
                          >
                            {t("pricing.plans.billing.save", { percent: yearlySaving })}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {plansStatus === "loading" && [0, 1, 2].map((i) => <PlanSkeleton key={i} />)}

            {plansStatus === "error" && (
              <div className="md:col-span-2 xl:col-span-3 rounded-[28px] p-8 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center">
                <p className="text-lg font-bold text-gray-900">{t("pricing.plans.unavailable")}</p>
                <button
                  type="button"
                  onClick={toContact}
                  className="mt-5 inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors"
                >
                  {t("pricing.plans.cta")}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {visiblePlans.map((plan, i) => {
              const { popular, devices } = plan;
              const features = plan.features[lang];
              const prev = visiblePlans[i - 1];
              const price = plan.prices[billing];
              return (
                <motion.article
                  key={plan.id}
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
                  <h3 className="text-2xl font-black">{plan.name[lang]}</h3>
                  {plan.tagline[lang] && (
                    <p className={`mt-1 text-sm ${popular ? "text-white/80" : "text-gray-500"}`}>{plan.tagline[lang]}</p>
                  )}

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl lg:text-5xl font-black leading-none">{formatPrice(price.amount, price.currency)}</span>
                    <span className={`pb-1 text-sm ${popular ? "text-white/80" : "text-gray-500"}`}>
                      {t(billing === "year" ? "pricing.plans.perYear" : "pricing.plans.perMonth")}
                    </span>
                  </div>
                  {billing === "year" && (
                    <p className={`mt-2 text-xs ${popular ? "text-white/80" : "text-gray-500"}`}>
                      {t("pricing.plans.billedYearly", {
                        price: formatPrice(Math.round((price.amount / 12) * 100) / 100, price.currency),
                      })}
                    </p>
                  )}
                  {devices && (
                    <p className={`mt-2 text-sm font-semibold ${popular ? "text-white" : "text-red-600"}`}>
                      {t("pricing.plans.devices", { count: devices })}
                    </p>
                  )}

                  <div className={`my-6 h-px ${popular ? "bg-white/25" : "bg-gray-100"}`} />

                  {prev && (
                    <p className={`mb-3 text-sm font-semibold ${popular ? "text-white/90" : "text-gray-700"}`}>
                      {t("pricing.plans.everythingIn", { plan: prev.name[lang] })}
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
                    onClick={() => buy(plan)}
                    disabled={buying !== null}
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm border transition-colors duration-300 disabled:opacity-70 ${
                      popular
                        ? "bg-white text-red-600 border-white hover:bg-red-50"
                        : "bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600"
                    }`}
                  >
                    {buying === plan.id ? t("pricing.plans.redirecting") : t("pricing.plans.buy")}
                    <ArrowRight size={16} />
                  </button>
                  {buyError === plan.id && (
                    <p className={`mt-3 text-center text-xs font-medium ${popular ? "text-white" : "text-red-600"}`}>
                      {t("pricing.plans.buyError")}
                    </p>
                  )}
                </motion.article>
              );
            })}

            {/* Custom bundles — opens the custom package request form */}
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: visiblePlans.length * 0.1, ease }}
              className="relative flex flex-col rounded-[28px] p-7 lg:p-8 border-2 border-dashed border-gray-300 bg-white/60 text-gray-900"
            >
              <span className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Handshake size={20} />
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {t("pricing.plans.custom.eyebrow")}
              </p>
              <h3 className="mt-1 text-2xl font-black">{t("pricing.plans.custom.title")}</h3>
              <p className="mt-3 text-sm lg:text-base text-gray-600 leading-relaxed">{t("pricing.plans.custom.text")}</p>

              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                className="group mt-6 flex-1 min-h-[180px] w-full rounded-3xl bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center px-4 transition-all duration-300 hover:border-red-200 hover:shadow-[0_20px_50px_rgba(220,38,38,0.12)]"
              >
                <span className="font-bold text-gray-900">{t("pricing.plans.custom.cta")}</span>
                <span className="mt-1 text-sm text-gray-500">{t("pricing.plans.custom.ctaSub")}</span>
                <ArrowRight size={24} className="mt-3 text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.article>
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
                      {t("pricing.addons.from")} {formatPrice(amount)}
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

      <CustomPackageModal open={customOpen} onClose={() => setCustomOpen(false)} />
    </PageLayout>
  );
}
