import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Alert as Component, AlertTitle, AlertDescription } from "./Alert";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Alert",
  component: Component,
  argTypes: {
    variant: {
      options: [`default`, `destructive`]
    }
  }
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Alert: Story = {
  render: (args) => (
    <Component {...args}>
      <AlertTitle>Alert Example</AlertTitle>
      <AlertDescription>
        This is a description of the alert to convey important information to
        the user.
      </AlertDescription>
    </Component>
  )
};
