import en from './translation/en.json';
import ru from './translation/ru.json';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lng') || 'en',
});
