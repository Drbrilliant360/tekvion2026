import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// Initialize i18next without the browser language detector
// to give us full control over the language switching ("ours")
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: localStorage.getItem("app-language") || "en", // Manual persistence
    fallbackLng: "en",
    interpolation: { returnObjects: true }, // Simplified interpolation
  });

// Set document direction based on language
i18n.on("languageChanged", (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng); // Save preference
});

// Set initial direction immediately
const initialLang = localStorage.getItem("app-language") || "en";
document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = initialLang;

export default i18n;
