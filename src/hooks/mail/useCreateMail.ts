import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSchemaForm } from "@/lib/react-hook-form";
import { zContactSchema } from "@/lib/trpc/server/routers/mail/validators";
import { trpc } from "@/lib/trpc/utils/trpc";

export const useCreateMail = () => {
  const form = useSchemaForm(zContactSchema);
  const { mutateAsync: sendMail, error: submitError } = trpc.mail.contact.useMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = form.handleSubmit(async (formData) => {
    const recaptchaToken = await executeRecaptcha?.();

    if (!recaptchaToken) {
      throw new Error('Missing ReCaptcha');
    }

    await sendMail({
      ...formData,
      recaptchaToken,
    });

    form.reset();
  });

  return {
    ...form,
    handleSubmit,
    submitError,
  };
};