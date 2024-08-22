import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'

export default tseslint.config(
    { ignores: ['*.config.*', '**/*.js'] },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig-with-tests.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['src/test/**/*'],
        plugins: { jest },
        languageOptions: {
            globals: {
                'jest/globals': true,
            },
        },
    },
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.*js'],
        ...tseslint.configs.disableTypeChecked,
    }
)
