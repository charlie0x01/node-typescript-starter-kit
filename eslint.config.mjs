import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['node_modules/', 'dist/', 'coverage/'] },
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parser: tsParser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      jsdoc: jsdoc,
    },
  },
  {
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      'prettier/prettier': ['error', { printWidth: 120, endOfLine: 'auto' }],
      'import/order': ['error', { 'newlines-between': 'always' }],
      'node/no-unsupported-features/es-syntax': 'off', // Allow modern ES syntax
      'node/no-unpublished-import': 'off', // To avoid issues with TypeScript path mappings
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
