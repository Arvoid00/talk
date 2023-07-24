"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import {
  Form as BaseForm,
  type FormProps,
  FormGroup,
  type FormGroupProps,
  FormGroupLabel,
  type FormGroupLabelProps,
  FormReset,
  FormSubmit,
  type FormSubmitProps
} from "@ariakit/react";
import { buttonVariants, type ButtonProps } from "../Button";
import { cn } from "../../../utils/cn";
import styles from "./styles.module.css";

export const Form = createComponent<FormProps>(({ className, ...props }) =>
  createElement(BaseForm, {
    ...props,
    className: cn(styles.form, className)
  })
);

export const Group = createComponent<FormGroupProps>(
  ({ className, ...props }) =>
    createElement(FormGroup, {
      ...props,
      className: cn(styles.group, className)
    })
);

export const Legend = createComponent<FormGroupLabelProps>(
  ({ className, ...props }) =>
    createElement(FormGroupLabel, {
      ...props,
      className: cn(styles.legend, className)
    })
);

export const Submit = createComponent<ButtonProps & FormSubmitProps>(
  ({ className, ...props }) =>
    createElement(FormSubmit, {
      ...props,
      className: cn(buttonVariants(), className)
    })
);

export const Reset = createComponent<ButtonProps & FormSubmitProps>(
  ({ className, ...props }) =>
    createElement(FormReset, {
      ...props,
      className: cn(buttonVariants({ variant: `outline` }), className)
    })
);
