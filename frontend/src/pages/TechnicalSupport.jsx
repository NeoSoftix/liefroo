import {
  Headphones,
  Globe2,
  Phone,
  UserCog,
  Zap,
  MessageCircleQuestion,
  Search,
  Settings2,
  ThumbsUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicePage } from "../components/layout";
import { HighlightsBand } from "../components/shared";
import { translateItems } from "../utils/translateItems";

const features = [
  { key: "support7d", Icon: Headphones },
  { key: "languages", Icon: Globe2 },
  { key: "channels", Icon: Phone },
  { key: "onboarding", Icon: UserCog },
  { key: "reliable", Icon: Zap },
];

const steps = [
  { key: "reachOut", Icon: MessageCircleQuestion },
  { key: "explainIssue", Icon: MessageCircleQuestion },
  { key: "investigate", Icon: Search },
  { key: "resolve", Icon: Settings2 },
  { key: "allSet", Icon: ThumbsUp },
];

const highlights = [
  { key: "days", Icon: Phone },
  { key: "languages", Icon: Globe2 },
  { key: "response", Icon: Clock },
  { key: "secure", Icon: ShieldCheck },
];

export default function TechnicalSupport() {
  const { t } = useTranslation();

  return (
    <ServicePage
      ns="technicalSupport"
      path="/technical-support"
      hero={{
        checklist: ["support7d", "languages", "channels", "onboarding"],
        features,
        featuresGridClassName: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
        secondaryCta: true,
      }}
      features={{ items: features, gridClassName: "sm:grid-cols-2 lg:grid-cols-5" }}
      steps={{ items: steps, gridClassName: "sm:grid-cols-2 md:grid-cols-5" }}
      highlights={
        <HighlightsBand
          eyebrow={t("technicalSupport.alwaysThere.eyebrow")}
          heading={t("technicalSupport.alwaysThere.heading")}
          items={translateItems(t, "technicalSupport.alwaysThere.stats", highlights, { title: "value", desc: "label" })}
          variant="value"
        />
      }
      testimonial={{ stats: ["rating", "resolved", "partners", "available"] }}
    />
  );
}
