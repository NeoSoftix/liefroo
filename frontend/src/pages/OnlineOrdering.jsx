import {
  Package,
  BadgePercent,
  ClipboardList,
  ShieldCheck,
  ShoppingCart,
  Bell,
  Truck,
  ThumbsUp,
  TrendingUp,
  BarChart3,
  Users,
  LineChart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { OnlineOrderingHero } from "../components/services";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "brandedExperience", Icon: Package },
  { key: "noCommission", Icon: BadgePercent },
  { key: "orderOptions", Icon: ClipboardList },
  { key: "securePayments", Icon: ShieldCheck },
];

const steps = [
  { key: "placeOrder", Icon: ShoppingCart },
  { key: "orderReceived", Icon: Bell },
  { key: "prepareDeliver", Icon: Truck },
  { key: "satisfied", Icon: ThumbsUp },
  { key: "grows", Icon: TrendingUp },
];

const highlights = [
  { key: "profits", Icon: BarChart3 },
  { key: "relationship", Icon: Users },
  { key: "insights", Icon: LineChart },
];

export default function OnlineOrdering() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="onlineOrdering"
      path="/online-ordering"
      customHero={<OnlineOrderingHero />}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("onlineOrdering.takeControl.eyebrow")}
          heading={t("onlineOrdering.takeControl.heading")}
          items={translateItems(t, "onlineOrdering.takeControl.stats", highlights)}
          gridClassName="grid-cols-1 sm:grid-cols-3"
        />
      }
      testimonial={{
        stats: ["directOrders", "repeatOrders", "restaurants", "rating", "savings"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
