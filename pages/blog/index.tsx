import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { BlogPage, getBlogListPage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { Card, Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {
  page: BlogPage,
}

const BlogPage: NextPage<BlogPageProps> = ({ page }) => {
  const lang = useLang();

  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h1">
          {page.title}
        </SectionTitle>
        <div className={'-m-2'}>
          {page.blogPosts.map((blogPost) => (
            <div key={blogPost.slug} className={'p-2'}>
              <Link
                className={'block transition hover:scale-105'}
                href={Routes.getBlogSingle(lang, blogPost.slug).href}
              >
                <Card className="flex flex-col md:flex-row">
                  <div>
                    <h2 className={'text-xl font-bold text-blue-500 mb-4'}>{blogPost.title}</h2>
                    <p className={'text-md font-normal'}>
                      {blogPost.seoDescription}
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context) => {
  const lang = context.locale as AppLanguage;
  const page = await getBlogListPage({ lang });

  return {
    props: {
      page,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPage;
