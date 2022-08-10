import App from "next/app";

import { AppLanguage } from "@/store/application/types";

export const getLink = (links: Partial<Record<AppLanguage | 'default', string>>, lang: AppLanguage) => {
  let link = links[lang];

  if (!link) {
    link = links.default;
  }

  return link;
};

const getCleanUrl = (url: string) => {
  return url.includes('?') ? url.substring(0, url.indexOf('?')) : url;
};

export const getIsHomeActive = (url: string, lang: AppLanguage) => {
  const homeUrl = Routes.getHome(lang);

  return getCleanUrl(url) === homeUrl;
};

export const getIsActive = (url: string, route: string) => {
  return getCleanUrl(url).includes(route);
};

export namespace Routes {
  const getBase = (lang: AppLanguage, append?: string) => {
    return [`/${lang}`, append].join('');
  };

  export const getHome = (lang: AppLanguage) => {
    return getBase(lang);
  };

  export const getProjects = (lang: AppLanguage) => {
    return getBase(lang, getLink({
      en: '/projects',
      fr: '/projets',
    }, lang));
  };

  export const getProject = (lang: AppLanguage, projectSlug: string) => {
    return [getProjects(lang), projectSlug].join('/');
  };
}
