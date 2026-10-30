import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, BarChart3, QrCode, Shield, Users, Zap } from "lucide-react";
import scanBg from "../../assets/scan.png";
import logo from "../../assets/logo.png";
import { useLocalizedNavigate } from "../shared";
import { Reveal, ScreenSlider, Stagger, StaggerItem } from "../motion";

const features = [
  { key: "faster", Icon: Zap },
  { key: "higher", Icon: BarChart3 },
  { key: "lessStaff", Icon: Users },
  { key: "secure", Icon: Shield },
];

// Guest ordering flow (public/qr/): restaurant page → menu → cart. Cropped to
// the screen area of the original screenshots, so no phone frame.
const screenSlides = ["/qr/1-restaurant-screen.webp", "/qr/2-menu-screen.webp", "/qr/3-cart-screen.webp"].map(
  (src) => ({ src })
);

// scan.png is 1665×944; the phone's screen in it, as the corners
// top-left, top-right, bottom-right, bottom-left in image pixels.
const SCAN = { w: 1665, h: 944 };
const SCREEN = { w: 336, h: 726 };
const screenQuad = [
  [929.3, 201.3],
  [1234.8, 195.0],
  [1138.9, 834.1],
  [823.0, 808.9],
];

// matrix3d that maps a w×h box (origin top-left) onto the four corners, so the
// slides follow the phone's perspective.
function quadToMatrix3d(w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const k = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  return `matrix3d(${[a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1].join(",")})`;
}

const screenStyle = {
  left: 0,
  top: 0,
  width: SCREEN.w,
  height: SCREEN.h,
  borderRadius: 30,
  transformOrigin: "0 0",
  transform: quadToMatrix3d(SCREEN.w, SCREEN.h, screenQuad),
};

// scan.png with the screenshots sliding on the phone's screen. Everything is
// laid out in image pixels and scaled to the container:
// - `cover`: fills the container like object-cover, anchored right (desktop)
// - otherwise: shows the `view` rect of the image at the container's width
function ScanScene({ cover = false, view = { x: 0, y: 0, w: SCAN.w, h: SCAN.h }, className = "" }) {
  const ref = useRef(null);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let layout = null;
  if (size) {
    const scale = cover ? Math.max(size.w / view.w, size.h / view.h) : size.w / view.w;
    const x = cover ? size.w - (view.x + view.w) * scale : -view.x * scale;
    const y = cover ? (size.h - view.h * scale) / 2 - view.y * scale : -view.y * scale;
    layout = { transform: `translate(${x}px, ${y}px) scale(${scale})` };
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={cover ? undefined : { aspectRatio: `${view.w} / ${view.h}` }}
    >
      {layout && (
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: SCAN.w, height: SCAN.h, ...layout }}>
          <img src={scanBg} alt="QR Ordering" className="absolute inset-0 w-full h-full" />
          <ScreenSlider slides={screenSlides} interval={3500} style={screenStyle} />
        </div>
      )}
    </div>
  );
}

// The phone plus a bit of the table stand, for the mobile layout.
const phoneView = { x: 780, y: 160, w: 500, h: 720 };

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

// Badge, heading, description, feature icons and CTA — shared by the
// desktop banner and the mobile layout.
function QRCopy() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();

  return (
    <>
      <img src={logo} alt="Liefro" className="h-9 lg:h-10 xl:h-11 w-auto -ml-2" />

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-100/70 border border-red-200 px-4 py-2 text-red-600 font-semibold text-sm">
        <QrCode size={18} />
        {t("qr.badge")}
      </div>

      <h2 className="mt-4 text-[clamp(1.75rem,8.5vw,2.75rem)] lg:text-[clamp(2.25rem,3.4vw,3.75rem)] leading-[0.95] font-black uppercase text-[#0b0b0f] tracking-tight">
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

      <Stagger delay={0.3} className="grid grid-cols-4 gap-2 sm:gap-4 mt-5 max-w-md">
        {features.map(({ key, Icon }) => (
          <StaggerItem key={key} className="text-center">
            <div className="w-11 h-11 lg:w-12 lg:h-12 mx-auto rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-[0_8px_20px_rgba(220,38,38,0.08)]">
              <Icon className="text-red-600" size={20} />
            </div>
            <h4 className="mt-2 font-bold text-xs sm:text-sm text-gray-900">{t(`qr.features.${key}.title`)}</h4>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{t(`qr.features.${key}.subtitle`)}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <button
        type="button"
        onClick={() => navigate("/qr-ordering")}
        className="group mt-6 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-semibold text-sm lg:text-base shadow-[0_15px_35px_rgba(220,38,38,0.35)] transition-all duration-300"
      >
        {t("qr.cta")}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </>
  );
}

export default function QRSection() {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section className="relative py-10 overflow-hidden bg-white">
      {/* Mobile / tablet: copy, then the phone with the ordering screens */}
      <div className="lg:hidden px-6">
        <div className="rounded-[32px] bg-gradient-to-b from-red-50/80 to-white to-45% border border-red-100 px-6 pt-8 pb-6">
          <Reveal>
            <QRCopy />
          </Reveal>
          <ScanScene view={phoneView} className="mt-8 mx-auto max-w-sm rounded-[24px]" />
        </div>
      </div>

      {/* Desktop: copy over the phone + table stand photo */}
      <div className="hidden lg:block max-w-[1600px] mx-auto px-6 w-full">
        <div ref={frameRef} className="relative rounded-[40px] overflow-hidden shadow-2xl bg-[#f5f5f5]">
          {/* Anchored right so the devices stay in view */}
          <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
            <ScanScene cover className="w-full h-full" />
          </motion.div>

          {/* Soft white wash behind the copy */}
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />

          <div className="relative min-h-[540px] w-[46%] flex items-center py-10">
            <Reveal className="pl-16 xl:pl-24 pr-6 w-full">
              <QRCopy />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
