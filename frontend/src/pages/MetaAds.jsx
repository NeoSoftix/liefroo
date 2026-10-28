import {
  Target,
  PenLine,
  BarChart3,
  Lightbulb,
  Megaphone,
  Users,
  ShoppingCart,
  TrendingUp,
  ShoppingBag,
  RotateCcw,
  ArrowDownCircle,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "campaigns", Icon: FaFacebook },
  { key: "targeting", Icon: Target },
  { key: "creative", Icon: PenLine },
  { key: "tracking", Icon: BarChart3 },
];

const steps = [
  { key: "strategy", Icon: Lightbulb },
  { key: "launch", Icon: Megaphone },
  { key: "reach", Icon: Users },
  { key: "orders", Icon: ShoppingCart },
  { key: "optimize", Icon: TrendingUp },
];

const highlights = [
  { key: "reach", Icon: Users },
  { key: "directOrders", Icon: ShoppingBag },
  { key: "roi", Icon: Target },
  { key: "retarget", Icon: RotateCcw },
  { key: "lowerCost", Icon: ArrowDownCircle },
];

export default function MetaAds() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="metaAds"
      path="/meta-ads"
      hero={{
        checklist: ["campaigns", "targeting", "creative", "tracking"],
        features,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("metaAds.growFaster.eyebrow")}
          heading={t("metaAds.growFaster.heading")}
          items={translateItems(t, "metaAds.growFaster.stats", highlights)}
          gridClassName="grid-cols-2 md:grid-cols-5"
        />
      }
      testimonial={{
        stats: ["roas", "reached", "cost", "satisfaction", "growth"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
