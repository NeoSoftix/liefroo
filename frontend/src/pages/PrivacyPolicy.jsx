import {
  Info,
  User,
  FileText,
  Share2,
  Shield,
  Users,
  Cookie,
  Calendar,
  Link2,
  Baby,
  RefreshCw,
  Mail,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Seo } from "../components/shared";

const sectionIcons = [
  Info,
  User,
  FileText,
  Share2,
  Shield,
  Users,
  Cookie,
  Calendar,
  Link2,
  Baby,
  RefreshCw,
  Mail,
];

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const sections = t("privacyPolicy.sections", { returnObjects: true }).map(
    (section, index) => ({ ...section, icon: sectionIcons[index] })
  );

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Seo
        title={t("privacyPolicy.title")}
        description={t("privacyPolicy.description")}
        path="/privacy-policy"
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-red-50 via-red-50/40 to-white pt-28 pb-14 lg:pt-36 lg:pb-20 w-full">
          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
              <div>
                <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  {t("privacyPolicy.badge")}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 leading-[1.1] text-gray-900">
                  {t("privacyPolicy.title")}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl leading-relaxed">
                  {t("privacyPolicy.description")}
                </p>
              </div>

              <div className="relative hidden lg:flex justify-center items-center">
                <div className="absolute w-[260px] h-[260px] bg-red-100/60 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative w-52 h-52 rounded-full bg-red-100/50 flex items-center justify-center">
                  <ShieldCheck className="text-red-200" size={140} strokeWidth={1} />
                  <Lock className="absolute text-red-300" size={44} strokeWidth={1.5} />
                  <div className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="text-white" size={22} />
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
              <h3 className="text-red-600 font-bold text-sm mb-4">{t("privacyPolicy.toc")}</h3>
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
                          href={`mailto:${t("privacyPolicy.contactEmail")}`}
                          className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
                        >
                          <Mail size={16} />
                          {t("privacyPolicy.contactEmail")}
                        </a>
                        <a
                          href={`tel:${t("privacyPolicy.contactPhone").replace(/\s+/g, "")}`}
                          className="flex items-center gap-2 text-red-600 font-semibold hover:underline"
                        >
                          <Phone size={16} />
                          {t("privacyPolicy.contactPhone")}
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
