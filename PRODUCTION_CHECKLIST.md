# Production Checklist

Use this checklist to ensure all external services and configurations are correctly set up before marking the deployment as live.

### Supabase Checklist
- [x] **Supabase Project Created**: A new project has been initialized in the Supabase Dashboard.
- [x] **SQL Migration Applied**: `supabase/migrations/20260718000000_init.sql` has been executed successfully.
- [x] **Storage Bucket Created**: A public bucket named `documents` was created.
- [x] **Authentication Configured**: 
  - Email Auth enabled.
  - Public signup disabled.
  - Test Admin and Member accounts manually created.
- [x] **Row Level Security (RLS)**: Verified active on all tables with proper policies.

### Application Checklist
- [x] **Environment Variables Added**: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` verified.
- [x] **Security**: No sensitive keys, passwords, or `service_role` keys committed to Git.
- [x] **Code Quality**: Zero TypeScript errors, zero ESLint warnings, no `console.log()` statements in production flows.
- [x] **Performance**: Build completes successfully (`npm run build`).

### Deployment Checklist
- [x] **GitHub Connected**: Code pushed to `https://github.com/muhammed-shimlal/HalalKuri.git`.
- [x] **Vercel Connected**: Repository imported into Vercel.
- [x] **Environment Variables Set (Vercel)**: Supabase keys added to Vercel project settings.
- [x] **HTTPS Verified**: Custom domain (or Vercel domain) securely serving the site over HTTPS.
- [x] **Final Testing Complete**: End-to-end testing of Admin and Member flows verified on the production URL.
