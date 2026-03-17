---
name: typescript-rules
description: TypeScript and general code-quality rules for this project.
applyTo: **/*.ts, **/*.tsx, **/*.js, **/*.jsx
---

# TypeScript Rules

Follow these rules when writing or editing TypeScript in this repository.

## Core TypeScript Practices

- Prefer precise types over broad types. Model domain concepts explicitly instead of falling back to `any`, `unknown`, or loosely shaped objects.
- Do not introduce `any` unless there is a strong boundary reason and the tradeoff is documented inline.
- Prefer `type` and `interface` intentionally:
  - use `interface` for extendable object contracts
  - use `type` for unions, mapped types, utility composition, and domain aliases
- Model variants with discriminated unions instead of optional-property clusters or boolean flags that can drift into invalid combinations.
- Prefer `readonly` data where mutation is not required.
- Narrow nullable values early. Do not pass `null | undefined` deeper into the call stack when a guard can resolve the state closer to the boundary.
- Use explicit types for public APIs, exported functions, shared utilities, complex return shapes, and domain objects.
- Prefer inference for obvious local variables when the inferred type is already precise and readable.
- Validate untrusted input at the boundary. Treat network payloads, storage payloads, URL params, and form data as unsafe until checked.
- Keep types close to the domain language used by the product. Avoid placeholder names such as `Data`, `Item`, `Info`, or `ResponseObj` when a more semantic name is available.

## Function And API Design

- Write small functions with one clear responsibility.
- Prefer pure functions for transformations and calculations.
- Keep side effects near the edges of the system.
- Make illegal states hard to represent through function signatures and type design.
- Prefer parameter objects when a function would otherwise take many positional arguments or several booleans.
- Avoid boolean soup. Replace ambiguous booleans with string unions or configuration objects when the meaning is not immediately obvious.
- Return structured results when callers need to branch on outcomes. Do not overload `null`, `false`, empty arrays, and thrown errors to all mean different failure modes.

## Required Doc Strings

- Write TSDoc-style doc strings for every function, method, hook, and exported constant with behavior.
- The doc string must describe the semantic meaning of the code, not just restate the function name.
- Explain:
  - what the function is responsible for in the domain
  - the meaning of important parameters
  - the shape or meaning of the return value
  - important side effects, invariants, and edge-case behavior
- Prefer domain terms that someone would search for later. This improves semantic search, code discovery, and maintenance.
- If a function exists to enforce a rule, normalization step, fallback policy, or business invariant, state that explicitly in the doc string.

Example:

```ts
/**
 * Converts a raw recommendation record into the normalized view model used by
 * the recommendations index, applying fallback labels and filtering fields that
 * should not appear in public summaries.
 */
function mapRecommendationToCard(record: RecommendationRecord): RecommendationCard {
  // ...
}
```

## Naming And Readability

- Use names that communicate intent, not implementation trivia.
- Prefer full words over abbreviations unless the abbreviation is already standard in the codebase.
- Name functions after outcomes or domain actions, such as `buildProjectSummary`, `normalizeBookmarkSource`, or `selectPrimaryRecommendation`.
- Comments should explain why, constraints, or invariants. Avoid comments that merely narrate syntax.
- Keep nesting shallow. Extract helpers when branches become hard to scan.

## Error Handling

- Fail loudly at boundaries and predictably in domain logic.
- Throw or return explicit errors with enough context to debug the issue.
- Do not swallow exceptions silently.
- Preserve useful error context when wrapping lower-level failures.
- Handle impossible states with explicit guards rather than assuming they cannot happen.

## State And Data Flow

- Prefer derived state over duplicated state.
- Keep transformation pipelines explicit and easy to trace.
- Avoid hidden mutation of shared objects.
- When updating collections, prefer immutable updates that preserve referential clarity.
- Keep normalization, mapping, filtering, and sorting logic in named helpers when reused or non-trivial.

## Testing Requirements

- Write test cases to verify functionality strictly whenever you add, change, or fix TypeScript behavior.
- Do not treat tests as optional for logic changes, data transformations, validation rules, state transitions, or bug fixes.
- Test the expected success path, relevant edge cases, and important failure paths.
- If a function enforces normalization, fallback behavior, filtering, sorting, or business rules, add tests that prove those semantics explicitly.
- If a bug is fixed, add a regression test that would have failed before the change.
- Keep tests readable and behavior-focused. Prefer test names that describe the domain outcome, not implementation details.
- Avoid weak assertions. Verify meaningful outputs, state transitions, side effects, and error behavior.
- Place tests close enough to the codebase conventions that future engineers can find and extend them easily.

## General Code Practices

- Read surrounding code before introducing new patterns. Match the local architecture unless there is a clear reason to improve it.
- Reuse existing utilities, types, and components before creating new ones.
- Keep modules cohesive. Split files when they take on multiple unrelated responsibilities.
- Remove dead code, stale branches, and unused types instead of leaving speculative scaffolding behind.
- Add or update tests when behavior changes, especially around edge cases, normalization rules, and failure paths.
- Prefer straightforward code over clever abstractions.
- Optimize only after correctness and clarity are established.
- Keep imports tidy and dependency usage intentional.
- Do not introduce custom abstractions unless they reduce repeated complexity in a meaningful way.

## Frontend-Oriented TypeScript Practices

- Type props, state, and event handlers explicitly when the meaning is not obvious from inference.
- Keep view components lean; move transformation and domain logic into helpers or hooks.
- Prefer view models that are already normalized for rendering rather than pushing raw backend shapes directly into UI components.
- Use semantic names for UI state such as `activeRoute`, `selectedCategory`, or `isRecommendationsEmpty` rather than generic names like `data` or `state`.

## Avoid

- `any` as a shortcut
- wide shared utility types that erase domain meaning
- functions without doc strings
- comments that repeat the code literally
- large files with mixed responsibilities
- hidden side effects inside formatting or mapping helpers
- optional-property models that permit invalid states when a discriminated union would be clearer
