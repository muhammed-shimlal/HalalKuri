# Project Overview

## Project Name

**Halal Kuri Management System**

---

# Introduction

The **Halal Kuri Management System** is a modern, premium, mobile-first web application designed to manage a **Private Halal Kuri (Islamic Interest-Free Committee)**.

The platform provides a secure and transparent way to manage members, monthly contributions, recipient records, announcements, reports, and supporting documents while following the operational principles of a private Halal Kuri.

This system is intended for **pre-approved members only** and is **not open to public registration**.

---

# Project Vision

To build a simple, elegant, and trustworthy digital platform that helps private Halal Kuri organizers manage their committee efficiently while maintaining transparency, accountability, and ease of use.

---

# Project Mission

* Digitize Halal Kuri record management.
* Improve transparency between administrators and members.
* Reduce paperwork.
* Provide a premium user experience.
* Create a secure and maintainable application.
* Use only free and open development tools for deployment and hosting.

---

# Project Goals

The primary goals are:

* Build a premium web application.
* Provide an excellent mobile experience.
* Keep the interface simple and intuitive.
* Record monthly contributions.
* Record monthly recipients.
* Publish announcements.
* Manage downloadable documents.
* Generate reports.
* Maintain accurate historical records.

---

# Target Users

## Administrator

The administrator is responsible for managing the entire system.

Responsibilities include:

* Managing members
* Recording monthly contributions
* Recording monthly recipients
* Managing announcements
* Uploading documents
* Managing website content
* Generating reports
* Managing application settings

---

## Members

Members are participants in the Halal Kuri.

Members have read-only access to:

* Dashboard
* Contribution history
* Recipient history
* Announcements
* Documents
* Rules and guidelines

Members cannot modify system data.

---

# Core Principles

The application is built around the following principles:

* Transparency
* Simplicity
* Security
* Performance
* Accessibility
* Professional design
* Mobile-first development
* Long-term maintainability

---

# Scope

## Included

* Public information website
* Admin dashboard
* Shared member portal
* Contribution management
* Recipient management
* Announcements
* Document management
* Reports
* Responsive design
* Secure authentication
* Supabase database integration
* Free deployment using Vercel

---

## Not Included

The initial release does **not** include:

* Public registration
* User signup
* Online payments
* Payment gateway integration
* Auction or bidding system
* Individual member accounts
* OTP authentication
* Email verification
* Social login
* Multi-language support (planned for future versions)

---

# Authentication Model

The application uses a simple authentication model.

There are only two account types:

## Administrator

* One dedicated administrator account.
* Full system access.

## Members

* One shared member account.
* Read-only access.

No registration or account creation is available.

---

# Technology Stack

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide React Icons

## Backend

* Supabase
* PostgreSQL
* Supabase Storage

## Hosting

* GitHub
* Vercel

All services are selected to remain within their free tiers for the expected project size.

---

# Design Philosophy

The user interface should feel:

* Premium
* Modern
* Minimal
* Elegant
* Trustworthy

Visual inspiration may be drawn from products such as:

* Stripe
* Linear
* Apple
* Notion
* Vercel

The color palette consists primarily of:

* Black
* White
* Light Gray
* Subtle Gold accents

The interface should use generous spacing, smooth animations, rounded corners, and a mobile-first layout.

---

# Security Principles

The system must:

* Store passwords as secure hashes.
* Protect restricted routes.
* Validate all user input.
* Use HTTPS in production.
* Keep secrets in environment variables.
* Follow secure coding practices.

---

# Documentation Policy

Project documentation is an essential part of the codebase.

All documentation files located in the `/docs` directory must be maintained alongside the implementation.

Documentation must never be deleted or replaced without explicit approval.

Whenever functionality changes, the corresponding documentation should be updated.

---

# Future Expansion

The architecture should support future enhancements such as:

* Individual member accounts
* Multiple Kuri groups
* Audit logs
* Activity history
* Notification system
* WhatsApp integration
* SMS notifications
* Multi-language support
* Dashboard analytics

These features are outside the scope of the initial release but should be considered during architectural decisions.

---

# Success Criteria

The project will be considered successful when it:

* Delivers a premium user experience.
* Works seamlessly on desktop, tablet, and mobile devices.
* Provides accurate and transparent record management.
* Is easy to maintain and extend.
* Uses only free hosting and backend services.
* Is well documented.
* Is secure and production-ready.

---

# Coding Agent Responsibilities

Any coding agent contributing to this project must:

* Read this document before making architectural decisions.
* Follow the documented scope and objectives.
* Preserve backward compatibility unless otherwise instructed.
* Keep implementation aligned with the project's vision.
* Update this document whenever the project's goals, scope, or architecture change.
* Respect the documentation-first policy established for this project.

This document serves as the primary reference for understanding the purpose, scope, and long-term direction of the Halal Kuri Management System.
