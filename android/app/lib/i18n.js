import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import { en } from './en.json';
import { ukr } from './ukr.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ukr
};

// const currentLocale = I18n.currentLocale();
// I18n.locale = "ukr";
I18n.locale = "ukr";
// const currentLocale = 'en'

// export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;
