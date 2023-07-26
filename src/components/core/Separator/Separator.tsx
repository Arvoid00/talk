"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Separator as BaseSeparator } from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type SeparatorProps<T extends As = typeof BaseSeparator> = Options<T>;

export const Separator = createComponent<SeparatorProps>(
  ({ className, orientation = `horizontal`, ...props }) =>
    createElement(BaseSeparator, {
      ...props,
      orientation,
      className: cn(
        styles.separator,
        orientation === `horizontal` ? styles.horizontal : styles.vertical,
        className
      )
    })
);
