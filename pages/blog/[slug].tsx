import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";
import { BlogPost, getBlogListPage } from "@/lib/contentful";
import { Markdown } from "@/lib/react-markdown";

import { Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPostPageProps = {
  page: BlogPost,
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ page }) => {
  return (
    <PageDefaultLayout breadcrumbsI18nProps={{ blogTitle: page.title }}>
      <Section>
        <SectionTitle>
          {page.title}
        </SectionTitle>
        <Markdown markdown={page.content}/>
      </Section>
    </PageDefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps, { slug: string }> = async (context) => {
  const lang = context.locale as AppLanguage;
  const page = await getBlogListPage({ lang });

  const blogPost = page.blogPosts.find((blog) => blog.slug === context.params?.slug);

  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  return {
    props: {
      page: blogPost,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPostPage;