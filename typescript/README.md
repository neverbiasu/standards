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
4. Refer to the Deviations section to understand our reasoning for diverging from Google's guide

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
| **Patterns** | Use optional chaining (`?.`) instead of null checks when appropriate. | N/A (Language Feature) | **[SHOULD]** |
| **Safety** | Disallow non-null assertions using the `!` operator. | `@typescript-eslint/no-non-null-assertion` | **[MUST]** |
| **Safety** | Disallow empty interfaces. | `@typescript-eslint/no-empty-interface` | **[SHOULD]** |
| **Safety** | Require explicit return types on exported functions. | `@typescript-eslint/explicit-module-boundary-types` | **[SHOULD]** |
| **Async** | Always await promises; don't create floating promises. | `@typescript-eslint/no-floating-promises` | **[MUST]** |
| **Async** | Prefer `async`/`await` over raw promises for readability. | N/A (Convention) | **[SHOULD]** |
| **Imports** | No unused imports. | `@typescript-eslint/no-unused-vars` | **[MUST]** |
| **Imports** | Organize imports in alphabetical order within groups. | `import/order` | **[SHOULD]** |
| **Comments** | Public APIs must have JSDoc comments describing intent. | `jsdoc/require-jsdoc` | **[SHOULD]** |
| **Comments** | Avoid inline comments that restate what the code does. | N/A (Code Review) | **[SHOULD]** |

---

## 3. Deviations from Google TS Guide

This section documents where and why we diverge from Google's TypeScript Style Guide.

| Feature | Google Recommendation | Our Deviation | Rationale |
|---------|----------------------|---------------|-----------|
| **Semicolons** | Required | Optional | Modern tooling (Prettier, etc.) handles ASI (Automatic Semicolon Insertion) safely. Omitting semicolons results in cleaner, more readable code. |
| **Enums** | Discouraged (use union types) | Allowed (String-based enums) | String enums provide better developer experience for domain-driven constants with compile-time safety and runtime introspection. Numeric enums remain discouraged. |
| **Imports** | Unordered | Auto-sorted by tooling | Import organization improves readability and reduces merge conflicts. We enforce this via ESLint plugins. |
| **`namespace`** | Discouraged | Strongly discouraged | We align with Google here but emphasize ES modules as the only acceptable module system. |
| **Triple-slash directives** | Limited use | Forbidden | Use `tsconfig.json` `types` field instead. Triple-slash directives reduce portability. |

---

## 4. Code Examples

### ✅ Good Examples

```typescript
// Explicit types for public API
export interface UserProfile {
  id: string
  name: string
  email: string | null
}

// Type-safe enum
export enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Guest = 'GUEST',
}

// Proper error handling with unknown
export async function fetchUser(id: string): Promise<UserProfile> {
  try {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  } catch (error) {
    // Use unknown, then narrow the type
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`)
    }
    throw new Error('Failed to fetch user: Unknown error')
  }
}

// Optional chaining instead of null checks
function getUserEmail(user: UserProfile | null): string {
  return user?.email ?? 'no-email@example.com'
}
```

### ❌ Bad Examples

```typescript
// Using 'any' - destroys type safety
function processData(data: any) {
  return data.value
}

// Non-null assertion - can cause runtime errors
function getUsername(user: UserProfile | null): string {
  return user!.name // Dangerous!
}

// Implicit any in catch block
try {
  riskyOperation()
} catch (e) {
  console.log(e.message) // Error: 'e' is implicitly 'any'
}

// Numeric enum - values are not intuitive
enum Status {
  Active, // 0
  Inactive, // 1
}
```

---

## 5. Configuration Integration

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

## 6. FAQ

### Why forbid `any`?

`any` disables TypeScript's type checking, negating the primary benefit of using TypeScript. Use `unknown` and perform runtime type narrowing instead.

### When can I use `as` type assertions?

Only when you have information the type system cannot infer, such as when interfacing with untyped JavaScript libraries. Document why the assertion is necessary.

### Should I add types to everything?

No. Let TypeScript infer types where obvious. Over-annotation creates maintenance burden without adding value.

---

## 7. Resources

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [@typescript-eslint Rules](https://typescript-eslint.io/rules/)

---

## 8. Versioning

This guide follows semantic versioning:

- **Major**: Breaking changes to core rules
- **Minor**: New rules or non-breaking clarifications
- **Patch**: Typo fixes and documentation improvements

**Current Version**: 1.0.0  
**Last Updated**: 2026-01-09
