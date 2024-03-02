import { resolve } from "node:path";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import configTurbo from "eslint-config-turbo";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  prettier,
  configTurbo,
  {
    plugins: [onlyWarn],
    languageOptions: {
      globals: {
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
    ignores: [
      // Ignore dotfiles
      ".*.js",
      "node_modules/",
      "dist/",
    ],
    files: ["*.js?(x)", "*.ts?(x)"],
  },
];
