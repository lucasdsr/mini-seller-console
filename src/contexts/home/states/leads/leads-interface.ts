import { LeadSource, LeadStatus } from '.'

export type Lead = {
  id: number
  name: string
  company: string
  email: string
  source: LeadSource
  score: number
  status: LeadStatus
}

export type LeadsList = Lead[]

export interface UseLeadState {
  leadsList: LeadsList
  convertedLeads: LeadsList
  removeLead: (leadId: number) => void
  updateLead: (leadId: number, updates: Partial<Lead>) => void
}
