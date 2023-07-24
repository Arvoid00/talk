import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import {
  HovercardAnchor,
  HovercardHeading,
  useHovercardStore
} from "@ariakit/react";
import { HoverCard as Component } from "./HoverCard";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/HoverCard",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const HoverCard: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hovercard = useHovercardStore();
    return (
      <>
        <HovercardAnchor store={hovercard}>Hover Me</HovercardAnchor>
        <Component {...args} store={hovercard} gutter={16}>
          <HovercardHeading>Hovercard</HovercardHeading>
          <p>This is an example of a HoverCard and it's styling.</p>
        </Component>
      </>
    );
  }
};
