# Database Schema

## Overview

This document defines the complete database structure for the **Halal Kuri Management System**.

The application uses **Supabase PostgreSQL** as its primary database.

This document is the **single source of truth** for all database tables, relationships, constraints, and data rules.

---

# Database Rules

All contributors and coding agents must follow these rules:

* Never delete existing tables without explicit approval.
* Prefer migrations over destructive changes.
* Maintain backward compatibility whenever possible.
* Use proper foreign key relationships.
* Store timestamps in UTC.
* Use `UUID` as the primary key for all tables.
* Never store passwords in plain text.
* Index frequently searched columns.
* Document every schema change in `CHANGELOG.md`.

---

# Entity Relationship Overview

```text
Settings (1)
Website Content (Many)

Members (Many)
        │
        ├──────────────┐
        │              │
        ▼              ▼
Contributions      Recipients

Announcements

Documents
```

---

# Table: members

Purpose:

Stores all approved Halal Kuri members.

| Column        | Type         | Required | Description          |
| ------------- | ------------ | -------- | -------------------- |
| id            | UUID         | Yes      | Primary Key          |
| member_number | VARCHAR(20)  | Yes      | Unique member number |
| full_name     | VARCHAR(150) | Yes      | Member name          |
| phone         | VARCHAR(20)  | No       | Contact number       |
| address       | TEXT         | No       | Address              |
| status        | VARCHAR(20)  | Yes      | Active / Inactive    |
| created_at    | TIMESTAMP    | Yes      | Record creation time |
| updated_at    | TIMESTAMP    | Yes      | Last modification    |

Indexes

* member_number
* status

---

# Table: contributions

Purpose:

Stores monthly contribution records.

| Column     | Type          |
| ---------- | ------------- |
| id         | UUID          |
| member_id  | UUID          |
| month      | VARCHAR(20)   |
| year       | INTEGER       |
| amount     | NUMERIC(12,2) |
| status     | VARCHAR(20)   |
| remarks    | TEXT          |
| created_at | TIMESTAMP     |
| updated_at | TIMESTAMP     |

Foreign Key

```text
member_id → members.id
```

Status Values

* PAID
* PENDING

Indexes

* member_id
* month, year

---

# Table: recipients

Purpose:

Stores monthly Halal Kuri recipients.

| Column     | Type          |
| ---------- | ------------- |
| id         | UUID          |
| member_id  | UUID          |
| month      | VARCHAR(20)   |
| year       | INTEGER       |
| amount     | NUMERIC(12,2) |
| reason     | TEXT          |
| remarks    | TEXT          |
| created_at | TIMESTAMP     |
| updated_at | TIMESTAMP     |

Foreign Key

```text
member_id → members.id
```

Indexes

* month, year

---

# Table: announcements

Purpose:

Stores notices shown on the website and member dashboard.

| Column      | Type         |
| ----------- | ------------ |
| id          | UUID         |
| title       | VARCHAR(200) |
| description | TEXT         |
| published   | BOOLEAN      |
| created_at  | TIMESTAMP    |
| updated_at  | TIMESTAMP    |

Indexes

* published

---

# Table: documents

Purpose:

Stores downloadable documents.

| Column     | Type         |
| ---------- | ------------ |
| id         | UUID         |
| title      | VARCHAR(200) |
| file_url   | TEXT         |
| file_name  | VARCHAR(255) |
| file_size  | BIGINT       |
| created_at | TIMESTAMP    |
| updated_at | TIMESTAMP    |

---

# Table: website_content

Purpose:

Stores dynamic content for public pages (CMS).

| Column     | Type         |
| ---------- | ------------ |
| id         | UUID         |
| page       | VARCHAR(100) |
| title      | VARCHAR(200) |
| content    | TEXT         |
| updated_at | TIMESTAMP    |

---

# Table: settings

Purpose:

Stores application-wide settings.

There should normally be only **one row** in this table.

| Column                | Type         |
| --------------------- | ------------ |
| id                    | UUID         |
| admin_username        | VARCHAR(100) |
| shared_login_username | VARCHAR(100) |
| app_name              | VARCHAR(150) |
| contact_phone         | VARCHAR(30)  |
| contact_email         | VARCHAR(150) |
| office_address        | TEXT         |
| updated_at            | TIMESTAMP    |

---

# Relationships

Members

```text
One Member
      │
      ├────────► Many Contributions
      │
      └────────► Many Recipient Records
```

---

# Constraints

Members

* member_number must be unique.

Contributions

* One contribution per member per month (Unique member_id, month, year).

Recipients

* One recipient record per month (Unique month, year).

Settings

* Only one active settings record.

---

# Row Level Security (RLS)

Enable Row Level Security for all tables.

Recommended policies:

### Members, Contributions, Recipients, Announcements, Documents
Admin: Full CRUD
Members: Read Only

### Website Content, Settings
Public: Read Only
Admin: Full CRUD

---

# Backup Strategy

Recommended:

* Daily automatic database backup.
* Export monthly SQL backup.
* Store backups securely.
* Test restoration periodically.

---

# Coding Agent Rules

Any coding agent modifying the database must:

* Preserve existing tables unless explicitly instructed.
* Create migrations instead of destructive changes.
* Update this document whenever the schema changes.
* Record schema changes in `CHANGELOG.md`.
* Keep database design normalized and maintainable.

This document is the authoritative reference for the project's database structure and must remain synchronized with the implementation.
