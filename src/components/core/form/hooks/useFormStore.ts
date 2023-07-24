import type { FormStore } from "@ariakit/react";
import { FormContext } from "@ariakit/react-core/form/form-context";
import { useContext } from "react";

/**
 * Allows the developer to plug into the parent Form component's
 * state without having to explicitly pass down that state via props.
 *
 * This is an alternative to requiring an explicit prop, and makes it
 * easy to grab the closest Form state context provider from anywhere
 * deep in the component tree of a Field or it's child components.
 */
export const useFormStore = (store?: FormStore): FormStore => {
  const defaultStore = useContext(FormContext);
  const form = store ?? defaultStore;

  if (typeof form === `undefined`) {
    throw new Error(
      `This field must either be the child of an Ariakit Form component or be provided a FormStore via the store prop.`
    );
  }

  return form;
};
