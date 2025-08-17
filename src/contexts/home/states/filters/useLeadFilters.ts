import { useFilters } from './useFilters'
import { Lead } from '../leads'

export const useLeadFilters = (
  leads: Lead[],
  search: string,
  status: string,
  sortOrder: 'asc' | 'desc' | null
) => useFilters(leads, search, status, sortOrder)
