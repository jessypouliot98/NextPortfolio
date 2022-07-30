import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from 'i18next-http-backend';
import {AppLanguage} from "@/store/application/types";

export const initI18n = (lang: AppLanguage) => {
  return i18next
    .use(i18nBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      lng: lang,
      interpolation: {
        escapeValue: false,
      }
    });
}

export default i18next;
