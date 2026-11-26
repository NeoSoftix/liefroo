import {
  ShieldCheck,
  Smartphone,
  QrCode,
  BarChart3,
  Store,
  Headphones,
  Zap,
  Printer,
  Globe,
  ReceiptText,
  Wallet,
  UtensilsCrossed,
  Coffee,
  Timer,
  Users,
  Percent,
  KeyRound,
  Settings2,
  GraduationCap,
  Rocket,
} from "lucide-react";
import SeoLandingPage from "../components/seo/SeoLandingPage";

// SEO landing pages — intentionally not in the header/footer menus.
const screen = (src) => ({ src, kind: "screen" });
const device = (src) => ({ src, kind: "device" });

const onboardingSteps = [KeyRound, Settings2, GraduationCap, Rocket];

const restaurants = {
  path: "/kassensystem-fuer-restaurants",
  ns: "restaurants",
  hero: device("/hero/pos-station.webp"),
  heroSide: { src: "/hero/device-handheld.webp" },
  benefitIcons: [ShieldCheck, Smartphone, QrCode, BarChart3, Store, Headphones],
  rowImages: [screen("/hero/1-1280.webp"), device("/hero/phone-kellner.webp"), screen("/ecosystem/analytics.webp")],
  stepIcons: onboardingSteps,
  related: ["doener", "pizzerien", "cafes", "posSystem", "onlineTse", "pricing"],
};

const doener = {
  path: "/kassensystem-fuer-doener",
  ns: "doener",
  hero: device("/hero/pos-station.webp"),
  heroSide: { src: "/hero/device-printer.webp" },
  benefitIcons: [Zap, Printer, Globe, ShieldCheck, Wallet, BarChart3],
  rowImages: [screen("/hero/2-1280.webp"), device("/hero/device-printer.webp"), screen("/ecosystem/online-ordering-menu.webp")],
  stepIcons: onboardingSteps,
  related: ["restaurants", "pizzerien", "cafes", "onlineOrdering", "printer", "pricing"],
};

const pizzerien = {
  path: "/kassensystem-fuer-pizzerien",
  ns: "pizzerien",
  hero: screen("/ecosystem/online-ordering-menu.webp"),
  benefitIcons: [UtensilsCrossed, Globe, Printer, Timer, ShieldCheck, Percent],
  rowImages: [screen("/hero/3-1280.webp"), device("/hero/device-handheld.webp"), screen("/ecosystem/marketing.webp")],
  stepIcons: onboardingSteps,
  related: ["restaurants", "doener", "cafes", "onlineOrdering", "menuManagement", "pricing"],
};

const cafes = {
  path: "/kassensystem-fuer-cafes",
  ns: "cafes",
  hero: device("/hero/pos-station.webp"),
  heroSide: { src: "/hero/phone-kellner.webp" },
  benefitIcons: [Coffee, QrCode, ReceiptText, Users, ShieldCheck, BarChart3],
  rowImages: [device("/qr/2-menu.webp"), device("/hero/phone-kellner.webp"), screen("/hero/4-1280.webp")],
  stepIcons: onboardingSteps,
  related: ["restaurants", "doener", "pizzerien", "qrOrdering", "dataExport", "pricing"],
};

export function KassensystemRestaurants() {
  return <SeoLandingPage config={restaurants} />;
}

export function KassensystemDoener() {
  return <SeoLandingPage config={doener} />;
}

export function KassensystemPizzerien() {
  return <SeoLandingPage config={pizzerien} />;
}

export function KassensystemCafes() {
  return <SeoLandingPage config={cafes} />;
}
