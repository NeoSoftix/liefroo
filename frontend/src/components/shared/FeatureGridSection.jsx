import FeatureCard from "../FeatureCard";

/**
 * Generic eyebrow + heading + FeatureCard grid section — used by every
 * feature-highlights style block across the service pages.
 */
export default function FeatureGridSection({
  eyebrow,
  heading,
  headingRed,
  items = [],
  gridClassName = "sm:grid-cols-2 lg:grid-cols-3",
  centered = false,
  bgClassName = "bg-white",
}) {
  return (
    <section className={`relative z-10 py-28 ${bgClassName}`}>
      <div className="max-w-7xl mx-auto px-6">
        {(eyebrow || heading) && (
          <div className="text-center max-w-2xl mx-auto mb-16">
            {eyebrow && (
              <span className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold">
                {eyebrow}
              </span>
            )}

            {heading && (
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
                {heading}
                {headingRed && <span className="text-red-600 block">{headingRed}</span>}
              </h2>
            )}
          </div>
        )}

        <div className={`grid ${gridClassName} gap-6`}>
          {items.map(({ key, Icon, title, desc }) => (
            <FeatureCard
              key={key ?? title}
              Icon={Icon}
              title={title}
              subtitle={desc}
              cardClassName={centered ? "h-full text-center" : "h-full"}
              iconClassName={centered ? "mx-auto" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
