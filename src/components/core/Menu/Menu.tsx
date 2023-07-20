"use client";
import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import type { As, Options } from "@ariakit/react-core/utils/types";
import { Menu as BaseMenu, MenuItem as BaseMenuItem, MenuSeparator as BaseMenuSeparator } from "@ariakit/react"
import { cn } from "../../../utils";
import styles from "./styles.module.css"

export type MenuProps<T extends As = typeof BaseMenu> = Options<T>

export const Menu = createComponent<MenuProps>(({ className, ...props }) => createElement(BaseMenu, {
  ...props,
  className: cn(styles.menu, className)
}));

export type MenuItemProps<T extends As = typeof BaseMenuItem> = Options<T>

export const MenuItem = createComponent<MenuItemProps>(({ className, ...props }) => createElement(BaseMenuItem, {
  ...props,
  className: cn(styles.item, className)
}));

export type MenuSeparatorProps<T extends As = typeof BaseMenuSeparator> = Options<T>

export const MenuSeparator = createComponent<MenuSeparatorProps>(({ className, ...props }) => createElement(BaseMenuSeparator, {
  ...props,
  className: cn(styles.separator, className)
}));
