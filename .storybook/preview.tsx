import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-styling";
import { display, body, code, input } from "../src/theme";
import "../src/theme/globals.css";
import "../src/theme/colors.css";

const preview: Preview = {
  argTypes: {
    as: { control: false, table: { disable: true } },
    store: { control: false, table: { disable: true } },
    wrapElement: { control: false, table: { disable: true } },
    render: { control: false, table: { disable: true } },
    setValue: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
    icon: { control: false, table: { disable: true } },
    ref: { control: false, table: { disable: true } }
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      exclude: `(?:\b|')(as|wrapElement|render)(?:\b|')`
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark"
      },
      defaultTheme: "light"
    }),
    (Story) => (
      <div
        className={`font-body antialiased typography ${display.variable} ${body.variable} ${code.variable} ${input.variable}`}
      >
        <Story />
      </div>
    )
  ]
};

export default preview;
