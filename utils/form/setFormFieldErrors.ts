import { ErrorOption } from "react-hook-form";

export const setFormFieldErrors = <TName extends string = string>(setError: (field: TName, error: ErrorOption) => void, errors: Record<string, string[]>) => {
  Object.entries(errors).forEach(([field, errors]) => {
    errors.forEach((error) => {
      setError(field as TName, { message: error });
    });
  });
};