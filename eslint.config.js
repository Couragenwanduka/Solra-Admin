import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; 
import parserTs from "@typescript-eslint/parser"; // Added TypeScript parser
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: parserTs, // Use TypeScript parser
      globals: globals.browser, // Include browser globals
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    rules: {
      // Add your custom rules here
      "react/react-in-jsx-scope": "off", // Disable React import requirement for JSX
      "react/prop-types": "off", // Disable prop-types rules for TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return types
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.flatRecommended, // Use flat config for TypeScript
  pluginReact.configs.flat.recommended, // Use flat config for React
];
