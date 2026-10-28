import { Reveal } from "../motion";

/**
 * Centered section title with a red highlighted tail and optional lead text —
 * used by the pricing and tax-compliance pages.
 */
export default function SectionHeading({ heading, highlight, description }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] leading-tight">
        {heading} <span className="text-red-600">{highlight}</span>
      </h2>
      {description && <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">{description}</p>}
    </Reveal>
  );
}
