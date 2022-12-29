import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

export type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  type: string;
  label: string;
}

export const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>((props, ref) => {
  const { label, className, type, ...inputProps } = props;
  const inputIdentifier = inputProps.id || inputProps.name;

  return (
    <div className={clsx('input-group', className)}>
      <div>
        <label htmlFor={inputIdentifier}>
          {label}
        </label>
      </div>
      {type === "textarea" ? (
        <textarea ref={ref as any} {...inputProps as any} id={inputIdentifier} className="input" />
      ) : (
        <input ref={ref as any} {...inputProps} id={inputIdentifier} className="input" />
      )}
    </div>
  );
});

FormField.displayName = 'FormField';