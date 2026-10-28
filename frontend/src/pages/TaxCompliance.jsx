import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus, ShieldCheck, ReceiptText, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { Seo, useGoToSection } from "../components/shared";
import { Reveal } from "../components/motion";

const ease = [0.22, 1, 0.36, 1];

const pillars = [
  { key: "tse", Icon: ShieldCheck },
  { key: "receipt", Icon: ReceiptText },
  { key: "reporting", Icon: Landmark },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`rounded-2xl border transition-colors ${open ? "bg-white border-red-200 shadow-[0_15px_40px_rgba(220,38,38,0.08)]" : "bg-white border-gray-100"}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-4 px-5 py-4 lg:px-6 lg:py-5 text-left">
        <span className="flex-1 font-bold text-gray-900">{q}</span>
        <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-red-600 text-white rotate-45" : "bg-red-50 text-red-600"}`}>
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 lg:px-6 text-sm lg:text-base text-gray-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TaxCompliance() {
  const { t } = useTranslation();
  const goToSection = useGoToSection();
  const [openFaq, setOpenFaq] = useState(0);
  const howItems = t("taxCompliant.how.items", { returnObjects: true });
  const faqs = t("taxCompliant.faq.items", { returnObjects: true });
  const stats = ["stat1", "stat2", "stat3"];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo title={t("taxCompliant.seo.title")} description={t("taxCompliant.seo.description")} path="/tax-compliant-pos" />
      <Header dark />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden text-white bg-[radial-gradient(ellipse_at_70%_40%,#ef4444_0%,#dc2626_35%,#b91c1c_75%,#991b1b_100%)]">
          <div className="pointer-events-none absolute top-1/4 right-[5%] w-[600px] h-[600px] rounded-full bg-red-400/40 blur-[160px]" />
          <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                <ShieldCheck size={16} />
                {t("taxCompliant.hero.badge")}
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight">
                {t("taxCompliant.hero.heading")}
                <span className="block text-white/80">{t("taxCompliant.hero.headingHighlight")}</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl font-light text-white/90 max-w-xl">{t("taxCompliant.hero.description")}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => goToSection("contact")}
                  className="group inline-flex items-center gap-2 bg-white text-red-600 px-7 py-3.5 rounded-full font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  {t("taxCompliant.hero.cta")}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a href="#faq" className="inline-flex items-center border-2 border-white/80 px-7 py-3.5 rounded-full font-semibold transition-colors hover:bg-white hover:text-red-600">
                  {t("taxCompliant.hero.secondary")}
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="relative"
            >
              <img src="/hero/pos-station.webp" alt="" width={1203} height={1007} className="w-full max-w-[560px] mx-auto h-auto drop-shadow-[0_40px_50px_rgba(60,0,0,0.45)]" />
              <div className="absolute bottom-[12%] left-0 sm:-left-4 flex items-center gap-3 rounded-2xl bg-white text-gray-900 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                <span className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </span>
                <span className="font-bold text-sm">KassenSichV · TSE</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Four obligations */}
        <section className="py-14 lg:py-20 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] leading-tight">
                {t("taxCompliant.pillars.heading")} <span className="text-red-600">{t("taxCompliant.pillars.headingHighlight")}</span>
              </h2>
            </Reveal>
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
              {pillars.map(({ key, Icon }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group flex flex-col rounded-3xl bg-white border border-gray-100 p-6 lg:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_25px_60px_rgba(220,38,38,0.1)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={26} />
                    </span>
                    <span className="text-5xl font-black text-red-100 leading-none ml-auto">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-black text-gray-900">{t(`taxCompliant.pillars.items.${key}.title`)}</h3>
                  <p className="mt-3 text-sm lg:text-base text-gray-600 leading-relaxed">{t(`taxCompliant.pillars.items.${key}.text`)}</p>
                  <ul className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                    {t(`taxCompliant.pillars.items.${key}.points`, { returnObjects: true }).map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How Liefro helps */}
        <section className="py-14 lg:py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              className="rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.1)]"
            >
              <img src="/ecosystem/analytics.webp" alt="" loading="lazy" className="block w-full h-auto" />
            </motion.div>
            <Reveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
                {t("taxCompliant.how.badge")}
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {t("taxCompliant.how.heading")} <span className="text-red-600">{t("taxCompliant.how.headingHighlight")}</span>
              </h2>
              <ul className="mt-7 space-y-4">
                {howItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base lg:text-lg text-gray-700">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Tax inspection */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-red-600 to-red-700 text-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" />
              <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                    {t("taxCompliant.inspection.heading")}
                    <span className="block text-white/80">{t("taxCompliant.inspection.headingHighlight")}</span>
                  </h2>
                  <p className="mt-4 text-white/85 text-base lg:text-lg leading-relaxed">{t("taxCompliant.inspection.text")}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((k) => (
                    <div key={k} className="rounded-2xl bg-white/10 border border-white/20 p-4 text-center">
                      <p className="text-xl lg:text-2xl font-black">{t(`taxCompliant.inspection.${k}.value`)}</p>
                      <p className="mt-1 text-xs text-white/80">{t(`taxCompliant.inspection.${k}.label`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-14 lg:py-20 bg-[#FAFAFA] scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t("taxCompliant.faq.heading")}</h2>
            </Reveal>
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <FaqItem key={q} q={q} a={a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="rounded-[32px] bg-gradient-to-br from-red-100/70 via-red-50 to-orange-50 border border-red-200 px-6 py-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t("taxCompliant.cta.heading")}</h2>
              <p className="mt-3 text-gray-600">{t("taxCompliant.cta.text")}</p>
              <button
                type="button"
                onClick={() => goToSection("contact")}
                className="mt-7 inline-flex items-center gap-2 bg-red-600 text-white border border-red-600 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                {t("taxCompliant.cta.button")}
                <ArrowRight size={18} />
              </button>
              <p className="mt-6 text-xs text-gray-500">{t("taxCompliant.disclaimer")}</p>
            </Reveal>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
