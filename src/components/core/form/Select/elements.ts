import {
  createComponent,
  createElement
} from "@ariakit/react-core/utils/system";
import {
  Select,
  type SelectProps,
  SelectGroup as BaseSelectGroup,
  type SelectGroupProps,
  SelectGroupLabel as BaseSelectGroupLabel,
  type SelectGroupLabelProps,
  SelectItem as BaseSelectItem,
  type SelectItemProps,
  SelectPopover,
  type SelectPopoverProps
} from "@ariakit/react";
import { cn } from "../../../../utils/cn";
import styles from "./styles.module.css";
import typography from "../../../../theme/typography.module.css";

export const SelectInput = createComponent<SelectProps>(
  ({ className, ...props }) =>
    createElement(Select, {
      ...props,
      className: cn(styles.input, typography.im, typography.trim, className)
    })
);

export const SelectOptions = createComponent<SelectPopoverProps>(
  ({ className, ...props }) =>
    createElement(SelectPopover, {
      ...props,
      className: cn(styles.options, className)
    })
);

export const SelectGroup = createComponent<SelectGroupProps>(
  ({ className, ...props }) =>
    createElement(BaseSelectGroup, {
      ...props,
      className: cn(styles.group, className)
    })
);

export const SelectGroupLabel = createComponent<SelectGroupLabelProps>(
  ({ className, ...props }) =>
    createElement(BaseSelectGroupLabel, {
      ...props,
      className: cn(styles.label, typography.it, typography.trim, className)
    })
);

export const SelectItem = createComponent<SelectItemProps>(
  ({ className, ...props }) =>
    createElement(BaseSelectItem, {
      ...props,
      className: cn(styles.item, typography.im, typography.trim, className)
    })
);
