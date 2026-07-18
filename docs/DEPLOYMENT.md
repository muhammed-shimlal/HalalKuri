# Deployment Guide

This guide covers the end-to-end deployment of the **Halal Kuri Management System** to Supabase and Vercel.

---

### Step 1: Create Supabase project
1. Go to [Supabase](https://supabase.com/).
2. Click **New Project**.
3. Select your organization and provide a project name (`HalalKuri`) and strong database password.
4. Wait for the database to provision.

### Step 2: Run migration
1. Go to the **SQL Editor** in the Supabase Dashboard.
2. Open `supabase/migrations/20260718000000_init.sql` from your local codebase.
3. Paste the contents into the SQL Editor and click **Run**.
4. This will create all tables, policies, enums, triggers, and insert default settings/content.

### Step 3: Create storage bucket
1. Go to **Storage** in the Supabase Dashboard.
2. Click **New Bucket**.
3. Name it `documents`.
4. Ensure the bucket is set to **Public** so users can download files.

### Step 4: Disable public signup
1. Go to **Authentication > Providers > Email**.
2. Toggle off "Allow new users to sign up".
3. Save changes. This restricts access strictly to manually created accounts.

### Step 5: Create Admin account
1. Go to **Authentication > Users**.
2. Click **Add User** -> **Create New User**.
3. Enter the Admin email (e.g., `admin@halalkuri.com`) and a strong password.
4. Disable "Auto Confirm User" if you want to verify emails, or enable it to bypass email verification.

### Step 6: Create Shared Member account
1. Go back to **Authentication > Users**.
2. Click **Add User** -> **Create New User**.
3. Enter the Shared Member email (e.g., `member@halalkuri.com`) and a standard password to be distributed to the committee.
4. (Make sure these emails match the `settings` table if you plan to implement strict email-based claims in the future).

### Step 7: Configure environment variables
1. In the Supabase Dashboard, go to **Project Settings > API**.
2. Note your **Project URL** and **anon public key**.
3. Locally, copy `.env.example` to `.env.local` and add these values to ensure local testing works.

### Step 8: Push to GitHub
1. Initialize git locally if you haven't:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for v1.0.0"
   git branch -M main
   git remote add origin https://github.com/muhammed-shimlal/HalalKuri.git
   git push -u origin main
   ```

### Step 9: Import repository into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New... > Project**.
3. Import the `HalalKuri` repository from GitHub.
4. In the configuration, add your Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 10: Deploy
1. Click **Deploy** in Vercel.
2. Wait for the build process to finish (`npm run build`).
3. Vercel will provide a production URL once complete.

### Step 11: Verify production
1. Visit the deployed Vercel URL.
2. Attempt to login as Admin and Member.
3. Verify that the UI matches the local development experience.
4. Perform a test file upload to confirm Storage configuration.
5. Your Halal Kuri system is now live!
