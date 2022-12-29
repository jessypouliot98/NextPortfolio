import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from "react-hook-form";

export const useCreateMail = () => {
  const form = useForm();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = form.handleSubmit(async (formData) => {
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
  });

  return {
    ...form,
    handleSubmit,
  };
};