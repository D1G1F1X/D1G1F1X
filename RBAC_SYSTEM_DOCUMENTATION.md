# Role-Based Access Control (RBAC) System Documentation

## Overview

This RBAC system implements comprehensive access control for multiple user types with specific restrictions for guests, fine-grained staff permissions, and admin management capabilities.

## User Roles

### 1. Admin
- Full system access
- Can approve/reject guest registrations
- Can assign guests to projects with specific access levels
- Can configure staff permissions
- Can view all analytics and reports
- Can manage all projects and tickets

### 2. Editor
- Can create and edit content
- Can manage assigned projects
- Can manage assigned tickets
- Permissions configured per staff member

### 3. User
- Limited editing capabilities
- Can view assigned projects
- Can view and comment on assigned tickets
- Permissions configured per staff member

### 4. Guest
- **Restricted to tickets and assigned projects only**
- Cannot access admin functions
- Cannot view analytics
- Cannot manage projects
- Access automatically expires based on configured expiration dates
- Project access limited to: view, comment, or limited_edit levels

## Database Schema

### guest_registrations
Tracks pending guest approval requests with company info and access reasons.

### guest_project_access
Links guests to specific projects with configurable access levels:
- `view`: Read-only access
- `comment`: View + comment capabilities
- `limited_edit`: View + edit capabilities

### guest_ticket_access
Tracks individual ticket access for guests (one-to-one relationship).

### staff_access_levels
Manages permissions for in-house, contractor, and vendor staff:
- `can_manage_guests`: Approve registrations and assign access
- `can_view_analytics`: Access to analytics/reports
- `can_manage_projects`: Create, edit, delete projects
- `can_manage_tickets`: Create, edit, delete tickets

### admin_notifications
Alerts admins of guest registrations and access changes for timely approval.

### access_audit_log
Complete audit trail of all access control changes for compliance.

## Guest Registration Flow

1. Guest submits registration form with email, password, company, and access reason
2. Admin receives notification of new registration
3. Admin reviews and approves/rejects registration
4. Once approved, admin assigns guest to specific projects
5. Admin sets access level (view/comment/limited_edit) per project
6. Guest receives confirmation and can access assigned resources
7. Access expires automatically based on configured date

## Staff Access Management

1. Admin creates staff access level (in-house/contractor/vendor)
2. Admin assigns permission level (junior/senior/lead/manager)
3. Admin configures specific capabilities per staff member
4. Staff member can access resources based on their permissions
5. Admin can update permissions at any time

## Guest Access Restrictions

Guests are automatically restricted to:
- Assigned projects only (checked via `guest_project_access`)
- Assigned tickets only (checked via `guest_ticket_access`)
- Specific access level per project (cannot exceed assigned level)
- No access to admin functions, analytics, or staff management
- Session expires after configured duration

## API Endpoints

### Authentication
- `POST /api/auth/register-guest` - Register as guest
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Admin Management
- `GET /api/admin/guest-registrations` - List pending registrations
- `POST /api/admin/guest-registrations` - Approve/reject registration
- `POST /api/admin/assign-guest-access` - Assign guest to project
- `DELETE /api/admin/assign-guest-access` - Revoke guest access
- `GET /api/admin/staff-access` - List staff members
- `POST /api/admin/staff-access` - Create staff access level
- `PUT /api/admin/staff-access` - Update staff permissions

## Middleware Protection

All protected routes use `getSession()` middleware to:
1. Verify user is authenticated
2. Check user role matches required level
3. Enforce guest-only restrictions automatically
4. Log all access attempts for audit trail

## Usage Examples

### Guest Registration
```bash
curl -X POST http://localhost:3000/api/auth/register-guest \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@company.com",
    "password": "SecurePass123",
    "company": "Acme Corp",
    "phone": "555-1234",
    "reason": "Project collaboration"
  }'
```

### Approve Guest Registration
```bash
curl -X POST http://localhost:3000/api/admin/guest-registrations \
  -H "Content-Type: application/json" \
  -d '{
    "registrationId": "uuid",
    "action": "approve"
  }'
```

### Assign Guest to Project
```bash
curl -X POST http://localhost:3000/api/admin/assign-guest-access \
  -H "Content-Type: application/json" \
  -d '{
    "guestId": "user-uuid",
    "projectId": "project-uuid",
    "accessLevel": "comment",
    "expiresAt": "2025-12-31"
  }'
```

### Configure Staff Permissions
```bash
curl -X POST http://localhost:3000/api/admin/staff-access \
  -H "Content-Type: application/json" \
  -d '{
    "staffId": "user-uuid",
    "staffType": "in-house",
    "permissionLevel": "senior",
    "department": "Engineering",
    "permissions": {
      "can_manage_guests": true,
      "can_view_analytics": true,
      "can_manage_projects": true,
      "can_manage_tickets": false
    }
  }'
```

## Security Considerations

1. **Guest Isolation**: Guests cannot access system admin features
2. **Time-Limited Access**: Guest project access includes optional expiration
3. **Granular Permissions**: Staff permissions are individually configurable
4. **Audit Logging**: All access control changes are logged
5. **Session Security**: HTTP-only cookies prevent XSS attacks
6. **Role-Based Checks**: Every endpoint validates user role

## Session Handling

- **Duration**: 7 days for all users
- **Renewal**: Automatic on each request
- **Invalidation**: Immediate on logout
- **Guest Sessions**: Include access level restrictions
- **Staff Sessions**: Include permission level restrictions

## Best Practices

1. Regularly review pending guest registrations
2. Set expiration dates on guest project access
3. Use appropriate staff permission levels
4. Monitor access audit logs for suspicious activity
5. Notify guests of access expiration
6. Document reasons for guest access denial
7. Quarterly review of staff permissions
