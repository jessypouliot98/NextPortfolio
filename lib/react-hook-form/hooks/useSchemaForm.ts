import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { UseFormProps } from "react-hook-form/dist/types";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject } from "zod";

type Schema = ZodObject<any>;

export const useSchemaForm = <TSchema extends Schema = Schema>(schema: TSchema, formOptions: Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> = {}) => {
  type FormFields = z.infer<TSchema>;

  const form = useForm<FormFields>({
    ...formOptions,
    resolver: zodResolver(schema),
  });

  const registerField = useCallback((...[name, fieldOptions]: Parameters<UseFormRegister<FormFields>>) => {
    const props = form.register(name, fieldOptions);

    console.log(schema.shape[name]);

    return {
      ...props,
      required: !schema.shape[name].isOptional(),
      error: form.formState.errors[name],
    };
  }, [form, schema.shape]);

  return {
    ...form,
    registerField,
  };
};