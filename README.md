# Earth Finance - Full-Stack Production Platform

## Overview
Earth Finance is a corporate, high-trust FinTech and financial advisory web application for Indian business and corporate financing.

## Technology Stack
- **Frontend**: React 18+, Vite, TypeScript, Tailwind CSS, React Router v6+, Axios, Lucide React, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript, REST API, JWT auth, bcrypt password hashing, helmet, cors, express-rate-limit, zod validation
- **Database**: PostgreSQL on InsForge (UUID primary keys, foreign keys, indexes, timestamps, RLS)

## Architecture
- `frontend/` - Single-Page React application with public pages, loan calculators, enquiry forms, and protected admin portal
- `backend/` - Modular Node/Express REST API with controller-service-route-middleware architecture
