import { trpc } from "@/lib/trpc/utils/trpc";

import { useMount } from "@/hooks/utils/useMount";
import { isServer } from '@/utils/platform';

const BLOG_VIEWED_STORAGE_KEY = 'blog-post-viewed';

export const useBlogView = (contentfulEntryId: string) => {
  const { mutateAsync: incrementViewCount } = trpc.blog.views.increment.useMutation();

  useMount(() => {
    if (isServer()) {
      return;
    }

    const item = window.localStorage.getItem(BLOG_VIEWED_STORAGE_KEY) || 'null';
    const blogViewed = JSON.parse(item) || {};

    if (contentfulEntryId in blogViewed && blogViewed[contentfulEntryId]) {
      return;
    }

    incrementViewCount({ contentfulEntryId }).catch(() => {
      window.localStorage.setItem(BLOG_VIEWED_STORAGE_KEY, JSON.stringify({
        ...blogViewed,
        [contentfulEntryId]: false,
      }));
    });

    window.localStorage.setItem(BLOG_VIEWED_STORAGE_KEY, JSON.stringify({
      ...blogViewed,
      [contentfulEntryId]: true,
    }));
  });
};