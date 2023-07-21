"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Hovercard as BaseHovercard } from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type HoverCardProps<T extends As = typeof BaseHovercard> = Options<T>;

export const HoverCard = createComponent<HoverCardProps>(
  ({ className, ...props }) =>
    createElement(BaseHovercard, {
      ...props,
      className: cn(styles.hovercard, className)
    })
);
