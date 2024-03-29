import { GetStaticPaths, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { FaEye } from "react-icons/fa";
import { BlogPost, getBlogListPage } from "@/lib/contentful";
import { Markdown } from "@/lib/react-markdown";
import { trpc } from "@/lib/trpc/utils/trpc";

import { useLang } from "@/hooks/app";
import { useBlogView } from "@/hooks/blog";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { DEFAULT_LANGUAGE } from "@/utils/constants";
import { NextDate } from "@/utils/NextDate";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { AlertBanner, Button, Card, Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";
import { CommentList } from "@/components/parts/Comment";

import { AppLanguage } from "@/types";

export type BlogPostPageProps = {
  contentfulEntryId: string,
  title: string,
  description?: string,
  page: BlogPost,
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ contentfulEntryId, title, page }) => {
  const { t } = useTranslation();
  const lang = useLang();

  const { isLoading, data: blog, refetch  } = trpc.blog.get.useQuery({ contentfulEntryId });
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
          <AlertBanner className="font-bold mb-4" variant="warning">
            {t('page:blog.pageOnlyAvailableInEnglish')}
          </AlertBanner>
        )}
        <Markdown markdown={page.content}/>
      </Section>
      <Section>
        <SectionTitle>
          {t('page:blog.comments')}
        </SectionTitle>
        <Card className="card-body">
          {isLoading ? (
            <div>{t("common:state.loading")}</div>
          ) : (
            <>
              <CommentList comments={blog?.comments ?? []} />
              <form onSubmit={handleSubmitComment}>
                <input className="w-full input mb-2" type="text" name="comment" placeholder={t('page:blog.commentInputPlaceholder')} required={true} disabled={isProcessing} />
                <div className="flex justify-end">
                  <Button variant="primary" disabled={isProcessing}>
                    {t("page:blog.submit")}
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
  const page = await getBlogListPage({ lang: DEFAULT_LANGUAGE });

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

export const getStaticProps = generateGetStaticProps<BlogPostPageProps, { slug: string }>(async (context) => {
  const page = await getBlogListPage({ lang: context.locale });

  const blogPost = page.blogPosts.find((blog) => blog.slug === context.params.slug);

  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  return {
    props: {
      contentfulEntryId: blogPost.id,
      title: `${page.title} - ${blogPost.title}`,
      description: page.seoDescription,
      page: blogPost,
    },
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation']
});

export default BlogPostPage;
