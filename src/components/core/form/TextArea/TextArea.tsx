"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { Options } from "@ariakit/react-core/utils/types";
import { cn } from "../../../../utils";
import styles from "./styles.module.css";

export type TextAreaProps = Options<"textarea">;

export const TextArea = createComponent<TextAreaProps>(
  ({ className, ...props }) =>
    createElement(`textarea`, {
      as: `textarea`,
      ...props,
      className: cn(styles.textarea, className)
    })
);
