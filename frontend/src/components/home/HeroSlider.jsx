import { Fragment, useRef } from "react";
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
import { useGoToSection, useLocalizedNavigate, Button } from "../shared";
import { HeroSideDevices, HeroTablet } from "./HeroDevices";
import { ease } from "../motion";

const mouseSpring = { stiffness: 90, damping: 20, mass: 0.6 };

export default function HeroSlider() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const goToSection = useGoToSection();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const slideText = t("hero.slides.1", { returnObjects: true });

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

  // Scroll-out: the headline drifts up and the copy fades. Devices stay put —
  // moving the tablet would resample its screenshots and blur them.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

      <div className="relative max-w-7xl mx-auto px-6 pt-28 lg:pt-24 2xl:pt-28 pb-8 w-full">
        {/* Left: headline with the three small devices right under it.
            Right: the big tablet, spanning both rows. */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-8 lg:gap-y-4 items-start">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 lg:col-start-1 lg:row-start-1 lg:pt-4">
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
              className="text-5xl sm:text-6xl lg:text-[44px] xl:text-[54px] 2xl:text-[60px] font-black mt-5 leading-[0.95] tracking-tight"
              style={{ perspective: 800 }}
            >
              {titleWords.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  {/* Two balanced lines: "The Restaurant / Operating System" */}
                  {i === Math.ceil(titleWords.length / 2) && <br className="hidden sm:block" />}
                  <motion.span
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                    className="inline-block mr-[0.22em] origin-bottom"
                  >
                    {word}
                  </motion.span>
                </Fragment>
              ))}
            </h1>
          </motion.div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full lg:w-[min(54vw,780px,calc((100svh-330px)*1.19))] mx-auto">
            <HeroTablet alt={slideText.title} />
          </div>

          <div className="order-last lg:order-none lg:col-start-1 lg:row-start-2 w-full max-w-[620px] mx-auto lg:mx-0">
            <HeroSideDevices smx={smx} smy={smy} reduceMotion={reduceMotion} />
          </div>

        </div>

        {/* Copy, CTAs and features: one full-width glass bar at the bottom */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 mt-8 lg:mt-6 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur px-6 py-6 lg:px-8 lg:py-5 text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="text-base sm:text-lg font-light text-white/90 lg:max-w-[340px] leading-snug"
          >
            {slideText.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="flex flex-wrap justify-center gap-3 shrink-0"
          >
            <Button
              onClick={() => goToSection("contact")}
              className="
                group relative overflow-hidden flex items-center gap-3
                bg-white text-red-600
                px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap
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
                px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap
                transition-colors duration-300
                hover:bg-white hover:text-red-600
              "
            >
              {t("hero.learnMore")}
            </Button>
          </motion.div>

          {/* Feature row */}
          <div className="grid grid-cols-3 gap-3 lg:gap-2 lg:ml-auto lg:text-center">
            {features.map(({ label, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 + i * 0.1, ease }}
                className={`flex flex-col sm:flex-row lg:flex-col items-center gap-2 sm:gap-3 lg:gap-1.5 ${
                  i === 0 ? "" : "sm:border-l sm:border-white/30 sm:pl-4"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  className="w-10 h-10 rounded-full bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center shrink-0"
                >
                  <Icon size={20} className="text-white" />
                </motion.div>
                <span className="text-xs sm:text-sm font-semibold leading-snug max-w-[120px]">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
