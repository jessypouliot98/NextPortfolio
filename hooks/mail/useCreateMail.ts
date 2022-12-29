import { useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { API } from "@/lib/api-client";
import { useSchemaForm } from "@/lib/react-hook-form";

import { getFormFieldErrors } from "@/utils/form/getFormFieldErrors";
import { setFormFieldErrors } from "@/utils/form/setFormFieldErrors";
import { mailCreateSchema } from "@/utils/schemas/mail";

export const useCreateMail = () => {
  const form = useSchemaForm(mailCreateSchema);
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

      await API.post('/api/mail', payload);

      form.reset();
    } catch (e) {
      const formFieldErrors = getFormFieldErrors(e as Error);
      if (formFieldErrors) {
        setFormFieldErrors(form.setError, formFieldErrors);
        return;
      }
      setSubmitError(e as Error);
      throw e;
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError,
  };
};