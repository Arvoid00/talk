"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import {
  Dialog as BaseDialog,
  DialogHeading as BaseDialogHeader,
  DialogDescription as BaseDialogDescription,
  DialogDismiss as BaseDialogDismiss
} from "@ariakit/react";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type SheetOverlayProps<T extends As = "div"> = Options<T>;

export const SheetOverlay = createComponent<SheetOverlayProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.overlay, className)
    })
);

export type SheetContentProps<T extends As = typeof BaseDialog> = Options<T>;

export const SheetContent = createComponent<SheetContentProps>(
  ({ className, ...props }) =>
    createElement(BaseDialog, {
      ...props,
      className: cn(styles.content, className)
    })
);

export type SheetHeaderProps<T extends As = "div"> = Options<T>;

export const SheetHeader = createComponent<SheetHeaderProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.header, className)
    })
);

export type SheetTitleProps<T extends As = typeof BaseDialogHeader> =
  Options<T>;

export const SheetTitle = createComponent<SheetTitleProps>(
  ({ className, ...props }) =>
    createElement(BaseDialogHeader, {
      ...props,
      className: cn(styles.title, className)
    })
);

export type SheetDescriptionProps<T extends As = typeof BaseDialogDescription> =
  Options<T>;

export const SheetDescription = createComponent<SheetDescriptionProps>(
  ({ className, ...props }) =>
    createElement(BaseDialogDescription, {
      ...props,
      className: cn(styles.description, className)
    })
);

export type SheetFooterProps<T extends As = "div"> = Options<T>;

export const SheetFooter = createComponent<SheetFooterProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.footer, className)
    })
);

export type SheetCloseProps<T extends As = typeof BaseDialogDismiss> =
  Options<T>;

export const SheetClose = createComponent<SheetCloseProps>(
  ({ className, ...props }) =>
    createElement(BaseDialogDismiss, {
      ...props,
      className: cn(styles.close, className)
    })
);
