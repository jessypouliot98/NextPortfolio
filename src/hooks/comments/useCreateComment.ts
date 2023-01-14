import React, { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { trpc } from "@/lib/trpc/utils/trpc";

export const useCreateComment = (contentfulEntryId: string, onCommentCreated?: () => void) => {
  const { mutate: createComment, isLoading: isProcessing } = trpc.comments.create.useMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmitComment = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const content = (formData.get('comment') as string).trim();
      const recaptchaToken = await executeRecaptcha?.();

      if (!content || !recaptchaToken) {
        throw new Error('Missing required fields');
      }

      createComment({
        contentfulEntryId,
        content,
        authorName: 'Anonymous',
        recaptchaToken,
      });

      form.reset();

      onCommentCreated?.();
    } catch (e) {
      console.error(e);
    }
  }, [contentfulEntryId, onCommentCreated, executeRecaptcha]);

  return {
    isProcessing,
    handleSubmitComment,
  };
};