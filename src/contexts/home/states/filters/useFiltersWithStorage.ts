import { useEffect, useState } from 'react'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/manageLocalStorage'

const FILTERS_STORAGE_KEY = '__HOME_FILTERS'

export interface FilterState {
  search: string
  status: string
  sortOrder: 'asc' | 'desc' | null
}

const defaultFilters: FilterState = {
  search: '',
  status: '',
  sortOrder: null
}

export const useFiltersWithStorage = () => {
  const [filters, setFilters] = useState<FilterState>(() => {
    const storedFilters = getFromLocalStorage<FilterState>(FILTERS_STORAGE_KEY)
    return storedFilters || defaultFilters
  })

  useEffect(() => {
    saveToLocalStorage(FILTERS_STORAGE_KEY, filters)
  }, [filters])

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return {
    filters,
    updateFilters,
    resetFilters
  }
}
