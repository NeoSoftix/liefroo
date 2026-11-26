import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PageLayout } from "../layout";
import { AccordionFaq, CtaBanner, LocalizedLink, SectionHeading, useGoToSection } from "../shared";
import { Reveal, ease } from "../motion";
import { LOCALES, DEFAULT_LOCALE } from "../../routesConfig";

const SITE_URL = "https://www.liefro.com";

// A product shot (transparent cut-out) or an app screenshot (framed card).
function Visual({ src, kind = "screen", alt = "", eager = false, className = "" }) {
  const loading = eager ? "eager" : "lazy";
  if (kind === "device") {
    return <img src={src} alt={alt} loading={loading} className={`block w-full h-auto drop-shadow-[0_35px_40px_rgba(60,0,0,0.25)] ${className}`} />;
  }
  return (
    <div className={`rounded-[24px] overflow-hidden bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)] ${className}`}>
      <img src={src} alt={alt} loading={loading} className="block w-full h-auto" />
    </div>
  );
}

function CheckItem({ children, solid = true }) {
  return (
    <li className="flex items-start gap-3 text-base lg:text-lg text-gray-700">
      <span className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${solid ? "bg-red-600 text-white" : "bg-red-50 text-red-600"}`}>
        <Check size={14} strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

/**
 * Template for the SEO landing pages (/kassensystem-fuer-*). They are not
 * linked from the header menu; they exist to rank for search terms and link
 * into each other and into the product pages. All copy comes from
 * `seoPages.<ns>` in the translations; `config` supplies route, icons, images:
 *   { path, ns, hero: {src, kind}, heroSide?: {src}, benefitIcons: [Icon],
 *     rowImages: [{src, kind}], stepIcons: [Icon], related: [linkKey] }
 * Link keys resolve to `seoPages.common.links.<key>` and LINK_PATHS below.
 */
const LINK_PATHS = {
  restaurants: "/kassensystem-fuer-restaurants",
  doener: "/kassensystem-fuer-doener",
  pizzerien: "/kassensystem-fuer-pizzerien",
  cafes: "/kassensystem-fuer-cafes",
  posSystem: "/pos-system-development",
  taxCompliant: "/tax-compliant-pos",
  onlineTse: "/online-tse",
  dataExport: "/data-export-tax-advisor",
  qrOrdering: "/qr-ordering",
  onlineOrdering: "/online-ordering",
  reservation: "/reservation-system",
  printer: "/printer-integration",
  menuManagement: "/menu-management",
  pricing: "/pricing",
};

export default function SeoLandingPage({ config }) {
  const { t } = useTranslation();
  const { lng: rawLng } = useParams();
  const lng = LOCALES.includes(rawLng) ? rawLng : DEFAULT_LOCALE;
  const goToSection = useGoToSection();
  const k = (key) => `seoPages.${config.ns}.${key}`;
  const list = (key) => t(k(key), { returnObjects: true });
  const toContact = () => goToSection("contact");

  const trust = list("hero.trust");
  const intro = list("intro.paragraphs");
  const glance = list("intro.glance.items");
  const benefits = list("benefits.items");
  const rows = list("rows.items");
  const steps = list("steps.items");
  const stats = list("banner.stats");
  const guide = list("guide.items");
  const faqs = list("faq.items");

  const pageUrl = `${SITE_URL}/${lng}${config.path}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("seoPages.common.breadcrumbHome"), item: `${SITE_URL}/${lng}` },
        { "@type": "ListItem", position: 2, name: t(k("breadcrumb")), item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t(k("seo.title")),
      serviceType: t(k("breadcrumb")),
      description: t(k("seo.description")),
      url: pageUrl,
      areaServed: { "@type": "Country", name: "Deutschland" },
      provider: { "@type": "Organization", name: "Liefro", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  return (
    <PageLayout title={t(k("seo.title"))} description={t(k("seo.description"))} path={config.path} jsonLd={jsonLd} dark>
      {/* Hero */}
      <section className="relative overflow-hidden text-white bg-[radial-gradient(ellipse_at_70%_40%,#ef4444_0%,#dc2626_35%,#b91c1c_75%,#991b1b_100%)]">
        <div className="pointer-events-none absolute top-1/4 right-[5%] w-[600px] h-[600px] rounded-full bg-red-400/40 blur-[160px]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
                <li>
                  <LocalizedLink to="/" className="hover:text-white transition-colors">
                    {t("seoPages.common.breadcrumbHome")}
                  </LocalizedLink>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={14} />
                </li>
                <li aria-current="page" className="text-white font-medium">
                  {t(k("breadcrumb"))}
                </li>
              </ol>
            </nav>
            <span className="inline-flex bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">
              {t(k("hero.badge"))}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight">
              {t(k("hero.heading"))}
              <span className="block text-white/80">{t(k("hero.headingHighlight"))}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-light text-white/90 max-w-xl">{t(k("hero.description"))}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {trust.map((item) => (
                <li key={item} className="flex items-center gap-2 text-base text-white/90">
                  <Check size={18} strokeWidth={3} className="text-white" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={toContact}
                className="group inline-flex items-center gap-2 bg-white text-red-600 px-7 py-3.5 rounded-full text-lg font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                {t(k("hero.cta"))}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <LocalizedLink
                to="/pricing"
                className="inline-flex items-center border-2 border-white/80 px-7 py-3.5 rounded-full text-lg font-semibold transition-colors hover:bg-white hover:text-red-600"
              >
                {t("seoPages.common.pricingCta")}
              </LocalizedLink>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative"
          >
            <Visual {...config.hero} alt={t(k("hero.imageAlt"))} eager className={config.hero.kind === "device" ? "max-w-[560px] mx-auto" : ""} />
            {config.heroSide && (
              <motion.img
                src={config.heroSide.src}
                alt={t(k("hero.sideImageAlt"))}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                className="absolute -bottom-6 -left-4 sm:-left-10 w-[24%] h-auto drop-shadow-[0_30px_35px_rgba(60,0,0,0.45)]"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Intro: long-form copy + "at a glance" card */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 text-sm font-medium">
              {t(k("intro.badge"))}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {t(k("intro.heading"))} <span className="text-red-600">{t(k("intro.headingHighlight"))}</span>
            </h2>
            <div className="mt-6 space-y-5">
              {intro.map((paragraph) => (
                <p key={paragraph} className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-[28px] bg-[#FAFAFA] border border-gray-100 p-6 lg:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.05)] lg:sticky lg:top-28">
            <h3 className="text-xl lg:text-2xl font-black text-gray-900">{t(k("intro.glance.heading"))}</h3>
            <ul className="mt-5 space-y-4">
              {glance.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t(k("benefits.heading"))} highlight={t(k("benefits.headingHighlight"))} description={t(k("benefits.description"))} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ title, text }, i) => {
              const Icon = config.benefitIcons[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                  className="group rounded-3xl bg-white border border-gray-100 p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200"
                >
                  <span className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed">{text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alternating image + text rows */}
      <section className="py-14 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t(k("rows.heading"))} highlight={t(k("rows.headingHighlight"))} />
          <div className="space-y-14 lg:space-y-24">
            {rows.map(({ badge, title, text, points, alt }, i) => {
              const flip = i % 2 === 1;
              const image = config.rowImages[i];
              return (
                <div key={title} className={`grid gap-8 lg:gap-14 items-center ${flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: flip ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease }}
                    className={`${flip ? "lg:order-2" : ""} ${image.kind === "device" ? "max-w-[280px] lg:max-w-xs mx-auto w-full" : ""}`}
                  >
                    <Visual {...image} alt={alt} />
                  </motion.div>
                  <Reveal className={flip ? "lg:order-1" : ""}>
                    <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold">{badge}</span>
                    <h3 className="mt-4 text-2xl lg:text-4xl font-black text-gray-900 leading-tight">{title}</h3>
                    <p className="mt-3 text-lg lg:text-xl text-gray-600 leading-relaxed">{text}</p>
                    <ul className="mt-6 space-y-3">
                      {points.map((point) => (
                        <CheckItem key={point}>{point}</CheckItem>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t(k("steps.heading"))} highlight={t(k("steps.headingHighlight"))} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ title, text }, i) => {
              const Icon = config.stepIcons[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="relative rounded-3xl bg-white border border-gray-100 p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
                >
                  <span className="absolute top-5 right-6 text-5xl font-black text-red-100 leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center">
                    <Icon size={22} />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold text-gray-900">{title}</h3>
                  <p className="relative mt-2 text-base text-gray-600 leading-relaxed">{text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red banner with facts */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-red-600 to-red-700 text-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" />
            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">{t(k("banner.heading"))}</h2>
                <p className="mt-4 text-white/85 text-lg lg:text-xl leading-relaxed">{t(k("banner.text"))}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ value, label }) => (
                  <div key={label} className="rounded-2xl bg-white/10 border border-white/20 p-4 text-center">
                    <p className="text-2xl lg:text-3xl font-black">{value}</p>
                    <p className="mt-1 text-sm text-white/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Buying guide */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading heading={t(k("guide.heading"))} highlight={t(k("guide.headingHighlight"))} description={t(k("guide.description"))} />
          <ol className="space-y-4">
            {guide.map(({ title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="flex gap-5 rounded-3xl bg-[#FAFAFA] border border-gray-100 p-5 lg:p-7"
              >
                <span className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 text-lg font-black">{i + 1}</span>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related pages (internal linking) */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t("seoPages.common.related.heading")} highlight={t("seoPages.common.related.headingHighlight")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.related.map((key) => (
              <LocalizedLink
                key={key}
                to={LINK_PATHS[key]}
                className="group flex flex-col rounded-3xl bg-white border border-gray-100 p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_25px_60px_rgba(220,38,38,0.1)]"
              >
                <span className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{t(`seoPages.common.links.${key}.title`)}</span>
                <span className="mt-2 text-base text-gray-600 leading-relaxed flex-1">{t(`seoPages.common.links.${key}.text`)}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-red-600">
                  {t("seoPages.common.related.more")}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      <AccordionFaq id="faq" heading={t(k("faq.heading"))} items={faqs} />
      <CtaBanner heading={t(k("cta.heading"))} text={t(k("cta.text"))} buttonLabel={t(k("cta.button"))} note={t("seoPages.common.disclaimer")} />
    </PageLayout>
  );
}
