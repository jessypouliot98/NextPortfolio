import { GetStaticProps, GetStaticPropsContext } from "next";
import { GetStaticPropsResult, PreviewData } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { getValidLang } from "@/utils/locale";

import { AppLanguage } from "../../types";

type CustomGetStaticPropsContext<
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
> = Omit<GetStaticPropsContext<Q extends ParsedUrlQuery ? Q : ParsedUrlQuery, D>, 'params' | 'locale' | 'locales' | 'defaultLocale'> & {
  params: Q extends object ? Q : never;
  locale: AppLanguage;
  locales: AppLanguage[];
  defaultLocale: AppLanguage;
};

type CustomGetStaticProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
> = (
  context: CustomGetStaticPropsContext<Q, D>
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>

type CustomGetStaticPropsParams = {
  i18nNamespaces: string[];
}

export const generateGetStaticProps = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery | undefined = undefined,
  D extends PreviewData = PreviewData
>(getStaticProps: CustomGetStaticProps<P, Q, D> | null, params: CustomGetStaticPropsParams) => {
  const generator: GetStaticProps = async (context) => {
    const locale = getValidLang(context.locale);
    const customContext = {
      ...context,
      locale,
      locales: context.locales as AppLanguage[],
      defaultLocale: context.defaultLocale as AppLanguage,
    } as CustomGetStaticPropsContext<Q, D>;

    const result = getStaticProps ? await getStaticProps(customContext) : {} as GetStaticPropsResult<never>;

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