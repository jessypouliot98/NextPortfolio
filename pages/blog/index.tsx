import { useMemo } from "react";
import { NextPage } from "next";
import { FaEye } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { BlogPage, getBlogListPage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { useBlogListViews } from "@/hooks/blog/useBlogListViews";
import { Routes } from "@/utils/link";
import { NextDate } from "@/utils/NextDate";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPageProps = {
  page: BlogPage,
}

const BlogPage: NextPage<BlogPageProps> = ({ page }) => {
  const lang = useLang();
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
        <div className={'-m-2'}>
          <AnimatePresence initial={true}>
            {blogPosts.map((blogPost, i , { length }) => (
              <motion.div
                key={blogPost.slug}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 * (i / length) }}
                className={'p-2'}
              >
                <Link
                  className={'block transition hover:scale-105'}
                  href={Routes.getBlogSingle(lang, { slug: blogPost.slug }).href}
                >
                  <Card>
                    <div className="flex items-center">
                      <time dateTime={blogPost.createdAt} className="text-h6">
                        {NextDate.formatFullDate(new Date(blogPost.createdAt))}
                      </time>
                      {blogPost.views !== null && (
                        <div className="inline-flex flex-center text-xs text-gray-700 dark:text-gray-100 ml-4">
                          <span>{blogPost.views}</span>
                          <FaEye className="text-base ml-1" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-h3 mb-2 text-blue-500 dark:text-blue-500">
                      <span>{blogPost.title}</span>
                    </h2>
                    <p className="text-p">
                      {blogPost.seoDescription}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
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
