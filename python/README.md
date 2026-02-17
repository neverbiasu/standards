# Python Style Guide

## 1. Introduction

This guide is based on **[PEP 8 - Style Guide for Python Code](https://peps.python.org/pep-0008/)** as the primary and single normative style reference.

### Philosophy

- **Readability First**: Code is read more often than it is written
- **Consistency**: Uniform style reduces review and maintenance costs
- **Pragmatism**: Keep rules strict enough to scale, simple enough to execute
- **Automation Friendly**: Rules should be enforceable by formatter/linter where possible

### How to Use This Guide

1. Review the Core Rules Matrix and follow all **[MUST]** rules by default
2. Use tooling (formatter + linter) to enforce repetitive style decisions
3. Allow **[SHOULD]** deviations only with explicit and local justification

---

## 2. Core Rules Matrix

| Category | Rule Description | PEP 8 Reference | Level |
|----------|------------------|-----------------|-------|
| **Line Length** | Keep lines at 79 chars for code; 72 for comments/docstrings where practical. | Maximum Line Length | **[SHOULD]** |
| **Indentation** | Use 4 spaces per indentation level. Never use tabs. | Indentation | **[MUST]** |
| **Blank Lines** | Use 2 blank lines between top-level functions/classes; 1 blank line between class methods. | Blank Lines | **[MUST]** |
| **Imports** | Put imports at the top of the file after module docstring/comments. | Imports | **[MUST]** |
| **Imports** | Group imports in order: standard library, third-party, local application; separate groups with one blank line. | Imports | **[MUST]** |
| **Imports** | Prefer one import per line. Avoid wildcard imports. | Imports | **[MUST]** |
| **Naming** | Use `snake_case` for functions, methods, and variables. | Naming Conventions | **[MUST]** |
| **Naming** | Use `PascalCase` for class names. | Naming Conventions | **[MUST]** |
| **Naming** | Use `UPPER_CASE` for constants. | Naming Conventions | **[SHOULD]** |
| **Whitespace** | Follow standard whitespace around operators, commas, and after `:` in slices when required by PEP 8. | Whitespace in Expressions | **[MUST]** |
| **Comparisons** | Use `is` / `is not` for `None` comparisons; avoid `== None`. | Programming Recommendations | **[MUST]** |
| **Booleans** | Prefer `if value:` / `if not value:` when semantics are clear; avoid verbose comparisons to `True` / `False`. | Programming Recommendations | **[SHOULD]** |
| **Exceptions** | Catch specific exceptions instead of bare `except:`. | Programming Recommendations | **[MUST]** |
| **Returns** | Be consistent in return statements in a function (all return values or all explicit `None` where needed). | Programming Recommendations | **[SHOULD]** |
| **Comments** | Keep comments accurate, concise, and in sync with code changes. | Comments | **[MUST]** |
| **Comments** | Use complete sentences in block comments/doc comments when describing behavior. | Comments | **[SHOULD]** |

---

## 3. Practical Examples

### Imports and Spacing

```python
import os
from pathlib import Path

import requests

from myapp.config import settings
from myapp.utils.io import read_json


class ModelLoader:
    def __init__(self, root_dir: Path) -> None:
        self.root_dir = root_dir

    def load(self, filename: str) -> dict:
        file_path = self.root_dir / filename
        if not file_path.exists():
            raise FileNotFoundError(f"Missing file: {file_path}")
        return read_json(file_path)
```

### `None` and Exceptions

```python
def build_client(api_key: str | None):
    if api_key is None:
        raise ValueError("api_key is required")

    try:
        return create_client(api_key)
    except ConnectionError as exc:
        raise RuntimeError("failed to initialize client") from exc
```

### Default Arguments

```python
def retry(timeout=5, max_attempts=3):
    return timeout, max_attempts


def connect(host: str = "127.0.0.1", port: int = 8080, timeout: float = 5.0):
    return f"{host}:{port} (timeout={timeout})"


def add_tag(tag: str, tags: list[str] | None = None) -> list[str]:
    if tags is None:
        tags = []
    tags.append(tag)
    return tags
```

Rules of thumb:

- Default values should be immutable (`str`, `int`, `float`, `tuple`, `None`)
- Never use mutable defaults like `[]`, `{}`, or `set()` directly in parameters
- Use `None` as sentinel, then initialize inside the function
- Spacing around `=` follows PEP 8:
    - Unannotated default parameter: no spaces (`def f(timeout=5): ...`)
    - Annotated default parameter: use spaces (`def f(timeout: int = 5): ...`)
    - Keyword arguments at call site: no spaces (`f(timeout=5)`)

---

## 4. Execution Guidance

- Formatter and linter settings **MUST** align to PEP 8 decisions above
- Code review should reject violations of **[MUST]** rules
- For legacy files, prefer incremental cleanup: touched code must comply

---

## 5. FAQ

### Why only one primary PEP?

Using one normative source keeps the team decision model simple: when style disputes happen, PEP 8 is the single tie-breaker.

### Can we exceed 79 characters?

Yes, but only when breaking harms readability more than it helps. This is why line length is **[SHOULD]** rather than **[MUST]**.

### Should we optimize for linter rules over readability?

No. Tooling enforces consistency; readability remains the first principle.

---

## 6. Resources

- [PEP 8 - Style Guide for Python Code](https://peps.python.org/pep-0008/)

---

## 7. Versioning

This guide follows semantic versioning:

- **Major**: Breaking changes to core rules
- **Minor**: New rules or non-breaking clarifications
- **Patch**: Typo fixes and documentation improvements

**Current Version**: 1.0.0  
**Last Updated**: 2026-02-17
