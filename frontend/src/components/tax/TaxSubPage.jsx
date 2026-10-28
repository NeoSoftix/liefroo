import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../layout";
import { AccordionFaq, ContactSection, CtaBanner, SectionHeading, useGoToSection } from "../shared";
import { Reveal, ease } from "../motion";

// A product shot (transparent cut-out) or an app screenshot (framed card).
function Visual({ src, kind = "screen", className = "" }) {
  if (kind === "device") {
    return <img src={src} alt="" loading="lazy" className={`block w-full h-auto drop-shadow-[0_35px_40px_rgba(60,0,0,0.25)] ${className}`} />;
  }
  return (
    <div className={`rounded-[24px] overflow-hidden bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.12)] ${className}`}>
      <img src={src} alt="" loading="lazy" className="block w-full h-auto" />
    </div>
  );
}

/**
 * Shared layout for the tax-compliance sub-pages. All copy comes from
 * `taxPages.<ns>` in the translations; `config` supplies the route, icons
 * and images:
 *   { path, ns, hero: {src, kind}, heroSide?: {src}, benefitIcons: [Icon],
 *     rowImages: [{src, kind}], gallery: [src], stepIcons: [Icon] }
 */
export default function TaxSubPage({ config }) {
  const { t } = useTranslation();
  const goToSection = useGoToSection();
  const k = (key) => `taxPages.${config.ns}.${key}`;
  const list = (key) => t(k(key), { returnObjects: true });
  const toContact = () => goToSection("contact");

  const benefits = list("benefits.items");
  const rows = list("rows.items");
  const steps = list("steps.items");
  const stats = list("banner.stats");
  const faqs = list("faq.items");

  return (
    <PageLayout title={t(k("seo.title"))} description={t(k("seo.description"))} path={config.path} dark>
      {/* Hero */}
      <section className="relative overflow-hidden text-white bg-[radial-gradient(ellipse_at_70%_40%,#ef4444_0%,#dc2626_35%,#b91c1c_75%,#991b1b_100%)]">
        <div className="pointer-events-none absolute top-1/4 right-[5%] w-[600px] h-[600px] rounded-full bg-red-400/40 blur-[160px]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <span className="inline-flex bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              {t(k("hero.badge"))}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl xl:text-6xl font-black leading-[1] tracking-tight">
              {t(k("hero.heading"))}
              <span className="block text-white/80">{t(k("hero.headingHighlight"))}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-light text-white/90 max-w-xl">{t(k("hero.description"))}</p>
            <button
              type="button"
              onClick={toContact}
              className="group mt-8 inline-flex items-center gap-2 bg-white text-red-600 px-7 py-3.5 rounded-full font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {t(k("hero.cta"))}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative"
          >
            <Visual {...config.hero} />
            {config.heroSide && (
              <motion.img
                src={config.heroSide.src}
                alt=""
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                className="absolute -bottom-6 -left-4 sm:-left-10 w-[24%] h-auto drop-shadow-[0_30px_35px_rgba(60,0,0,0.45)]"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading heading={t(k("benefits.heading"))} highlight={t(k("benefits.headingHighlight"))} />
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
                  className="group rounded-3xl bg-white border border-gray-100 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200"
                >
                  <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
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
            {rows.map(({ badge, title, text, points }, i) => {
              const flip = i % 2 === 1;
              const image = config.rowImages[i];
              return (
                <div
                  key={title}
                  className={`grid gap-8 lg:gap-14 items-center ${flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: flip ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease }}
                    className={`${flip ? "lg:order-2" : ""} ${image.kind === "device" ? "max-w-md mx-auto w-full" : ""}`}
                  >
                    <Visual {...image} />
                  </motion.div>
                  <Reveal className={flip ? "lg:order-1" : ""}>
                    <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">{badge}</span>
                    <h3 className="mt-4 text-2xl lg:text-3xl font-black text-gray-900 leading-tight">{title}</h3>
                    <p className="mt-3 text-base lg:text-lg text-gray-600 leading-relaxed">{text}</p>
                    <ul className="mt-6 space-y-3">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-gray-700">
                          <span className="mt-0.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {point}
                        </li>
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
          <div className={`grid sm:grid-cols-2 gap-5 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
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
                  <h3 className="relative mt-5 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="relative mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red banner with stats */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-red-600 to-red-700 text-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" />
            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">{t(k("banner.heading"))}</h2>
                <p className="mt-4 text-white/85 text-base lg:text-lg leading-relaxed">{t(k("banner.text"))}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ value, label }) => (
                  <div key={label} className="rounded-2xl bg-white/10 border border-white/20 p-4 text-center">
                    <p className="text-xl lg:text-2xl font-black">{value}</p>
                    <p className="mt-1 text-xs text-white/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Screenshot gallery */}
      <section className="pb-14 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] aspect-[16/10]"
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-left-top" />
            </motion.div>
          ))}
        </div>
      </section>

      <AccordionFaq heading={t(k("faq.heading"))} items={faqs} />
      <CtaBanner
        heading={t(k("cta.heading"))}
        text={t(k("cta.text"))}
        buttonLabel={t(k("cta.button"))}
        note={t("taxCompliant.disclaimer")}
      />

      <ContactSection />
    </PageLayout>
  );
}
