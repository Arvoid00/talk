import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { TooltipAnchor, useTooltipStore } from "@ariakit/react";
import { Tooltip as Component } from "./Tooltip";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Tooltip",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Tooltip: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const tooltip = useTooltipStore();
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <TooltipAnchor store={tooltip}>Tooltip Anchor</TooltipAnchor>
        <Component {...args} store={tooltip}>
          This is a tooltip!
        </Component>
      </div>
    );
  }
};
