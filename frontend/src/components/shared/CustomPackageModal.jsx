import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Euro, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "./localizedRouting";
import { ease } from "../motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Same services as the header's products menu (header.megaMenu.items).
const SERVICES = [
  "posSystem",
  "onlineOrdering",
  "qrOrdering",
  "menuManagement",
  "reservationSystem",
  "printerIntegration",
  "websiteDevelopment",
  "mobileAppDevelopment",
  "googleAds",
  "metaAds",
  "googleBusinessSEO",
  "googleAnalytics",
  "technicalSupport",
];

// Quick picks that fill the budget field.
const BUDGETS = ["< 100 €", "100 – 250 €", "250 – 500 €", "500 €+"];

const initialForm = { name: "", email: "", phone: "", services: [], budget: "", message: "" };

const inputClass =
  "w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 outline-none focus:border-red-500 text-sm sm:text-base";

function Field({ Icon, ...props }) {
  return (
    <div className="relative">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input {...props} className={inputClass} />
    </div>
  );
}

// Custom package request: contact details, wanted services, budget and a note.
// Sent to /api/custom-package, which mails it to the Liefro team.
export default function CustomPackageModal({ open, onClose }) {
  const { t, i18n } = useTranslation();
  const navigate = useLocalizedNavigate();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");

  // Lock page scroll and close on Escape
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));
  const handleChange = (e) => set(e.target.name, e.target.value);
  const toggleService = (key) =>
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(key) ? prev.services.filter((s) => s !== key) : [...prev.services, key],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.services.length === 0) {
      setStatus("error");
      setError(t("pricing.customForm.servicesRequired"));
      return;
    }
    setStatus("sending");
    setError("");

    // The team reads the mail in English, whatever language the visitor uses
    const en = i18n.getFixedT("en");
    try {
      const res = await fetch(`${API_URL}/api/custom-package`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: form.services.map((key) => en(`header.megaMenu.items.${key}.title`)),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      onClose();
      setForm(initialForm);
      setStatus("idle");
      navigate("/thank-you", {
        state: { name: form.name, email: form.email, subject: t("pricing.customForm.subject") },
      });
    } catch (err) {
      setStatus("error");
      setError(err.message || t("pricing.customForm.error"));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="custom-package-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] flex flex-col overflow-hidden bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            <div className="shrink-0 border-b border-gray-100 px-5 sm:px-8 py-5 flex items-start gap-4">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                  {t("pricing.plans.custom.eyebrow")}
                </p>
                <h2 id="custom-package-title" className="mt-1 text-xl sm:text-2xl font-black text-gray-900">
                  {t("pricing.customForm.title")}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{t("pricing.customForm.subtitle")}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("pricing.customForm.close")}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col">
              {/* Only the fields scroll; header and submit stay put */}
              <div className="modal-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 space-y-7">
                {/* 1. Services */}
                <fieldset>
                  <legend className="font-bold text-gray-900">
                    <span className="text-red-600">1.</span> {t("pricing.customForm.servicesLabel")}
                  </legend>
                  <p className="mt-1 text-sm text-gray-500">{t("pricing.customForm.servicesHint")}</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES.map((key) => {
                      const checked = form.services.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleService(key)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                            checked
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-200 text-gray-700 hover:border-red-200"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                              checked ? "bg-red-600 border-red-600 text-white" : "border-gray-300"
                            }`}
                          >
                            {checked && <Check size={13} strokeWidth={3} />}
                          </span>
                          {t(`header.megaMenu.items.${key}.title`)}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 2. Budget */}
                <fieldset>
                  <legend className="font-bold text-gray-900">
                    <span className="text-red-600">2.</span> {t("pricing.customForm.budgetLabel")}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => set("budget", `${b} ${t("pricing.plans.perMonth")}`)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          form.budget.startsWith(b)
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 text-gray-700 hover:border-red-200"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Field
                      Icon={Euro}
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      required
                      placeholder={t("pricing.customForm.budgetPlaceholder")}
                    />
                  </div>
                </fieldset>

                {/* 3. Contact details */}
                <fieldset>
                  <legend className="font-bold text-gray-900">
                    <span className="text-red-600">3.</span> {t("pricing.customForm.detailsLabel")}
                  </legend>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    <Field
                      Icon={User}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder={t("contact.form.name")}
                    />
                    <Field
                      Icon={Mail}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder={t("contact.form.email")}
                    />
                    <div className="sm:col-span-2">
                      <Field
                        Icon={Phone}
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder={t("contact.form.phone")}
                      />
                    </div>
                    <div className="relative sm:col-span-2">
                      <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        rows={4}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t("pricing.customForm.messagePlaceholder")}
                        className="w-full pl-11 pr-4 pt-3 rounded-xl border border-gray-200 outline-none focus:border-red-500 resize-none text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </fieldset>

                {status === "error" && <p className="text-sm text-red-600 font-medium">⚠️ {error}</p>}
              </div>

              <div className="shrink-0 border-t border-gray-100 px-5 sm:px-8 pt-4 pb-5 space-y-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-14 rounded-xl bg-red-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? t("pricing.customForm.sending") : t("pricing.customForm.submit")}
                  <ArrowRight size={18} />
                </button>
                <p className="text-center text-xs text-gray-500">🔒 {t("contact.form.privacy")}</p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
