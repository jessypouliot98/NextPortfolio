import { useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from "react-hook-form";

export const useCreateMail = () => {
  const form = useForm();
  const [submitError, setSubmitError] = useState<Error>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = form.handleSubmit(async (formData) => {
    setSubmitError(undefined);

    try {
      const recaptchaToken = await executeRecaptcha?.();

      if (!recaptchaToken) {
        throw new Error('Missing ReCaptcha');
      }

      const payload = {
        ...formData,
        recaptchaToken,
      };

      await fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      form.reset();
    } catch (e) {
      setSubmitError(e as Error);
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError,
  };
};