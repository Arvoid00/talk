import type { StorybookConfig } from "@storybook/nextjs";

// Nextjs-Specific config docs: https://www.npmjs.com/package/@storybook/nextjs
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: [
    {
      from: "../public/fonts",
      to: "public/fonts"
    }
  ]
};
export default config;
