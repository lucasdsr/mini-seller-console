import { useFilters } from './useFilters'
import { Opportunity } from '../opportunities'

export const useOpportunityFilters = (
  opportunities: Opportunity[],
  search: string,
  status: string,
  sortOrder: 'asc' | 'desc' | null
) => useFilters(opportunities, search, status, sortOrder)
