import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaEye } from "react-icons/fa";
import { AppLanguage } from "types";
import { BlogPost, getBlogListPage } from "@/lib/contentful";
import { Markdown } from "@/lib/react-markdown";

import { useLang } from "@/hooks/app";
import { useBlog, useBlogView } from "@/hooks/blog";
import { useComments } from "@/hooks/comments";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { NextDate } from "@/utils/NextDate";

import { AlertBanner, Button, Card, Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";
import { CommentList } from "@/components/parts/Comment";

export type BlogPostPageProps = {
  contentfulEntryId: string,
  title: string,
  description: string,
  page: BlogPost,
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ contentfulEntryId, title, page }) => {
  const { t } = useTranslation();
  const lang = useLang();
  const { isLoading, data: comments = [], refetch,  } = useComments(contentfulEntryId);
  const { data: blog } = useBlog(contentfulEntryId); 
  const { handleSubmitComment, isProcessing } = useCreateComment(contentfulEntryId, refetch);
  useBlogView(contentfulEntryId);

  return (
    <PageDefaultLayout title={title} description={page.seoDescription} breadcrumbsI18nProps={{ blogTitle: page.title }}>
      <Section>
        <div className="flex items-center">
          <time dateTime={page.createdAt} className="text-h6 text-gray-600 dark:text-gray-400">
            {NextDate.formatFullDate(new Date(page.createdAt))}
          </time>
          {blog && (
            <div className="inline-flex flex-center text-gray-600 dark:text-gray-400 ml-4">
              <span>{blog.views || 0}</span>
              <FaEye className="text-base ml-1" />
            </div>
          )}
        </div>
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
      <Section>
        <SectionTitle>
          {t('page:blog.comments')}
        </SectionTitle>
        <Card>
          {isLoading ? (
            <div>loading</div>
          ) : (
            <>
              <CommentList comments={comments} />
              <form onSubmit={handleSubmitComment}>
                <input className="w-full input mb-2" type="text" name="comment" placeholder={t('page:blog.commentInputPlaceholder')} disabled={isProcessing} />
                <div className="flex justify-end">
                  <Button type="primary" disabled={isProcessing}>
                    Comment
                  </Button>
                </div>
              </form>
            </>
          )}  
        </Card>
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

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug: string }> = async (context) => {
  const lang = context.locale as AppLanguage;
  const page = await getBlogListPage({ lang });

  const blogPost = page.blogPosts.find((blog) => blog.slug === context.params?.slug);

  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  return {
    props: {
      contentfulEntryId: blogPost.id,
      title: `${page.title} - ${blogPost.title}`,
      page: blogPost,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPostPage;
