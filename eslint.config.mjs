import globals from 'globals'

import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

import esTypescript from '@typescript-eslint/eslint-plugin'
import esParser from '@typescript-eslint/parser'

import esImport from 'eslint-plugin-import'
import esReact from 'eslint-plugin-react'

const defaultFormattingRules = {
    curly: 'error',
    'no-console': 'off',
    'no-undef': 'off',
    'no-var': 'error',
    'no-unreachable': 'error',
    'no-unused-vars': 'off',
    'object-shorthand': ['error', 'always'],
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
}

export default defineConfig([
    prettierConfig,
    {
        ignores: ['build/**'],
        plugins: {
            import: esImport,
            react: esReact,
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
            ...defaultFormattingRules,
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
            '@typescript-eslint/no-empty-interface': 0,
            // TODO: Remove this if we can; it isn't a good rule to squash.
            // Sometimes this is fine, but sometimes it masks a compile error.
            '@typescript-eslint/ban-ts-ignore': 0,
            '@typescript-eslint/no-empty-function': 0,
            '@typescript-eslint/explicit-function-return-type': 0,
            '@typescript-eslint/no-explicit-any': 0,
        },
    },
    {
        files: ['*.js'],
        plugins: {
            '@typescript-eslint': esTypescript,
        },
        rules: Object.assign(esImport.rules),
    },
])
