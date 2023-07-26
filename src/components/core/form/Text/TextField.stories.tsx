import React from "react";
import { useFormStore } from "@ariakit/react";
import type { StoryObj, Meta } from "@storybook/react";
import { Form, Legend, Reset, Submit } from "../Form";
import { TextField as Component } from "./TextField";

export default {
  // eslint-disable-next-line @typescript-eslint/quotes
  title: "UI/Text Field",
  component: Component,
  argTypes: {
    icon: { control: false },
    label: { control: `text` },
    hint: { control: `text` },
    required: { control: `boolean` },
    disabled: { control: `boolean` }
  },
  args: {
    label: `Email`,
    hint: `Please enter your email address.`,
    required: true,
    disabled: false
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
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const TextField: Story = {
  render: (args) => <Component {...args} name="genre" />
};
