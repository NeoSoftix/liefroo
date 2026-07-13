import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      navigate("/thank-you", {
        state: { name: form.name, email: form.email, subject: form.subject },
      });
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="snap-start snap-always min-h-screen flex flex-col justify-center relative py-10 lg:py-16 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="bg-white rounded-3xl lg:rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.08)] border border-gray-100 p-5 sm:p-8 lg:p-10">

          {/* Main Grid: Left side content widened slightly to accommodate two columns */}
          <div className="grid lg:grid-cols-[480px_1fr] gap-8 lg:gap-16">

            {/* LEFT SIDE: Heading & Multi-location Info */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                  💬
                </div>
                <span className="uppercase tracking-[3px] text-red-600 font-semibold text-xs">
                  {t("contact.badge")}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4 sm:mb-5">
                {t("contact.headingLine1")}
                <br />
                {t("contact.headingLine2")}
                <br />
                <span className="text-red-600">{t("contact.headingLine3")}</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {t("contact.description")}
              </p>

              <div className="w-12 h-1 bg-red-600 rounded-full mb-6 sm:mb-8"></div>

              {/* Dual Office Sections */}
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-6">

                {/* India Office */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-gray-900 font-bold text-base sm:text-lg border-b border-gray-100 pb-2">
                    🇮🇳 {t("contact.offices.india.title")}
                  </h4>

                  <div className="flex gap-3 text-xs sm:text-sm">
                    <FiMapPin className="text-red-600 shrink-0 mt-1" />
                    <p className="text-gray-600 leading-snug">
                      {t("contact.offices.india.address")}
                      <br />
                      {t("contact.offices.india.city")}
                    </p>
                  </div>

                  <div className="flex gap-3 text-xs sm:text-sm items-center">
                    <FiPhone className="text-red-600 shrink-0" />
                    <p className="font-semibold text-gray-900">+91 98765 43210</p>
                  </div>

                  <div className="flex gap-3 text-xs sm:text-sm items-center">
                    <FiMail className="text-red-600 shrink-0" />
                    <p className="text-gray-600 break-all">india@yourbusiness.com</p>
                  </div>
                </div>

                {/* Europe Office */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-gray-900 font-bold text-base sm:text-lg border-b border-gray-100 pb-2">
                    🇪🇺 {t("contact.offices.europe.title")}
                  </h4>

                  <div className="flex gap-3 text-xs sm:text-sm">
                    <FiMapPin className="text-red-600 shrink-0 mt-1" />
                    <p className="text-gray-600 leading-snug">
                      {t("contact.offices.europe.address")}
                      <br />
                      {t("contact.offices.europe.city")}
                    </p>
                  </div>

                  <div className="flex gap-3 text-xs sm:text-sm items-center">
                    <FiPhone className="text-red-600 shrink-0" />
                    <p className="font-semibold text-gray-900">+49 30 123456</p>
                  </div>

                  <div className="flex gap-3 text-xs sm:text-sm items-center">
                    <FiMail className="text-red-600 shrink-0" />
                    <p className="text-gray-600 break-all">eu@yourbusiness.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM SIDE */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-5 sm:p-8 lg:p-10">

              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-base sm:text-xl shrink-0">
                  <HiOutlinePaperAirplane />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{t("contact.form.title")}</h3>
                <div className="hidden sm:block flex-1 h-[2px] bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.form.name")}
                      className="w-full h-12 sm:h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.form.email")}
                      className="w-full h-12 sm:h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("contact.form.phone")}
                      className="w-full h-12 sm:h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>

                  <div className="relative">
                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subject")}
                      className="w-full h-12 sm:h-14 pl-12 rounded-xl border border-gray-200 outline-none focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FiEdit3 className="absolute left-4 top-5 sm:top-6 text-gray-400" />
                  <textarea
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.form.message")}
                    className="w-full pl-12 pt-4 sm:pt-5 rounded-xl border border-gray-200 outline-none focus:border-red-500 resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-14 sm:h-16 rounded-xl bg-red-600 text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : t("contact.form.send")}
                  <FiArrowRight />
                </button>

                {status === "success" && (
                  <p className="text-center text-sm text-green-600 font-medium">
                    ✅ Your message has been sent successfully!
                  </p>
                )}

                {status === "error" && (
                  <p className="text-center text-sm text-red-600 font-medium">
                    ⚠️ {errorMessage}
                  </p>
                )}

                <p className="text-center text-xs sm:text-sm text-gray-500 pt-2">
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