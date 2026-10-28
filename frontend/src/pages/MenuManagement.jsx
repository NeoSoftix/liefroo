import {
  RotateCw,
  Tag,
  SlidersHorizontal,
  MapPin,
  Layers,
  Plus,
  Clock,
  Send,
  GripVertical,
  PencilLine,
  Search,
  LineChart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { Button, HighlightsBand, useGoToSection } from "../components/shared";
import { translateItems } from "../utils/translateItems";
import serviceImage from "../assets/menumanagement.png";

const features = [
  { key: "realTime", Icon: RotateCw },
  { key: "pricing", Icon: Tag },
  { key: "modifiers", Icon: SlidersHorizontal },
  { key: "multiLocation", Icon: MapPin },
  { key: "multiMenu", Icon: Layers },
];

const steps = [
  { key: "addItems", Icon: Plus },
  { key: "setRules", Icon: Clock },
  { key: "customize", Icon: SlidersHorizontal },
  { key: "publish", Icon: Send },
  { key: "update", Icon: RotateCw },
];

const benefits = [
  { key: "dragDrop", Icon: GripVertical },
  { key: "bulkEdits", Icon: PencilLine },
  { key: "search", Icon: Search },
  { key: "insights", Icon: LineChart },
];

export default function MenuManagement() {
  const { t } = useTranslation();
  const goToSection = useGoToSection();

  return (
    <ServicePage
      ns="menuManagement"
      path="/menu-management"
      hero={{
        checklist: ["realTimeUpdates", "availability", "modifiers", "multiLocation"],
        features,
        featuresGridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
        ctaTarget: "how-it-works",
        image: serviceImage,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-5" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("menuManagement.dashboard.eyebrow")}
          heading={
            <>
              {t("menuManagement.dashboard.headingLine1")}
              <span className="block">{t("menuManagement.dashboard.headingLine2")}</span>
            </>
          }
          description={t("menuManagement.dashboard.description")}
          action={
            <Button
              onClick={() => goToSection("contact")}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white border border-red-600 px-6 py-3 rounded-full font-semibold shadow-lg text-sm transition-all duration-300 hover:bg-white hover:text-red-600"
            >
              {t("menuManagement.dashboard.cta")}
            </Button>
          }
          items={translateItems(t, "menuManagement.dashboard.benefits", benefits, { title: "" })}
        />
      }
    />
  );
}
