import { TFunction } from "next-i18next";

import { Routes } from "@/utils/link";

import { AppLanguage } from "../../types";


export const getMainNavigation = (params: { t: TFunction, lang: AppLanguage }) => {
  const { t, lang } = params;
  return [
    {
      route: Routes.getProjectList(lang),
      title: t('global:header.projects'),
    },
    {
      route: Routes.getBlogList(lang),
      title: t('global:header.blog'),
    },
    {
      route: Routes.getContact(lang),
      title: t('global:header.contact'),
    },
  ];
};