import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { Code } from "@/lib/react-syntax-highlighter";

import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {

}

const BlogPage: NextPage<BlogPageProps> = () => {
  return (
    <PageDefaultLayout>
      <h1>TypeScript overload functions</h1>
      <Code language="typescript">
{`
  const a = 'a';
  type B = 'b'
  type C = A | B;
  // ${'i18nComment'}

  /[a-z0-9]/g.test('ds');
`}
      </Code>
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