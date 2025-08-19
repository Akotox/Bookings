// lib/getTranslations.ts

import { en, vi } from './languages';

const translations = {
  en,
  vi,
};

export type Locale = keyof typeof translations;

export const getTranslations = (locale: string | undefined | null) => {
  const effectiveLocale: Locale = locale === 'vi' ? 'vi' : 'en';
  return translations[effectiveLocale];
};