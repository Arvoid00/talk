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
      <div
        style={{
          display: `flex`,
          width: `100%`,
          height: `100vh`,
          justifyContent: `center`,
          alignItems: `center`
        }}
      >
        <TooltipAnchor store={tooltip}>Tooltip Anchor</TooltipAnchor>
        <Component {...args} store={tooltip}>
          This is a tooltip!
        </Component>
      </div>
    );
  }
};
