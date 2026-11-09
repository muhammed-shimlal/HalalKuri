# Palette UX Journal

## 2025-05-18 - Password Input Visibility & Accessible In-Field Toggles
**Learning:** In-field action buttons (like password reveal toggles) within styled inputs must specify `type="button"` to avoid triggering unintentional form submissions in standard `<form>` elements, include dynamic `aria-label`s ("Show password" / "Hide password") so screen readers understand state changes, and compensate for overlap by giving the input right padding (`pr-10`).
**Action:** Always provide explicit button types, dynamic ARIA labels, and trailing padding for inputs containing embedded icon triggers.
