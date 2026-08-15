import globals from 'globals'

import prettierConfig from 'eslint-config-prettier/flat'

import esTypescript from '@typescript-eslint/eslint-plugin'
import esParser from '@typescript-eslint/parser'

import esImport from 'eslint-plugin-import'
import esReact from 'eslint-plugin-react'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

export default [
    prettierConfig,
    {
        ignores: ['build/**'],
        plugins: {
            import: esImport,
            react: esReact,
            unicorn: eslintPluginUnicorn,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            curly: 'error',
            'no-console': 'off',
            'no-undef': 'off',
            'no-var': 'error',
            'no-unreachable': 'error',
            'no-unused-vars': 'off',
            'object-shorthand': ['error', 'always'],
            'react/jsx-no-undef': 'error',
            'react/prop-types': 'off',
            'unicorn/prefer-node-protocol': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': esTypescript,
        },
        languageOptions: {
            parser: esParser,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-empty-interface': 0,
            '@typescript-eslint/ban-ts-ignore': 0,
            '@typescript-eslint/no-empty-function': 0,
            '@typescript-eslint/explicit-function-return-type': 0,
            '@typescript-eslint/no-explicit-any': 0,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/__tests__/**', '**/testDoubles/**'],
        rules: {
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                    assertionStyle: 'as',
                    objectLiteralTypeAssertions: 'never',
                },
            ],
        },
    },
    {
        files: ['**/*.js', '**/*.mjs'],
        plugins: {
            import: esImport,
        },
        rules: {
            ...esImport.configs.recommended.rules,
        },
    },
    {
        files: ['**/eslint.config.js'],
        rules: {
            'import/no-unresolved': 'off',
        },
    },
]
