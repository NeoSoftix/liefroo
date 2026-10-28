export const ease = [0.22, 1, 0.36, 1];

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -25, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
};

// Variants for elements that "pop" out of a center point (e.g. orbit cards).
// The transition lives inside `show` so it doesn't leak into whileHover.
export function popInVariants(delay = 0) {
  return {
    hidden: { opacity: 0, scale: 0.4, z: -200 },
    show: {
      opacity: 1,
      scale: 1,
      z: 0,
      transition: { type: "spring", stiffness: 120, damping: 14, delay },
    },
  };
}
