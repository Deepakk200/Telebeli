// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build/test artifacts:
    "storybook-static/**",
    "test-results/**",
    "playwright-report/**",
  ]),
  // Import boundaries (all of src): modules are consumed through their
  // barrel, never by deep path. Feature barrels join here as they land.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/ui/*/*"],
              message:
                "Deep import into a ui module - import from its barrel (e.g. @/components/ui/icon). See docs/tokens.md.",
            },
          ],
        },
      ],
    },
  },
  // Semantic-token-only zones (design-system naming, execution-handbook 7).
  // ui/, motion/ and lib/ comply after M1; landing/ and dashboard/ join this
  // list as their milestones rebuild them on tokens.
  {
    files: [
      "src/components/ui/**/*.tsx",
      "src/components/motion/**/*.tsx",
      "src/lib/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]",
          message:
            "Raw hex color - use a semantic token (bg-primary, text-state-live, ...). See docs/tokens.md.",
        },
        {
          selector: "Literal[value=/\\[\\d+(\\.\\d+)?px\\]/]",
          message:
            "Raw px arbitrary value - use the spacing/radius scale or a token. See docs/tokens.md.",
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"]
]);

export default eslintConfig;
