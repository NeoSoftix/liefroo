import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}