import React from 'react';
import { Comment } from '@prisma/client';

import { useNextDate } from '@/hooks/utils';

export type CommentProps = {
  comment: Comment
}

export const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  const { diffFromNowAorB, distanceFromNow, formatFullDate } = useNextDate();

  return (
    <div>
      <div className="text-xs flex">
        <h4 className="font-bold text-blue-600 dark:text-blue-400">{comment.authorName}</h4>
        <div className="ml-2 text-gray-600 dark:text-gray-400">{diffFromNowAorB(new Date(comment.createdAt || ''), 24, distanceFromNow, formatFullDate)}</div>
      </div>
      <p className="text-p whitespace-pre">{comment.content}</p>
    </div>
  );
};