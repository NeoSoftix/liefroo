import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiTag,
  FiEdit3,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-gray-100 p-8 lg:p-14">
          
          {/* Main Grid: Left side content widened slightly to accommodate two columns */}
          <div className="grid lg:grid-cols-[480px_1fr] gap-16">

            {/* LEFT SIDE: Heading & Multi-location Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl border border-red-200 flex items-center justify-center text-red-600">
                  💬
                </div>
                <span className="uppercase tracking-[3px] text-red-600 font-semibold text-xs">
                  {t("contact.badge")}
                </span>
              </div>

              {/* Heading size reduced from text-5xl to text-4xl */}
              <h2 className="text-4xl font-black leading-tight mb-5">
                {t("contact.headingLine1")}
                <br />
                {t("contact.headingLine2")}
                <br />
                <span className="text-red-600">{t("contact.headingLine3")}</span>
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {t("contact.description")}
              </p>

              <div className="w-12 h-1 bg-red-600 rounded-full mb-8"></div>

              {/* Dual Office Sections */}
              <div className="grid sm:grid-cols-2 gap-8 lg:gap-6">
                
                {/* India Office */}
                <div className="space-y-4">
                  <h4 className="text-gray-900 font-bold text-lg border-b border-gray-100 pb-2">
                    🇮🇳 {t("contact.offices.india.title")}
                  </h4>

                  <div className="flex gap-3 text-sm">
                    <FiMapPin className="text-red-600 shrink-0 mt-1" />
                    <p className="text-gray-600 leading-snug">
                      {t("contact.offices.india.address")}
                      <br />
                      {t("contact.offices.india.city")}
                    </p>
                  </div>

                  <div className="flex gap-3 text-sm items-center">
                    <FiPhone className="text-red-600 shrink-0" />
                    <p className="font-semibold text-gray-900">+91 98765 43210</p>
                  </div>

                  <div className="flex gap-3 text-sm items-center">
                    <FiMail className="text-red-600 shrink-0" />
                    <p className="text-gray-600 break-all">india@yourbusiness.com</p>
                  </div>
                </div>

                {/* Europe Office */}
                <div className="space-y-4">
                  <h4 className="text-gray-900 font-bold text-lg border-b border-gray-100 pb-2">
                    🇪🇺 {t("contact.offices.europe.title")}
                  </h4>

                  <div className="flex gap-3 text-sm">
                    <FiMapPin className="text-red-600 shrink-0 mt-1" />
                    <p className="text-gray-600 leading-snug">
                      {t("contact.offices.europe.address")}
                      <br />
                      {t("contact.offices.europe.city")}
                    </p>
                  </div>

                  <div className="flex gap-3 text-sm items-center">
                    <FiPhone className="text-red-600 shrink-0" />
                    <p className="font-semibold text-gray-900">+49 30 123456</p>
                  </div>

                  <div className="flex gap-3 text-sm items-center">
                    <FiMail className="text-red-600 shrink-0" />
                    <p className="text-gray-600 break-all">eu@yourbusiness.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM SIDE */}
            <div className="bg-white rounded-[30px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 lg:p-10">
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-xl">
                  <HiOutlinePaperAirplane />
                </div>
                <h3 className="text-3xl font-bold">{t("contact.form.title")}</h3>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t("contact.form.name")}
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t("contact.form.email")}
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t("contact.form.phone")}
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="relative">
                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t("contact.form.subject")}
                      className="w-full h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FiEdit3 className="absolute left-4 top-6 text-gray-400" />
                  <textarea
                    rows="6"
                    placeholder={t("contact.form.message")}
                    className="w-full pl-12 pt-5 rounded-xl border border-gray-200 outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-16 rounded-xl bg-red-600 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all"
                >
                  {t("contact.form.send")}
                  <FiArrowRight />
                </button>

                <p className="text-center text-sm text-gray-500 pt-2">
                  🔒 {t("contact.form.privacy")}
                </p>
              </form>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}