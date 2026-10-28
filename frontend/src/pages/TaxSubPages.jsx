import {
  HardDrive,
  Zap,
  ShieldCheck,
  RefreshCw,
  FileDown,
  Headphones,
  MousePointerClick,
  FileSpreadsheet,
  FileCheck2,
  ListChecks,
  Lock,
  Store,
  BadgeCheck,
  ReceiptText,
  Landmark,
  KeyRound,
  Power,
  Link2,
  CalendarRange,
  Send,
} from "lucide-react";
import TaxSubPage from "../components/TaxSubPage";

const screen = (src) => ({ src, kind: "screen" });
const device = (src) => ({ src, kind: "device" });

const onlineTse = {
  path: "/online-tse",
  ns: "onlineTse",
  hero: device("/hero/pos-station.webp"),
  heroSide: { src: "/hero/device-handheld.webp" },
  benefitIcons: [HardDrive, Zap, ShieldCheck, RefreshCw, FileDown, Headphones],
  rowImages: [screen("/hero/1-1280.webp"), device("/hero/device-printer.webp"), device("/ecosystem/pos-devices.webp")],
  stepIcons: [KeyRound, Power, Link2, FileDown],
  gallery: ["/hero/2-1280.webp", "/hero/3-1280.webp", "/hero/4-1280.webp"],
};

const dataExport = {
  path: "/data-export-tax-advisor",
  ns: "dataExport",
  hero: screen("/ecosystem/analytics.webp"),
  benefitIcons: [MousePointerClick, FileSpreadsheet, FileCheck2, ListChecks, Lock, Store],
  rowImages: [screen("/hero/4-1280.webp"), screen("/ecosystem/online-ordering-menu.webp"), screen("/hero/1-1280.webp")],
  stepIcons: [CalendarRange, FileDown, Send],
  gallery: ["/ecosystem/analytics.webp", "/hero/2-1280.webp", "/ecosystem/reservation.webp"],
};

const guarantee = {
  path: "/kassensichv-guarantee",
  ns: "guarantee",
  hero: device("/ecosystem/pos-devices.webp"),
  benefitIcons: [BadgeCheck, ShieldCheck, ReceiptText, RefreshCw, FileDown, Landmark],
  rowImages: [device("/hero/pos-station.webp"), screen("/hero/3-1280.webp"), screen("/ecosystem/analytics.webp")],
  stepIcons: [ShieldCheck, ReceiptText, Landmark],
  gallery: ["/hero/1-1280.webp", "/hero/2-1280.webp", "/ecosystem/online-ordering-menu.webp"],
};

export function OnlineTse() {
  return <TaxSubPage config={onlineTse} />;
}

export function DataExport() {
  return <TaxSubPage config={dataExport} />;
}

export function KassenSichVGuarantee() {
  return <TaxSubPage config={guarantee} />;
}
