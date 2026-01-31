# Admin Credentials Management

This document explains how to securely manage administrator credentials using environment variables in the Lumen Helix application.

## Overview

The application stores admin credentials as environment variables for secure, flexible management across different environments (development, staging, production). This approach ensures:

- **Security**: Credentials are not hardcoded in the repository
- **Flexibility**: Easy credential updates without code changes
- **Environment-Specific Configuration**: Different admins per environment
- **Emergency Access**: Support for backup admin credentials
- **Audit Trail**: Full logging of admin authentication attempts

## Setup Process

### Step 1: Generate Admin Password Hash

Use the provided script to generate a secure password hash:

```bash
node scripts/generate-admin-hash.js "your-secure-password"
```

Output example:
```
==================================================================
Admin Password Hash Generated
==================================================================

Password: your-secure-password
Hash: a1b2c3d4:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0

==================================================================
To use this hash, set it in your environment:
==================================================================

ADMIN_PASSWORD_HASH=a1b2c3d4:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
```

**Important**: The password hash format is `salt:hash`. Do not modify this format.

### Step 2: Local Development Setup (.env.local)

Create or update `.env.local` in your project root:

```env
# Admin Credentials
ADMIN_EMAIL=admin@lumenhelix.com
ADMIN_PASSWORD_HASH=a1b2c3d4:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
ADMIN_USERNAME=admin

# Optional: Backup Admin
BACKUP_ADMIN_EMAIL=backup-admin@lumenhelix.com
BACKUP_ADMIN_PASSWORD_HASH=b2c3d4e5:f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
```

### Step 3: Production Deployment (Vercel)

1. **Navigate to Project Settings**
   - Go to your Vercel project dashboard
   - Click "Settings" in the top menu
   - Select "Environment Variables" from the left sidebar

2. **Add Admin Credentials**
   - Click "Add New"
   - Name: `ADMIN_EMAIL`
   - Value: `admin@lumenhelix.com`
   - Select environment: Production (or all environments)
   - Click "Save"

3. **Add Password Hash**
   - Click "Add New"
   - Name: `ADMIN_PASSWORD_HASH`
   - Value: `<paste the hash from Step 1>`
   - Select environment: Production (or all environments)
   - Click "Save"

4. **Optional: Add Backup Admin**
   - Repeat for `BACKUP_ADMIN_EMAIL` and `BACKUP_ADMIN_PASSWORD_HASH`

5. **Redeploy Application**
   - Navigate to "Deployments"
   - Click the three-dot menu on the latest deployment
   - Select "Redeploy"
   - Or push a new commit to trigger automatic redeploy

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_EMAIL` | Yes | Primary administrator email address |
| `ADMIN_PASSWORD_HASH` | Yes | PBKDF2 hashed password (salt:hash format) |
| `ADMIN_USERNAME` | No | Display name for admin (defaults to "admin") |
| `BACKUP_ADMIN_EMAIL` | No | Backup administrator email for emergency access |
| `BACKUP_ADMIN_PASSWORD_HASH` | No | Backup admin password hash (requires both backup vars) |

## Authentication Flow

1. User enters email and password in login form
2. System checks if email matches `ADMIN_EMAIL` or `BACKUP_ADMIN_EMAIL`
3. If admin email, verifies password against environment-stored hash
4. If verification succeeds, creates or updates admin user in database
5. Generates session token and sets HTTP-only cookie
6. Redirects to admin dashboard

## Key Features

### Primary & Backup Admin Support
- **Primary Admin**: Configured via `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`
- **Backup Admin**: Optional secondary admin for emergency scenarios
- Both can authenticate and access all admin features

### Security Measures
- Passwords are never stored in code or logs
- PBKDF2 hashing with 100,000 iterations and SHA-512
- Random 16-byte salt per hash
- HTTP-only cookies prevent XSS token theft
- Secure flag on cookies in production
- Session tokens are cryptographically random

### Validation & Startup Checks
The application validates admin configuration on startup. If credentials are missing or misconfigured:

```
✗ Admin configuration validation failed:
  - ADMIN_EMAIL is not configured
  - ADMIN_PASSWORD_HASH is not configured

