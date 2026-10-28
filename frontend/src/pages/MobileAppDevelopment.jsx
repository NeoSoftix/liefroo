import {
  Smartphone,
  ShoppingBag,
  Bell,
  LayoutGrid,
  ShoppingCart,
  CreditCard,
  Activity,
  Cloud,
  Lightbulb,
  PenTool,
  Code2,
  CheckCircle2,
  UploadCloud,
  LifeBuoy,
} from "lucide-react";
import { ServicePage } from "../components/layout";
import { WhyChooseSection } from "../components/services";

const heroFeatures = [
  { key: "nativeApps", Icon: Smartphone },
  { key: "pushNotifications", Icon: Bell },
  { key: "storeDeployment", Icon: LayoutGrid },
  { key: "ecosystem", Icon: ShoppingBag },
];

const features = [
  { key: "brandedApp", Icon: Smartphone },
  { key: "ordering", Icon: ShoppingCart },
  { key: "notifications", Icon: Bell },
  { key: "payments", Icon: CreditCard },
  { key: "tracking", Icon: Activity },
  { key: "integration", Icon: Cloud },
];

const steps = [
  { key: "discovery", Icon: Lightbulb },
  { key: "design", Icon: PenTool },
  { key: "development", Icon: Code2 },
  { key: "testing", Icon: CheckCircle2 },
  { key: "deployment", Icon: UploadCloud },
  { key: "support", Icon: LifeBuoy },
];

export default function MobileAppDevelopment() {
  return (
    <ServicePage
      ns="mobileAppDevelopment"
      path="/mobile-app-development"
      hero={{
        checklist: ["nativeApps", "tracking", "deployment", "integration"],
        features: heroFeatures,
        secondaryCta: true,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-3", withHeading: true }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-3" }}
      highlights={<WhyChooseSection />}
      testimonial={{ stats: ["rating", "orders", "downloads", "processed"] }}
    />
  );
}
