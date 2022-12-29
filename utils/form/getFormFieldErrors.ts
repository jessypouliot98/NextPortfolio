import { AxiosError } from "axios";

type ZodErrorResponse = {
  fieldErrors: Record<string, string[]>;
}

export const getFormFieldErrors = (error: Error) => {
  if (!(error instanceof AxiosError)) {
    return;
  }

  const data = (error.response?.data || {}) as ZodErrorResponse | {};

  if (!('fieldErrors' in data)) {
    return;
  }

  return data.fieldErrors;
};