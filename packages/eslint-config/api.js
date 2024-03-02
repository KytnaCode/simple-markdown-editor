import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-plugin-prettier/recommended";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  typescriptPlugin.configs["recommended"],
  prettierConfig,
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      typescript: typescriptPlugin,
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
