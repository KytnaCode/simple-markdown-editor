import globals from "globals";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

/** @type {import("eslint").Linter.FlatConfig[]} **/
export default [
  js.configs.recommended,
  typescriptPlugin.configs["recommended"],
  reactHooksPlugin.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    ignores: ["dist"],
    plugins: [reactRefreshPlugin],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
