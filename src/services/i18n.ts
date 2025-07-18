import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Предполагаем, что у вас в src/locales/en.json и ru.json есть переводы
import en from '../locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
