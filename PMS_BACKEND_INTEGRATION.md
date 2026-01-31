/**
 * PMS Backend Integration Documentation
 *
 * This backend integration provides a complete API for the Project Management System (PMS).
 *
 * Database Schema:
 * - Workspaces: Organize projects and team members
 * - Projects: Individual projects within workspaces
 * - Version History: Track project changes over time
 * - Artifacts: Store project artifacts and files
 * - Releases: Manage project releases and versions
 * - Experiments: Track experiments and results
 * - Decisions: Log important project decisions
 * - Tickets: Issue tracking and task management
 * - Google Drive Integration: Connect workspaces to Google Drive
 *
 * API Endpoints:
 *
 * WORKSPACES
 * GET /api/pms/workspaces?ownerId={id}          - List all workspaces for owner
 * GET /api/pms/workspaces?id={id}               - Get specific workspace
 * POST /api/pms/workspaces                       - Create new workspace
 * PUT /api/pms/workspaces                        - Update workspace
 * DELETE /api/pms/workspaces?id={id}            - Delete workspace
 *
 * PROJECTS
 * GET /api/pms/projects?workspaceId={id}        - List projects in workspace
 * GET /api/pms/projects?id={id}                 - Get specific project
 * POST /api/pms/projects                         - Create new project
 * PUT /api/pms/projects                          - Update project
 * DELETE /api/pms/projects?id={id}              - Delete project
 *
 * TICKETS
 * GET /api/pms/tickets?projectId={id}           - List tickets in project
 * GET /api/pms/tickets?id={id}                  - Get specific ticket
 * POST /api/pms/tickets                          - Create new ticket
 * PUT /api/pms/tickets                           - Update ticket
 * DELETE /api/pms/tickets?id={id}               - Delete ticket
 *
 * Data Layers (/lib):
 * - pms-types.ts: TypeScript interfaces for all entities
 * - db.ts: Database connection and query utilities
 * - pms-workspace.ts: Workspace CRUD operations
 * - pms-project.ts: Project CRUD operations
 * - pms-ticket.ts: Ticket CRUD operations
 *
 * Usage Example:
 *
 * // Create a workspace
 * const response = await fetch('/api/pms/workspaces', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     ownerId: 'user_123',
 *     name: 'My Workspace',
 *     description: 'Description here'
 *   })
 * })
 *
 * // Get all projects
 * const projects = await fetch('/api/pms/projects?workspaceId=ws_123')
 *   .then(r => r.json())
 *
 * // Create a ticket
 * const ticket = await fetch('/api/pms/tickets', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     projectId: 'proj_123',
 *     title: 'New Feature',
 *     description: 'Feature description',
 *     priority: 'high',
 *     assignedTo: 'user_456'
 *   })
 * }).then(r => r.json())
 *
 * Environment Variables Required:
 * - DATABASE_URL: Neon PostgreSQL connection string
 *
 * Error Handling:
 * All endpoints return standard HTTP status codes:
 * - 200: Success
 * - 201: Created
 * - 400: Bad request (missing required fields)
 * - 500: Internal server error
 *
 * Next Steps:
 * 1. Integrate these APIs into your PMS frontend components
 * 2. Add authentication middleware to protect endpoints
 * 3. Implement other data layers (artifacts, releases, experiments, decisions)
 * 4. Add Google Drive integration
 * 5. Set up error logging and monitoring
 */
