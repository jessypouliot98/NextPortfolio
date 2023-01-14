import { useMemo } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FaEye } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { BlogPage, getBlogListPage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { useBlogListViews } from "@/hooks/blog/useBlogListViews";
import { ROUTES } from "@/utils/navigation/routes";
import { NextDate } from "@/utils/NextDate";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, Section, SectionTitle, StylishBox } from "@/components/general";
import Anchor from "@/components/general/Anchor/Anchor";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {
  page: BlogPage,
}

const BlogPage: NextPage<BlogPageProps> = ({ page }) => {
  const lang = useLang();
  const { t } = useTranslation();
  const { data: blogListViews, isLoading } = useBlogListViews();

  const blogPosts = useMemo(() => {
    return page.blogPosts.map((post) => {
      const defaultViews = isLoading ? null : 0;
      const matchedBlogView = blogListViews?.find(({ contentfulEntryId }) => contentfulEntryId === post.id);

      return {
        ...post,
        views: matchedBlogView?.views || defaultViews,
      };
    }).reverse();
  }, [isLoading, blogListViews, page.blogPosts]);

  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h1">
          {page.title}
        </SectionTitle>

        <StylishBox effects={[
          { left: -50 },
          { top: 300, right: -20 },
        ]}>
          <Card>
            <div className="card-body flex flex-wrap -m-4">
              <AnimatePresence initial={true}>
                {blogPosts.map((blogPost, i , { length }) => (
                  <motion.div
                    key={blogPost.slug}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i / length }}
                    className="p-4 md:basis-1/2"
                  >
                    <div className="flex items-center mb-2 text-h6">
                      <time dateTime={blogPost.createdAt}>
                        {NextDate.formatFullDate(new Date(blogPost.createdAt))}
                      </time>
                      {blogPost.views !== null && (
                        <div className="inline-flex flex-center text-xs text-gray-700 dark:text-gray-100 ml-4">
                          <span>{blogPost.views}</span>
                          <FaEye className="text-base ml-1" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-h2 mb-2">
                      <span>{blogPost.title}</span>
                    </h2>
                    <p className="text-p mb-2">
                      {blogPost.seoDescription}
                    </p>
                    <Link className="link link-primary" href={ROUTES['blog.single'].url(lang, { slug: blogPost.slug })}>
                      {t('page:blog.readMore')}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps(async (context) => {
  const page = await getBlogListPage({ lang: context.locale });

  return { props: { page } };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation']
});

export default BlogPage;
