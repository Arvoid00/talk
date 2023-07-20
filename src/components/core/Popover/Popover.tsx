"use client";

import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Popover as BasePopover } from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type PopoverProps<T extends As = typeof BasePopover> = Options<T>;

export const Popover = createComponent<PopoverProps>(
  ({ className, ...props }) =>
    createElement(BasePopover, {
      ...props,
      className: cn(styles.popover, className)
    })
);
