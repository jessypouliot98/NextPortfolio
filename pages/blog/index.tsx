import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { BlogPage, getBlogListPage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { PageDefaultLayout } from "@/components/layout";
import clsx from "clsx";

export type BlogPageProps = {
  page: BlogPage,
}

const PLACEHOLDER_IMAGE = 'https://images.ctfassets.net/8cut8f9cq03l/5v4rdL95gfVfUKjSR2rKXF/e94c1c81d76d56e2710b2b990482fda9/placeholder.png';

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
            <div className={'p-2'}>
              <Link
                key={blogPost.slug}
                className={clsx(
                  'flex flex-row p-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden min-h-[120px]',
                  'transition hover:scale-105'
                )}
                href={Routes.getBlogSingle(lang, blogPost.slug).href}
              >
                <div
                  className={'bg-cover bg-center max-w-[300px] flex-1 -m-4 mr-4'}
                  style={{ backgroundImage: `url(${PLACEHOLDER_IMAGE})` }}
                />
                <div>
                  <h2 className={'text-xl font-bold text-blue-500 mb-4'}>{blogPost.title}</h2>
                  <p className={'text-md font-normal'}>
                    {blogPost.seoDescription}
                  </p>
                </div>
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
