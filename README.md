# Halal Kuri Management System

![Version](https://img.shields.io/badge/version-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-success)

A Premium, Modern, Mobile-First Private Halal Kuri Management System.

This platform is exclusively designed for managing a Private Halal Kuri (Islamic Interest-Free Committee). It maintains total transparency, manages contribution records, tracks monthly recipients, publishes announcements, and provides members with easy access to all information.

## Repository

[https://github.com/muhammed-shimlal/HalalKuri.git](https://github.com/muhammed-shimlal/HalalKuri.git)

## Features

- **Zero Riba**: Operates strictly on Qard Hasan principles.
- **Role-Based Access**: Dedicated Admin Dashboard and secure Member Portal.
- **CMS Integration**: Admin-editable dynamic public pages (Home, About, FAQ).
- **Financial Tracking**: Track monthly contributions, member statuses, and recipient history.
- **Reporting**: Export data as PDF directories, monthly collection reports, and Excel sheets.
- **Storage**: Upload and distribute essential PDF documents securely.

## Technology Stack

- **Frontend**: React 19 + Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend/Auth/DB**: Supabase
- **Forms & Validation**: react-hook-form, zod
- **Data Fetching**: @tanstack/react-query
- **Exports**: jspdf, xlsx, recharts

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammed-shimlal/HalalKuri.git
   cd HalalKuri
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env.local` and add your Supabase credentials.

4. Start development server:
   ```bash
   npm run dev
   ```

## Documentation

Full documentation is available in the `/docs` directory:
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Features](docs/FEATURES.md)
- [Changelog](docs/CHANGELOG.md)

## License

MIT License. See [LICENSE.md](LICENSE.md) for more details.
