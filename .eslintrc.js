module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'unicorn'],
  rules: {
    "unicorn/require-post-message-target-origin": "off",
    "unicorn/no-null": "off",
  },
  globals: {
    describe: 'readonly',
    test: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
  },
};
