import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// Wraps a page section so it tilts up out of the page in 3D (rotateX + scale)
// as it scrolls into view — gives each block its own "card" moment instead of
// one long wall of content.
export default function SectionTransition({ children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const rotateX = useTransform(progress, [0, 1], [14, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const y = useTransform(progress, [0, 1], [90, 0]);
  const opacity = useTransform(progress, [0, 0.6, 1], [0.2, 0.85, 1]);

  if (reduceMotion) return children;

  return (
    <div ref={ref} style={{ perspective: 1600 }}>
      <motion.div style={{ rotateX, scale, y, opacity, transformOrigin: "50% 0%" }}>
        {children}
      </motion.div>
    </div>
  );
}
