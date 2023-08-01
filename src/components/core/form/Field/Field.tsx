"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import {
  FormError,
  type FormErrorProps,
  FormLabel,
  type FormLabelProps,
  FormDescription,
  type FormDescriptionProps
} from "@ariakit/react";
import { cn } from "../../../../utils/cn";
import styles from "./styles.module.css";

export type FieldFrameProps<T extends As = `div`> = Options<T>;

export const FieldFrame = createComponent<FieldFrameProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.frame, className)
    })
);

export const FieldLabel = createComponent<FormLabelProps>(
  ({ className, ...props }) =>
    createElement(FormLabel, {
      ...props,
      className: cn(styles.label, className)
    })
);

export const Label = createComponent<Options<'span'>>(
  ({ className, ...props }) =>
    createElement('span', {
      ...props,
      className: cn(styles.label, className)
    })
);

export const FieldError = createComponent<FormErrorProps>(
  ({ className, ...props }) =>
    createElement(FormError, {
      ...props,
      className: cn(styles.error, className)
    })
);

export const FieldHint = createComponent<FormDescriptionProps>(
  ({ className, ...props }) =>
    createElement(FormDescription, {
      ...props,
      className: cn(styles.hint, className)
    })
);
