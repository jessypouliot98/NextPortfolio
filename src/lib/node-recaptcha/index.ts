import getConfig from 'next/config';

import { urlWithQuery } from "@/utils/navigation/urlWithQuery";

const { GOOGLE_RECAPTCHA_SECRET } = getConfig().serverRuntimeConfig;

export const validateRecaptchaToken = async (token: string) => {
  const url = urlWithQuery('https://www.google.com/recaptcha/api/siteverify', {
    secret: GOOGLE_RECAPTCHA_SECRET,
    response: token,
  });
  
  const response = await fetch(url, { method: 'POST' }).then(((resp) => resp.json()));
  
  if (!response.success) {
    return {
      success: false as const,
    };
  }

  return {
    success: true as const,
    score: response.score as number,
  };
};