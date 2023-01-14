import common from '@public/locales/en/common.json';
import error from '@public/locales/en/error.json';
import global from '@public/locales/en/global.json';
import navigation from '@public/locales/en/navigation.json';
import page from '@public/locales/en/page.json';

import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof common;
      error: typeof error;
      global: typeof global;
      navigation: typeof navigation;
      page: typeof page;
    };
  }
}