import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CalendarClock, CheckCircle2, Home, Loader2, Mail, Package, Receipt, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Seo, LocalizedLink } from "../components/shared";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Stripe Checkout sends the buyer here with ?session_id=… after paying. The
// session is looked up on the backend, so only real payments are confirmed.
export default function PaymentSuccess() {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState({ status: sessionId ? "loading" : "failed" });

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    fetch(`${API_URL}/api/checkout/session/${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setState(data.success && data.paid ? { status: "paid", ...data } : { status: "failed" });
      })
      .catch(() => !cancelled && setState({ status: "failed" }));
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const locale = i18n.resolvedLanguage === "de" ? "de-DE" : "en-GB";
  const amount =
    state.status === "paid" ? new Intl.NumberFormat(locale, { style: "currency", currency: state.currency }).format(state.amount) : "";
  const nextPayment = state.nextPaymentAt
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(state.nextPaymentAt))
    : "";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] px-4 py-12 relative overflow-hidden">
      <Seo title={t("paymentSuccess.seo.title")} description={t("paymentSuccess.seo.description")} path="/payment-success" noIndex />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-100/50 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-400" />

        <div className="p-8 sm:p-10 text-center">
          {state.status === "loading" && (
            <div className="py-10 flex flex-col items-center gap-4 text-gray-600">
              <Loader2 size={32} className="animate-spin text-red-600" />
              <p className="font-medium">{t("paymentSuccess.checking")}</p>
            </div>
          )}

          {state.status === "paid" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-6">
                <CheckCircle2 size={30} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{t("paymentSuccess.title")}</h1>
              <p className="text-gray-700 font-medium mt-3">
                {t("paymentSuccess.thanks", { name: state.name ? `, ${state.name}` : "" })}
              </p>
              <p className="text-gray-500 text-sm mt-2">{t("paymentSuccess.next")}</p>

              <div className="mt-8 bg-[#fafafa] border border-gray-100 rounded-2xl p-5 text-left space-y-3">
                {state.plan && (
                  <div className="flex items-center gap-3">
                    <Package size={16} className="text-red-600 shrink-0" />
                    <span className="text-sm text-gray-500">{t("paymentSuccess.package")}</span>
                    <span className="ml-auto text-sm text-gray-900 font-semibold">
                      {state.plan}
                      {state.billing && ` · ${t(`pricing.plans.billing.${state.billing}`)}`}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Receipt size={16} className="text-red-600 shrink-0" />
                  <span className="text-sm text-gray-500">{t("paymentSuccess.amount")}</span>
                  <span className="ml-auto text-sm text-gray-900 font-semibold">{amount}</span>
                </div>
                {nextPayment && (
                  <div className="flex items-center gap-3">
                    <CalendarClock size={16} className="text-red-600 shrink-0" />
                    <span className="text-sm text-gray-500">{t("paymentSuccess.nextPayment")}</span>
                    <span className="ml-auto text-sm text-gray-900 font-semibold">{nextPayment}</span>
                  </div>
                )}
                {state.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-red-600 shrink-0" />
                    <span className="text-sm text-gray-500">{t("paymentSuccess.email")}</span>
                    <span className="ml-auto text-sm text-gray-900 font-semibold break-all">{state.email}</span>
                  </div>
                )}
                {state.renews && (state.billing === "month" || state.billing === "year") && (
                  <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                    <Repeat size={16} className="text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-green-700 font-medium">
                      {t(`paymentSuccess.renews.${state.billing}`, { amount, date: nextPayment })}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {state.status === "failed" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                <AlertCircle size={30} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{t("paymentSuccess.notPaidTitle")}</h1>
              <p className="text-gray-600 mt-3">{t("paymentSuccess.notPaid")}</p>
              <LocalizedLink
                to="/pricing"
                className="mt-6 inline-flex items-center justify-center w-full h-12 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
              >
                {t("paymentSuccess.backToPricing")}
              </LocalizedLink>
            </>
          )}

          {state.status !== "loading" && (
            <LocalizedLink
              to="/"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
            >
              <Home size={18} />
              {t("paymentSuccess.home")}
            </LocalizedLink>
          )}
        </div>
      </motion.div>
    </div>
  );
}
