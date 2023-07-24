"use client";
import { FormInput } from "@ariakit/react";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { cn } from "../../../../utils";
import styles from "./styles.module.css";

export type TextInputProps<T extends As = typeof FormInput> = Options<T>;

export const TextInput = createComponent<TextInputProps>(
  ({ className, ...props }) =>
    createElement(FormInput, {
      ...props,
      className: cn(styles.textinput, className)
    })
);
