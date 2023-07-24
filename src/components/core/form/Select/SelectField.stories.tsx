import React from "react";
import { useFormStore } from "@ariakit/react";
import type { StoryObj, Meta } from "@storybook/react";
import { Form, Legend, Reset, Submit } from "../Form";
import { SelectField as SelectFieldComponent } from "./SelectField";
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
  title: "UI/Select Field",
  component: SelectFieldComponent,
  argTypes: {
    label: { control: `text` },
    disabled: { control: `boolean`, defaultValue: false }
  },
  decorators: [
    (Story) => {
      const form = useFormStore({ defaultValues: { genre: `` } });

      form.useSubmit((state) => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(state.values));
      });

      return (
        <>
          <Legend>Select Field Example:</Legend>
          <Form store={form}>
            <Story />
            <div style={{ display: `flex`, gap: `16px` }}>
              <Submit>Submit</Submit>
              <Reset>Clear</Reset>
            </div>
          </Form>
        </>
      );
    }
  ]
} as Meta<typeof SelectFieldComponent>;

type Story = StoryObj<typeof SelectFieldComponent>;

export const SelectField: Story = {
  render: (args) => (
    <SelectFieldComponent {...args} label="Genre" name="genre">
      {Object.keys(Genres).map((genre) => (
        <SelectItem key={genre} value={genre}>
          {genre}
        </SelectItem>
      ))}
    </SelectFieldComponent>
  )
};
