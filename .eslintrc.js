module.exports = {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2020, // Allow modern ECMAScript features
      sourceType: 'module', // Allow imports
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing
      },
    },
    extends: [
      'eslint:recommended', 
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended', // Use the recommended rules for TypeScript
    ],
    rules: {
      // Your custom rules go here
      'react/prop-types': 'off', // Example: turn off prop-types since you're using TypeScript
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Example: disable this rule for simplicity
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  };
  