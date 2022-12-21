import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { useLang } from '@/hooks';
import { ROUTES } from "@/utils/navigation/routes";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Button, FlexGrid } from '@/components/general';
import { PageErrorLayout } from '@/components/layout/page/PageErrorLayout/PageErrorLayout';

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
            <Button type={'primary'} className={'w-full'} onPress={() => router.push(ROUTES['home'].url(lang))}>
              {t('error:404.buttons.home')}
            </Button>
          </FlexGrid>
        </div>
      </div>
    </PageErrorLayout>
  );
};

export const getStaticProps = generateGetStaticProps(() => {
  return { props: {} };
}, {
  i18nNamespaces: ['error'],
});

export default Error404;
