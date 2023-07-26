import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import {
  DialogDescription,
  DialogDisclosure,
  DialogDismiss,
  useDialogStore
} from "@ariakit/react";
import { Button } from "../Button";
import {
  DialogContent as Component,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle
} from "./Dialog";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Dialog",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Dialog: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dialog = useDialogStore(args);
    return (
      <div className="flex w-full items-center justify-center">
        <DialogDisclosure store={dialog} as={Button}>
          Open Dialog
        </DialogDisclosure>
        <Component store={dialog} backdrop={<DialogOverlay />}>
          <DialogHeader>
            <DialogTitle>Example Dialog Title</DialogTitle>
            <DialogDescription>
              This is an example of a modal dialog.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1 rounded-md border p-4 text-sm">
            Example Dialog Content
          </div>
          <DialogFooter className="items-end">
            <DialogDismiss as={Button} variant="outline">
              Close
            </DialogDismiss>
          </DialogFooter>
        </Component>
      </div>
    );
  }
};
