"use client";
import type { StringLike } from "@ariakit/core/form/types";
import type { FormFieldProps, FormStore } from "@ariakit/react";
import { FormField } from "@ariakit/react";
import React from "react";
import { useFormStore } from "../hooks";
import { Select } from "./Select";
import { FieldError, FieldFrame, FieldLabel } from "../Field";

export interface SelectFieldProps extends FormFieldProps<typeof Select> {
  name: StringLike;
  label?: React.ReactNode;
  store?: FormStore;
  children?: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  store,
  children,
  ...props
}) => {
  const form = useFormStore(store);

  form.useValidate(() => {
    if (props.required && !form.getValue(name).length) {
      form.setError(name, `Please select an item.`);
    }
  });

  return (
    <FieldFrame>
      <FieldLabel name={name}>{label}</FieldLabel>
      <FormField
        as={Select}
        name={name}
        {...props}
        value={form.useValue(name)}
        setValue={(value: string) => form.setValue(name, value)}
        touchOnBlur={false}
        onTouch={() => form.setFieldTouched(name, true)}
      >
        {children}
      </FormField>
      <FieldError name={name} />
    </FieldFrame>
  );
};
