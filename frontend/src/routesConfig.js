// Framework-agnostic route metadata — single source of truth for App.jsx's
// route tree, the mega menu / footer / mobile drawer link lists, and
// scripts/prerender.mjs. No JSX/React imports here on purpose: this file is
// imported both by Vite-bundled React code and by prerender.mjs (plain Node
// ESM), so it must stay import-safe for both.

export const LOCALES = ["de", "en"];
export const DEFAULT_LOCALE = "de";

// `component` is a string key into src/pages/index.js's named exports.
export const routes = [
  { key: "home", path: "/", component: "Products" },
  { key: "products", path: "/products", component: "Services" },
  { key: "about", path: "/about", component: "About" },
  { key: "technicalSupport", path: "/technical-support", component: "TechnicalSupport" },
  { key: "menuManagement", path: "/menu-management", component: "MenuManagement", megaMenuGroup: "orderingOperations" },
  { key: "onlineOrdering", path: "/online-ordering", component: "OnlineOrdering", megaMenuGroup: "orderingOperations" },
  { key: "qrOrdering", path: "/qr-ordering", component: "QROrdering", megaMenuGroup: "orderingOperations" },
  { key: "posSystem", path: "/pos-system-development", component: "POSSystemDevelopment", megaMenuGroup: "orderingOperations" },
  { key: "reservationSystem", path: "/reservation-system", component: "ReservationSystem", megaMenuGroup: "orderingOperations" },
  { key: "printerIntegration", path: "/printer-integration", component: "PrinterIntegration", megaMenuGroup: "orderingOperations" },
  { key: "websiteDevelopment", path: "/website-development", component: "WebsiteDevelopment", megaMenuGroup: "growthMarketing" },
  { key: "mobileAppDevelopment", path: "/mobile-app-development", component: "MobileAppDevelopment", megaMenuGroup: "growthMarketing" },
  { key: "googleAds", path: "/google-ads", component: "GoogleAds", megaMenuGroup: "growthMarketing" },
  { key: "metaAds", path: "/meta-ads", component: "MetaAds", megaMenuGroup: "growthMarketing" },
  { key: "googleBusinessSEO", path: "/google-business-seo", component: "GoogleBusinessSEO", megaMenuGroup: "growthMarketing" },
  { key: "googleAnalytics", path: "/google-analytics", component: "GoogleAnalytics", megaMenuGroup: "growthMarketing" },
  { key: "privacyPolicy", path: "/privacy-policy", component: "PrivacyPolicy" },
  { key: "termsConditions", path: "/terms-conditions", component: "TermsConditions" },
  { key: "thankYou", path: "/thank-you", component: "ThankYou", prerender: false, noIndex: true },
];

export const prerenderablePaths = routes
  .filter((r) => r.prerender !== false)
  .map((r) => r.path);

export function megaMenuItems(group) {
  return routes.filter((r) => r.megaMenuGroup === group);
}
