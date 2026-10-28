import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const spring = { stiffness: 220, damping: 22, mass: 0.5 };

// Mouse-tracked 3D tilt with an optional moving glare highlight.
// Touch/pen pointers are ignored so mobile scrolling stays untouched.
export default function TiltCard({
  children,
  className = "",
  glareClassName = "rounded-3xl",
  max = 10,
  glare = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), transparent 55%)`;

  const handleMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduceMotion) {
    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className={`pointer-events-none absolute inset-0 mix-blend-soft-light ${glareClassName}`}
        />
      )}
    </motion.div>
  );
}
