import {
  Hand,
  ShoppingBag,
  Users,
  Store,
  ShoppingCart,
  Inbox,
  Settings2,
  Printer,
  CheckCircle2,
  LayoutGrid,
  Wallet,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";
import serviceImage from "../assets/posimage.png";

const features = [
  { key: "touchInterface", Icon: Hand },
  { key: "unifiedOrders", Icon: ShoppingBag },
  { key: "tableManagement", Icon: Users },
  { key: "multiLocation", Icon: Store },
];

const steps = [
  { key: "orderAnywhere", Icon: ShoppingCart },
  { key: "arrivesInPos", Icon: Inbox },
  { key: "processManage", Icon: Settings2 },
  { key: "printPrepare", Icon: Printer },
  { key: "serveGetPaid", Icon: CheckCircle2 },
];

const showcase = [
  { key: "menu", Icon: LayoutGrid },
  { key: "payments", Icon: Wallet },
  { key: "reports", Icon: BarChart3 },
  { key: "staff", Icon: Users },
  { key: "printers", Icon: Printer },
];

export default function POSSystemDevelopment() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="posSystemDevelopment"
      path="/pos-system-development"
      hero={{
        checklist: ["touchInterface", "unifiedOrders", "tableManagement", "multiLocation"],
        features,
        secondaryCta: true,
        image: serviceImage,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("posSystemDevelopment.showcase.eyebrow")}
          heading={t("posSystemDevelopment.showcase.heading")}
          items={translateItems(t, "posSystemDevelopment.showcase.items", showcase)}
          variant="row"
          gridClassName="grid-cols-2"
        />
      }
      testimonial={{ stats: ["restaurants", "uptime", "efficiency", "support"] }}
    />
  );
}
