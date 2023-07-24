import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Button as BaseButton } from "@ariakit/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.default,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline,
      ghost: styles.ghost,
      link: styles.link
    },
    size: {
      default: styles.medium,
      sm: styles.small,
      lg: styles.large,
      icon: styles.icon
    }
  },
  defaultVariants: {
    variant: `default`,
    size: `default`
  }
});

export type ButtonProps<T extends As = typeof BaseButton> = Options<T> &
  VariantProps<typeof buttonVariants>;

export const Button = createComponent<ButtonProps>(
  ({ className, variant = `default`, size = `default`, ...props }) =>
    createElement(BaseButton, {
      ...props,
      className: cn(buttonVariants({ variant, size, className }))
    })
);
