import { motion } from "framer-motion";
import { ease, staggerItemVariants } from "./variants";

// Single element that flips up in 3D and un-blurs when it enters the viewport.
export function Reveal({ children, delay = 0, y = 50, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: -18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease }}
      style={{ transformPerspective: 900 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Parent that reveals its <StaggerItem> children one after another.
export function Stagger({ children, className = "", stagger = 0.1, delay = 0, amount = 0.2, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", ...props }) {
  return (
    <motion.div
      variants={staggerItemVariants}
      style={{ transformPerspective: 900 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
