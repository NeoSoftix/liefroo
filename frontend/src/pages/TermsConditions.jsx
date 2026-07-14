import {
  FileText,
  Box,
  User,
  CheckCircle,
  CreditCard,
  Copyright,
  Link2,
  ShieldOff,
  Users,
  Power,
  Scale,
  Edit3,
  Mail,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Seo } from "../components/shared";

const sectionIcons = [
  FileText,
  Box,
  User,
  CheckCircle,
  CreditCard,
  Copyright,
  Link2,
  ShieldOff,
  Users,
  Power,
  Scale,
  Edit3,
  Mail,
];

export default function TermsConditions() {
  const { t } = useTranslation();
  const sections = t("termsConditions.sections", { returnObjects: true }).map(
    (section, index) => ({ ...section, icon: sectionIcons[index] })
  );

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={t("termsConditions.title")}
        description={t("termsConditions.description")}
        path="/terms-conditions"
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-28 pb-14 lg:pt-36 lg:pb-20 w-full">
          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
              <div>
                <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  {t("termsConditions.badge")}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 leading-[1.1] text-gray-900">
                  {t("termsConditions.title")}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl leading-relaxed">
                  {t("termsConditions.description")}
                </p>
              </div>

              <div className="relative hidden lg:flex justify-center items-center">
                <div className="absolute w-[260px] h-[260px] bg-red-100/60 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative w-52 h-56 rounded-2xl bg-white border-4 border-gray-800/80 flex flex-col p-4 shadow-xl">
                  <div className="mx-auto -mt-6 w-14 h-3 rounded-full bg-gray-800/80" />
                  <p className="text-center font-black tracking-widest text-gray-800 text-sm mt-3">
                    TERMS
                  </p>
                  <div className="flex-1 flex flex-col gap-3 mt-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-sm bg-red-600 text-white flex items-center justify-center text-[10px] shrink-0">
                          ✓
                        </span>
                        <span className="h-2 flex-1 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-3 -right-4 w-14 h-14 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white" size={26} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="w-full py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[280px_1fr] gap-10 items-start">
            {/* TOC SIDEBAR */}
            <aside className="hidden lg:block sticky top-28 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-red-600 font-bold text-sm mb-4">{t("termsConditions.toc")}</h3>
              <ul className="space-y-1">
                {sections.map(({ icon: Icon, title }) => (
                  <li key={title}>
                    <a
                      href={`#${title.replace(/[^a-zA-Z0-9]+/g, "-")}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Icon size={16} className="shrink-0" />
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* SECTIONS */}
            <div className="divide-y divide-gray-100">
              {sections.map(({ icon: Icon, title, body }, index) => (
                <div
                  key={title}
                  id={title.replace(/[^a-zA-Z0-9]+/g, "-")}
                  className="flex gap-4 sm:gap-5 py-6"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {body}
                    </p>

                    {index === sections.length - 1 && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm sm:text-base">
                        <a
                          href={`mailto:${t("termsConditions.contactEmail")}`}
                          className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
                        >
                          <Mail size={16} />
                          {t("termsConditions.contactEmail")}
                        </a>
                        <a
                          href={`tel:${t("termsConditions.contactPhone").replace(/\s+/g, "")}`}
                          className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
                        >
                          <Phone size={16} />
                          {t("termsConditions.contactPhone")}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
