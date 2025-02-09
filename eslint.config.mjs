module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and shows Prettier errors as ESLint errors
  ],
  plugins: [
    '@typescript-eslint',
    'prettier', // Adds Prettier plugin
  ],
  rules: {
    // ESLint Rules
    'no-unused-vars': 'off', // Let TypeScript handle this
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Prettier Rules
    'prettier/prettier': 'error', // Ensures Prettier formatting is enforced
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'], // Ignore certain directories
};
