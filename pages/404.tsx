import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useLang } from '../hooks';
import { Routes } from '@/utils/link';
import { getValidLang } from '@/utils/locale';

import { PageErrorLayout } from '@/components/layout/page/PageErrorLayout/PageErrorLayout';
import { Button, FlexGrid } from '@/components/general';

export type Error404Props = {}

const Error404: NextPage<Error404Props> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const lang = useLang();

  return (
    <PageErrorLayout status={404}>
      <div className={'flex-center flex-col'}>
        <div className={'flex-row'}>
          <div className={'flex-center flex-col mb-4'}>
            <h1 className={'inline-block text-8xl font-bold'}>{t('error:404.title')}</h1>
            <h2 className={'inline-block'}>{t('error:404.subTitle')}</h2>
          </div>

          <FlexGrid className={'w-96'} columns={2}>
            <Button type={'gray'} className={'w-full'} onPress={router.back}>
              {t('error:404.buttons.back')}
            </Button>
            <Button type={'primary'} className={'w-full'} onPress={() => router.push(Routes.getHome(lang).href)}>
              {t('error:404.buttons.home')}
            </Button>
          </FlexGrid>
        </div>
      </div>
    </PageErrorLayout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(getValidLang(context.locale), ['error'])),
    }
  };
}

export default Error404;
