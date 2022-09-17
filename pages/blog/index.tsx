import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { BlogPage, getBlogListPage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {
  page: BlogPage,
}

const BlogPage: NextPage<BlogPageProps> = ({ page }) => {
  const lang = useLang();
  
  return (
    <PageDefaultLayout description={page.seoDescription}>
      <Section>
        <SectionTitle component="h1">
          {page.title}
        </SectionTitle>
        {page.blogPosts.map((blogPost) => (
          <div key={blogPost.slug}>
            <Link href={Routes.getBlogSingle(lang, blogPost.slug).href}>{blogPost.title}</Link>
          </div>
        ))}
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