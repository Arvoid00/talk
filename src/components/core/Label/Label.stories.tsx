import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Label as Component } from "./Label";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Label",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Label: Story = {
  render: (args) => (
    <Component as={`label`} {...args}>
      Label
    </Component>
  )
};
