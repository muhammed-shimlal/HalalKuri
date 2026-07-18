# Known Issues

**Version**: v1.0.0

This document tracks any known bugs, limitations, or potential issues present in the current release of the Halal Kuri Management System.

### 1. Password Reset Limitations
- **Description**: Updating the Admin or Member passwords from the client-side `Settings` page without a `service_role` key is not supported by standard Supabase client security limits.
- **Impact**: The UI allows updating the display usernames, but password resets must currently be handled directly in the Supabase Dashboard -> Authentication tab.
- **Workaround / Future Fix**: Deploy a secure Supabase Edge Function that uses the `service_role` key to process administrative password change requests securely from the client.

### 2. Document Upload Type Filtering
- **Description**: The UI limits file uploads to PDFs via the HTML `accept=".pdf"` attribute. However, there is no strict backend file-typing checking yet.
- **Impact**: A technically sophisticated user could potentially bypass the client-side restriction and upload non-PDF files to the storage bucket.
- **Workaround / Future Fix**: Add Supabase Storage policies that strictly validate `MIME` types on upload (`application/pdf`).

### 3. Missing Audit Logging
- **Description**: There is currently no `audit_logs` table tracking which admin made which change to the database.
- **Impact**: If multiple admins share the admin account, there is no accountability trail.
- **Workaround / Future Fix**: Implement an `audit_logs` table and a PostgreSQL trigger on all critical tables to automatically record row mutations.

### Status
Currently, there are **no critical blocking bugs** that prevent the application from functioning as intended for its RC-1 Production release.
