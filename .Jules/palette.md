# Palette's Journal

## 2026-07-18 - Password Visibility in Authentication Forms
**Learning:** In private management portals with strong credentials, password inputs without a visibility toggle increase login friction and typos, especially on mobile devices. Adding a toggle with clear `aria-label` dynamic state prevents accessibility regressions while boosting login confidence.
**Action:** Always provide an accessible show/hide toggle for password fields with dynamic `aria-label` ("Show password" / "Hide password") and explicit `type="button"`.
