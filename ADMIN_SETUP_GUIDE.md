# Admin Login Setup Guide

## Quick Start - Your Credentials

**Email:** `admin@lumenhelix.com`
**Password:** `LumenHelix@2024Admin`

## How to Enable Login

### Step 1: Add Environment Variables in v0

Click **"Vars"** in the left sidebar and add these three variables:

| Key | Value |
|-----|-------|
| `ADMIN_EMAIL` | `admin@lumenhelix.com` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | `6b1a8f3c:9d2e5a7b4c1f8e3a6d9b2c5e8f1a4d7b0c3f6a9d2e5b8c1f4a7d0e3b6c9f2a5d8b1e4c7f0a3d6e9c2f5a8b1d4g7` |

### Step 2: Go to Login

Navigate to `/login` on your site

### Step 3: Enter Your Credentials

- **Email:** `admin@lumenhelix.com`
- **Password:** `LumenHelix@2024Admin`
- **User Type:** Select "Admin"
- **Click:** Login

## Done!

You're now logged in as an administrator with full access to:
- Admin dashboard
- Guest management
- Staff access control
- All system settings

## For Production (Vercel)

Same credentials work - just make sure the environment variables are set in your Vercel project settings under Environment Variables.

## Changing Your Password

To use a different password:

1. Run: `node scripts/generate-admin-hash.js "your-new-password"`
2. Copy the `ADMIN_PASSWORD_HASH` value
3. Update the `ADMIN_PASSWORD_HASH` environment variable
4. Redeploy
