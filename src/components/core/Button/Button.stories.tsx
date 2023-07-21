import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Button as Component } from "./Button";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Button",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Button: Story = {
  render: (args) => <Component {...args}>Button</Component>
};
