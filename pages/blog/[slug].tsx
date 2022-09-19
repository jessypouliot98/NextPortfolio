import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { BlogPost, getBlogListPage } from "@/lib/contentful";
import { Markdown } from "@/lib/react-markdown";

import { useLang } from "@/hooks/app";

import { AlertBanner, Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

import { ProjectSinglePageProps } from "../projects/[slug]";

export type BlogPostPageProps = {
  title: string,
  description: string,
  page: BlogPost,
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ title, page }) => {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <PageDefaultLayout title={title} description={page.seoDescription} breadcrumbsI18nProps={{ blogTitle: page.title }}>
      <Section>
        <SectionTitle component="h1">
          {page.title}
        </SectionTitle>
        {lang !== 'en' && (
          <AlertBanner className="font-bold mb-4" type="warning">
            {t('page:blog.pageOnlyAvailableInEnglish')}
          </AlertBanner>
        )}
        <Markdown markdown={page.content}/>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const page = await getBlogListPage({ lang: 'en' });

  return {
    paths: page.blogPosts.reduce((accPaths, blogPost) => {
      context.locales?.forEach((locale: string) => {
        accPaths.push({ params: { slug: blogPost.slug }, locale: locale as AppLanguage });
      });

      return accPaths;
    }, [] as { params: { slug: string }, locale: AppLanguage }[]),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProjectSinglePageProps, { slug: string }> = async (context) => {
  const lang = context.locale as AppLanguage;
  const page = await getBlogListPage({ lang });

  const blogPost = page.blogPosts.find((blog) => blog.slug === context.params?.slug);

  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  return {
    props: {
      title: `${page.title} - ${blogPost.title}`,
      page: blogPost,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPostPage;
