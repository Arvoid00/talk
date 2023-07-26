import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Badge as Component } from "./Badge";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Badge",
  component: Component,
  argTypes: {
    variant: {
      options: [`default`, `secondary`, `destructive`, `outline`]
    }
  }
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Badge: Story = {
  render: (args) => <Component {...args}>Badge</Component>
};
