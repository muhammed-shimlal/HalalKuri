# API Documentation

## Overview

This document defines the API structure used by the Halal Kuri Management System.

The application uses **Supabase** as its backend service. All database operations should be performed through the official Supabase client.

This document serves as the authoritative reference for API behavior.

---

# General Rules

* All endpoints must validate input.
* Never expose sensitive information.
* Return consistent JSON responses.
* Use HTTP status codes correctly.
* Protect admin-only operations.
* Log unexpected errors.
* Never expose database credentials.
* Use parameterized queries through Supabase.

---

# Authentication

## Admin Login

### POST

```text
/api/auth/admin/login
```

### Request

```json
{
  "username": "admin",
  "password": "********"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful"
}
```

---

## Member Login

### POST

```text
/api/auth/member/login
```

### Request

```json
{
  "username": "member",
  "password": "********"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful"
}
```

---

# Members API

## Get All Members

### GET

```text
/api/members
```

Returns all members.

---

## Get Member

### GET

```text
/api/members/{id}
```

Returns one member.

---

## Add Member

### POST

```text
/api/members
```

Admin only.

---

## Update Member

### PUT

```text
/api/members/{id}
```

Admin only.

---

## Delete Member

### DELETE

```text
/api/members/{id}
```

Admin only.

---

# Contributions API

## Get Contributions

### GET

```text
/api/contributions
```

Returns contribution history.

---

## Add Contribution

### POST

```text
/api/contributions
```

Admin only.

---

## Update Contribution

### PUT

```text
/api/contributions/{id}
```

Mark Paid or Pending.

---

# Recipient API

## Get Recipient History

### GET

```text
/api/recipients
```

Returns recipient history.

---

## Add Recipient

### POST

```text
/api/recipients
```

Admin only.

---

## Update Recipient

### PUT

```text
/api/recipients/{id}
```

Admin only.

---

# Announcements API

## Get Announcements

### GET

```text
/api/announcements
```

Returns all announcements.

---

## Create Announcement

### POST

```text
/api/announcements
```

Admin only.

---

## Update Announcement

### PUT

```text
/api/announcements/{id}
```

Admin only.

---

## Delete Announcement

### DELETE

```text
/api/announcements/{id}
```

Admin only.

---

# Documents API

## Get Documents

### GET

```text
/api/documents
```

Returns uploaded documents.

---

## Upload Document

### POST

```text
/api/documents
```

Admin only.

---

## Delete Document

### DELETE

```text
/api/documents/{id}
```

Admin only.

---

# Reports API

## Monthly Report

### GET

```text
/api/reports/monthly
```

Returns the monthly report.

---

## Annual Report

### GET

```text
/api/reports/annual
```

Returns the annual report.

---

## Export PDF

### GET

```text
/api/reports/pdf
```

Generates a PDF report.

---

## Export Excel

### GET

```text
/api/reports/excel
```

Generates an Excel report.

---

# Settings API

## Get Settings

### GET

```text
/api/settings
```

Admin only.

---

## Update Admin Credentials

### PUT

```text
/api/settings/admin
```

Admin only.

---

## Update Member Credentials

### PUT

```text
/api/settings/member
```

Admin only.

---

# Standard Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "An error occurred"
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Security

* Passwords must be stored as secure hashes.
* Validate every request.
* Restrict admin-only routes.
* Never expose database credentials.
* Never return password hashes in API responses.
* Sanitize user input.
* Use HTTPS in production.
* Implement rate limiting for login endpoints.
* Log server-side errors without exposing sensitive details to clients.

---

# Versioning

Current API Version: **v1**

Future breaking changes should be released under a new version (for example, `/api/v2/...`) to maintain backward compatibility.
