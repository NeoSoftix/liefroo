import {
  RotateCw,
  Tag,
  SlidersHorizontal,
  MapPin,
  Layers,
  Plus,
  Clock,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { ServiceHero, FeatureGridSection, ProcessSteps } from "../components/shared";
import { DashboardSection } from "../components/MenuManagement";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import serviceImage from "../assets/menumanagement.png";

export default function MenuManagement() {
  const { t } = useTranslation();

  const heroFeatures = [
    { Icon: RotateCw, key: "realTime" },
    { Icon: Tag, key: "pricing" },
    { Icon: SlidersHorizontal, key: "modifiers" },
    { Icon: MapPin, key: "multiLocation" },
    { Icon: Layers, key: "multiMenu" },
  ].map(({ Icon, key }) => ({ Icon, label: t(`menuManagement.hero.features.${key}`) }));

  const featureItems = [
    { key: "realTime", Icon: RotateCw },
    { key: "pricing", Icon: Tag },
    { key: "modifiers", Icon: SlidersHorizontal },
    { key: "multiLocation", Icon: MapPin },
    { key: "multiMenu", Icon: Layers },
  ].map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`menuManagement.featureGrid.items.${key}.title`),
    desc: t(`menuManagement.featureGrid.items.${key}.desc`),
  }));

  const steps = [
    { key: "addItems", Icon: Plus, number: "01" },
    { key: "setRules", Icon: Clock, number: "02" },
    { key: "customize", Icon: SlidersHorizontal, number: "03" },
    { key: "publish", Icon: Send, number: "04" },
    { key: "update", Icon: RotateCw, number: "05" },
  ].map(({ key, Icon, number }) => ({
    key,
    Icon,
    number,
    title: t(`menuManagement.process.steps.${key}.title`),
    desc: t(`menuManagement.process.steps.${key}.desc`),
  }));

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white">
      <Header />
      <main>
        <ServiceHero
          badge={t("menuManagement.hero.badge")}
          headingLine1={t("menuManagement.hero.headingLine1")}
          headingLine2={t("menuManagement.hero.headingLine2")}
          description={t("menuManagement.hero.description")}
          checklist={["realTimeUpdates", "availability", "modifiers", "multiLocation"].map((key) =>
            t(`menuManagement.hero.checklist.${key}`)
          )}
          ctaLabel={t("menuManagement.hero.cta")}
          secondaryCtaHref="#how-it-works"
          features={heroFeatures}
          featuresGridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
          image={serviceImage}
        />
        <FeatureGridSection
          items={featureItems}
          gridClassName="sm:grid-cols-2 lg:grid-cols-5"
          centered
        />
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("menuManagement.process.eyebrow")}
          heading={t("menuManagement.process.heading")}
          steps={steps}
          gridClassName="sm:grid-cols-2 md:grid-cols-5"
        />
        <DashboardSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
