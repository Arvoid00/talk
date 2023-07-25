import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-styling";
import { display, body, code, input } from "../src/theme";
import "../src/theme/globals.css";
import "../src/theme/sizing.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
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
        className={`font-body antialiased ${display.variable} ${body.variable} ${code.variable} ${input.variable}`}
      >
        <Story />
      </div>
    )
  ]
};

export default preview;
