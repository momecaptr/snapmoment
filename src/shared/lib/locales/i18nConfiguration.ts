// ;
// import { initReactI18next } from 'react-i18next';
//
// import byTranslation from '@/shared/lib/locales/languages/by/translation.json';
// import enTranslation from '@/shared/lib/locales/languages/en/translation.json';
// import kzTranslation from '@/shared/lib/locales/languages/kz/translation.json';
// import ruTranslation from '@/shared/lib/locales/languages/ru/translation.json';
// import uaTranslation from '@/shared/lib/locales/languages/ua/translation.json';
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
//
// const getDefaultLanguage = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('locale') || 'en';
//   }
//
//   return 'en';
// };
//
// const defaultLanguage = getDefaultLanguage();
//
// const i18nextOptions = {
//   debug: true,
//   detection: {
//     caches: ['localStorage', 'cookie'],
//     excludeCacheFor: ['cimode'],
//     order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain']
//   },
//   fallbackLng: defaultLanguage,
//   interpolation: {
//     escapeValue: false
//   },
//   resources: {
//     by: {
//       translation: byTranslation
//     },
//     en: {
//       translation: enTranslation
//     },
//     kz: {
//       translation: kzTranslation
//     },
//     ru: {
//       translation: ruTranslation
//     },
//     ua: {
//       translation: uaTranslation
//     }
//   }
// };
//
// // eslint-disable-next-line import/no-named-as-default-member
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     supportedLngs: ['by', 'en', 'kz', 'ru', 'ua'],
//     ...i18nextOptions
//   });
//
// export { i18n };
