import { LeadStatus } from '@/contexts'
import { useState } from 'react'

export const useFilters = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const statusOptions = Object.entries(LeadStatus).map(([, value]) => ({
    value: value,
    label: value
  }))

  const sortOptions = [
    { value: '', label: 'No sorting' },
    { value: 'asc', label: 'Score: Low to High' },
    { value: 'desc', label: 'Score: High to Low' }
  ]

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortOrder(value === '' ? null : (value as 'asc' | 'desc'))
  }

  const resetFilters = () => {
    setSearch('')
    setStatus('')
    setSortOrder(null)
  }

  return {
    search,
    status,
    sortOrder,
    statusOptions,
    sortOptions,
    handleStatusChange,
    handleSearchChange,
    handleSortChange,
    resetFilters
  }
}
