# UI/UX Guidelines

## Overview

This document defines the official **UI/UX design system** for the **Halal Kuri Management System**.

It serves as the single source of truth for all visual design, layouts, components, interactions, animations, accessibility, and user experience decisions.

All developers, designers, and AI coding agents must follow these guidelines to ensure a consistent, premium, and professional interface.

---

# Design Philosophy

The application should feel:

* Premium
* Modern
* Elegant
* Minimal
* Trustworthy
* Fast
* Professional
* Mobile-first
* User-friendly

The overall experience should resemble modern fintech and productivity platforms while remaining simple and approachable.

---

# Design Inspiration

Use these products as visual inspiration (do not copy them directly):

* Apple
* Stripe
* Linear
* Notion
* Vercel
* Revolut

Focus on clean layouts, generous spacing, subtle animations, and refined typography.

---

# Color Palette

## Primary

Black

```text id="u8q1mw"
#000000
```

---

## Secondary

White

```text id="o24yxf"
#FFFFFF
```

---

## Background

Light Gray

```text id="g0dfjb"
#F8F8F8
```

---

## Accent

Gold (used sparingly)

```text id="f0k6rz"
#D4AF37
```

Use gold only for:

* Active navigation
* Highlights
* Premium badges
* Key call-to-action elements

Avoid overusing the accent color.

---

## Status Colors

Success

```text id="u9zmyj"
#2ECC71
```

Warning

```text id="lzujhe"
#F39C12
```

Error

```text id="d0kfw8"
#E74C3C
```

Use muted backgrounds with darker text for status badges.

---

# Typography

Preferred fonts:

* Inter
* Poppins

Hierarchy:

| Element         | Weight | Size    |
| --------------- | ------ | ------- |
| Hero Heading    | 700    | 48–64px |
| Section Heading | 600    | 32–40px |
| Card Title      | 500    | 20–24px |
| Body Text       | 400    | 16px    |
| Caption         | 500    | 12–14px |

Maintain generous line height and spacing for readability.

---

# Layout

Use a responsive, mobile-first layout.

Spacing:

* 8px base spacing system
* Consistent padding and margins
* Large whitespace between sections

Rounded corners:

* 16px standard
* 24px for hero elements where appropriate

---

# Navigation

## Desktop

* Sticky top navigation
* Logo on the left
* Navigation links centered
* Login button on the right
* Subtle shadow on scroll

---

## Mobile

* Bottom navigation for authenticated areas
* Hamburger menu for public pages
* Touch-friendly icons
* Minimum 44×44px touch targets

---

# Components

## Buttons

Primary:

* Black background
* White text
* Rounded corners
* Hover lift
* Smooth transition

Secondary:

* White background
* Black border
* Black text

Disabled:

* Reduced opacity
* No hover effect

---

## Cards

Use glassmorphism where appropriate:

* White translucent background
* Soft shadow
* Rounded corners
* Subtle border
* Consistent internal spacing

Cards should elevate slightly on hover (desktop).

---

## Tables

Requirements:

* Clean layout
* Minimal borders
* Responsive
* Horizontal scrolling on small screens
* Sorting and filtering where applicable
* Zebra striping optional

---

## Forms

Requirements:

* Clear labels
* Helpful validation messages
* Large input fields
* Accessible focus states
* Consistent spacing

---

## Dialogs

Use for:

* Confirmations
* Delete actions
* Important notices

Dialogs should:

* Focus the primary action
* Support keyboard navigation
* Close gracefully

---

# Animations

Use **Framer Motion** for:

* Page transitions
* Card entrances
* Hover effects
* Fade-ins
* Slide animations
* Animated counters
* Micro-interactions

Animation duration:

* Approximately 200–300ms

Animations should enhance usability without distracting users.

---

# Dashboard Design

## Administrator Dashboard

Include:

* Statistics cards
* Charts
* Recent activity
* Quick actions
* Responsive tables

---

## Member Dashboard

Include:

* Welcome card
* Current Kuri information
* Contribution summary
* Recipient information
* Announcements
* Document shortcuts

---

# Icons

Use **Lucide React** icons consistently.

Guidelines:

* One icon style throughout the application
* Avoid mixing icon libraries
* Maintain consistent sizing and spacing

---

# Empty States

Provide meaningful empty states for:

* No announcements
* No documents
* No reports
* No contributions
* No search results

Include concise guidance or actions where appropriate.

---

# Loading States

Use skeleton loaders instead of generic spinners whenever possible.

Loading states should match the shape of the final content.

---

# Notifications

Use toast notifications for:

* Successful actions
* Validation errors
* Informational messages

Keep messages concise and easy to understand.

---

# Accessibility

The application should support:

* Keyboard navigation
* Visible focus indicators
* Sufficient color contrast
* Semantic HTML
* Screen reader compatibility where practical
* Large touch targets
* Responsive typography

Aim to meet WCAG AA guidelines.

---

# Responsive Design

Support:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors

Breakpoints should adapt layouts gracefully without hiding essential functionality.

---

# Performance

Optimize for:

* Fast loading
* Lazy-loaded routes
* Optimized images
* Minimal layout shifts
* Efficient rendering

---

# Branding

Visual identity should emphasize:

* Trust
* Simplicity
* Professionalism
* Transparency

The interface should avoid unnecessary decoration and maintain a refined, premium aesthetic.

---

# Dark Mode

Support:

* Light mode
* Dark mode (optional for initial release)

If implemented, ensure both themes maintain readability and consistent branding.

---

# Coding Agent Responsibilities

Any coding agent working on the project must:

* Follow these UI/UX guidelines for all new interfaces.
* Reuse existing components whenever possible.
* Preserve visual consistency across the application.
* Avoid introducing conflicting design patterns.
* Update this document whenever the design system evolves.

This document is the official design reference for the Halal Kuri Management System and should guide all future UI and UX decisions.
