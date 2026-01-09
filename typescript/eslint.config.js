// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

/**
 * ESLint configuration for TypeScript projects
 * Based on our TypeScript Style Guide
 * @see https://github.com/yourorg/standards/tree/main/typescript
 */
export default tseslint.config(
  // Extend recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      // ==========================================
      // TYPE SAFETY RULES [MUST]
      // ==========================================
      
      // Disallow 'any' - use 'unknown' instead
      '@typescript-eslint/no-explicit-any': 'error',
      
      // Disallow non-null assertions (!)
      '@typescript-eslint/no-non-null-assertion': 'error',
      
      // No floating promises - always await
      '@typescript-eslint/no-floating-promises': 'error',
      
      // No misused promises in conditionals
      '@typescript-eslint/no-misused-promises': 'error',
      
      // ==========================================
      // NAMING CONVENTIONS [MUST]
      // ==========================================
      
      '@typescript-eslint/naming-convention': [
        'error',
        // Classes, interfaces, types, enums: PascalCase
        {
          selector: ['class', 'interface', 'typeAlias', 'enum'],
          format: ['PascalCase'],
        },
        // Variables, functions, parameters, properties: camelCase
        {
          selector: ['variable', 'function', 'parameter', 'property'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Global constants: UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['UPPER_CASE', 'camelCase'], // Allow both for flexibility
        },
        // Enum members: UPPER_CASE
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],

      // ==========================================
      // CODE PATTERNS [SHOULD]
      // ==========================================
      
      // Prefer interface over type for object definitions
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      
      // Avoid empty interfaces
      '@typescript-eslint/no-empty-interface': 'warn',
      
      // Require explicit return types on exported functions
      '@typescript-eslint/explicit-module-boundary-types': [
        'warn',
        {
          allowArgumentsExplicitlyTypedAsAny: false,
        },
      ],
      
      // Avoid redundant type annotations
      '@typescript-eslint/no-inferrable-types': 'warn',
      
      // ==========================================
      // IMPORT MANAGEMENT [MUST/SHOULD]
      // ==========================================
      
      // No unused variables or imports
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      
      // ==========================================
      // ASYNC/AWAIT PATTERNS [MUST]
      // ==========================================
      
      // Require await in async functions
      '@typescript-eslint/require-await': 'warn',
      
      // Prefer async/await over promise chains
      '@typescript-eslint/promise-function-async': 'warn',

      // ==========================================
      // GENERAL CODE QUALITY
      // ==========================================
      
      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      
      // Array type syntax consistency
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple',
        },
      ],
    },
  },

  {
    // Disable type-checked rules for JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    // Configuration files can be more lenient
    files: ['*.config.{js,ts,mjs,cjs}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
)
