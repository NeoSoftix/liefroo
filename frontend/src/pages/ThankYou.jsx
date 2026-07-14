import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PartyPopper, User, Mail, MessageSquare, CheckCircle2, Home } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/shared";

export default function ThankYou() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, subject } = location.state || {};

  useEffect(() => {
    if (!name) {
      navigate("/", { replace: true });
    }
  }, [name, navigate]);

  if (!name) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] px-4 py-12 relative overflow-hidden">
      <Seo
        title={t("thankYou.seo.title")}
        description={t("thankYou.seo.description")}
        path="/thank-you"
        noIndex
      />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-100/50 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-400" />

        <div className="p-8 sm:p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
            <PartyPopper size={28} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-red-600 leading-tight">
            Thank You, {name}!
          </h1>

          <p className="text-gray-700 font-medium mt-3">
            Your details have been submitted successfully.
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Our team will get back to you shortly.
          </p>

          <div className="mt-8 bg-[#fafafa] border border-gray-100 rounded-2xl p-5 text-left space-y-3">
            <div className="flex items-center gap-3">
              <User size={16} className="text-red-600 shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{name}</span>
            </div>

            {email && (
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-red-600 shrink-0" />
                <span className="text-sm text-gray-700 font-medium break-all">{email}</span>
              </div>
            )}

            {subject && (
              <div className="flex items-center gap-3">
                <MessageSquare size={16} className="text-red-600 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{subject}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="text-sm text-green-600 font-semibold">Confirmation email sent!</span>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
