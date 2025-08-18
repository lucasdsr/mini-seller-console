import { Lead, Opportunity } from './states'

export interface HomeContextData {
  columns: Array<{ id: string; title: string }>
  filteredLeads: Lead[]
  filteredOpportunities: Opportunity[]
  opportunitiesList: Opportunity[]

  searchFilter: string
  statusFilter: string
  sortOrder: 'asc' | 'desc' | null

  selectedLead: Lead | null
  selectedOpportunity: Opportunity | null
  isDrawerOpen: boolean
  isConvertModalOpen: boolean
  leadToConvert: Lead | null
  showToast: boolean

  handleFilter: (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => void
  resetFilters: () => void

  handleRowClick: (item: Lead) => void
  handleOpportunityRowClick: (item: Opportunity) => void
  handleCloseDrawer: () => void
  handleConvertLead: (lead: Lead) => void
  handleConfirmConversion: () => void
  handleCloseConvertModal: () => void
  handleCloseToast: () => void
  handleUpdateLead: (leadId: number, updates: Partial<Lead>) => void
}
