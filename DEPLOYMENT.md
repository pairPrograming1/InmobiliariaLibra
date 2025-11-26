# Deployment Guide - Vercel & Neon

This guide walks you through deploying InmobiliariaLibra to Vercel with a Neon PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Neon account (free tier works)
- Cloudinary account for image uploads

## Step 1: Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project (e.g., "InmobiliariaLibra")
3. Copy the connection string (it should look like: `postgresql://user:password@host/database?sslmode=require`)
4. Save this for later - you'll need it as `DATABASE_URL`

## Step 2: Initialize Database Schema

Run the schema creation script against your Neon database:

```bash
# Set your Neon DATABASE_URL
export DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Run schema setup (creates tables, indexes, etc.)
node scripts/setup-db.js
```

## Step 3: Seed Demo Data (Optional)

To populate your database with demo properties:

```bash
# Make sure DATABASE_URL is still set
node scripts/seed-neon.js
```

This will create:
- 10 default services (Agua, Luz, Gas, etc.)
- 3 demo properties with rooms, images, and services
- Sample data to showcase the application

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository (`pairPrograming1/InmobiliariaLibra`)
4. Configure environment variables (see below)
5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Step 5: Configure Environment Variables

Add these environment variables in Vercel:

### Required Variables

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### How to add them in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string
   - Environment: Production, Preview, Development (select all)
4. Repeat for Cloudinary variables

## Step 6: Verify Deployment

1. Once deployed, Vercel will provide a URL (e.g., `https://inmobiliaria-libra.vercel.app`)
2. Visit the URL and check:
   - `/propiedades` - Should list properties (or be empty if you didn't seed)
   - `/admin/propiedades/nueva` - Create a new property
   - Upload an image to test Cloudinary integration

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct and includes `?sslmode=require`
- Check Neon dashboard to ensure the database is active
- Review Vercel deployment logs for connection errors

### Image Upload Failures

- Verify all Cloudinary variables are set correctly
- Check Cloudinary dashboard for API usage/errors
- Ensure your Cloudinary account is active

### Build Errors

- Check Vercel build logs for specific errors
- Verify all dependencies are in `package.json`
- Run `npm run build` locally to catch issues early

## Local Development vs Production

The app automatically detects the environment:

- **Local**: Uses `pg` driver for PostgreSQL (localhost or remote)
- **Vercel**: Uses `@neondatabase/serverless` for Neon (optimized for edge/serverless)

This is handled automatically in `lib/db.ts` by checking `process.env.VERCEL === "1"`.

## Next Steps

- Set up custom domain in Vercel
- Configure preview deployments for pull requests
- Set up monitoring/analytics
- Add authentication (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Cloudinary Docs: https://cloudinary.com/documentation
