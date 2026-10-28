import {
  BarChart3,
  Users,
  Target,
  PieChart,
  TrendingUp,
  Settings2,
  Waypoints,
  Search,
  FileText,
  RotateCw,
  Rocket,
  BadgeCheck,
  Lightbulb,
  MonitorCheck,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "visibility", Icon: BarChart3 },
  { key: "audience", Icon: Users },
  { key: "goals", Icon: Target },
  { key: "dashboards", Icon: PieChart },
  { key: "decisions", Icon: TrendingUp },
];

const steps = [
  { key: "setup", Icon: Settings2 },
  { key: "collection", Icon: Waypoints },
  { key: "analyze", Icon: Search },
  { key: "report", Icon: FileText },
  { key: "optimize", Icon: RotateCw },
  { key: "grow", Icon: Rocket },
];

const highlights = [
  { key: "tracking", Icon: BadgeCheck },
  { key: "insights", Icon: Lightbulb },
  { key: "monitoring", Icon: MonitorCheck },
  { key: "saveTime", Icon: Clock },
  { key: "growth", Icon: TrendingUp },
];

export default function GoogleAnalytics() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="googleAnalytics"
      path="/google-analytics"
      hero={{
        checklist: ["performance", "audience", "conversions", "reports", "decisions"],
        features,
        featuresGridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
        ctaTarget: "how-it-works",
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-5" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-3" }}
      highlights={
        <HighlightsBand
          eyebrow={t("googleAnalytics.betterInsights.eyebrow")}
          heading={t("googleAnalytics.betterInsights.heading")}
          items={translateItems(t, "googleAnalytics.betterInsights.stats", highlights)}
          gridClassName="grid-cols-2 md:grid-cols-5"
        />
      }
      testimonial={{
        stats: ["traffic", "conversions", "roi", "rating", "tracking"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
