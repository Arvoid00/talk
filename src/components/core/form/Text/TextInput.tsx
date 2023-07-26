"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { cn } from "../../../../utils";
import styles from "./styles.module.css";

export type TextInputProps<T extends As = "input"> = Options<T>;

export const TextInput = createComponent<TextInputProps>(
  ({ className, ...props }) =>
    createElement(`input`, {
      ...props,
      className: cn(styles.input, className)
    })
);
