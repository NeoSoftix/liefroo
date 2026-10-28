import { useTranslation } from "react-i18next";
import PageLayout from "./PageLayout";
import { ServiceHero, FeatureGridSection, ProcessSteps, TestimonialStatsBar, FAQ } from "../shared";
import { translateItems } from "../../utils/translateItems";

/**
 * Template for the service pages: hero → feature grid → "how it works" steps
 * → page-specific highlights → testimonial → FAQ.
 *
 * All copy is read from `<ns>.*` in the translations (seo, hero, featureGrid,
 * process, testimonial); props only carry keys, icons and layout:
 *   hero        { checklist: [key], features: [{ key, Icon }], secondaryCta?, ...ServiceHero props }
 *   customHero  element rendered instead of the standard hero
 *   features    { items: [{ key, Icon }], gridClassName?, withHeading? }
 *   steps       { items: [{ key, Icon }], gridClassName? }
 *   highlights  element rendered after the steps (usually a <HighlightsBand>)
 *   testimonial { stats: [key], gridClassName? } — omit to skip the section
 */
export default function ServicePage({ ns, path, hero = {}, customHero, features, steps, highlights, testimonial }) {
  const { t } = useTranslation();
  const tr = (key) => t(`${ns}.${key}`);
  const { checklist = [], features: heroFeatures = [], secondaryCta = false, ...heroProps } = hero;

  return (
    <PageLayout title={tr("seo.title")} description={tr("seo.description")} path={path}>
      {customHero ?? (
        <ServiceHero
          badge={tr("hero.badge")}
          headingLine1={tr("hero.headingLine1")}
          headingLine2={tr("hero.headingLine2")}
          description={tr("hero.description")}
          checklist={checklist.map((key) => tr(`hero.checklist.${key}`))}
          ctaLabel={tr("hero.cta")}
          secondaryCtaLabel={secondaryCta ? tr("hero.secondaryCta") : undefined}
          features={translateItems(t, `${ns}.hero.features`, heroFeatures, { label: "" })}
          {...heroProps}
        />
      )}
      <FeatureGridSection
        eyebrow={features.withHeading ? tr("featureGrid.eyebrow") : undefined}
        heading={features.withHeading ? tr("featureGrid.heading") : undefined}
        headingRed={features.withHeading ? tr("featureGrid.headingRed") : undefined}
        items={translateItems(t, `${ns}.featureGrid.items`, features.items)}
        gridClassName={features.gridClassName}
        centered
      />
      <ProcessSteps
        id="how-it-works"
        eyebrow={tr("process.eyebrow")}
        heading={tr("process.heading")}
        steps={translateItems(t, `${ns}.process.steps`, steps.items)}
        gridClassName={steps.gridClassName}
      />
      {highlights}
      {testimonial && (
        <TestimonialStatsBar
          quote={tr("testimonial.quote")}
          name={tr("testimonial.name")}
          role={tr("testimonial.role")}
          stats={testimonial.stats.map((key) => ({
            value: tr(`testimonial.stats.${key}`),
            label: tr(`testimonial.stats.${key}Label`),
          }))}
          statsGridClassName={testimonial.gridClassName}
        />
      )}
      <FAQ />
    </PageLayout>
  );
}
