import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BlogPostPage, { BlogPostPageProps } from "pages/blog/[slug]";
import { AppLanguage } from "types";
import { BlogPost, getEntry } from "@/lib/contentful";

export type PreviewBlogPageProps = BlogPostPageProps;

const PreviewBlogPage: NextPage<PreviewBlogPageProps> = (props) => {
  return <BlogPostPage {...props}/>;
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps, { contentfulEntryId: string }> = async (context) => {
  const lang = context.locale as AppLanguage;
  const contentfulEntryId = context.params?.contentfulEntryId as string;

  const page = await getEntry<BlogPost>({ entryId: contentfulEntryId, lang });
  const title = `Preview - ${page.title}`;

  return {
    props: {
      contentfulEntryId,
      title,
      description: page.seoDescription || title,
      page,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default PreviewBlogPage;
