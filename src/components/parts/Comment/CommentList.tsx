import React from 'react';
import { Comment } from '@prisma/client';

import { CommentItem } from './CommentItem';

export type CommentListProps = {
  comments: Comment[],
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return null;
  }
  
  return (
    <ul className="mb-2">
      {comments.map((comment) => (
        <li key={comment.id} className="border-b border-gray-200 dark:border-gray-600 py-4 last:border-none">
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};