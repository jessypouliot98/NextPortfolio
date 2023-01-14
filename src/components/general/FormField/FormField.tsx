import React, { ForwardedRef, forwardRef } from "react";
import { useTranslation } from "next-i18next";
import { Input, InputProps, Option } from "react-advanced-input";
import clsx from "clsx";

export type FormFieldProps<TOption extends Option = Option> = InputProps<TOption> & {
  label: string;
  error?: { message?: string };
}

export const FormField = forwardRef(<TOption extends Option = Option>(
  props: FormFieldProps<TOption>,
  ref: ForwardedRef<any>,
) => {
  const { label, className, error, ...inputProps } = props;
  const inputIdentifier = inputProps.id || inputProps.name;
  const { t } = useTranslation();

  const inputClassName = clsx(
    'input',
    !!error && 'input-error',
  );

  return (
    <div className={clsx('input-group', className)}>
      <div className="flex justify-between items-end">
        <label htmlFor={inputIdentifier}>
          {label}
        </label>
        {inputProps.required === false && (
          <span className="text-sm text-gray-500 ml-1">
            {t('common:form.optional')}
          </span>
        )}
      </div>
      <Input ref={ref} {...inputProps} id={inputIdentifier} className={inputClassName} />
      {error && (
        <div className="text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';