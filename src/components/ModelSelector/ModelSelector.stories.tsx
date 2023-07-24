import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { ModelSelector as Component } from "./ModelSelector";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "Inputs/ModelSelector",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const ModelSelector: Story = {
  render: (args) => <Component {...args} />
};
