import { isServer } from '../../utils/platform';
import { useMount } from '../utils/useMount';

const BLOG_VIEWED_STORAGE_KEY = 'blog-post-viewed';

export const useBlogView = (contentfulEntryId: string) => {
  useMount(() => {
    if (isServer()) {
      return;
    }
    
    const item = window.localStorage.getItem(BLOG_VIEWED_STORAGE_KEY) || 'null';
    const blogViewed = JSON.parse(item) || {};

    if (contentfulEntryId in blogViewed) {
      return;
    }

    fetch(`/api/blog/views/${contentfulEntryId}`, {
      method: 'POST',
    });

    window.localStorage.setItem(BLOG_VIEWED_STORAGE_KEY, JSON.stringify({
      ...blogViewed,
      [contentfulEntryId]: true,
    }));
  });
};