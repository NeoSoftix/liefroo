import { useTranslation } from "react-i18next";
import { ChefHat, Home, Share2, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";
import bgImage from "../assets/QRSSM-bg.png";
import { Seo, useLocalizedNavigate } from "../components/shared";

const CONTACT_EMAIL = "enquiry@liefro.com";
const CONTACT_PHONE = "8557062045";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=A-817%2C+8th+Floor%2C+Bestech+Business+Tower%2C+Mohali%2C+160062";

const FEATURES = [
  { key: "operations", Icon: ChefHat, type: "route", to: "/products" },
  { key: "email", Icon: Mail, type: "external", href: `mailto:${CONTACT_EMAIL}` },
  { key: "callNow", Icon: Phone, type: "external", href: `tel:${CONTACT_PHONE}` },
  { key: "location", Icon: MapPin, type: "external", href: MAPS_URL },
];

const SOCIALS = [
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/liefro/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/liefro_bites/" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/liefro/" },
  { Icon: FaPinterestP, label: "Pinterest", href: "https://www.pinterest.com/liefrobites/" },
];

export default function QrSMM() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();

  const handleShare = async () => {
    const shareData = {
      title: t("qrSmm.shareTitle"),
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — nothing to do
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[#fafafa] px-0 sm:px-4 py-4 sm:py-10">
      <Seo title={t("qrSmm.seoTitle")} path="/qr-smm" noIndex />

      <div
        className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-red-100"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Home"
              className="w-12 h-12 rounded-full bg-white shadow-md border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-50 transition-colors shrink-0"
            >
              <Home size={22} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share"
              className="w-12 h-12 rounded-full bg-white shadow-md border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-50 transition-colors shrink-0"
            >
              <Share2 size={22} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mt-6">
            <img src={logo} alt="Liefro Logo" className="h-14 w-auto" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center bg-red-50 text-red-600 font-semibold text-xs sm:text-sm rounded-full px-4 py-1.5">
              {t("qrSmm.badge")}
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-3 text-3xl sm:text-4xl font-black leading-[1.05] text-gray-900 text-center">
            {t("qrSmm.headingLine1")}
            <br />
            <span className="text-red-600">{t("qrSmm.headingLine2")}</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed text-center">
            {t("qrSmm.description")}
          </p>

          {/* Feature list */}
          <div className="mt-8 space-y-3">
            {FEATURES.map(({ key, Icon, type, to, href }) => {
              const content = (
                <>
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="text-red-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      {t(`qrSmm.features.${key}.title`)}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {t(`qrSmm.features.${key}.subtitle`)}
                    </p>
                  </div>
                  <ChevronRight className="text-red-500 shrink-0" size={18} />
                </>
              );
              const className =
                "flex items-center gap-4 bg-white/80 border border-red-100 rounded-2xl px-4 py-3.5 hover:bg-white transition-colors cursor-pointer";

              return type === "route" ? (
                <button
                  key={key}
                  type="button"
                  onClick={() => navigate(to)}
                  className={`${className} w-full text-left`}
                >
                  {content}
                </button>
              ) : (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {content}
                </a>
              );
            })}
          </div>

          {/* Stay Connected */}
          <div className="flex items-center gap-4 mt-6">
            <span className="flex-1 h-px bg-red-200" />
            <span className="text-red-600 font-semibold text-sm">{t("qrSmm.stayConnected")}</span>
            <span className="flex-1 h-px bg-red-200" />
          </div>

          <div className="flex items-center justify-center gap-4 mt-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
