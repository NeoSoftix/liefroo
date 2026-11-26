import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de/translation.json";
import en from "./locales/en/translation.json";
import deSeoPages from "./locales/de/seoPages.json";
import enSeoPages from "./locales/en/seoPages.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: { ...de, seoPages: deSeoPages } },
      en: { translation: { ...en, seoPages: enSeoPages } },
    },
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
