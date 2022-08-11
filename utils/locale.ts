import { AppLanguage } from '@/store/application/types';

export const getValidLang = (locale?: string): AppLanguage => {
  if (['en', 'fr'].includes(locale || '')) {
    return locale as AppLanguage;
  }

  return 'en';
};