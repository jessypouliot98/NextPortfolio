import { useState } from 'react';
import React, { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useCreateComment = (contentfulEntryId: string, onCommentCreated?: () => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmitComment = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const content = (formData.get('comment') as string).trim();
      const recaptchaToken = await executeRecaptcha?.();

      if (!content || !recaptchaToken) {
        throw new Error('Missing required fields');
      }
      
      form.reset();

      await fetch(`/api/comments/${contentfulEntryId}`, {
        method: 'POST',
        body: JSON.stringify({
          content,
          authorName: 'Annonymous User',
          recaptchaToken,
        })
      });

      onCommentCreated?.();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, contentfulEntryId, onCommentCreated, executeRecaptcha]);

  return {
    isProcessing,
    handleSubmitComment,
  };
};