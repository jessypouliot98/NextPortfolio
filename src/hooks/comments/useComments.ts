import type { Comment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useComments = (contentfulEntryId: string) => {
  return useQuery<Comment[]>(['comments', contentfulEntryId], () => fetch(`/api/comments/${contentfulEntryId}`).then(res => res.json()));
};
