import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { ProfileForm as Component } from "./ProfileForm";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "Forms/Profile Form",
  component: Component,
  parameters: {
    controls: { expanded: true }
  },
  args: {
    prompts: [
      {
        id: 0,
        prompt_name: `foo`,
        prompt_body: `bar`
      }
    ]
  }
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const ProfileForm: Story = {
  render: (args) => <Component {...args} />
};