To fix this, please:
1. Generate a password hash using the setup script
2. Set environment variables
3. Redeploy the application
```

## Changing Admin Credentials

### Update Admin Email
1. Generate new password hash: `node scripts/generate-admin-hash.js "new-password"`
2. Update environment variables in Vercel
3. Redeploy the application
4. Old credentials will no longer work

### Emergency: Reset Admin Password
1. Generate new hash for backup admin using `scripts/generate-admin-hash.js`
2. Update `BACKUP_ADMIN_PASSWORD_HASH` in Vercel
3. Use backup admin to log in
4. Update primary admin credentials from admin panel
5. Redeploy with new primary credentials

## Testing Admin Access

### Local Development
```bash
# Terminal 1: Start development server
npm run dev

# Terminal 2: Generate test admin hash
node scripts/generate-admin-hash.js "testadmin123"

# Copy the hash to .env.local and restart the server

# Then visit: http://localhost:3000/login
# Enter:
#   Email: admin@lumenhelix.com
#   Password: testadmin123
#   Role: Admin
```

### Production Testing
1. Deploy with test credentials to staging environment
2. Test login with admin email and password
3. Verify admin dashboard access
4. Switch to production credentials and redeploy

## Security Best Practices

1. **Use Strong Passwords**
   - Minimum 12 characters recommended
   - Mix uppercase, lowercase, numbers, symbols
   - Example: `L0umeHelix#Admin2024!Secure`

2. **Rotate Credentials Regularly**
   - Change admin passwords every 90 days
   - Maintain audit logs of credential changes
   - Track which environments have which credentials

3. **Limit Admin Access**
   - Only grant admin role to necessary personnel
   - Use backup admin only for emergencies
   - Review admin activity logs regularly

4. **Protect Environment Variables**
   - Never commit `.env.local` to Git
   - Use `.gitignore` to exclude `.env.*` files
   - Restrict Vercel project access to authorized team members
   - Enable two-factor authentication on Vercel account

5. **Audit & Monitoring**
   - The system logs all admin authentication attempts
   - Review access audit logs in the admin dashboard
   - Monitor for failed login attempts
   - Alert on unusual admin activity

## Troubleshooting

### "Invalid email or password" on admin login
1. Verify `ADMIN_EMAIL` matches entered email exactly
2. Regenerate password hash if unsure: `node scripts/generate-admin-hash.js "password"`
3. Ensure `ADMIN_PASSWORD_HASH` is set correctly (no trailing spaces)
4. Check that environment variables are loaded (restart dev server or redeploy)

### Admin user not created automatically
1. Ensure `users` table exists in database: `npm run db:migrate`
2. Check database connection string in `POSTGRES_URL`
3. Verify admin email format is valid

### Can't access admin dashboard after login
1. Verify user role is `admin` in database: `SELECT role FROM users WHERE email = $1`
2. Check middleware permissions in `/middleware.ts`
3. Review admin route protection in dashboard components

### Missing environment variables on production
1. Verify variables are set in Vercel project settings
2. Check that environment was selected (Production/Preview/Development)
3. Redeploy application or wait for deployment to complete
4. Clear browser cache and try again

## API Integration

The admin credential system integrates with the authentication API:

```typescript
// Login endpoint (POST /api/auth/login)
{
  "email": "admin@lumenhelix.com",
  "password": "your-password"
}

// Response on success
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "id": "uuid",
    "email": "admin@lumenhelix.com",
    "name": "Administrator",
    "role": "admin",
    "is_active": true
  },
  "token": "session-token"
}
```

## File Structure

```
/scripts/
  ├── generate-admin-hash.js      # Generate password hashes
  └── setup-admin.ts              # Startup validation

/lib/
  ├── admin-credentials.ts        # Credential verification logic
  ├── auth.ts                     # Updated with admin auth
  └── auth-session.ts             # Session management

/app/api/auth/
  └── login/route.ts              # Updated login endpoint

/.env.example                       # Template for environment setup
/.env.local                         # Local development (gitignored)
```

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review application logs for error messages
3. Ensure all environment variables are properly set
4. Contact security team if credentials are compromised
