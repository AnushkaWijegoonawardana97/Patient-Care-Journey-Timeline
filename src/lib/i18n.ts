import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/translation.json";
import esTranslations from "../locales/es/translation.json";

const LANGUAGE_STORAGE_KEY = "raya-health-language";

// Get saved language from localStorage or default to browser language
const getInitialLanguage = (): string => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === "en" || saved === "es") {
    return saved;
  }

  // Try to detect browser language
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "es") {
    return "es";
  }

  return "en";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
