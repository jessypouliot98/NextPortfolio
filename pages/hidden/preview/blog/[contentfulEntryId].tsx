import { NextPage } from "next";
import BlogPostPage, { BlogPostPageProps } from "pages/blog/[slug]";
import { BlogPost, getEntry } from "@/lib/contentful";

import { generateGetServerSideProps } from "@/utils/nextjs/getServerSideProps";

export type PreviewBlogPageProps = BlogPostPageProps;

const PreviewBlogPage: NextPage<PreviewBlogPageProps> = (props) => {
  return <BlogPostPage {...props}/>;
};

export const getServerSideProps = generateGetServerSideProps<PreviewBlogPageProps, { contentfulEntryId: string }>(async (context) => {
  const contentfulEntryId = context.params?.contentfulEntryId as string;

  const page = await getEntry<BlogPost>({ entryId: contentfulEntryId, lang: context.locale });
  const title = `Preview - ${page.title}`;

  return {
    props: {
      contentfulEntryId,
      title,
      description: page.seoDescription || title,
      page,
    },
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'router']
});

export default PreviewBlogPage;
