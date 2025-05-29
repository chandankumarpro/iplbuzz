import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLang from '../en/en.json';
import frLang from '../fr/fr.json';
import hiLang from '../hi/hi.json';
import mrLang from '../mr/mr.json';

const resources = {
  en: {
    translation: enLang,
  },
  fr: {
    translation: frLang,
  },
  hi: {
    translation: hiLang,
  },
  mr: {
    translation: mrLang,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;