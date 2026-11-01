# Palette's Journal - Critical UX & A11y Learnings

## 2026-11-01 - Accessible Password Input Toggle Pattern
**Learning:** Password visibility toggles in custom styled inputs need explicit `type="button"` and dynamic `aria-label` ("Show password" / "Hide password") so they don't trigger form submit on click/enter and remain intuitive for screen reader users. Additionally, adding `autoComplete="current-password"` / `autoComplete="email"` improves autofill convenience.
**Action:** Whenever adding password fields or toggles in this app, wrap in a relative container with `pr-11` on the input, and provide an icon button with `focus-visible:ring-2` and dynamic `aria-label`.
