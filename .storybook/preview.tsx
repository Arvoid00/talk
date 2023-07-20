import React from "react"
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-styling"
import { fontDisplay, fontBody, fontCode, fontInput } from "../src/theme"
import "../src/theme/globals.css"

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
        dark: "dark",
      },
      defaultTheme: "light",
    }), 
    (Story) => (
      <div className={`font-body antialiased ${fontDisplay.variable} ${fontBody.variable} ${fontCode.variable} ${fontInput.variable}`}>
       <Story />
      </div>
    )
  ]
};

export default preview;