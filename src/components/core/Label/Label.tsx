"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { FormLabel } from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type LabelProps<T extends As = typeof FormLabel> = Options<T>;

export const Label = createComponent<LabelProps>(({ className, ...props }) =>
  createElement(FormLabel, {
    ...props,
    className: cn(styles.label, className)
  })
);
