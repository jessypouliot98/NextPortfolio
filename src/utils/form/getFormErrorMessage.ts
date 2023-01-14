import { TFunction } from "i18next";

export const getFormErrorMessage = (error: unknown, t: TFunction): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return t('error:unknown');
};