import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LOCALES, DEFAULT_LOCALE } from "../../routesConfig";
import { goToSection } from "../../utils/scrollToSection";

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

// Returns a function that scrolls to a home-page section by id (e.g.
// "contact"), navigating to the current locale's home first if needed.
export function useGoToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lng } = useParams();
  const locale = resolveLocale(lng);
  return (id) => goToSection(navigate, pathname, id, locale);
}
