import React from "react";
import { FormInput, type FormInputProps } from "@ariakit/react";
import { useFormInput } from "@ariakit/react-core/form/form-input";
import { FieldFrame, FieldLabel, FieldError, FieldHint } from "../Field";
import { TextArea } from "./TextArea";

export interface TextAreaFieldProps extends FormInputProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  hint,
  icon = null,
  type,
  ...props
}) => {
  const field = useFormInput(props);

  return (
    <FieldFrame>
      {label ? <FieldLabel name={props.name}>{label}</FieldLabel> : null}
      <FormInput as={TextArea} name={props.name} />
      {hint ? <FieldHint name={props.name}>{hint}</FieldHint> : null}
      {field[`aria-invalid`] ? <FieldError name={props.name} /> : null}
    </FieldFrame>
  );
};
