import { LeadSource, LeadStatus } from './enums'

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

  finishConvertion: (leadId: number) => void
  editLead: (leadId: number, field: string, value: string) => void
}
