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

// Rendered width of the tablet screen: stage is the container width, the
// tablet takes 60% of it and the screen 85.2% of the tablet (≈51%).
const screenSizes = "(min-width: 1536px) 712px, (min-width: 1280px) 630px, 51vw";

// Each device is its own transparent cut-out (public/hero/device-*.webp),
// laid out on a 5:3 stage in percentages. `depth` scales how far a layer
// follows the mouse, so nearer devices move more and the group reads as 3D.
const devices = [
  {
    key: "tablet",
    src: "/hero/device-tablet.webp",
    width: 1250,
    height: 1199,
    box: { left: "20%", top: "1%", width: "60%" },
    z: 10,
    // Kept perfectly still: a continuously moving layer gets resampled at
    // sub-pixel offsets in Chrome, which smears the fine UI text of the slides.
    depth: 0,
    float: 0,
    delay: 0.2,
    // Screen area inside device-tablet.webp, in % of the image
    screen: { left: "10%", top: "45.5%", width: "85.2%", height: "47.3%" },
  },
  {
    key: "printer",
    src: "/hero/device-printer.webp",
    width: 1000,
    height: 1043,
    box: { left: "79%", bottom: "3%", width: "20%" },
    z: 20,
    depth: 0.7,
    float: 6,
    delay: 0.45,
  },
  {
    key: "handheld",
    src: "/hero/device-handheld.webp",
    width: 691,
    height: 1536,
    box: { left: "3%", bottom: "3%", width: "16%" },
    z: 30,
    depth: 1,
    float: 5.5,
    delay: 0.35,
  },
  {
    key: "phone",
    src: "/hero/device-phone.webp",
    width: 720,
    height: 1151,
    // Stands on top of the printer (printer spans 79%–99%, its top is at ~38% from the bottom)
    box: { left: "83%", bottom: "39%", width: "12%" },
    z: 40,
    depth: 1.3,
    float: 5,
    delay: 0.55,
  },
];

function DeviceLayer({ device, smx, smy, reduceMotion, alt }) {
  const x = useTransform(smx, [-0.5, 0.5], [-28 * device.depth, 28 * device.depth]);
  const y = useTransform(smy, [-0.5, 0.5], [-18 * device.depth, 18 * device.depth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: device.delay, ease }}
      className="absolute"
      style={{ ...device.box, zIndex: device.z }}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={reduceMotion || !device.float ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: device.float, repeat: Infinity, ease: "easeInOut", delay: device.delay }}
          className="relative"
        >
          <img
            src={device.src}
            width={device.width}
            height={device.height}
            alt={alt}
            fetchPriority={device.key === "tablet" ? "high" : undefined}
            className="block w-full h-auto drop-shadow-[0_30px_35px_rgba(60,0,0,0.45)]"
          />
          {device.screen && <ScreenSlider slides={screenSlides} sizes={screenSizes} style={device.screen} />}
        </motion.div>
        {/* Contact shadow on the "floor" */}
        <div className="absolute left-[10%] right-[10%] -bottom-[4%] h-[7%] rounded-[50%] bg-black/35 blur-md -z-10" />
      </motion.div>
    </motion.div>
  );
}

export default function HeroDevices({ smx, smy, reduceMotion, alt }) {
  return (
    <div className="relative w-full aspect-[5/3]">
      {/* Soft floor glow the devices stand on */}
      <div className="absolute left-[5%] right-[2%] bottom-[-2%] h-[18%] rounded-[50%] bg-red-950/30 blur-2xl" />
      {devices.map((device) => (
        <DeviceLayer
          key={device.key}
          device={device}
          smx={smx}
          smy={smy}
          reduceMotion={reduceMotion}
          alt={device.key === "tablet" ? alt : ""}
        />
      ))}
    </div>
  );
}
