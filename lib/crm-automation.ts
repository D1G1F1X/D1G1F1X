// CRM Automation Engine - Server-side rules for task creation and escalation

import { createActivity, createTask } from './crm-queries'
import type { Contact, Deal, Task } from './crm-types'

export interface AutomationRule {
  id: string
  name: string
  trigger: 'contact_created' | 'deal_stage_changed' | 'task_overdue' | 'qualification_triggered'
  condition: Record<string, unknown>
  action: 'create_task' | 'escalate' | 'send_notification' | 'update_deal'
  enabled: boolean
}

// Built-in automation rules
export const DEFAULT_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'New contact follow-up',
    trigger: 'contact_created',
    condition: { source: 'diagnostic' },
    action: 'create_task',
    enabled: true,
  },
  {
    id: 'rule-2',
    name: 'Deal proposal escalation',
    trigger: 'deal_stage_changed',
    condition: { stage: 'proposal', daysInStage: 7 },
    action: 'escalate',
    enabled: true,
  },
  {
    id: 'rule-3',
    name: 'Overdue task notification',
    trigger: 'task_overdue',
    condition: { overdue_days: 1 },
    action: 'send_notification',
    enabled: true,
  },
]

// Task creation automation
export async function automateTaskCreation(data: {
  contact_id: string
  title: string
  task_type: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date: Date
  sla_hours: number
}): Promise<Task | null> {
  try {
    const task = await createTask({
      title: data.title,
      task_type: data.task_type,
      contact_id: data.contact_id,
      priority: data.priority,
      due_date: data.due_date,
      sla_hours: data.sla_hours,
      created_by: 'automation',
    })
    return task
  } catch (error) {
    console.error('[v0] automateTaskCreation error:', error)
    return null
  }
}

// Deal escalation automation
export async function automateDealEscalation(data: {
  deal_id: string
  reason: string
  severity: 'low' | 'medium' | 'high'
  contact_id?: string
}): Promise<void> {
  try {
    console.log('[v0] automateDealEscalation:', data)
    
    // Create escalation task
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 1)

    await createTask({
      title: `[ESCALATED] Deal requires attention - ${data.reason}`,
      task_type: 'escalation',
      contact_id: data.contact_id || undefined,
      priority: data.severity === 'high' ? 'urgent' : data.severity === 'medium' ? 'high' : 'medium',
      due_date: dueDate,
      sla_hours: data.severity === 'high' ? 4 : data.severity === 'medium' ? 24 : 48,
      created_by: 'automation',
    })

    // Log escalation activity
    if (data.contact_id) {
      await createActivity({
        activity_type: 'note',
        contact_id: data.contact_id,
        title: 'Deal Escalated',
        description: `${data.reason} (Severity: ${data.severity})`,
        actor_email: 'automation@system',
      })
    }
  } catch (error) {
    console.error('[v0] automateDealEscalation error:', error)
  }
}

// Contact qualification automation
export async function automateContactQualification(contact: Contact): Promise<boolean> {
  try {
    const qualificationScore = calculateQualificationScore(contact)
    console.log('[v0] automateContactQualification score:', qualificationScore)

    // Auto-qualify if score > 70
    if (qualificationScore > 70) {
      await createActivity({
        activity_type: 'note',
        contact_id: contact.id,
        title: 'Auto-Qualified',
        description: `Contact automatically qualified with score: ${qualificationScore}/100`,
        actor_email: 'automation@system',
      })
      return true
    }

    return false
  } catch (error) {
    console.error('[v0] automateContactQualification error:', error)
    return false
  }
}

// Calculate qualification score (0-100)
function calculateQualificationScore(contact: Contact): number {
  let score = 0

  // Email domain check (20 points)
  if (contact.email && contact.email.includes('company.com') === false) {
    score += 20
  }

  // Phone provided (15 points)
  if (contact.phone) {
    score += 15
  }

  // Has company info (25 points)
  if (contact.company_id) {
    score += 25
  }

  // Consent given (20 points)
  if (contact.consent) {
    score += 20
  }

  // Title provided (10 points)
  if (contact.title) {
    score += 10
  }

  // Source quality (10 points)
  if (contact.source === 'diagnostic' || contact.source === 'partner_referral') {
    score += 10
  }

  return Math.min(score, 100)
}

// Trigger automation based on events
export async function triggerAutomation(event: {
  type: 'contact_created' | 'deal_stage_changed' | 'task_due_soon'
  contact?: Contact
  deal?: Deal
  task?: Task
}): Promise<void> {
  try {
    console.log('[v0] triggerAutomation event:', event.type)

    switch (event.type) {
      case 'contact_created':
        if (event.contact) {
          // Auto-create follow-up task
          const dueDate = new Date()
          dueDate.setDate(dueDate.getDate() + 2)

          await automateTaskCreation({
            contact_id: event.contact.id,
            title: `Initial follow-up: ${event.contact.first_name || 'New Contact'}`,
            task_type: 'follow_up',
            priority: event.contact.source === 'diagnostic' ? 'high' : 'medium',
            due_date: dueDate,
            sla_hours: 48,
          })

          // Attempt auto-qualification
          await automateContactQualification(event.contact)
        }
        break

      case 'deal_stage_changed':
        if (event.deal && event.deal.stage === 'proposal') {
          // Escalate if deal stays in proposal for > 7 days
          if (event.deal.days_in_stage && event.deal.days_in_stage > 7) {
            await automateDealEscalation({
              deal_id: event.deal.id,
              reason: 'Deal in proposal stage for over 7 days',
              severity: 'high',
              contact_id: event.deal.contact_id || undefined,
            })
          }
        }
        break

      case 'task_due_soon':
        if (event.task) {
          console.log('[v0] Task due soon:', event.task.title)
          // Could send reminder notification here
        }
        break

      default:
        console.log('[v0] Unknown automation event type:', event.type)
    }
  } catch (error) {
    console.error('[v0] triggerAutomation error:', error)
  }
}
