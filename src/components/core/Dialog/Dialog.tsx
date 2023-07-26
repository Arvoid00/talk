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
import { Button } from "../Button";
import { cn } from "../../../utils";
import styles from "./styles.module.css";

export type DialogOverlayProps<T extends As = "div"> = Options<T>;

export const DialogOverlay = createComponent<DialogOverlayProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.overlay, className)
    })
);

export type DialogContentProps<T extends As = typeof BaseDialog> = Options<T>;

export const DialogContent = createComponent<DialogContentProps>(
  ({ className, ...props }) =>
    createElement(BaseDialog, {
      ...props,
      className: cn(styles.content, className)
    })
);

export type DialogHeaderProps<T extends As = "div"> = Options<T>;

export const DialogHeader = createComponent<DialogHeaderProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.header, className)
    })
);

export type DialogTitleProps<T extends As = typeof BaseDialogHeader> =
  Options<T>;

export const DialogTitle = createComponent<DialogTitleProps>(
  ({ className, ...props }) =>
    createElement(BaseDialogHeader, {
      ...props,
      className: cn(styles.title, className)
    })
);

export type DialogDescriptionProps<
  T extends As = typeof BaseDialogDescription
> = Options<T>;

export const DialogDescription = createComponent<DialogDescriptionProps>(
  ({ className, ...props }) =>
    createElement(BaseDialogDescription, {
      ...props,
      className: cn(styles.description, className)
    })
);

export type DialogFooterProps<T extends As = "div"> = Options<T>;

export const DialogFooter = createComponent<DialogFooterProps>(
  ({ className, ...props }) =>
    createElement(`div`, {
      ...props,
      className: cn(styles.footer, className)
    })
);

export type DialogActionProps<
  T extends As = typeof BaseDialogDismiss<typeof Button>
> = Options<T>;

export const DialogAction = createComponent<DialogActionProps>(
  ({ as = Button, ...props }) =>
    createElement(BaseDialogDismiss, {
      ...props,
      as
    })
);

export type DialogCancelProps<
  T extends As = typeof BaseDialogDismiss<typeof Button>
> = Options<T>;

export const DialogCancel = createComponent<DialogActionProps>(
  ({ as = Button, className, ...props }) =>
    createElement(BaseDialogDismiss, {
      ...props,
      variant: `outline`,
      as,
      className: cn(styles.cancel, className)
    })
);
