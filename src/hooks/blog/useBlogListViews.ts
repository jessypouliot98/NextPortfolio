import { Blog } from '@prisma/client';
import { useQuery } from "@tanstack/react-query";

export const useBlogListViews = () => {
  return useQuery<Pick<Blog, 'contentfulEntryId' | 'views'>[]>(['blog'], () => fetch(`/api/blog/views`).then(res => res.json()));
};