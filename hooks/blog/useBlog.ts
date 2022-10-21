import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useBlog = (contentfulEntryId: string) => {
  return useQuery<Blog>(['blog', contentfulEntryId], () => fetch(`/api/blog/${contentfulEntryId}`).then(res => res.json()));
};