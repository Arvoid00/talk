import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      default: styles.default,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline
    }
  },
  defaultVariants: {
    variant: `default`
  }
});

export type BadgeProps<T extends As = "div"> = Options<T> &
  VariantProps<typeof badgeVariants>;

export const Badge = createComponent<BadgeProps>(
  ({ className, variant, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(badgeVariants({ variant, className }))
    })
);
