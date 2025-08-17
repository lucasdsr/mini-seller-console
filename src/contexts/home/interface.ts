import { Lead, Opportunity } from './states'

export interface HomeContextData {
  // Dados
  columns: Array<{ id: string; title: string }>
  filteredLeads: Lead[]
  filteredOpportunities: Opportunity[]
  opportunitiesList: Opportunity[]

  // Estados de filtros
  searchFilter: string
  statusFilter: string
  sortOrder: 'asc' | 'desc' | null

  // Estados de UI
  selectedLead: Lead | null
  isDrawerOpen: boolean
  isConvertModalOpen: boolean
  leadToConvert: Lead | null
  showToast: boolean

  // Funções de filtros
  handleFilter: (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => void
  resetFilters: () => void

  // Funções de UI
  handleRowClick: (item: Lead) => void
  handleCloseDrawer: () => void
  handleConvertLead: (lead: Lead) => void
  handleConfirmConversion: () => void
  handleCloseConvertModal: () => void
  handleCloseToast: () => void
}
