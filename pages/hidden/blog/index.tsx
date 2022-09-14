import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";

import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {

}

const BlogPage: NextPage<BlogPageProps> = () => {
  return (
    <PageDefaultLayout>
      
    </PageDefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context) => {
  const lang = context.locale as AppLanguage;

  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPage;