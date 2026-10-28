import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, BarChart3, QrCode, Shield, Users, Zap } from "lucide-react";
import scanBg from "../../assets/scan.png";
import logo from "../../assets/logo.png";
import { useLocalizedNavigate } from "../shared";
import { Reveal, Stagger, StaggerItem } from "../motion";

const features = [
  { key: "faster", Icon: Zap },
  { key: "higher", Icon: BarChart3 },
  { key: "lessStaff", Icon: Users },
  { key: "secure", Icon: Shield },
];

// Three short red strokes, used as an accent next to the heading.
function Splash({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M10 4 L13 15" />
        <path d="M30 8 L22 18" />
        <path d="M36 26 L25 26" />
      </g>
    </svg>
  );
}

export default function QRSection() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section className="hidden lg:flex flex-col justify-center relative py-10 overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-6 w-full">
        <div ref={frameRef} className="relative rounded-[40px] overflow-hidden shadow-2xl bg-[#f5f5f5]">
          {/* Phone + table stand photo, anchored right so the devices stay in view */}
          <motion.img
            src={scanBg}
            alt="QR Ordering"
            style={{ scale: bgScale, y: bgY }}
            className="absolute inset-0 w-full h-full object-cover object-right"
          />

          {/* Soft white wash behind the copy */}
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />

          {/* Copy */}
          <div className="relative min-h-[540px] w-[46%] flex items-center py-10">
            <Reveal className="pl-16 xl:pl-24 pr-6 w-full">
              <img src={logo} alt="Liefro" className="h-10 xl:h-11 w-auto -ml-2" />

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-100/70 border border-red-200 px-4 py-2 text-red-600 font-semibold text-sm">
                <QrCode size={18} />
                {t("qr.badge")}
              </div>

              <h2 className="mt-4 text-[clamp(2.25rem,3.4vw,3.75rem)] leading-[0.95] font-black uppercase text-[#0b0b0f] tracking-tight">
                {t("qr.headingLine1")}
                <br />
                <span className="relative inline-block">
                  {t("qr.headingLine2")}
                  <Splash className="absolute -right-10 top-0 w-8 h-8 text-red-600" />
                </span>
                <br />
                {t("qr.headingLine3")}
                <br />
                <span className="text-red-600">{t("qr.headingLine4")}</span>
              </h2>

              <p className="mt-4 text-sm xl:text-base text-gray-600 leading-relaxed max-w-md">
                {t("qr.description")}
              </p>

              <Stagger delay={0.3} className="grid grid-cols-4 gap-4 mt-5 max-w-md">
                {features.map(({ key, Icon }) => (
                  <StaggerItem key={key} className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-[0_8px_20px_rgba(220,38,38,0.08)]">
                      <Icon className="text-red-600" size={20} />
                    </div>
                    <h4 className="mt-2 font-bold text-sm text-gray-900">{t(`qr.features.${key}.title`)}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">{t(`qr.features.${key}.subtitle`)}</p>
                  </StaggerItem>
                ))}
              </Stagger>

              <button
                type="button"
                onClick={() => navigate("/qr-ordering")}
                className="group mt-6 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-[0_15px_35px_rgba(220,38,38,0.35)] transition-all duration-300"
              >
                {t("qr.cta")}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
