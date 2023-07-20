"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type SeparatorProps<T extends As = typeof SeparatorPrimitive.Root> =
  Options<T>;

export const Separator = createComponent<SeparatorProps>(
  ({ className, orientation = `horizontal`, decorative = true, ...props }) =>
    createElement(SeparatorPrimitive.Root, {
      ...props,
      decorative,
      orientation,
      className: cn(
        styles.separator,
        orientation === `horizontal` ? styles.horizontal : styles.vertical,
        className
      )
    })
);
