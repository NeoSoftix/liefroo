import {
  QrCode,
  ShoppingCart,
  CreditCard,
  Bell,
  BarChart3,
  Settings2,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Timer,
  Briefcase,
  Heart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";
import serviceImage from "../assets/qrordering.png";

const features = [
  { key: "scanOrder", Icon: QrCode },
  { key: "easyOrdering", Icon: ShoppingCart },
  { key: "securePayments", Icon: CreditCard },
  { key: "realTimeUpdates", Icon: Bell },
  { key: "insights", Icon: BarChart3 },
  { key: "posIntegration", Icon: Settings2 },
];

const steps = [
  { key: "scanQr", Icon: QrCode },
  { key: "browseMenu", Icon: BookOpen },
  { key: "placeOrder", Icon: ShoppingCart },
  { key: "makePayment", Icon: CreditCard },
  { key: "enjoyMeal", Icon: CheckCircle2 },
];

const highlights = [
  { key: "orderValue", Icon: TrendingUp },
  { key: "tableTurnover", Icon: Timer },
  { key: "costs", Icon: Briefcase },
  { key: "reviews", Icon: Heart },
  { key: "decisions", Icon: BarChart3 },
];

export default function QROrdering() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="qrOrdering"
      path="/qr-ordering"
      hero={{
        checklist: ["contactless", "securePayments", "fasterService", "reduceWorkload", "realTimeUpdates", "posIntegration"],
        features,
        featuresGridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
        ctaTarget: "how-it-works",
        image: serviceImage,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-3" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("qrOrdering.smarterOrdering.eyebrow")}
          heading={t("qrOrdering.smarterOrdering.heading")}
          items={translateItems(t, "qrOrdering.smarterOrdering.stats", highlights, { title: "" })}
          gridClassName="grid-cols-2 md:grid-cols-5"
        />
      }
      testimonial={{
        stats: ["turnover", "orders", "orderValue", "satisfaction", "contactless"],
        gridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      }}
    />
  );
}
