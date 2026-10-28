import {
  Printer,
  MonitorSmartphone,
  UtensilsCrossed,
  Zap,
  ShoppingCart,
  Cloud,
  Route,
  CheckCircle2,
  Wifi,
  CloudCog,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";
import serviceImage from "../assets/pos.png";

const features = [
  { key: "autoPrint", Icon: Printer },
  { key: "androidDisplay", Icon: MonitorSmartphone },
  { key: "kitchenBar", Icon: UtensilsCrossed },
  { key: "noManual", Icon: Zap },
];

const steps = [
  { key: "orderReceived", Icon: ShoppingCart },
  { key: "sentToSystem", Icon: Cloud },
  { key: "autoRouting", Icon: Route },
  { key: "printedInstantly", Icon: Printer },
  { key: "orderInProgress", Icon: CheckCircle2 },
];

const hardware = [
  { key: "printers", Icon: Printer },
  { key: "display", Icon: MonitorSmartphone },
  { key: "connectivity", Icon: Wifi },
  { key: "cloud", Icon: CloudCog },
];

export default function PrinterIntegration() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="printerIntegration"
      path="/printer-integration"
      hero={{
        checklist: ["thermalPrint", "androidDisplay", "printerSupport", "zeroForwarding"],
        features,
        secondaryCta: true,
        image: serviceImage,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-4" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          centered
          eyebrow={t("printerIntegration.hardware.eyebrow")}
          heading={t("printerIntegration.hardware.heading")}
          description={t("printerIntegration.hardware.description")}
          items={translateItems(t, "printerIntegration.hardware.items", hardware, { title: "" })}
        />
      }
      testimonial={{ stats: ["printSuccess", "restaurants", "manualForwarding", "performance"] }}
    />
  );
}
