import { motion, useScroll, useSpring } from "framer-motion";

// Thin red bar along the top edge that fills as the page is scrolled.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-red-500 via-red-600 to-orange-400"
    />
  );
}
