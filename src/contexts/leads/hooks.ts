import { useContext, useMemo } from 'react'

import { Context } from './context'
import { UseLeadState } from './interface'
import { Lead } from './interface'

export const useLeadContext = (): UseLeadState => {
  const value = useContext(Context)

  if (!value) {
    throw new Error('useLeadContext must be used within a LeadProvider')
  }

  return value
}

export const useLeadFilters = (
  leads: Lead[],
  search: string,
  status: string,
  sortOrder: 'asc' | 'desc' | null
) =>
  useMemo(() => {
    let filteredLeads = leads.filter(lead => {
      // Filtro por busca (nome ou empresa)
      const searchMatch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())

      // Filtro por status
      const statusMatch = !status || lead.status === status

      return searchMatch && statusMatch
    })

    // Ordenação por score
    if (sortOrder) {
      filteredLeads = [...filteredLeads].sort((a, b) => {
        const scoreA = Number(a.score)
        const scoreB = Number(b.score)

        if (sortOrder === 'asc') {
          return scoreA - scoreB
        } else {
          return scoreB - scoreA
        }
      })
    }

    return filteredLeads
  }, [leads, search, status, sortOrder])
