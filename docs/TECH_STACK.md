# Technology Stack

## Overview

This document defines the official technology stack for the **Halal Kuri Management System**.

The project is designed to use **modern, reliable, production-ready technologies** while remaining **100% free to develop, host, and maintain** within the expected project size.

All contributors and AI coding agents must follow this document when selecting libraries, frameworks, and development tools.

---

# Technology Principles

The selected technologies must provide:

* Modern development experience
* High performance
* Scalability
* Maintainability
* Excellent documentation
* Active community support
* Free hosting compatibility
* Long-term stability

---

# Frontend

## Framework

* **React 19**
* **Vite**

Reason:

* Fast development
* Excellent performance
* Modern ecosystem
* Optimized production builds

---

## Language

* TypeScript

Reason:

* Type safety
* Better maintainability
* Improved developer experience
* Reduced runtime errors

---

## Styling

* Tailwind CSS

Reason:

* Utility-first workflow
* Responsive design
* Easy customization
* Small production bundle

---

## UI Components

* shadcn/ui

Reason:

* Accessible components
* Fully customizable
* Modern design
* Built on Radix UI

---

## Icons

* Lucide React

Reason:

* Lightweight
* Consistent
* Modern icon set

---

## Animations

* Framer Motion

Reason:

* Smooth transitions
* Page animations
* Micro-interactions
* Professional user experience

---

## Routing

* React Router

Reason:

* Standard routing solution
* Nested routes
* Protected routes
* Lazy loading support

---

## Forms

* React Hook Form
* Zod

Reason:

* High performance
* Easy validation
* Strong TypeScript integration

---

## Tables

* TanStack Table

Reason:

* Powerful filtering
* Sorting
* Pagination
* Flexible data grids

---

## Charts

* Recharts

Reason:

* Lightweight
* Responsive
* React-native API
* Suitable for dashboards

---

## Notifications

* Sonner

Reason:

* Elegant toast notifications
* Lightweight
* Modern appearance

---

## Date Utilities

* date-fns

Reason:

* Lightweight
* Tree-shakable
* Easy formatting

---

## Backend

### Platform

* Supabase

Reason:

* PostgreSQL database
* Authentication
* File storage
* Auto-generated APIs
* Generous free tier

---

## Database

* PostgreSQL (Supabase)

Reason:

* Reliable relational database
* ACID compliance
* Strong indexing
* Excellent scalability

---

## Storage

* Supabase Storage

Purpose:

* PDF documents
* Rules
* Agreements
* Downloads

---

## Authentication

* Custom username/password authentication using Supabase Auth or secure application logic

Requirements:

* One administrator account
* One shared member account
* Password hashing
* Session management

---

# Deployment

## Source Control

* Git
* GitHub

---

## Hosting

* Vercel (Free Plan)

Reason:

* Automatic deployments
* HTTPS included
* Fast global CDN
* Excellent React support

---

# Development Tools

## Code Editor

* Visual Studio Code (recommended)

Recommended extensions:

* ESLint
* Prettier
* Tailwind CSS IntelliSense
* TypeScript
* GitHub Copilot (optional)

---

## Package Manager

* npm

---

## Linting

* ESLint

Purpose:

* Consistent code quality
* Error detection
* Best practice enforcement

---

## Formatting

* Prettier

Purpose:

* Consistent formatting
* Reduced style discussions

---

# Environment Variables

Use:

```text id="h5z7ji"
.env.local
.env.example
```

Never commit:

* `.env.local`
* API secrets
* Passwords
* Service role keys

---

# Project Architecture

Recommended architecture:

```text id="jwpjlwm"
React

↓

Components

↓

Pages

↓

Services

↓

Supabase

↓

PostgreSQL
```

Business logic should remain separate from UI components.

---

# Browser Support

Target:

* Chrome (latest)
* Edge (latest)
* Firefox (latest)
* Safari (latest)

The application should be responsive across desktop, tablet, and mobile devices.

---

# Performance Goals

* Lighthouse Performance: 95+
* Lighthouse Accessibility: 95+
* Lighthouse Best Practices: 95+
* Lighthouse SEO: 90+ (public pages)

---

# Security Standards

The implementation must:

* Use HTTPS in production.
* Hash passwords.
* Protect restricted routes.
* Validate all inputs.
* Use environment variables for secrets.
* Follow secure coding practices.

---

# Dependency Policy

When adding new packages:

* Prefer actively maintained libraries.
* Avoid unnecessary dependencies.
* Keep the dependency tree small.
* Verify license compatibility.
* Document additions in `CHANGELOG.md` when appropriate.

---

# Future Technology Considerations

Potential future additions:

* Progressive Web App (PWA)
* Offline support
* Individual member authentication
* Push notifications
* Internationalization (i18n)
* Analytics dashboard
* Multi-tenant architecture

These are not required for the initial release but should be considered during architectural planning.

---

# Coding Agent Responsibilities

Any coding agent working on this project must:

* Use the technologies defined in this document unless explicitly instructed otherwise.
* Avoid introducing paid services or unnecessary dependencies.
* Keep the technology stack consistent throughout the project.
* Update this document whenever the stack changes.
* Ensure new libraries are compatible with the existing architecture.

This document is the authoritative reference for all technology decisions within the Halal Kuri Management System.
