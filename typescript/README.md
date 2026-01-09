# TypeScript Style Guide

## 1. Introduction

This guide is based on the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). It aims to enforce strict type safety and high maintainability across TypeScript projects.

### Philosophy

- **Type Safety First**: Leverage TypeScript's type system to catch errors at compile time
- **Explicit Over Implicit**: Make intentions clear through explicit typing
- **Maintainability**: Code should be easy to read, review, and refactor
- **Consistency**: Uniform patterns across the codebase reduce cognitive load

### How to Use This Guide

1. Review the Core Rules Matrix to understand mandatory and recommended practices
2. Integrate the provided [eslint.config.js](./eslint.config.js) into your project
3. Use [tsconfig.base.json](./tsconfig.base.json) as a foundation for your TypeScript configuration

---

## 2. Core Rules Matrix

| Category | Rule Description | ESLint Rule ID | Level |
|----------|------------------|----------------|-------|
| **Types** | Disallow the use of `any`. Use `unknown` or specific types. | `@typescript-eslint/no-explicit-any` | **[MUST]** |
| **Types** | Enforce strict null checks for all types. | `strictNullChecks` (TSConfig) | **[MUST]** |
| **Types** | Prefer type inference where possible; avoid redundant type annotations. | `@typescript-eslint/no-inferrable-types` | **[SHOULD]** |
| **Naming** | Use `PascalCase` for classes, interfaces, and types. | `@typescript-eslint/naming-convention` | **[MUST]** |
| **Naming** | Use `camelCase` for variables, functions, and properties. | `@typescript-eslint/naming-convention` | **[MUST]** |
| **Naming** | Use `UPPER_CASE` for global constants and enum values. | `@typescript-eslint/naming-convention` | **[SHOULD]** |
| **Patterns** | Prefer `interface` over `type` for object definitions. | `@typescript-eslint/consistent-type-definitions` | **[SHOULD]** |
| **Patterns** | Use optional chaining (`?.`) instead of null checks when appropriate. | Manual (Code Review) | **[SHOULD]** |
| **Patterns** | Use ES modules; strongly discourage `namespace` usage. | Manual (Code Review) | **[MUST]** |
| **Syntax** | Always use semicolons to terminate statements. | `semi` | **[MUST]** |
| **Enums** | Use string-based enums only. Avoid numeric enums. | Manual (Code Review) | **[SHOULD]** |
| **Safety** | Disallow non-null assertions using the `!` operator. | `@typescript-eslint/no-non-null-assertion` | **[MUST]** |
| **Safety** | Disallow empty interfaces. | `@typescript-eslint/no-empty-interface` | **[SHOULD]** |
| **Safety** | Require explicit return types on exported functions. | `@typescript-eslint/explicit-module-boundary-types` | **[SHOULD]** |
| **Safety** | Forbid triple-slash directives. Use `tsconfig.json` instead. | `@typescript-eslint/triple-slash-reference` | **[MUST]** |
| **Async** | Always await promises; don't create floating promises. | `@typescript-eslint/no-floating-promises` | **[MUST]** |
| **Async** | Prefer `async`/`await` over raw promises for readability. | Manual (Code Review) | **[SHOULD]** |
| **Imports** | No unused imports. | `@typescript-eslint/no-unused-vars` | **[MUST]** |
| **Imports** | Organize imports in alphabetical order within groups. | `import/order` | **[SHOULD]** |
| **Comments** | Public APIs must have JSDoc comments describing intent. | `jsdoc/require-jsdoc` | **[SHOULD]** |
| **Comments** | Avoid inline comments that restate what the code does. | Manual (Code Review) | **[SHOULD]** |

---

## 3. Configuration Integration

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. **Copy configurations**:
   ```bash
   cp eslint.config.js your-project/
   cp tsconfig.base.json your-project/tsconfig.json
   ```

3. **Verify setup**:
   ```bash
   npm run lint
   ```

### CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Lint TypeScript
  run: npm run lint
  
- name: Type Check
  run: npx tsc --noEmit
```

---

## 4. FAQ

### Why forbid `any`?

`any` disables TypeScript's type checking, negating the primary benefit of using TypeScript. Use `unknown` and perform runtime type narrowing instead.

### When can I use `as` type assertions?

Only when you have information the type system cannot infer, such as when interfacing with untyped JavaScript libraries. Document why the assertion is necessary.

### Should I add types to everything?

No. Let TypeScript infer types where obvious. Over-annotation creates maintenance burden without adding value.

---

## 5. Resources

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [@typescript-eslint Rules](https://typescript-eslint.io/rules/)

---

## 6. Versioning

This guide follows semantic versioning:

- **Major**: Breaking changes to core rules
- **Minor**: New rules or non-breaking clarifications
- **Patch**: Typo fixes and documentation improvements

**Current Version**: 1.0.0  
**Last Updated**: 2026-01-09
