"use client";
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
      sm: styles.small,
      md: styles.medium,
      lg: styles.large,
      icon: styles.icon
    }
  },
  defaultVariants: {
    variant: `default`,
    size: `md`
  }
});

export type ButtonProps<T extends As = typeof BaseButton> = Options<T> &
  VariantProps<typeof buttonVariants> & { className?: string };

export const Button = createComponent<ButtonProps>(
  ({ className, variant = `default`, size = `md`, ...props }) =>
    createElement(BaseButton, {
      ...props,
      className: cn(buttonVariants({ variant, size }), className)
    })
);
