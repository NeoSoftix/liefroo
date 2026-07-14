import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

/**
 * Single reusable card used across the Services grid — icon/image, title,
 * description, feature bullets, and an "Explore More" CTA.
 */
export default function ServiceCard({
  number,
  icon: Icon,
  image,
  title,
  description,
  bullets = [],
  href,
  exploreLabel = "Explore Now",
}) {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-100 rounded-2xl p-5 sm:p-6 bg-white flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
        ) : (
          <Icon className="text-red-600" size={20} />
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-sm sm:text-base mt-3">
        {number}. {title}
      </h3>

      <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-1.5 mt-3 mb-5 flex-1">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
            <CheckCircle2 size={14} className="text-red-600 shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => navigate(href)}
        className="w-full flex items-center justify-center gap-2 border border-red-600 text-red-600 px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm hover:bg-red-600 hover:text-white transition-all duration-300"
      >
        {exploreLabel}
        <ArrowRight size={14} />
      </Button>
    </div>
  );
}
