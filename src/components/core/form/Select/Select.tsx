"use client";
import { SelectArrow, useSelectStore } from "@ariakit/react";
import React, { forwardRef, useCallback, useRef } from "react";
import { PiCaretUpDown } from "react-icons/pi";
import { SelectInput, SelectOptions } from "./elements";

export interface SelectedProps {
  value: string | string[];
}

const DefaultSelectedItem: React.FC<SelectedProps> = ({ value }) => (
  // When `value` is an empty string or otherwise nullish, by default we'll
  // render this text instead
  <>
    {value.length && Array.isArray(value)
      ? value.join(`, `)
      : value || `Select an item`}
  </>
);

export interface SelectProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  required?: boolean;
  /**
   * A React component that renders the selected item inside the select menu
   * button, by default this is the current string value of the selected item
   * Use this to customize how this value is rendered.
   */
  selected?: React.ElementType<SelectedProps>;
  onTouch?: () => void;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      value,
      setValue,
      defaultValue,
      selected: Selected = DefaultSelectedItem,
      onTouch,
      onBlur,
      ...props
    },
    ref
  ) => {
    const portalRef = useRef<HTMLDivElement>(null);
    const select = useSelectStore({
      value,
      setValue,
      defaultValue
    });
    const state = select.useState();
    const popover = select.getState().popoverElement;
    const disclosure = select.getState().disclosureElement;

    const handleInputBlur: React.FocusEventHandler<HTMLButtonElement> =
      useCallback(
        (event) => {
          onBlur?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (popover?.contains(event.relatedTarget)) {
            return;
          }
          onTouch?.();
        },
        [onTouch, onBlur, popover]
      );

    const handleOptionsBlur: React.FocusEventHandler<HTMLDivElement> =
      useCallback(
        (event) => {
          const portal = portalRef.current;
          if (portal?.contains(event.relatedTarget)) {
            return;
          }
          if (disclosure?.contains(event.relatedTarget)) {
            return;
          }
          onTouch?.();
        },
        [onTouch, disclosure]
      );

    return (
      <>
        <SelectInput
          store={select}
          ref={ref}
          {...props}
          onBlur={handleInputBlur}
        >
          <Selected value={state.value} />
          <SelectArrow>
            <PiCaretUpDown />
          </SelectArrow>
        </SelectInput>
        <SelectOptions
          gutter={8}
          store={select}
          portalRef={portalRef}
          onBlur={handleOptionsBlur}
        >
          {children}
        </SelectOptions>
      </>
    );
  }
);

Select.displayName = `Select`;
