import { LeadSource, LeadStatus } from '../leads'

export type Opportunity = {
  id: number
  name: string
  company: string
  email: string
  source: LeadSource
  score: number
  status: LeadStatus
  convertedAt: Date
}

export type OpportunitiesList = Opportunity[]

export interface UseOpportunityState {
  opportunitiesList: OpportunitiesList
  addOpportunity: (opportunity: Opportunity) => void
}
