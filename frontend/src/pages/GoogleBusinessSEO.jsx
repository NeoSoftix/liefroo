import {
  Store,
  Search,
  Share2,
  Star,
  Megaphone,
  MousePointerClick,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "profile", Icon: Store },
  { key: "localSeo", Icon: Search },
  { key: "social", Icon: Share2 },
  { key: "reviews", Icon: Star },
];

const steps = [
  { key: "audit", Icon: Store },
  { key: "optimize", Icon: Search },
  { key: "discovered", Icon: Megaphone },
  { key: "visit", Icon: MousePointerClick },
  { key: "grow", Icon: TrendingUp },
];

const highlights = [
  { key: "rankings", Icon: BarChart3 },
  { key: "orders", Icon: ShoppingBag },
  { key: "trust", Icon: ShieldCheck },
  { key: "savings", Icon: Wallet },
];

export default function GoogleBusinessSEO() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="googleBusinessSEO"
      path="/google-business-seo"
      hero={{
        checklist: ["profile", "localSeo", "social", "reviews"],
        features,
        ctaTarget: "how-it-works",
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("googleBusinessSEO.alwaysAhead.eyebrow")}
          heading={t("googleBusinessSEO.alwaysAhead.heading")}
          items={translateItems(t, "googleBusinessSEO.alwaysAhead.stats", highlights)}
        />
      }
      testimonial={{
        stats: ["visibility", "orders", "keywords", "rating", "savings"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
