import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

export type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
}

export const FormField: React.FC<FormFieldProps> = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  const { label, className, ...inputProps } = props;
  const inputIdentifier = inputProps.id || inputProps.name;

  return (
    <div className={clsx('input-group', className)}>
      <div>
        <label htmlFor={inputIdentifier}>
          {label}
        </label>
      </div>
      <input ref={ref} className="input" {...inputProps} id={inputIdentifier} />
    </div>
  );
});

FormField.displayName = 'FormField';