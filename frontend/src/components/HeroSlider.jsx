import { useRef } from "react";
import { slides } from "../../data/slides";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, CalendarDays, Percent, Zap } from "lucide-react";
import Button from "./Button";
import { useGoToSection, useLocalizedNavigate } from "./shared";
import HeroDevices from "./HeroDevices";

const ease = [0.22, 1, 0.36, 1];
const mouseSpring = { stiffness: 90, damping: 20, mass: 0.6 };

export default function HeroSlider() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const goToSection = useGoToSection();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const slideText = t(`hero.slides.${slides[0].id}`, { returnObjects: true });

  const features = [
    { label: t("hero.badges.liveIn30"), Icon: Zap },
    { label: t("hero.badges.zeroCommission"), Icon: Percent },
    { label: t("ecosystem.features.reservations"), Icon: CalendarDays },
  ];

  // Mouse position relative to the section center, -0.5 … 0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, mouseSpring);
  const smy = useSpring(my, mouseSpring);

  // Cursor-following soft light (in px)
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.10), transparent 70%)`;

  const glowX = useTransform(smx, [-0.5, 0.5], [50, -50]);
  const glowY = useTransform(smy, [-0.5, 0.5], [30, -30]);

  // Scroll-out: text drifts up and fades, devices drift down. The device group
  // only gets 2D translates — 3D rotate/scale makes Chrome rasterise it at low
  // resolution and the screenshots on the screens turn blurry.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse" || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const titleWords = String(slideText.title).split(" ");

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex flex-col justify-center overflow-hidden min-h-[100svh] text-white bg-[radial-gradient(ellipse_at_70%_40%,#ef4444_0%,#dc2626_35%,#b91c1c_75%,#991b1b_100%)]"
    >
      {/* Background light: parallax glow + cursor spotlight */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute top-1/4 right-[5%] w-[700px] h-[700px] rounded-full bg-red-400/40 blur-[160px]"
      />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-950/40 blur-[140px]" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 lg:pt-32 2xl:pt-36 pb-10 2xl:pb-16 w-full">
        {/* Top row: headline left, copy + CTAs + features right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              {slideText.subtitle}
            </motion.span>

            {/* Word-by-word 3D flip-up headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[60px] xl:text-[72px] 2xl:text-[80px] font-black mt-6 leading-[0.95] tracking-tight"
              style={{ perspective: 800 }}
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                  className="inline-block mr-[0.22em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              className="text-lg sm:text-xl xl:text-2xl font-light text-white/90 max-w-xl leading-snug"
            >
              {slideText.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Button
                onClick={() => goToSection("contact")}
                className="
                  group relative overflow-hidden flex items-center gap-3
                  bg-white text-red-600
                  px-7 py-3.5 sm:px-9 sm:py-4 rounded-full font-semibold text-base sm:text-lg
                  shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                  transition-shadow duration-300
                "
              >
                {t("hero.bookDemo")}
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => navigate("/products")}
                className="
                  border-2 border-white/80 text-white
                  px-7 py-3.5 sm:px-9 sm:py-4 rounded-full font-semibold text-base sm:text-lg
                  transition-colors duration-300
                  hover:bg-white hover:text-red-600
                "
              >
                {t("hero.learnMore")}
              </Button>
            </motion.div>

            {/* Feature row */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {features.map(({ label, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 + i * 0.1, ease }}
                  className={`flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center gap-2 sm:gap-3 ${
                    i === 0 ? "" : "sm:border-l sm:border-white/30 sm:pl-4"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center shrink-0"
                  >
                    <Icon size={22} className="text-white" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-semibold leading-snug">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Devices: full container width so the screens are large enough to read */}
        <motion.div style={{ y: visualY }} className="relative mt-10 lg:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            <HeroDevices smx={smx} smy={smy} reduceMotion={reduceMotion} alt={slideText.title} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
