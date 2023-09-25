import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import vn from './vn.json';

const resources = {
  en: {
    translation: en,
  },
  vn: {
    translation: vn,
  },
};

i18n.use(initReactI18next).init({
  lng: 'vn', // if you're using a language detector, do not define the lng option
  debug: false,
  resources,
  compatibilityJSON: 'v3',
});

export default i18n;
