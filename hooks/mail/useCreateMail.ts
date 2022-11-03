import { useState } from 'react';
import React, { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useCreateMail = (onMailCreated?: () => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmitMail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const payload = {
        firstName: (formData.get('firstName') as string).trim(),
        lastName: (formData.get('lastName') as string).trim(),
        email: (formData.get('email') as string).trim(),
        subject: (formData.get('subject') as string).trim(),
        body: (formData.get('body') as string).trim(),
      };
      const recaptchaToken = await executeRecaptcha?.();
      
      const isAllStrings = Object.values(payload).every((v) => typeof v === 'string');
      if (!isAllStrings || !recaptchaToken) {
        throw new Error('Missing required fields');
      }
      
      await fetch(`/api/mail`, {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          recaptchaToken,
        })
      });
      
      form.reset();

      onMailCreated?.();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onMailCreated, executeRecaptcha]);

  return {
    isProcessing,
    handleSubmitMail,
  };
};