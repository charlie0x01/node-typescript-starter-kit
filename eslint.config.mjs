import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      jsdoc: jsdoc,
    },
  },
  {
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
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
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
];
