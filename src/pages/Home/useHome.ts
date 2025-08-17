import { useLeadContext } from '@/contexts'
import { useLeadFilters } from '@/contexts/leads/hooks'
import { useState } from 'react'

export const useHome = () => {
  const { leadsList } = useLeadContext()
  const [searchFilter, setSearchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const columns = [
    {
      id: 'id',
      title: 'id'
    },
    {
      id: 'name',
      title: 'name'
    },
    {
      id: 'company',
      title: 'company'
    },
    {
      id: 'email',
      title: 'email'
    },
    {
      id: 'source',
      title: 'source'
    },
    {
      id: 'score',
      title: 'score'
    },
    {
      id: 'status',
      title: 'status'
    }
  ]

  const filteredLeads = useLeadFilters(
    leadsList,
    searchFilter,
    statusFilter,
    sortOrder
  )

  const handleFilter = (
    search: string,
    status: string,
    sortOrder: 'asc' | 'desc' | null
  ) => {
    setSearchFilter(search)
    setStatusFilter(status)
    setSortOrder(sortOrder)
  }

  return {
    columns,
    filteredLeads,
    handleFilter
  }
}
