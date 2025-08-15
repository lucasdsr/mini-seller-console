export type Lead = {
  id: number
  title: string
  description?: string
  completed: boolean
}

export type LeadsList = Lead[]

export interface UseLeadState {
  leadsList: LeadsList
  completedLeads: LeadsList

  addLead: VoidFunction
  clearConfirmedLeads: VoidFunction
  deleteLead: (leadId: number) => void
  toggleLead: (leadId: number) => void
  editLead: (leadId: number, field: string, value: string) => void
}
