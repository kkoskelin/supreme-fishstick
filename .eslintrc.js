module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.tsx'],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      files: ['cypress/**/*', '*.test.ts'],
      rules: {
        'react-func/max-lines-per-function': 'off',
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            builtinGlobals: false,
          },
        ],
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'cypress',
    'jest',
    'jsx-a11y',
    'no-floating-promise',
    'prettier',
    'react',
    'react-func',
    'react-hooks',
    'sort-destructure-keys',
    'sort-imports-es6-autofix',
    'sort-keys-fix',
  ],
  rules: {
    complexity: [
      'error',
      {
        max: 20,
      },
    ],
    'jest/expect-expect': 'off',
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'no-floating-promise/no-floating-promise': 'error',
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: false,
      },
    ],
    'no-restricted-globals': [
      'error',
      {
        name: 'error',
      },
      {
        name: 'event',
      },
      {
        name: 'status',
      },
      {
        name: 'name',
      },
      {
        name: 'document',
      },
    ],
    'no-shadow': 'off',
    'no-trailing-spaces': 'error',
    'no-warning-comments': 'error',
    'prettier/prettier': 'error',
    'react-func/max-lines-per-function': [
      'warn',
      {
        IIFEs: true,
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      {
        caseSensitive: false,
      },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: true,
      },
    ],
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
};
