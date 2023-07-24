import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Select as Component } from "./Select";
import { SelectItem } from "./elements";

const Genres = {
  Action: `ACTION`,
  Adventure: `ADVENTURE`,
  Comedy: `COMEDY`,
  Drama: `DRAMA`,
  Fantasy: `FANTASY`,
  Horror: `HORROR`,
  Musical: `MUSICAL`,
  "Science Fiction": `SCIFI`,
  Western: `WESTERN`
} as const;

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Select",
  component: Component,
  argTypes: {
    disabled: { control: `boolean`, defaultValue: false }
  }
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Select: Story = {
  render: (args) => (
    <Component {...args}>
      {Object.keys(Genres).map((genre) => (
        <SelectItem key={genre} value={genre}>
          {genre}
        </SelectItem>
      ))}
    </Component>
  )
};
