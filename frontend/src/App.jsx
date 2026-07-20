import { createElement, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import * as Pages from "./pages";
import { routes, LOCALES, DEFAULT_LOCALE } from "./routesConfig";
import i18n from "./i18n";
import BackToTopButton from "./components/BackToTopButton";
import PageNotFound from "./components/shared/PageNotFound";

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function LocaleLayout() {
  const { lng } = useParams();
  const location = useLocation();
  const isValidLocale = LOCALES.includes(lng);

  useEffect(() => {
    if (isValidLocale) i18n.changeLanguage(lng);
  }, [lng, isValidLocale]);

  if (!isValidLocale) {
    // Legacy unprefixed deep link (e.g. "/menu-management" — captured here
    // as lng="menu-management") or a garbage path. Redirect into the default
    // locale, preserving the rest of the URL.
    return (
      <Navigate
        to={`/${DEFAULT_LOCALE}${location.pathname}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return (
    <>
      <ScrollToHashElement />
      <Outlet />
      <BackToTopButton />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
        <Route path="/:lng" element={<LocaleLayout />}>
          {routes.map(({ key, path, component }) =>
            path === "/" ? (
              <Route key={key} index element={createElement(Pages[component])} />
            ) : (
              <Route key={key} path={path.slice(1)} element={createElement(Pages[component])} />
            )
          )}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
