import * as React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Alert as Component, AlertTitle, AlertDescription } from "./Alert";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Alert",
  component: Component
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Alert: Story = {
  render: (args) => (
    <Component
      variant="destructive"
      className="mt-5 max-w-sm self-center "
      {...args}
    >
      <AlertTitle className="text-center text-red-400 ">Auth Error</AlertTitle>
      <AlertDescription className="text-red-400">
        Your session Invalid or expired session. Please log in again or, if you
        haven not done so yet, log in to continue.
      </AlertDescription>
    </Component>
  )
};
