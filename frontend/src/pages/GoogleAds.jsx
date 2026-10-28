import {
  Search,
  LayoutTemplate,
  Crosshair,
  BarChart3,
  PlayCircle,
  Target,
  MousePointerClick,
  TrendingUp,
  Eye,
  ShoppingBag,
  TrendingDown,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "searchAds", Icon: Search },
  { key: "displayAds", Icon: LayoutTemplate },
  { key: "locationTargeting", Icon: Crosshair },
  { key: "roiTracking", Icon: BarChart3 },
];

const steps = [
  { key: "keywordResearch", Icon: Search },
  { key: "createLaunch", Icon: PlayCircle },
  { key: "showRightPeople", Icon: Target },
  { key: "clickOrder", Icon: MousePointerClick },
  { key: "optimizeGrow", Icon: TrendingUp },
];

const highlights = [
  { key: "visibility", Icon: Eye },
  { key: "directOrders", Icon: ShoppingBag },
  { key: "lowerSpend", Icon: TrendingDown },
  { key: "roi", Icon: Target },
  { key: "tracking", Icon: Activity },
];

export default function GoogleAds() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="googleAds"
      path="/google-ads"
      hero={{
        checklist: ["searchDisplay", "keywordResearch", "locationBidding", "conversionTracking"],
        features,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("googleAds.smarterAds.eyebrow")}
          heading={t("googleAds.smarterAds.heading")}
          items={translateItems(t, "googleAds.smarterAds.stats", highlights)}
          gridClassName="grid-cols-2 md:grid-cols-5"
        />
      }
      testimonial={{
        stats: ["directOrders", "roi", "orders", "rating", "cost"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
