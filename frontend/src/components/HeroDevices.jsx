import { motion, useTransform } from "framer-motion";
import { ScreenSlider } from "./motion";

const ease = [0.22, 1, 0.36, 1];

// Photos shown on the tablet's screen (public/hero/).
// Each slide exists in several widths as public/hero/<n>-<width>.webp; the
// largest is the source's own width (never upscaled).
const screenSlides = [
  { n: 1, widths: [640, 960, 1280, 1800] },
  { n: 2, widths: [640, 960, 1280, 1800] },
  { n: 3, widths: [640, 960, 1280, 1800] },
  { n: 4, widths: [640, 960, 1280, 1491] },
].map(({ n, widths }) => ({
  src: `/hero/${n}-1280.webp`,
  srcSet: widths.map((w) => `/hero/${n}-${w}.webp ${w}w`).join(", "),
}));

// Rendered width of the tablet screen: the tablet is min(54vw, 780px) wide on
// desktop and the screen is 90.2% of it.
const screenSizes = "(min-width: 1600px) 704px, (min-width: 1024px) 49vw, 90vw";

// Screen area inside device-tablet.webp, in % of the image.
const tabletScreen = { left: "4.82%", top: "33.07%", width: "90.19%", height: "58.59%" };

// The big POS station. Kept perfectly still: a continuously moving layer gets
// resampled at sub-pixel offsets in Chrome, which smears the slides' fine text.
export function HeroTablet({ alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease }}
      className="relative"
    >
      <img
        src="/hero/pos-station.webp"
        width={1203}
        height={1007}
        alt={alt}
        fetchPriority="high"
        className="block w-full h-auto drop-shadow-[0_40px_45px_rgba(60,0,0,0.45)]"
      />
      <ScreenSlider slides={screenSlides} sizes={screenSizes} style={tabletScreen} />
    </motion.div>
  );
}

// The three smaller devices, laid out on a 16:10 stage in percentages. `depth`
// scales how far a layer follows the mouse, so nearer devices move more.
const smallDevices = [
  { key: "handheld", src: "/hero/device-handheld.webp", width: 691, height: 1536, box: { left: "4%", bottom: "4%", width: "21%" }, z: 30, depth: 1, float: 5.5, delay: 0.5 },
  { key: "phone", src: "/hero/phone-kellner.webp", width: 720, height: 1409, box: { left: "29%", bottom: "8%", width: "20%" }, z: 20, depth: 0.7, float: 5, delay: 0.6 },
  { key: "printer", src: "/hero/device-printer.webp", width: 1000, height: 1043, box: { left: "54%", bottom: "4%", width: "38%" }, z: 10, depth: 1.2, float: 6, delay: 0.7 },
];

function DeviceLayer({ device, smx, smy, reduceMotion }) {
  const x = useTransform(smx, [-0.5, 0.5], [-24 * device.depth, 24 * device.depth]);
  const y = useTransform(smy, [-0.5, 0.5], [-16 * device.depth, 16 * device.depth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: device.delay, ease }}
      className="absolute"
      style={{ ...device.box, zIndex: device.z }}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: device.float, repeat: Infinity, ease: "easeInOut", delay: device.delay }}
        >
          <img
            src={device.src}
            width={device.width}
            height={device.height}
            alt=""
            loading="lazy"
            className="block w-full h-auto drop-shadow-[0_30px_35px_rgba(60,0,0,0.45)]"
          />
        </motion.div>
        {/* Contact shadow on the "floor" */}
        <div className="absolute left-[10%] right-[10%] -bottom-[4%] h-[7%] rounded-[50%] bg-black/35 blur-md -z-10" />
      </motion.div>
    </motion.div>
  );
}

export function HeroSideDevices({ smx, smy, reduceMotion }) {
  return (
    <div className="relative w-full aspect-[16/10]">
      <div className="absolute left-[5%] right-[5%] bottom-0 h-[16%] rounded-[50%] bg-red-950/30 blur-2xl" />
      {smallDevices.map((device) => (
        <DeviceLayer key={device.key} device={device} smx={smx} smy={smy} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
