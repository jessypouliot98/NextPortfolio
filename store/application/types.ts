export type AppLanguage = 'en' | 'fr';

export enum ApplicationActions {
  SET_LANG = 'application/set_lang',
}

export type ApplicationState = {
  lang: AppLanguage,
}
