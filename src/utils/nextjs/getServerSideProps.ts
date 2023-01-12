import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { PreviewData } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { getValidLang } from "@/utils/locale";

import { AppLanguage } from "../../types";

type CustomGetServerSidePropsContext<
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
> = Omit<GetServerSidePropsContext<Q extends ParsedUrlQuery ? Q : ParsedUrlQuery, D>, 'params' | 'locale' | 'locales' | 'defaultLocale'> & {
  params: Q extends object ? Q : never;
  locale: AppLanguage;
  locales: AppLanguage[];
  defaultLocale: AppLanguage;
};

type CustomGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
> = (
  context: CustomGetServerSidePropsContext<Q, D>
) => Promise<GetServerSidePropsResult<P>> | GetServerSidePropsResult<P>

type CustomGetServerSidePropsParams = {
  i18nNamespaces: string[];
}

export const generateGetServerSideProps = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
>(getServerSideProps: CustomGetServerSideProps<P, Q, D> | null, params: CustomGetServerSidePropsParams) => {
  const generator: GetServerSideProps = async (context) => {
    const locale = getValidLang(context.locale);
    const customContext = {
      ...context,
      locale,
      locales: context.locales as AppLanguage[],
      defaultLocale: context.defaultLocale as AppLanguage,
    } as CustomGetServerSidePropsContext<Q, D>;

    const result = getServerSideProps ? await getServerSideProps(customContext) : {} as GetServerSidePropsResult<never>;

    if ('props' in result) {
      return {
        ...result,
        props: {
          ...result.props,
          ...(await serverSideTranslations(locale, params.i18nNamespaces)),
        }
      };
    }

    return result;
  };

  return generator;
};