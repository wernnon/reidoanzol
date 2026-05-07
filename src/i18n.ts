// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: { translation: {} },
  en: { translation: {} }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // O nosso idioma padrão
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;