---
name: general-code-practices
description: General engineering practices that apply across the repository.
applyTo: **/*
---

# General Code Practices

Follow these rules when writing or editing code anywhere in this repository.

## Scope And Change Discipline

- Do not mix unrelated refactors into a task unless they are required to complete the work safely.
- Prefer small, focused changes over broad rewrites.
- Keep configuration, constants, and business rules discoverable rather than scattering them across files.

## Product And Content Quality

- Keep user-facing copy intentional, specific, and consistent with the product tone.
- Make temporary work explicit with clear TODOs only when follow-up is genuinely needed.

## Testing Requirements

- Add new tests in the `src/tests` folder so test coverage stays discoverable and consistently organized.

## UI And Product Consistency

- Preserve accessibility, semantics, and keyboard behavior in UI work.
- Prefer design-system primitives over ad hoc UI when the repo has an established component system.
- Avoid custom styling or custom interaction patterns when an approved system pattern already exists.

## Delivery Quality

- Before finalizing, verify the changed paths still make sense together as one coherent system.

## Avoid

- broad rewrites when a targeted change is enough
- unrelated cleanup mixed into feature work
- scattered business rules and constants across arbitrary files
- scattered tests outside the `src/tests` structure
