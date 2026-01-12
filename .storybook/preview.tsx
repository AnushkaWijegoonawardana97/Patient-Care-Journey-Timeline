import type { Preview } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import "../src/style.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-background p-4">
            <Story />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
