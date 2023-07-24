import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export const alertVariants = cva(styles.alert, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive
    }
  },
  defaultVariants: {
    variant: `default`
  }
});

export type AlertProps<T extends As = "div"> = Options<T> &
  VariantProps<typeof alertVariants>;

export const Alert = createComponent<AlertProps>(
  ({ className, variant, ...props }) =>
    createElement(`div`, {
      ...props,
      role: `alert`,
      className: cn(alertVariants({ variant, className }))
    })
);

export type AlertTitleProps<T extends As = "h5"> = Options<T> &
  React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = createComponent<AlertTitleProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.title, className)
    })
);

export type AlertDescriptionProps<T extends As = "p"> = Options<T> &
  React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription = createComponent<AlertDescriptionProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.description, className)
    })
);
