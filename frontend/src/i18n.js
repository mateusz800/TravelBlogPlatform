import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";


import translationPL from './translations/pl.json';

// the translations
const resources = {
  pl:{
      translation:translationPL
  }
};

i18n
  .init({
    resources,
    lng: "pl",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;