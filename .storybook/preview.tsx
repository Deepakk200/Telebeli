import type { Decorator, Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";
import "./fonts.css";

/* Mirrors ThemeProvider (src/providers/theme-provider.tsx): "operations" is
   the dark token set and maps onto the .dark class on <html>, where the
   :root/.dark token overrides in globals.css live. */
const withTheme: Decorator = (Story, context) => {
  const operations = context.globals.theme === "operations";
  document.documentElement.classList.toggle("dark", operations);
  document.documentElement.style.colorScheme = operations ? "dark" : "light";
  return (
    <div className="min-h-screen bg-background p-6 font-sans text-foreground">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "TeleBeli theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "operations", title: "Operations (dark)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
