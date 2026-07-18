# Authentication Documentation

## Overview

This document defines the authentication system for the **Halal Kuri Management System**.

The application is a **private, invitation-only platform**. Only pre-approved users can access the system. There is **no public registration** or self-service account creation.

This document is the single source of truth for all authentication-related behavior.

---

# Authentication Model

The system has only **two roles**:

1. **Administrator**
2. **Member**

There are **no additional roles**.

---

# Administrator Account

There is **one dedicated Administrator account**.

The Administrator has full access to the application.

Administrator permissions include:

* Manage members
* Record monthly contributions
* Manage recipient history
* Create announcements
* Upload documents
* Manage website content
* Generate reports
* Manage system settings
* Change login credentials
* Backup and restore the database

---

# Member Account

All members use **one shared Member account**.

After signing in, members have read-only access to information intended for participants.

Members can:

* View the dashboard
* View contribution status
* View recipient history
* Read announcements
* Download documents
* View rules and guidelines

Members cannot:

* Edit records
* Add members
* Delete data
* Change contribution records
* Modify recipient history
* Access system settings

---

# Login Method

Authentication uses:

* Username
* Password

No additional verification methods are required.

---

# Not Supported

The following authentication methods must **NOT** be implemented:

* Public registration
* Sign up
* Email verification
* Phone verification
* OTP
* Magic links
* Google Login
* Facebook Login
* GitHub Login
* Apple Login
* Social authentication
* Two-factor authentication (2FA)

---

# Password Storage

Passwords must **never** be stored as plain text.

Requirements:

* Hash passwords using a strong hashing algorithm (such as bcrypt).
* Store only the password hash.
* Never log passwords.
* Never expose password hashes in API responses.

---

# Session Management

After successful login:

* Create a secure authenticated session.
* Protect private routes.
* Automatically redirect unauthenticated users to the login page.
* Destroy the session on logout.

Recommended behavior:

* Auto logout after prolonged inactivity (for example, 30 minutes).
* Require login again after session expiration.

---

# Route Protection

## Public Routes

Accessible without authentication:

* Home
* About
* How It Works
* Shariah Compliance
* Rules
* FAQ
* Contact
* Login

---

## Member Routes

Accessible only after member authentication:

* Dashboard
* Contribution Status
* Recipient History
* Member Directory
* Announcements
* Documents

---

## Administrator Routes

Accessible only after administrator authentication:

* Admin Dashboard
* Member Management
* Contribution Management
* Recipient Management
* Announcement Management
* Document Management
* Reports
* Website Content Management
* Settings

---

# Authorization Rules

| Feature              | Admin | Member |
| -------------------- | :---: | :----: |
| View Dashboard       |   ✅   |    ✅   |
| View Contributions   |   ✅   |    ✅   |
| Manage Contributions |   ✅   |    ❌   |
| View Recipients      |   ✅   |    ✅   |
| Manage Recipients    |   ✅   |    ❌   |
| View Members         |   ✅   |    ✅   |
| Add Members          |   ✅   |    ❌   |
| Edit Members         |   ✅   |    ❌   |
| Delete Members       |   ✅   |    ❌   |
| View Announcements   |   ✅   |    ✅   |
| Manage Announcements |   ✅   |    ❌   |
| Download Documents   |   ✅   |    ✅   |
| Upload Documents     |   ✅   |    ❌   |
| Generate Reports     |   ✅   |    ❌   |
| Manage Settings      |   ✅   |    ❌   |
| Backup & Restore     |   ✅   |    ❌   |

---

# Security Requirements

The implementation must:

* Use HTTPS in production.
* Hash passwords.
* Validate all login requests.
* Sanitize input.
* Protect against SQL injection.
* Protect against XSS.
* Protect against CSRF where applicable.
* Use secure session cookies if cookies are used.
* Prevent access to protected pages without authentication.

---

# Failed Login Handling

If login fails:

* Return a generic error message.
* Do not reveal whether the username or password is incorrect.
* Do not expose internal system information.

Example message:

> Invalid username or password.

---

# Logout

Logging out must:

* Destroy the active session.
* Clear authentication tokens or cookies.
* Redirect the user to the login page.
* Prevent access to protected routes until the user logs in again.

---

# Future Enhancements

The authentication system should be designed so that future improvements (such as individual member accounts or multi-factor authentication) can be added without requiring a complete rewrite of the application.

---

# Implementation Notes

* Keep authentication logic modular.
* Separate authentication from business logic.
* Store secrets using environment variables.
* Never hard-code passwords or secret keys.
* Follow the principle of least privilege.

---

# Coding Agent Rules

Any coding agent working on this project must:

* Follow this document for all authentication-related changes.
* Preserve backward compatibility unless explicitly instructed otherwise.
* Update this document whenever authentication behavior changes.
* Never delete or replace this file.
* Only extend or revise it as the authentication system evolves.
