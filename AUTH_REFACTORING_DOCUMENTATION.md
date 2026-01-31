# Authentication System Refactoring - Automatic Role Assignment

## Overview
This refactoring eliminates the "Select Access Level" option from the login page and implements automatic role assignment during registration based on admin configuration settings.

## Key Changes

### 1. Removed "Select Access Level" from Login Page
**File:** `/components/auth/login-form.tsx`

**Changes:**
- Removed `selectedUserType` state variable
- Removed the 4-button user type selector UI
- Removed role-specific button styling and colors
- Removed "Logging in as: [Role]" display box
- Simplified login form to only require email and password
- Updated login button to generic styling without role-specific colors

**Benefits:**
- Simplified user experience
- Users no longer confused about selecting access levels
- Cleaner login interface focused on credentials only
- Access levels determined server-side based on admin config

### 2. Auto-Assignment of Roles During Registration
**Files:**
- `/lib/admin-credentials.ts` - Added `getDefaultRegistrationRole()` function
- `/app/api/auth/register/route.ts` - Updated to use default role from config
- `/components/auth/register-form.tsx` - Removed role selection UI

**Changes:**

#### Admin Credentials Config
```typescript
export function getDefaultRegistrationRole(): 'admin' | 'editor' | 'user' | 'guest' {
  const defaultRole = process.env.DEFAULT_REGISTRATION_ROLE
  
  if (defaultRole && ['admin', 'editor', 'user', 'guest'].includes(defaultRole)) {
    return defaultRole as 'admin' | 'editor' | 'user' | 'guest'
  }

  return 'user' // Default fallback
}
```

#### Registration API
- Imports `getDefaultRegistrationRole()` from admin-credentials
- Automatically assigns the configured default role to all new users
- No longer accepts `role` parameter from frontend

#### Registration Form
- Removed role selection dropdown
- Removed role state from form data
- Simplified form submission to only send: name, email, password, password_confirm

### 3. Environment Configuration
**New Environment Variable:**
```
DEFAULT_REGISTRATION_ROLE=user  # Options: 'admin' | 'editor' | 'user' | 'guest'
```

If not set, defaults to `'user'` role.

## Security Implications

✅ **Security Improvements:**
1. **No Client-Side Role Selection** - Users cannot manipulate role during login
2. **Server-Side Authority** - Admin has full control via environment configuration
3. **Centralized Role Management** - All role assignments flow through admin config
4. **Audit Trail** - Registration API logs which role is assigned via `getDefaultRegistrationRole()`
5. **No API Abuse** - Registration API no longer accepts role parameter from client

## User Experience Flow

### Before Refactoring:
1. User clicks "Register" → Fill name, email, password → **Select Role** → Account created with selected role
2. User clicks "Login" → **Select Access Level** → Enter email/password → Login

### After Refactoring:
1. User clicks "Register" → Fill name, email, password → Account created with admin-configured role
2. User clicks "Login" → Enter email/password → Login with their assigned role

## Admin Control

The admin controls what role new users receive via environment variable:

```bash
# In your deployment environment variables:
DEFAULT_REGISTRATION_ROLE=user  # Most common - new users are regular users
```

Admin can:
- Update this variable anytime
- Deploy new value to change default for future registrations
- Manually adjust individual user roles in admin dashboard after registration

## Backward Compatibility

- Existing users retain their assigned roles
- Already-created accounts unaffected by this change
- Only affects new registrations going forward

## Migration Path

1. Set `DEFAULT_REGISTRATION_ROLE` environment variable (defaults to 'user' if not set)
2. Deploy updated code
3. Old role selector UI disappears from login form
4. New registrations automatically receive configured role
5. Existing users continue with their assigned roles

## Testing Checklist

- [ ] Register new user - should receive DEFAULT_REGISTRATION_ROLE
- [ ] Login page has no role selector
- [ ] Login only requires email/password
- [ ] New user appears in admin dashboard with correct role
- [ ] Existing users can still login with their original roles
- [ ] Change DEFAULT_REGISTRATION_ROLE and verify new registrations get updated role
- [ ] Verify no errors in console when registering
- [ ] Test on mobile - UI simplified and responsive

## Files Modified

1. `/lib/admin-credentials.ts` - Added role assignment function
2. `/app/api/auth/register/route.ts` - Updated to auto-assign roles
3. `/components/auth/register-form.tsx` - Removed role selection
4. `/components/auth/login-form.tsx` - Removed access level selector

## Future Enhancements

- Add UI to admin dashboard to change DEFAULT_REGISTRATION_ROLE without redeploying
- Implement role assignment rules based on email domain (e.g., @company.com gets 'editor')
- Add registration approval workflow where admins approve new users before role assignment
- Track role assignment history in audit logs
