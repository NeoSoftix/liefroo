import { useNavigate, useParams } from "react-router-dom";
import { LOCALES, DEFAULT_LOCALE } from "../../routesConfig";

function resolveLocale(lng) {
  return LOCALES.includes(lng) ? lng : DEFAULT_LOCALE;
}

function withLocale(locale, to) {
  if (/^https?:\/\//.test(to) || to.startsWith("#")) return to;
  return `/${locale}${to === "/" ? "" : to}`;
}

// Prefixes an unprefixed path (e.g. "/menu-management") with the current
// locale segment from the URL (e.g. "/en/menu-management").
export function useLocalizedPath(to) {
  const { lng } = useParams();
  return withLocale(resolveLocale(lng), to);
}

// Drop-in replacement for react-router-dom's useNavigate() that auto-prefixes
// the target path with the current locale.
export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { lng } = useParams();
  const locale = resolveLocale(lng);
  return (to, options) => navigate(withLocale(locale, to), options);
}
