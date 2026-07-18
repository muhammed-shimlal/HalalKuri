# Folder Structure

## Overview

This document defines the official folder structure for the **Halal Kuri Management System**.

The purpose of this structure is to keep the project organized, scalable, maintainable, and easy to understand for all developers and AI coding agents.

This document is the authoritative reference for the project's directory organization.

---

# Project Structure

```text
halal-kuri-management-system/
│
├── docs/                          # Project documentation
│   ├── README.md
│   ├── PROJECT_OVERVIEW.md
│   ├── FEATURES.md
│   ├── TECH_STACK.md
│   ├── DATABASE_SCHEMA.md
│   ├── API.md
│   ├── AUTHENTICATION.md
│   ├── UI_UX_GUIDELINES.md
│   ├── DEPLOYMENT.md
│   ├── FOLDER_STRUCTURE.md
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
│
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.json
│   ├── robots.txt
│   ├── images/
│   ├── icons/
│   └── documents/
│
├── src/
│   ├── assets/                    # Images, fonts, icons
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                # Reusable UI components
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── tables/
│   │   ├── charts/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── navigation/
│   │   └── ui/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   └── MemberLayout.tsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   ├── admin/
│   │   ├── member/
│   │   ├── auth/
│   │   └── errors/
│   │
│   ├── hooks/                     # Custom React hooks
│   │
│   ├── services/                  # API & Supabase services
│   │
│   ├── lib/                       # Utilities and configuration
│   │
│   ├── utils/                     # Helper functions
│   │
│   ├── context/                   # React Context providers
│   │
│   ├── store/                     # Global state (if used)
│   │
│   ├── types/                     # TypeScript types
│   │
│   ├── constants/                 # Static values
│   │
│   ├── styles/                    # Global styles
│   │
│   ├── routes/                    # Application routing
│   │
│   ├── config/                    # Environment configuration
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── eslint.config.js
├── README.md
└── LICENSE
```

---

# Folder Descriptions

## `/docs`

Contains all project documentation.

Rules:

* Never delete documentation files.
* Keep documentation synchronized with the implementation.
* Update relevant documents whenever features or architecture change.

---

## `/public`

Stores publicly accessible static assets.

Examples:

* Logo
* Favicon
* Images
* Downloadable documents
* Manifest
* Robots.txt

---

## `/src`

Contains all application source code.

This is the primary development directory.

---

## `/src/components`

Contains reusable UI components.

Subfolders:

* Common components
* Layout components
* Forms
* Tables
* Charts
* Cards
* Dialogs
* Navigation
* Shared UI elements

Components should be reusable and avoid business logic where possible.

---

## `/src/layouts`

Defines page layouts.

Examples:

* Public layout
* Admin layout
* Member layout

Layouts should handle navigation and shared page structure.

---

## `/src/pages`

Contains route-level pages.

Organize pages by feature:

* Public
* Admin
* Member
* Authentication
* Error pages

---

## `/src/services`

Contains all communication with external services.

Examples:

* Supabase client
* API wrappers
* Authentication service

Business logic related to external data should live here.

---

## `/src/hooks`

Contains reusable custom React hooks.

Examples:

* Authentication hooks
* Theme hooks
* Data-fetching hooks

---

## `/src/utils`

Contains utility functions.

Examples:

* Date formatting
* Currency formatting
* Validation helpers
* General helper functions

---

## `/src/types`

Contains shared TypeScript interfaces and types.

Avoid defining duplicate types across the project.

---

## `/src/constants`

Contains application constants.

Examples:

* Routes
* Status values
* Configuration constants

---

## `/src/context`

Contains React Context providers.

Examples:

* Authentication context
* Theme context

---

## `/src/store`

Optional global state management.

Use only if required.

---

## `/src/config`

Contains configuration files.

Examples:

* Supabase configuration
* Environment helpers

---

## `/supabase`

Contains database-related resources.

Examples:

* SQL migrations
* Seed data
* Edge Functions (if used)

---

## `/.github`

Contains GitHub-specific configuration.

Examples:

* GitHub Actions workflows
* CI/CD configuration

---

# Naming Conventions

## Folders

Use:

* lowercase
* kebab-case where appropriate

Examples:

```text
member-directory

admin-dashboard

report-generator
```

---

## React Components

Use PascalCase.

Examples:

```text
MemberCard.tsx

DashboardHeader.tsx

ContributionTable.tsx
```

---

## Hooks

Prefix with `use`.

Examples:

```text
useAuth.ts

useMembers.ts

useAnnouncements.ts
```

---

## Utility Files

Use camelCase.

Examples:

```text
formatDate.ts

calculateProgress.ts

validateInput.ts
```

---

# Import Guidelines

Use path aliases where configured.

Prefer:

```typescript
import MemberCard from "@/components/cards/MemberCard";
```

Instead of long relative paths:

```typescript
import MemberCard from "../../../../components/cards/MemberCard";
```

---

# Coding Agent Rules

Any coding agent working on this project must:

* Follow this folder structure.
* Do not create duplicate directories.
* Place new files in the correct location.
* Keep related code together.
* Remove unused files only with explicit approval.
* Update this document if the project structure changes.
* Preserve consistency across the codebase.

This folder structure is the official project organization and should be followed throughout the lifetime of the project.
