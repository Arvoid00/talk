"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Tooltip as BaseTooltip } from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type TooltipProps<T extends As = typeof BaseTooltip> = Options<T>;

export const Tooltip = createComponent<TooltipProps>(
  ({ className, ...props }) =>
    createElement(BaseTooltip, {
      ...props,
      className: cn(styles.tooltip, className)
    })
);
