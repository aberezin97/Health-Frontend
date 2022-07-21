import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from 'translations/ru.json';
import translationEN from 'translations/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: translationEN,
    ru: translationRU
  },
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: { escapeValue: false }
});

export default i18n;
