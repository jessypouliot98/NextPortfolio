import { useCallback } from 'react';
export const useCreateComment = (contentfulEntryId: string, onCommentCreated?: () => void) => {
  const handleSubmitComment = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = (formData.get('comment') as string).trim();

    if (!content) {
      return;
    }
    
    form.reset();

    fetch(`/api/comments/${contentfulEntryId}`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        authorName: 'Annonymous User',
      })
    })
      .then(onCommentCreated)
      .catch(console.error);
  }, [contentfulEntryId, onCommentCreated]);

  return {
    handleSubmitComment,
  };
};