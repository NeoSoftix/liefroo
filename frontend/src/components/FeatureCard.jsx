import { motion } from "framer-motion";

export default function FeatureCard({
  title,
  subtitle,
  Icon,
  className = "",
  cardClassName = "",
  iconClassName = "",
  absolute = false,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className={`
        ${absolute ? "absolute z-30" : ""}
        ${className}
      `}
    >
      <div
        className={`
          group
          bg-white
          
          border-red-100
          rounded-3xl
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          hover:bg-red-600
          hover:border-red-600
          transition-all
          duration-300
          ${cardClassName}
        `}
      >
        {Icon && (
          <div
            className={`
              w-14
              h-14
              rounded-2xl
              bg-red-50
              flex
              items-center
              justify-center
              group-hover:bg-white
              transition-all
              ${iconClassName}
            `}
          >
            <Icon
              size={26}
              className="text-red-600"
            />
          </div>
        )}

        <div className={Icon ? "mt-5" : ""}>
          <h3 className="font-bold text-lg text-[#111827] group-hover:text-white transition-all">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-2 group-hover:text-red-100 transition-all">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}