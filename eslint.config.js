import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { importX, createNodeResolver } from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import tseslint from "typescript-eslint";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));
const reactRecommended = react.configs.flat.recommended;
const reactJsxRuntime = react.configs.flat["jsx-runtime"];
const jsxA11yRecommended = jsxA11y.flatConfigs.recommended;
const importXRecommended = importX.flatConfigs.recommended;
const importXTypescript = importX.flatConfigs.typescript;
const importXConfigs = [importXRecommended, importXTypescript].map((config) => ({
  ...config,
  files: ["src/**/*.{js,jsx,ts,tsx}"],
}));
const tsTypeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map(
  (config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  }),
);

export default defineConfig([
  globalIgnores(["dist/**"]),
  js.configs.recommended,
  ...tsTypeCheckedConfigs,
  {
    name: "typescript-eslint/project",
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir,
      },
    },
  },
  ...importXConfigs,
  {
    name: "import-x/resolvers",
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        }),
        createNodeResolver({
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
      ],
    },
  },
  {
    name: "app/browser-globals",
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    name: "react/recommended",
    files: ["src/**/*.{jsx,tsx}"],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
        ...(reactRecommended.languageOptions?.globals ?? {}),
      },
    },
    rules: {
      ...reactRecommended.rules,
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "jsx-a11y/recommended",
    files: ["src/**/*.{jsx,tsx}"],
    ...jsxA11yRecommended,
    languageOptions: {
      ...jsxA11yRecommended.languageOptions,
      globals: {
        ...globals.browser,
        ...(jsxA11yRecommended.languageOptions?.globals ?? {}),
      },
    },
  },
  {
    name: "react/jsx-runtime",
    files: ["src/**/*.{jsx,tsx}"],
    ...reactJsxRuntime,
  },
  {
    name: "react/hooks-refresh",
    files: ["src/**/*.{jsx,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    name: "react-three-fiber",
    files: ["src/components/PydanticFixturegenHero.tsx"],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
]);
