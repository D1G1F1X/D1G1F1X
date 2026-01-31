# Comprehensive Authentication System Documentation

## Overview

This implementation provides a complete role-based authentication system with four user types: Admin, Editor, User, and Guest. Each role has distinct permissions and access levels throughout the application.

## Architecture

### Database Schema (`create-auth-schema.sql`)

**Tables:**
- `users` - Stores user accounts with role assignments
- `sessions` - Manages user sessions with expiration
- `permissions` - Defines system permissions
- `role_permissions` - Maps roles to permissions (RBAC)
- `activity_logs` - Tracks user actions for security audits

### Authentication Flow

1. **Registration** → POST `/api/auth/register` → User created with selected role
2. **Login** → POST `/api/auth/login` → Session created, token issued
3. **Session Verification** → GET `/api/auth/me` → Returns current user
4. **Logout** → POST `/api/auth/logout` → Session invalidated

### User Roles & Permissions

#### Admin
- Full system access
- User management (create, read, update, delete)
- Role and permission management
- Project management
- Analytics and insights
- System settings

#### Editor
- Create and update projects
- Create and manage content
- Comment on content
- View personal analytics
- Invite collaborators

#### User
- View projects and content
- Read comments
- Create comments
- Update own profile
- Access saved items

#### Guest
- View public projects and content
- Read comments
- No editing capabilities
- No project creation

## Components

### `/components/auth/login-form.tsx`
- User type selector with visual differentiation
- Email/password login
- Real-time error handling
- Loading states and success feedback
- Responsive grid layout for role selection

**Features:**
- Color-coded role buttons (red=admin, blue=editor, green=user, gray=guest)
- Password visibility toggle
- Form validation
- Clear permission descriptions per role

### `/components/auth/register-form.tsx`
- Account creation flow
- Password confirmation validation
- Role pre-assignment
- Email and name input
- Security feedback

### `/app/login/page.tsx`
- Full-page login interface
- Beautiful gradient background
- Login form wrapper
- Navigation to home

### `/app/register/page.tsx`
- Registration page layout
- Form wrapper
- Links to login

### `/app/dashboard/page.tsx`
- Protected dashboard (requires authentication)
- Displays user information
- Shows role permissions
- Account status
- Logout functionality

## API Routes

### `/api/auth/login` (POST)
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": { id, email, name, role, ... },
  "token": "session_token",
  "session": { id, user_id, token, expires_at }
}
```

### `/api/auth/register` (POST)
```json
Request:
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "password_confirm": "password123",
  "role": "user"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": { id, email, name, role, ... }
}
```

### `/api/auth/logout` (POST)
Clears session and logs out user

### `/api/auth/me` (GET)
Returns current authenticated user information

## Security Features

1. **Password Hashing** - PBKDF2 with 100,000 iterations
2. **Session Management** - Secure HTTP-only cookies, 7-day expiration
3. **CSRF Protection** - SameSite cookie attribute
4. **Activity Logging** - Tracks user actions for audit trails
5. **Role-Based Access Control** - Hierarchical permission system
6. **Protected Routes** - Middleware checks authentication
7. **Input Validation** - Email format, password strength requirements

## Session Management

- Sessions expire after 7 days
- Stored securely in HTTP-only cookies
- Token verification on each request
- Automatic redirect to login if expired

## Usage Example

```typescript
// Check if user has permission
import { hasPermission } from '@/lib/auth-session'

if (hasPermission(user.role, 'projects:create')) {
  // Allow project creation
}

// Check resource access
import { canAccessResource } from '@/lib/auth-session'

if (canAccessResource(user.role, 'admin_panel')) {
  // Allow access to admin panel
}
```

## Role-Based Middleware

The authentication middleware (`/middleware.ts`) automatically:
- Checks for valid session on protected routes
- Redirects to login if not authenticated
- Allows public routes to bypass checks
- Preserves session token in request headers

## Testing

**Test Admin Login:**
```
Email: admin@example.com
Password: password123 (after creation)
```

**Create Test Users:**
Use the `/register` page to create accounts with different roles:
- Admin
- Editor  
- User
- Guest

## Next Steps

1. Create role-specific pages/components
2. Implement permission checks in components
3. Add two-factor authentication (2FA)
4. Set up activity log dashboard
5. Implement password reset flow
6. Add role management UI for admins

## Environment Variables Required

```
DATABASE_URL=your_neon_connection_string
NODE_ENV=production
```

Session tokens are automatically managed via secure HTTP-only cookies.
