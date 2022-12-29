import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

export type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  type: string;
  label: string;
  error?: { message?: string };
}

export const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>((props, ref) => {
  const { label, className, error, ...inputProps } = props;
  const inputIdentifier = inputProps.id || inputProps.name;

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
          <span className="text-sm text-gray-500 ml-1">Optional</span>
        )}
      </div>
      {inputProps.type === "textarea" ? (
        <textarea ref={ref as any} {...inputProps as any} id={inputIdentifier} className={inputClassName} />
      ) : (
        <input ref={ref as any} {...inputProps} id={inputIdentifier} className={inputClassName} />
      )}
      {error && (
        <div className="text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';